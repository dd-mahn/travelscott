import { Request, Response } from "express";
import Feedback from "src/models/Feedback";
import { sendSuccessResponse, sendErrorResponse } from "src/utils/apiResponse";
import { logControllerError } from "src/utils/logger";

// Create feedback
export const createFeedback = async (req: Request, res: Response) => {
  try {
    const feedback = new Feedback(req.body);
    await feedback.save();
    sendSuccessResponse(res, "Feedback submitted successfully", feedback, 201);
  } catch (error) {
    logControllerError("createFeedback", error);
    if (error instanceof Error) {
      sendErrorResponse(res, "Failed to submit feedback", 500, error.message);
    } else {
      sendErrorResponse(
        res,
        "Failed to submit feedback",
        500,
        "An unknown error occurred"
      );
    }
  }
};

// Get all feedback
export const getFeedback = async (req: Request, res: Response) => {
  try {
    const feedback = await Feedback.find();
    sendSuccessResponse(res, "Feedback retrieved successfully", feedback);
  } catch (error) {
    logControllerError("getFeedback", error);
    if (error instanceof Error) {
      sendErrorResponse(res, "Failed to retrieve feedback", 500, error.message);
    } else {
      sendErrorResponse(
        res,
        "Failed to retrieve feedback",
        500,
        "An unknown error occurred"
      );
    }
  }
};

// Get feedback by ID
export const getFeedbackById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const feedback = await Feedback.findById(id);
    if (!feedback) {
      return sendErrorResponse(res, "Feedback not found", 404);
    }
    sendSuccessResponse(res, "Feedback retrieved successfully", feedback);
  } catch (error) {
    logControllerError("getFeedbackById", error);
    if (error instanceof Error) {
      sendErrorResponse(res, "Failed to retrieve feedback", 500, error.message);
    } else {
      sendErrorResponse(
        res,
        "Failed to retrieve feedback",
        500,
        "An unknown error occurred"
      );
    }
  }
};

// Delete feedback
export const deleteFeedback = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const feedback = await Feedback.findByIdAndDelete(id);
    if (!feedback) {
      return sendErrorResponse(res, "Feedback not found", 404);
    }
    sendSuccessResponse(res, "Feedback deleted successfully");
  } catch (error) {
    logControllerError("deleteFeedback", error);
    if (error instanceof Error) {
      sendErrorResponse(res, "Failed to delete feedback", 500, error.message);
    } else {
      sendErrorResponse(
        res,
        "Failed to delete feedback",
        500,
        "An unknown error occurred"
      );
    }
  }
};
