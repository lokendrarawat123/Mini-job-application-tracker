import express from "express";
import dotenv from "dotenv";

import cors from "cors";
import db from "./config/db_connect.js";
dotenv.config();
const app = express();
app.use(express.json()); //it is use for the  the  json

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
  }),
);
const port = process.env.PORT;

try {
  db.connect();

  console.log("connected to database");
} catch (error) {
  console.log("database connection failed" + error);
}
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
