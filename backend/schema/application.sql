CREATE TABLE applications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    company_name VARCHAR(255) NOT NULL,
    job_title VARCHAR(255) NOT NULL,
    job_type ENUM('internship', 'full-time', 'part-time') NOT NULL,
    status ENUM('applied', 'interviewing', 'offer', 'rejected') NOT NULL DEFAULT 'applied',
    applied_date DATE NOT NULL,
    notes TEXT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);