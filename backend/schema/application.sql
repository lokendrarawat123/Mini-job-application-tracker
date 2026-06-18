CREATE TABLE applications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    company_name VARCHAR(255) NOT NULL,
    job_title VARCHAR(255) NOT NULL,
    job_type ENUM('Internship', 'Full-time', 'Part-time') NOT NULL,
    status ENUM('Applied', 'Interviewing', 'Offer', 'Rejected') NOT NULL DEFAULT 'Applied',
    applied_date DATE NOT NULL,
    notes TEXT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);