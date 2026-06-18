import express from "express";
import {
  getApplications,
  getApplicationById,
  createApplication,
  updateApplication,
  deleteApplication,
} from "../controllers/applicationController.js";

const applicationRouter = express.Router();

// Routes handling /applications
applicationRouter.route("/").get(getApplications).post(createApplication);

// Routes handling /applications/:id
router
  .route("/:id")
  .get(getApplicationById)
  .patch(updateApplication)
  .delete(deleteApplication);

export default router;
