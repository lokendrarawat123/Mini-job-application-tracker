import express from "express";
import {
  createApplication,
  deleteApplication,
  getApplicationById,
  getApplications,
  updateApplication,
} from "../controllers/application.controller.js";

const applicationRouter = express.Router();

// Routes handling /applications
applicationRouter.get("/get-all-application", getApplications);
applicationRouter.post("/add-application", createApplication);

// Routes handling /applications/:id
applicationRouter.get("/:get-application/:id", getApplicationById);
applicationRouter.patch("/update-application/:id", updateApplication);
applicationRouter.delete("/delete-application/:id", deleteApplication);

export default applicationRouter;
