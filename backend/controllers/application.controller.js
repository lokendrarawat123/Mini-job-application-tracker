import db from "../config/db_connect.js";

// ================= LIST ALL APPLICATIONS =================
// Supports filtering by ?status= and ?search=
export const getApplications = async (req, res, next) => {
  try {
    const { status, search } = req.query;
    let query = "SELECT * FROM applications WHERE 1=1";
    let queryParams = [];

    // Match status case-insensitively
    if (status) {
      query += " AND LOWER(status) = ?";
      queryParams.push(status.toLowerCase());
    }

    // Match company_name or job_title case-insensitively
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

// ================= GET SINGLE APPLICATION =================
export const getApplicationById = async (req, res, next) => {
  try {
    const { id } = req.params;

    // 🌟 १. String 'id' लाई Number मा कन्भर्ट गर्ने र भ्यालिडेसन गर्ने
    const applicationId = Number(id);
    if (isNaN(applicationId) || applicationId <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid application ID. ID must be a valid number.",
      });
    }

    // २. डेटाबेसमा खोज्दा सुरक्षित नम्बर 'applicationId' प्रयोग गर्ने
    const [rows] = await db.execute("SELECT * FROM applications WHERE id = ?", [
      applicationId,
    ]);

    // ३. यदि डेटा भेटिएन भने ४०४ एरर फर्काउने
    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    // ४. सफल भएमा डेटा रेस्पोन्स दिने
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

    // 1. Required Fields Validation
    if (!company_name || !job_title || !job_type || !applied_date) {
      return res.status(400).json({
        success: false,
        message:
          "Company name, job title, job type, and applied date are required.",
      });
    }

    // 2. Company Name Length Validation
    if (company_name.trim().length < 2) {
      return res.status(400).json({
        success: false,
        message: "Company name must be at least 2 characters long.",
      });
    }

    // ३. इनपुटलाई सिधै lowercase बनाउने ताकि भ्यालिडेसन र इन्सर्ट दुवैमा सजिलो होस्
    const cleanJobType = job_type.trim().toLowerCase();
    const cleanStatus = status ? status.trim().toLowerCase() : "applied"; // default lowercase 'applied'

    // 4. Job Type ENUM Validation (हाम्रो एरे पनि lowercase मै छ)
    const validJobTypes = ["internship", "full-time", "part-time"];
    if (!validJobTypes.includes(cleanJobType)) {
      return res.status(400).json({
        success: false,
        message: `Invalid job type. Must be one of: ${validJobTypes.join(", ")}`,
      });
    }

    // 5. Status ENUM Validation
    const validStatuses = ["applied", "interviewing", "offer", "rejected"];
    if (!validStatuses.includes(cleanStatus)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Must be one of: ${validStatuses.join(", ")}`,
      });
    }

    // Database Insert Query
    const query = `
      INSERT INTO applications (company_name, job_title, job_type, status, applied_date, notes)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    // ६. यहाँ cleanJobType र cleanStatus (जुन lowercase छन्) पठाइएको छ
    const [result] = await db.execute(query, [
      company_name.trim(),
      job_title.trim(),
      cleanJobType, // डेटाबेसमा lowercase जान्छ
      cleanStatus, // डेटाबेसमा lowercase जान्छ
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
// ================= UPDATE APPLICATION  =================
export const updateApplication = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { company_name, job_title, job_type, status, applied_date, notes } =
      req.body;

    // 🌟 १. String 'id' लाई Number मा कन्भर्ट गर्ने र भ्यालिडेसन गर्ने
    const applicationId = Number(id);
    if (isNaN(applicationId) || applicationId <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid application ID. ID must be a valid number.",
      });
    }

    // २. यदि req.body नै खाली छ भने (कुनै पनि फिल्ड पठाइएको छैन भने)
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({
        success: false,
        message: "No fields provided for update",
      });
    }

    // ३. यदि कम्पनीको नाम पठाइएको छ र त्यो २ अक्षर भन्दा सानो छ भने
    if (company_name !== undefined && company_name.trim().length < 2) {
      return res.status(400).json({
        success: false,
        message: "Company name must be at least 2 characters long",
      });
    }

    // ४. यदि job_type पठाइएको छ भने lowercase बनाएर ENUM चेक गर्ने
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

    // ५. यदि status पठाइएको छ भने lowercase बनाएर ENUM चेक गर्ने
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

    // ६. चेक गर्ने: त्यो ID भएको एप्लिकेसन डेटाबेसमा छ कि छैन
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

    // 🌟 मितिलाई SQL ले बुझ्ने YYYY-MM-DD मा बदल्ने लजिक
    // नयाँ मिति आए नयाँलाई, नत्र पुरानै मितिलाई सफा पार्ने
    const rawDate = applied_date || exist[0].applied_date;
    let formattedDate = null;

    if (rawDate) {
      // .toISOString().split('T')[0] ले '2026-06-18T18:15...' बाट '2026-06-18' मात्र निकाल्छ
      formattedDate = new Date(rawDate).toISOString().split("T")[0];
    }

    // ७. यदि सबै कुरा ठिक छ भने अपडेट गरिदिने
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
        formattedDate, // 🌟 यहाँ हामीले मिलाएको सफा मिति (YYYY-MM-DD) पठाइयो
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
// ================= DELETE APPLICATION =================
export const deleteApplication = async (req, res, next) => {
  try {
    const { id } = req.params;

    // १. String लाई Number मा कन्भर्ट गर्ने
    const applicationId = Number(id);

    // २. यदि कन्भर्ट गर्दा 'NaN' (Not a Number) आयो वा नम्बर वैध छैन भने रोक्ने
    if (isNaN(applicationId) || applicationId <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid application ID. ID must be a valid number.",
      });
    }

    // ३. डेटाबेसमा चेक गर्दा नम्बर भइसकेको 'applicationId' पठाउने
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

    // ४. डिलिट गर्दा पनि सुरक्षित नम्बर पास गर्ने
    await db.execute("DELETE FROM applications WHERE id = ?", [applicationId]);

    res.status(200).json({
      success: true,
      message: "Application deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
