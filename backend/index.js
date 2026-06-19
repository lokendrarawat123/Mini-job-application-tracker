import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import db from "./config/db_connect.js";
import applicationRouter from "./routes/application.routes.js";
import { initializeDatabase } from "./config/init_db.js"; // for production

dotenv.config();
const app = express();
app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
  }),
);

const port = process.env.PORT || 5000;

app.use("/api/application", applicationRouter);

const startServer = async () => {
  try {
    await db.connect();
    console.log("connected to database");

    await initializeDatabase();

    app.listen(port, () => {
      console.log(`server is running on port ${port}`);
    });
  } catch (error) {
    console.log("database connection failed: " + error);
  }
};

startServer();
