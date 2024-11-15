import { Request, Response } from "express";
import Blog from "src/models/Blog";
import { createBlog, getBlogs, getBlogById, updateBlog, deleteBlog } from "src/controllers/BlogControllers/BlogControllers";
import { sendSuccessResponse, sendErrorResponse } from "src/utils/apiResponse";

// Mock dependencies
jest.mock("src/models/Blog");
jest.mock("src/utils/apiResponse");
jest.mock("src/utils/logger", () => ({
  default: {
    error: jest.fn(),
    info: jest.fn(),
  },
  logControllerError: jest.fn(),
}));

describe("Blog Controllers", () => {
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

  describe("createBlog", () => {
    it("should create a blog successfully", async () => {
      const blogData = {
        title: "Test Blog",
        author: "Test Author",
        category: "Wilderness",
        image: "",
        content: [
          {
            sectionTitle: "Test Section",
            sectionImages: [{
              url: "image1.jpg",
              description: ""
            }],
            sectionText: ["Test text"]
          }
        ],
        time: "",
        tags: [],
        related_destination: "",
        featured: false
      };
      
      mockRequest.body = blogData;
      const mockSavedBlog = { ...blogData };
      const saveMock = jest.fn().mockResolvedValue(mockSavedBlog);
      
      // Create a blog instance mock without including save in the returned object
      const blogInstance = { ...mockSavedBlog };
      Object.defineProperty(blogInstance, 'save', {
        value: saveMock,
        enumerable: false // This prevents save from appearing in the object spread
      });
      
      (Blog as unknown as jest.Mock).mockImplementation(() => blogInstance);

      await createBlog(mockRequest as Request, mockResponse as Response);

      expect(Blog).toHaveBeenCalledWith(blogData);
      expect(sendSuccessResponse).toHaveBeenCalledWith(
        mockResponse,
        "Blog created successfully",
        mockSavedBlog,
        201
      );
    });

    it("should handle errors when creating blog", async () => {
      const error = new Error("Database error");
      mockRequest.body = {};
      (Blog as unknown as jest.Mock).mockImplementation(() => ({
        save: jest.fn().mockRejectedValue(error)
      }));

      await createBlog(mockRequest as Request, mockResponse as Response);

      expect(sendErrorResponse).toHaveBeenCalledWith(
        mockResponse,
        "Failed to create blog",
        500,
        error.message
      );
    });
  });

  describe("getBlogs", () => {
    it("should get blogs with pagination", async () => {
      const mockBlogs = [{ title: "Blog 1" }, { title: "Blog 2" }];
      mockRequest.query = { page: "1", limit: "10" };
      
      (Blog.find as unknown as jest.Mock).mockReturnValue({
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockResolvedValue(mockBlogs)
      });
      (Blog.countDocuments as unknown as jest.Mock).mockResolvedValue(2);

      await getBlogs(mockRequest as Request, mockResponse as Response);

      expect(sendSuccessResponse).toHaveBeenCalledWith(
        mockResponse,
        "Blogs retrieved successfully",
        {
          result: mockBlogs,
          count: 2,
          page: 1,
          totalPages: 1
        }
      );
    });
  });

  describe("getBlogById", () => {
    it("should get a blog by id", async () => {
      const mockBlog = { _id: "123", title: "Test Blog" };
      mockRequest.params = { id: "123" };
      
      (Blog.findById as unknown as jest.Mock).mockResolvedValue(mockBlog);

      await getBlogById(mockRequest as Request, mockResponse as Response);

      expect(sendSuccessResponse).toHaveBeenCalledWith(
        mockResponse,
        "Blog retrieved successfully",
        mockBlog
      );
    });

    it("should handle non-existent blog", async () => {
      mockRequest.params = { id: "nonexistent" };
      (Blog.findById as unknown as jest.Mock).mockResolvedValue(null);

      await getBlogById(mockRequest as Request, mockResponse as Response);

      expect(sendErrorResponse).toHaveBeenCalledWith(
        mockResponse,
        "Blog not found",
        404
      );
    });
  });

  describe("updateBlog", () => {
    it("should update a blog successfully", async () => {
      const updateData = {
        title: "Updated Blog",
        content: [{
          sectionTitle: "Updated Section",
          sectionImages: ["new-image.jpg"],
          sectionText: ["Updated text"]
        }]
      };
      mockRequest.params = { id: "123" };
      mockRequest.body = updateData;
      
      (Blog.findByIdAndUpdate as unknown as jest.Mock).mockResolvedValue(updateData);

      await updateBlog(mockRequest as Request, mockResponse as Response);

      expect(sendSuccessResponse).toHaveBeenCalledWith(
        mockResponse,
        "Blog updated successfully",
        updateData
      );
    });
  });

  describe("deleteBlog", () => {
    it("should delete a blog successfully", async () => {
      const mockBlog = { _id: "123", title: "Test Blog" };
      mockRequest.params = { id: "123" };
      
      (Blog.findByIdAndDelete as unknown as jest.Mock).mockResolvedValue(mockBlog);

      await deleteBlog(mockRequest as Request, mockResponse as Response);

      expect(sendSuccessResponse).toHaveBeenCalledWith(
        mockResponse,
        "Blog deleted successfully"
      );
    });

    it("should handle non-existent blog deletion", async () => {
      mockRequest.params = { id: "nonexistent" };
      (Blog.findByIdAndDelete as unknown as jest.Mock).mockResolvedValue(null);

      await deleteBlog(mockRequest as Request, mockResponse as Response);

      expect(sendErrorResponse).toHaveBeenCalledWith(
        mockResponse,
        "Blog not found",
        404
      );
    });
  });
});
