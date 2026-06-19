import express from "express";
import {
  createApplication,
  deleteApplication,
  getApplicationById,
  getApplications,
  updateApplication,
} from "../controllers/application.controller.js";

const applicationRouter = express.Router();

applicationRouter.get("/get-all-application", getApplications);
applicationRouter.post("/add-application", createApplication);

applicationRouter.get("/:get-application/:id", getApplicationById);
applicationRouter.patch("/update-application/:id", updateApplication);
applicationRouter.delete("/delete-application/:id", deleteApplication);

export default applicationRouter;
