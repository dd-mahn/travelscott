import express from "express";
import * as feedbackController from "../controllers/FeedbackControllers";
import { validateRequest } from "../utils/validationMiddleware";
import { feedbackSchema } from "../utils/validationSchemas";

const router = express.Router();

router.post("/", validateRequest(feedbackSchema), feedbackController.createFeedback);
router.get("/", feedbackController.getFeedback);
router.get("/:id", feedbackController.getFeedbackById);
router.delete("/:id", feedbackController.deleteFeedback);

export default router;
