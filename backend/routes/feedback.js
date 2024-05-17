import express from "express";
import { createFeedback, deleteFeedback, getFeedback, getFeedbackById } from "../controllers/FeedbackControllers.js";

const router = express.Router();

router.post("/", createFeedback);
router.get("/", getFeedback);
router.get("/:id", getFeedbackById);
router.delete("/:id", deleteFeedback);

export default router;
