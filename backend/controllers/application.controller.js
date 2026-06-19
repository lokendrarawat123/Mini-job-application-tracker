import db from "../config/db_connect.js";

export const getApplications = async (req, res, next) => {
  try {
    const { status, search } = req.query;
    let query = "SELECT * FROM applications WHERE 1=1";
    let queryParams = [];

    if (status) {
      query += " AND LOWER(status) = ?";
      queryParams.push(status.toLowerCase());
    }

    if (search) {
      query += " AND (LOWER(company_name) LIKE ? OR LOWER(job_title) LIKE ?)";
      queryParams.push(
        `%${search.toLowerCase()}%`,
        `%${search.toLowerCase()}%`,
      );
    }

    query += " ORDER BY created_at DESC";

    const [rows] = await db.execute(query, queryParams);

    res.status(200).json({
      success: true,
      count: rows.length,
      data: rows,
    });
  } catch (error) {
    next(error);
  }
};

export const getApplicationById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const applicationId = Number(id);
    if (isNaN(applicationId) || applicationId <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid application ID. ID must be a valid number.",
      });
    }

    const [rows] = await db.execute("SELECT * FROM applications WHERE id = ?", [
      applicationId,
    ]);

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    res.status(200).json({
      success: true,
      data: rows[0],
    });
  } catch (error) {
    next(error);
  }
};

export const createApplication = async (req, res, next) => {
  try {
    const { company_name, job_title, job_type, status, applied_date, notes } =
      req.body;

    if (!company_name || !job_title || !job_type || !applied_date) {
      return res.status(400).json({
        success: false,
        message:
          "Company name, job title, job type, and applied date are required.",
      });
    }

    if (company_name.trim().length < 2) {
      return res.status(400).json({
        success: false,
        message: "Company name must be at least 2 characters long.",
      });
    }

    const cleanJobType = job_type.trim().toLowerCase();
    const cleanStatus = status ? status.trim().toLowerCase() : "applied";

    const validJobTypes = ["internship", "full-time", "part-time"];
    if (!validJobTypes.includes(cleanJobType)) {
      return res.status(400).json({
        success: false,
        message: `Invalid job type. Must be one of: ${validJobTypes.join(", ")}`,
      });
    }

    const validStatuses = ["applied", "interviewing", "offer", "rejected"];
    if (!validStatuses.includes(cleanStatus)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Must be one of: ${validStatuses.join(", ")}`,
      });
    }

    const query = `
      INSERT INTO applications (company_name, job_title, job_type, status, applied_date, notes)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    const [result] = await db.execute(query, [
      company_name.trim(),
      job_title.trim(),
      cleanJobType,
      cleanStatus,
      applied_date,
      notes ? notes.trim() : null,
    ]);

    res.status(201).json({
      success: true,
      message: "Application created successfully",
      applicationId: result.insertId,
    });
  } catch (error) {
    next(error);
  }
};
export const updateApplication = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { company_name, job_title, job_type, status, applied_date, notes } =
      req.body;

    const applicationId = Number(id);
    if (isNaN(applicationId) || applicationId <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid application ID. ID must be a valid number.",
      });
    }

    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({
        success: false,
        message: "No fields provided for update",
      });
    }

    if (company_name !== undefined && company_name.trim().length < 2) {
      return res.status(400).json({
        success: false,
        message: "Company name must be at least 2 characters long",
      });
    }

    if (
      job_type !== undefined &&
      !["internship", "full-time", "part-time"].includes(
        job_type.trim().toLowerCase(),
      )
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid job type. Must be one of: internship, full-time, part-time",
      });
    }

    if (
      status !== undefined &&
      !["applied", "interviewing", "offer", "rejected"].includes(
        status.trim().toLowerCase(),
      )
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid status. Must be one of: applied, interviewing, offer, rejected",
      });
    }

    const [exist] = await db.execute(
      "SELECT * FROM applications WHERE id = ?",
      [applicationId],
    );

    if (exist.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    const rawDate = applied_date || exist[0].applied_date;
    let formattedDate = null;

    if (rawDate) {
      formattedDate = new Date(rawDate).toISOString().split("T")[0];
    }

    await db.execute(
      `UPDATE applications 
       SET company_name = ?, 
           job_title = ?, 
           job_type = ?, 
           status = ?, 
           applied_date = ?, 
           notes = ? 
       WHERE id = ?`,
      [
        company_name !== undefined
          ? company_name.trim()
          : exist[0].company_name,
        job_title !== undefined ? job_title.trim() : exist[0].job_title,
        job_type !== undefined
          ? job_type.trim().toLowerCase()
          : exist[0].job_type,
        status !== undefined ? status.trim().toLowerCase() : exist[0].status,
        formattedDate,
        notes !== undefined ? (notes ? notes.trim() : null) : exist[0].notes,
        applicationId,
      ],
    );

    res.status(200).json({
      success: true,
      message: "Application updated successfully",
    });
  } catch (error) {
    next(error);
  }
};
export const deleteApplication = async (req, res, next) => {
  try {
    const { id } = req.params;

    const applicationId = Number(id);

    if (isNaN(applicationId) || applicationId <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid application ID. ID must be a valid number.",
      });
    }

    const [exist] = await db.execute(
      "SELECT id FROM applications WHERE id = ?",
      [applicationId],
    );

    if (exist.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    await db.execute("DELETE FROM applications WHERE id = ?", [applicationId]);

    res.status(200).json({
      success: true,
      message: "Application deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
