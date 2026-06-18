import db from "../config/db_connect.js";

// ================= LIST ALL APPLICATIONS =================
// Supports filtering by ?status= and ?search=
export const getApplications = async (req, res, next) => {
  try {
    const { status, search } = req.query;
    let query = "SELECT * FROM applications WHERE 1=1";
    let queryParams = [];

    if (status) {
      query += " AND status = ?";
      queryParams.push(status);
    }

    if (search) {
      query += " AND (company_name LIKE ? OR job_title LIKE ?)";
      queryParams.push(`%${search}%`, `%${search}%`);
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

// ================= GET SINGLE APPLICATION =================
export const getApplicationById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const [rows] = await db.execute("SELECT * FROM applications WHERE id = ?", [
      id,
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

// ================= CREATE APPLICATION =================
export const createApplication = async (req, res, next) => {
  try {
    const { company_name, job_title, job_type, status, applied_date, notes } =
      req.body;

    if (!company_name || !job_title || !job_type || !applied_date) {
      return res.status(400).json({
        success: false,
        message:
          "Company name, job title, job type, and applied date are required",
      });
    }

    const query = `
      INSERT INTO applications (company_name, job_title, job_type, status, applied_date, notes)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    const [result] = await db.execute(query, [
      company_name,
      job_title,
      job_type,
      status || "Applied",
      applied_date,
      notes || null,
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

// ================= UPDATE APPLICATION (PATCH) =================
export const updateApplication = async (req, res, next) => {
  try {
    const { id } = req.params;
    const fieldsToUpdate = req.body;

    if (Object.keys(fieldsToUpdate).length === 0) {
      return res.status(400).json({
        success: false,
        message: "No fields provided for update",
      });
    }

    // Check if item exists first
    const [exist] = await db.execute(
      "SELECT * FROM applications WHERE id = ?",
      [id],
    );

    if (exist.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    // Dynamically safely construct SQL statement
    let query = "UPDATE applications SET ";
    let queryParams = [];
    const keys = Object.keys(fieldsToUpdate);

    keys.forEach((key, index) => {
      query += `${key} = ?${index < keys.length - 1 ? ", " : ""}`;
      queryParams.push(fieldsToUpdate[key]);
    });

    query += " WHERE id = ?";
    queryParams.push(id);

    await db.execute(query, queryParams);

    res.status(200).json({
      success: true,
      message: "Application updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

// ================= DELETE APPLICATION =================
export const deleteApplication = async (req, res, next) => {
  try {
    const { id } = req.params;

    const [exist] = await db.execute(
      "SELECT id FROM applications WHERE id = ?",
      [id],
    );

    if (exist.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    await db.execute("DELETE FROM applications WHERE id = ?", [id]);

    res.status(200).json({
      success: true,
      message: "Application deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
