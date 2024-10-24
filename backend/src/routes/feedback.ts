import express from "express";
import * as feedbackController from "src/controllers/FeedbackControllers/FeedbackControllers";
import { validateRequest } from "src/utils/validation/validationMiddleware";
import { feedbackSchema } from "src/utils/validation/validationSchemas";

const router = express.Router();

router.post("/", validateRequest(feedbackSchema), feedbackController.createFeedback);
router.get("/", feedbackController.getFeedback);
router.get("/:id", feedbackController.getFeedbackById);
router.delete("/:id", feedbackController.deleteFeedback);

export default router;
