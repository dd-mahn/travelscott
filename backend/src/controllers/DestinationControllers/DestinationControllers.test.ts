import { Request, Response } from "express";
import Destination from "src/models/Destination";
import {
  createDestination,
  getDestinations,
  getSingleDestination,
  updateDestination,
  deleteDestination,
  updateDestinationImages,
  updateDestinationInsight,
} from "src/controllers/DestinationControllers/DestinationControllers";
import { sendSuccessResponse, sendErrorResponse } from "src/utils/apiResponse";

// Mock dependencies
jest.mock("src/models/Destination");
jest.mock("src/utils/apiResponse");
jest.mock("src/utils/logger", () => ({
  default: {
    error: jest.fn(),
    info: jest.fn(),
  },
  logControllerError: jest.fn(),
}));
// Mock filesystem operations
jest.mock("fs", () => ({
  readFileSync: jest.fn().mockReturnValue(Buffer.from("test")),
  readdirSync: jest.fn().mockReturnValue(["test.jpg"]),
}));
jest.mock("src/utils/aws", () => ({
  upload: jest.fn().mockReturnValue({
    promise: jest.fn().mockResolvedValue({
      Location: "https://travelscott.s3.amazonaws.com/test.jpg",
    }),
  }),
}));

describe("Destination Controllers", () => {
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

  describe("createDestination", () => {
    it("should create a destination successfully", async () => {
      const destinationData = {
        name: "Test Destination",
        country: "Test Country",
        description: "Test description",
        images: [],
        tags: ["beach", "mountain"],
        featured: false
      };

      mockRequest.body = destinationData;
      const mockSavedDestination = { ...destinationData };
      const saveMock = jest.fn().mockResolvedValue(mockSavedDestination);

      const destinationInstance = { ...mockSavedDestination };
      Object.defineProperty(destinationInstance, "save", {
        value: saveMock,
        enumerable: false,
      });

      (Destination as unknown as jest.Mock).mockImplementation(
        () => destinationInstance
      );

      await createDestination(mockRequest as Request, mockResponse as Response);

      expect(Destination).toHaveBeenCalledWith(destinationData);
      expect(sendSuccessResponse).toHaveBeenCalledWith(
        mockResponse,
        "Destination created successfully",
        mockSavedDestination,
        201
      );
    });

    it("should handle errors when creating destination", async () => {
      const error = new Error("Database error");
      mockRequest.body = {};
      (Destination as unknown as jest.Mock).mockImplementation(() => ({
        save: jest.fn().mockRejectedValue(error),
      }));

      await createDestination(mockRequest as Request, mockResponse as Response);

      expect(sendErrorResponse).toHaveBeenCalledWith(
        mockResponse,
        "Failed to create destination",
        500,
        error.message
      );
    });
  });

  describe("getDestinations", () => {
    it("should get destinations with filters", async () => {
      const mockDestinations = [
        { name: "Destination 1", country: "Country 1" },
        { name: "Destination 2", country: "Country 2" },
      ];
      mockRequest.query = { 
        countries: "Country 1,Country 2",
        page: "1",
        limit: "10"
      };
  
      (Destination.find as jest.Mock).mockReturnValue({
        skip: jest.fn().mockReturnValue({
          limit: jest.fn().mockResolvedValue(mockDestinations)
        })
      });
      (Destination.countDocuments as jest.Mock).mockResolvedValue(2);
  
      await getDestinations(mockRequest as Request, mockResponse as Response);
  
      expect(sendSuccessResponse).toHaveBeenCalledWith(
        mockResponse,
        "Destinations retrieved successfully",
        {
          result: mockDestinations,
          count: 2,
          page: 1,
          totalPages: 1
        }
      );
    });
  });

  describe("getDestinationById", () => {
    it("should get a destination by id", async () => {
      const mockDestination = { _id: "123", name: "Test Destination" };
      mockRequest.params = { id: "123" };

      (Destination.findById as unknown as jest.Mock).mockResolvedValue(mockDestination);

      await getSingleDestination(mockRequest as Request, mockResponse as Response);

      expect(sendSuccessResponse).toHaveBeenCalledWith(
        mockResponse,
        "Destination retrieved successfully",
        mockDestination
      );
    });

    it("should handle non-existent destination", async () => {
      mockRequest.params = { id: "nonexistent" };
      (Destination.findById as unknown as jest.Mock).mockResolvedValue(null);

      await getSingleDestination(mockRequest as Request, mockResponse as Response);

      expect(sendErrorResponse).toHaveBeenCalledWith(
        mockResponse,
        "Destination not found",
        404
      );
    });
  });

  describe("updateDestination", () => {
    it("should update a destination successfully", async () => {
      const updateData = {
        name: "Updated Destination",
        description: "Updated description",
      };
      mockRequest.params = { id: "123" };
      mockRequest.body = updateData;

      (Destination.findByIdAndUpdate as unknown as jest.Mock).mockResolvedValue(
        updateData
      );

      await updateDestination(mockRequest as Request, mockResponse as Response);

      expect(sendSuccessResponse).toHaveBeenCalledWith(
        mockResponse,
        "Destination updated successfully",
        updateData
      );
    });
  });

  describe("deleteDestination", () => {
    it("should delete a destination successfully", async () => {
      const mockDestination = { _id: "123", name: "Test Destination" };
      mockRequest.params = { id: "123" };
  
      (Destination.findByIdAndDelete as jest.Mock).mockResolvedValue(mockDestination);
  
      await deleteDestination(mockRequest as Request, mockResponse as Response);
  
      expect(sendSuccessResponse).toHaveBeenCalledWith(
        mockResponse,
        "Destination deleted successfully"
      );
    });
  });

  describe("updateDestinationImages", () => {
    it("should update destination images successfully", async () => {
      const mockDestination = {
        _id: "123",
        name: "Test Destination",
        images: [],
        save: jest.fn().mockResolvedValue({
          _id: "123",
          name: "Test Destination",
          images: ["new-image-url"],
        }),
      };

      mockRequest.params = { id: "123" };
      mockRequest.body = { folderName: "test_folder" };

      (Destination.findById as jest.Mock).mockResolvedValue(mockDestination);

      await updateDestinationImages(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(sendSuccessResponse).toHaveBeenCalledWith(
        mockResponse,
        "Destination images updated successfully",
        expect.objectContaining({
          _id: "123",
          name: "Test Destination",
          images: expect.any(Array),
        })
      );
    });
  });

  describe("updateDestinationInsight", () => {
    it("should update destination insight successfully", async () => {
      const mockDestination = {
        _id: "123",
        name: "Test Destination",
        insight: {},
        save: jest.fn().mockResolvedValue({
          _id: "123",
          name: "Test Destination",
          insight: { bestTimeToVisit: "Summer" },
        }),
      };

      mockRequest.params = { id: "123" };
      mockRequest.body = { bestTimeToVisit: "Summer" };

      (Destination.findById as jest.Mock).mockResolvedValue(mockDestination);

      await updateDestinationInsight(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(sendSuccessResponse).toHaveBeenCalledWith(
        mockResponse,
        "Destination insight updated successfully",
        expect.objectContaining({
          bestTimeToVisit: "Summer"
        })
      );
    });
  });
});
