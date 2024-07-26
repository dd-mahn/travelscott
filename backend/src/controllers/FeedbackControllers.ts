import { Request, Response } from "express";
import Feedback from "src/models/Feedback";

// Create feedback
export const createFeedback = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, age, country, message } = req.body;

    // Validate input
    if (!firstName || !lastName || !age || !country || !email || !message) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const feedback = new Feedback({ firstName, lastName, email, age, country, message });
    await feedback.save();
    res.status(201).json(feedback);
  } catch (error) {
    console.error(error); // log the error details on the server
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res
        .status(500)
        .json({ message: "An error occurred while processing your request." });
    }
  }
};

// Get all feedback
export const getFeedback = async (req: Request, res: Response) => {
  try {
    const feedback = await Feedback.find();
    res.status(200).json(feedback);
  } catch (error) {
    console.error(error); // log the error details on the server
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res
        .status(500)
        .json({ message: "An error occurred while processing your request." });
    }
  }
};

// Get feedback by ID
export const getFeedbackById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const feedback = await Feedback.findById(id);

    if (!feedback) {
      return res.status(404).json({ message: "Feedback not found." });
    }

    res.status(200).json(feedback);
  } catch (error) {
    console.error(error); // log the error details on the server
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res
        .status(500)
        .json({ message: "An error occurred while processing your request." });
    }
  }
};

// Delete feedback
export const deleteFeedback = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const feedback = await Feedback.findByIdAndDelete(id);
    if (feedback) {
      res.status(200).json({ message: "Feedback deleted successfully" });
    } else {
      res.status(404).json({ message: "Feedback not found" });
    }
  } catch (error) {
    console.error(error); // log the error details on the server
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res
        .status(500)
        .json({ message: "An error occurred while processing your request." });
    }
  }
};
