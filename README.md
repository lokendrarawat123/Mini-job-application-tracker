# Mini Job Application Tracker

A full-stack web app to track your job applications — add, update, filter, and delete applications with ease.

---

## Project Overview

Mini Job Application Tracker lets you manage all your job applications in one place. You can track the status of each application (Applied, Interviewing, Offer, Rejected), filter by status or search by company/job title, and keep notes for each application.

---

## Tech Stack

**Frontend**

- React 19
- Vite
- Tailwind CSS v4
- Redux Toolkit + React Redux
- React Router DOM v7
- React Toastify
- Lucide React

**Backend**

- Node.js
- Express v5
- MySQL2
- dotenv
- CORS
- Nodemon (dev)

---

## Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) v18+
- [MySQL](https://www.mysql.com/) v8+
- npm

---

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/lokendrarawat123/Mini-job-application-tracker.git
cd "Mini job application tracker"
```

### 2. Setup the database

Open MySQL and run the following SQL to create the database and table:

```sql
CREATE DATABASE jobtracker;

USE jobtracker;

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
```

### 3. Setup the backend

```bash
cd backend
npm install
```

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

### 4. Setup the frontend

```bash
cd ../frontend
npm install
```

---

## Environment Variables

Create a `.env` file inside the `backend/` folder based on `.env.example`:

| Variable         | Description             | Example        |
| ---------------- | ----------------------- | -------------- |
| `PORT`           | Port the server runs on | `5000`         |
| `MYSQL_HOST`     | MySQL host              | `localhost`    |
| `MYSQL_USER`     | MySQL username          | `root`         |
| `MYSQL_PASSWORD` | MySQL password          | `yourpassword` |
| `MYSQL_DATABASE` | MySQL database name     | `jobtracker`   |

---

## How to Run in Development Mode

### Backend

```bash
cd backend
npm run dev
```

Server runs at: `http://localhost:5000`

### Frontend

```bash
cd frontend
npm run dev
```

Frontend runs at: `http://localhost:5173`

---

## How to Run Tests

No tests are currently included in this project.

---

## API Documentation

Base URL: `http://localhost:5000/api/application`

| Method   | Endpoint                  | Description                                                            |
| -------- | ------------------------- | ---------------------------------------------------------------------- |
| `GET`    | `/get-all-application`    | Get all applications (supports `?status=` and `?search=` query params) |
| `POST`   | `/add-application`        | Create a new application                                               |
| `GET`    | `/:get-application/:id`   | Get a single application by ID                                         |
| `PATCH`  | `/update-application/:id` | Update an application by ID                                            |
| `DELETE` | `/delete-application/:id` | Delete an application by ID                                            |

### Query Parameters for GET `/get-all-application`

| Param    | Type   | Description                                                      |
| -------- | ------ | ---------------------------------------------------------------- |
| `status` | string | Filter by status: `applied`, `interviewing`, `offer`, `rejected` |
| `search` | string | Search by company name or job title                              |

### Request Body for POST `/add-application` and PATCH `/update-application/:id`

```json
{
  "company_name": "Google",
  "job_title": "Frontend Developer",
  "job_type": "full-time",
  "status": "applied",
  "applied_date": "2025-07-01",
  "notes": "Applied via LinkedIn"
}
```

**Valid values:**

- `job_type`: `internship`, `full-time`, `part-time`
- `status`: `applied`, `interviewing`, `offer`, `rejected`
