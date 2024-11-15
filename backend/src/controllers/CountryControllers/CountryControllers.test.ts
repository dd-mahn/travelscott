import { Request, Response } from "express";
import Country from "src/models/Country";
import Destination from "src/models/Destination";
import {
  createCountry,
  getCountries,
  getCountryById,
  updateCountry,
  deleteCountry,
  updateCountryImages,
  updateTotalDestinations,
} from "src/controllers/CountryControllers/CountryControllers";
import { sendSuccessResponse, sendErrorResponse } from "src/utils/apiResponse";

// Mock dependencies
jest.mock("src/models/Country");
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

describe("Country Controllers", () => {
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

  describe("createCountry", () => {
    it("should create a country successfully", async () => {
      const countryData = {
        name: "Test Country",
        continent: "Asia",
        description: "Test description",
        capital: "Test Capital",
        population: 1000000,
        currency: "Test Currency",
        language: "Test Language",
        timeZone: "UTC+0",
        images: {
          flagImages: [],
          mapImages: [],
          otherImages: [],
        },
        totalDestinations: 0,
      };

      mockRequest.body = countryData;
      const mockSavedCountry = { ...countryData };
      const saveMock = jest.fn().mockResolvedValue(mockSavedCountry);

      const countryInstance = { ...mockSavedCountry };
      Object.defineProperty(countryInstance, "save", {
        value: saveMock,
        enumerable: false,
      });

      (Country as unknown as jest.Mock).mockImplementation(
        () => countryInstance
      );

      await createCountry(mockRequest as Request, mockResponse as Response);

      expect(Country).toHaveBeenCalledWith(countryData);
      expect(sendSuccessResponse).toHaveBeenCalledWith(
        mockResponse,
        "Country created successfully",
        mockSavedCountry,
        201
      );
    });

    it("should handle errors when creating country", async () => {
      const error = new Error("Database error");
      mockRequest.body = {};
      (Country as unknown as jest.Mock).mockImplementation(() => ({
        save: jest.fn().mockRejectedValue(error),
      }));

      await createCountry(mockRequest as Request, mockResponse as Response);

      expect(sendErrorResponse).toHaveBeenCalledWith(
        mockResponse,
        "Failed to create country",
        500,
        error.message
      );
    });
  });

  describe("getCountries", () => {
    it("should get countries with filters", async () => {
      const mockCountries = [
        { name: "Country 1", continent: "Asia" },
        { name: "Country 2", continent: "Asia" },
      ];
      mockRequest.query = { continent: "Asia" };

      (Country.find as unknown as jest.Mock).mockResolvedValue(mockCountries);
      (Country.countDocuments as unknown as jest.Mock).mockResolvedValue(2);

      await getCountries(mockRequest as Request, mockResponse as Response);

      expect(sendSuccessResponse).toHaveBeenCalledWith(
        mockResponse,
        "Countries retrieved successfully",
        {
          result: mockCountries,
          count: 2,
        }
      );
    });
  });

  describe("getCountryById", () => {
    it("should get a country by id", async () => {
      const mockCountry = { _id: "123", name: "Test Country" };
      mockRequest.params = { id: "123" };

      (Country.findById as unknown as jest.Mock).mockResolvedValue(mockCountry);

      await getCountryById(mockRequest as Request, mockResponse as Response);

      expect(sendSuccessResponse).toHaveBeenCalledWith(
        mockResponse,
        "Country retrieved successfully",
        mockCountry
      );
    });

    it("should handle non-existent country", async () => {
      mockRequest.params = { id: "nonexistent" };
      (Country.findById as unknown as jest.Mock).mockResolvedValue(null);

      await getCountryById(mockRequest as Request, mockResponse as Response);

      expect(sendErrorResponse).toHaveBeenCalledWith(
        mockResponse,
        "Country not found",
        404
      );
    });
  });

  describe("updateCountry", () => {
    it("should update a country successfully", async () => {
      const updateData = {
        name: "Updated Country",
        description: "Updated description",
      };
      mockRequest.params = { id: "123" };
      mockRequest.body = updateData;

      (Country.findByIdAndUpdate as unknown as jest.Mock).mockResolvedValue(
        updateData
      );

      await updateCountry(mockRequest as Request, mockResponse as Response);

      expect(sendSuccessResponse).toHaveBeenCalledWith(
        mockResponse,
        "Country updated successfully",
        updateData
      );
    });
  });

  describe("deleteCountry", () => {
    it("should delete a country successfully", async () => {
      const mockCountry = { _id: "123", name: "Test Country" };
      mockRequest.params = { id: "123" };

      (Country.findByIdAndDelete as unknown as jest.Mock).mockResolvedValue(
        mockCountry
      );

      await deleteCountry(mockRequest as Request, mockResponse as Response);

      expect(sendSuccessResponse).toHaveBeenCalledWith(
        mockResponse,
        "Country deleted successfully",
        mockCountry
      );
    });

    it("should handle non-existent country deletion", async () => {
      mockRequest.params = { id: "nonexistent" };
      (Country.findByIdAndDelete as unknown as jest.Mock).mockResolvedValue(
        null
      );

      await deleteCountry(mockRequest as Request, mockResponse as Response);

      expect(sendErrorResponse).toHaveBeenCalledWith(
        mockResponse,
        "Country not found",
        404
      );
    });
  });

  describe("updateCountryImages", () => {
    it("should update country images successfully", async () => {
      const mockCountry = {
        _id: "123",
        name: "Test Country",
        images: {
          flagImages: [],
          mapImages: [],
          otherImages: [],
        },
        save: jest.fn().mockResolvedValue({
          _id: "123",
          name: "Test Country",
          images: {
            flagImages: ["new-flag-url"],
            mapImages: ["new-map-url"],
            otherImages: ["new-other-url"],
          },
        }),
      };

      mockRequest.params = { id: "123" };
      mockRequest.body = { folderName: "test_folder" };

      (Country.findById as jest.Mock).mockResolvedValue(mockCountry);

      await updateCountryImages(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(sendSuccessResponse).toHaveBeenCalledWith(
        mockResponse,
        "Country images updated successfully",
        expect.objectContaining({
          _id: "123",
          name: "Test Country",
          images: expect.any(Object),
        })
      );
    });
  });

  describe("updateTotalDestinations", () => {
    it("should update total destinations successfully", async () => {
      const mockCountry = {
        _id: "123",
        name: "Test Country",
        save: jest.fn().mockResolvedValue({
          _id: "123",
          name: "Test Country",
          totalDestinations: 5,
        }),
      };
      mockRequest.params = { id: "123" };

      (Country.findById as unknown as jest.Mock).mockResolvedValue(mockCountry);
      (Destination.countDocuments as unknown as jest.Mock).mockResolvedValue(5);

      await updateTotalDestinations(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(sendSuccessResponse).toHaveBeenCalledWith(
        mockResponse,
        "Total destinations updated successfully",
        {
          country: mockCountry.name,
          totalDestinations: 5,
        }
      );
    });
  });
});
