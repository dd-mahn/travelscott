import Feedback from "../models/Feedback.js";

// Create feedback
export const createFeedback = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const feedback = new Feedback({ name, email, message });
    await feedback.save();
    res.status(201).json(feedback);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all feedback
export const getFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.find();
    res.status(200).json(feedback);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get feedback by ID
export const getFeedbackById = async (req, res) => {
  try {
    const { id } = req.params;
    const feedback = await Feedback.findById(id);
    if (feedback) {
      res.status(200).json(feedback);
    } else {
      res.status(404).json({ message: "Feedback not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete feedback
export const deleteFeedback = async (req, res) => {
  try {
    const { id } = req.params;
    const feedback = await Feedback.findByIdAndDelete(id);
    if (feedback) {
      res.status(200).json({ message: "Feedback deleted successfully" });
    } else {
      res.status(404).json({ message: "Feedback not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
