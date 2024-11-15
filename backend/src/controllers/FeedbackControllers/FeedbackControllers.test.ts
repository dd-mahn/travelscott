import { Request, Response } from "express";
import Feedback from "src/models/Feedback";
import {
  createFeedback,
  getFeedback,
  getFeedbackById,
  deleteFeedback,
} from "src/controllers/FeedbackControllers/FeedbackControllers";
import { sendSuccessResponse, sendErrorResponse } from "src/utils/apiResponse";

// Mock dependencies
jest.mock("src/models/Feedback");
jest.mock("src/utils/apiResponse");
jest.mock("src/utils/logger", () => ({
  default: {
    error: jest.fn(),
    info: jest.fn(),
  },
  logControllerError: jest.fn(),
}));

describe("Feedback Controllers", () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    jest.clearAllMocks();
  });

  describe("createFeedback", () => {
    it("should create feedback successfully", async () => {
      const feedbackData = {
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        message: "Test feedback"
      };

      mockRequest.body = feedbackData;
      const mockSavedFeedback = { _id: "1", ...feedbackData };
      const saveMock = jest.fn().mockResolvedValue(mockSavedFeedback);

      const feedbackInstance = { ...mockSavedFeedback };
      Object.defineProperty(feedbackInstance, "save", {
        value: saveMock,
        enumerable: false,
      });

      (Feedback as unknown as jest.Mock).mockImplementation(
        () => feedbackInstance
      );

      await createFeedback(mockRequest as Request, mockResponse as Response);

      expect(Feedback).toHaveBeenCalledWith(feedbackData);
      expect(sendSuccessResponse).toHaveBeenCalledWith(
        mockResponse,
        "Feedback submitted successfully",
        mockSavedFeedback,
        201
      );
    });

    it("should handle errors when creating feedback", async () => {
      const error = new Error("Database error");
      mockRequest.body = {};
      (Feedback as unknown as jest.Mock).mockImplementation(() => ({
        save: jest.fn().mockRejectedValue(error),
      }));

      await createFeedback(mockRequest as Request, mockResponse as Response);

      expect(sendErrorResponse).toHaveBeenCalledWith(
        mockResponse,
        "Failed to submit feedback",
        500,
        error.message
      );
    });
  });

  describe("getFeedback", () => {
    it("should get all feedback successfully", async () => {
      const mockFeedbacks = [
        { _id: "1", firstName: "John", lastName: "Doe", email: "john@example.com", message: "Feedback 1" },
        { _id: "2", firstName: "Jane", lastName: "Doe", email: "jane@example.com", message: "Feedback 2" }
      ];

      (Feedback.find as jest.Mock).mockResolvedValue(mockFeedbacks);

      await getFeedback(mockRequest as Request, mockResponse as Response);

      expect(sendSuccessResponse).toHaveBeenCalledWith(
        mockResponse,
        "Feedback retrieved successfully",
        mockFeedbacks
      );
    });
  });

  describe("getFeedbackById", () => {
    it("should get a feedback by id", async () => {
      const mockFeedback = { _id: "123", firstName: "John", lastName: "Doe", message: "Test feedback" };
      mockRequest.params = { id: "123" };

      (Feedback.findById as jest.Mock).mockResolvedValue(mockFeedback);

      await getFeedbackById(mockRequest as Request, mockResponse as Response);

      expect(sendSuccessResponse).toHaveBeenCalledWith(
        mockResponse,
        "Feedback retrieved successfully",
        mockFeedback
      );
    });

    it("should handle non-existent feedback", async () => {
      mockRequest.params = { id: "nonexistent" };
      (Feedback.findById as jest.Mock).mockResolvedValue(null);

      await getFeedbackById(mockRequest as Request, mockResponse as Response);

      expect(sendErrorResponse).toHaveBeenCalledWith(
        mockResponse,
        "Feedback not found",
        404
      );
    });
  });

  describe("deleteFeedback", () => {
    it("should delete a feedback successfully", async () => {
      const mockFeedback = { _id: "123", firstName: "John", lastName: "Doe" };
      mockRequest.params = { id: "123" };

      (Feedback.findByIdAndDelete as jest.Mock).mockResolvedValue(mockFeedback);

      await deleteFeedback(mockRequest as Request, mockResponse as Response);

      expect(sendSuccessResponse).toHaveBeenCalledWith(
        mockResponse,
        "Feedback deleted successfully"
      );
    });

    it("should handle non-existent feedback", async () => {
      mockRequest.params = { id: "nonexistent" };
      (Feedback.findByIdAndDelete as jest.Mock).mockResolvedValue(null);

      await deleteFeedback(mockRequest as Request, mockResponse as Response);

      expect(sendErrorResponse).toHaveBeenCalledWith(
        mockResponse,
        "Feedback not found",
        404
      );
    });
  });
});
