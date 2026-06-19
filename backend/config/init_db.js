import db from "./db_connect.js";

export const initializeDatabase = async () => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS applications (
      id INT AUTO_INCREMENT PRIMARY KEY,
      company_name VARCHAR(255) NOT NULL,
      job_title VARCHAR(255) NOT NULL,
      job_type ENUM('internship', 'full-time', 'part-time') DEFAULT 'full-time',
      status ENUM('applied', 'interviewing', 'offer', 'rejected') DEFAULT 'applied',
      applied_date DATE NOT NULL,
      notes TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  try {
    await db.execute(createTableQuery);
    console.log("Database initialized.");
  } catch (error) {
    console.error("Database initialization failed:", error);
  }
};
