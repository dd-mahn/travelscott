import { Request, Response } from "express";
import Blog from "../models/Blog";
import { sendSuccessResponse, sendErrorResponse } from "../utils/apiResponse";
import { blogContent, updateData } from "../types/blog";

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;

export const createBlog = async (req: Request, res: Response) => {
  try {
    const blog = new Blog(req.body);
    await blog.save();
    sendSuccessResponse(res, "Blog created successfully", blog, 201);
  } catch (error: unknown) {
    console.error(error);
    if (error instanceof Error) {
      sendErrorResponse(res, "Failed to create blog", 500, error.message);
    } else {
      sendErrorResponse(
        res,
        "Failed to create blog",
        500,
        "An unknown error occurred"
      );
    }
  }
};

export const getBlogs = async (req: Request, res: Response) => {
  try {
    const {
      page = DEFAULT_PAGE.toString(),
      limit = DEFAULT_LIMIT.toString(),
      category,
      tags,
      searchQuery,
    } = req.query as { [key: string]: string };

    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);
    const skip = (pageNumber - 1) * limitNumber;

    const queryCondition: any = {};
    if (category) queryCondition.category = category;
    if (tags) queryCondition.tags = { $in: tags.split(",") };
    if (searchQuery) {
      const regex = new RegExp(searchQuery, "i");
      queryCondition.$or = [
        { title: regex },
        { author: regex },
        { category: regex },
        { tags: regex },
      ];
    }

    const [blogs, count] = await Promise.all([
      Blog.find(queryCondition).skip(skip).limit(limitNumber),
      Blog.countDocuments(queryCondition),
    ]);

    const totalPages = Math.ceil(count / limitNumber);

    sendSuccessResponse(res, "Blogs retrieved successfully", {
      result: blogs,
      count,
      page: pageNumber,
      totalPages,
    });
  } catch (error: unknown) {
    console.error(error);
    if (error instanceof Error) {
      sendErrorResponse(res, "Failed to retrieve blogs", 500, error.message);
    } else {
      sendErrorResponse(
        res,
        "Failed to retrieve blogs",
        500,
        "An unknown error occurred"
      );
    }
  }
};

export const getBlogById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id);
    if (!blog) {
      return sendErrorResponse(res, "Blog not found", 404);
    }
    sendSuccessResponse(res, "Blog retrieved successfully", blog);
  } catch (error: unknown) {
    console.error(error);
    if (error instanceof Error) {
      sendErrorResponse(res, "Failed to retrieve blog", 500, error.message);
    } else {
      sendErrorResponse(
        res,
        "Failed to retrieve blog",
        500,
        "An unknown error occurred"
      );
    }
  }
};

export const updateBlog = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateData: updateData = req.body;

    if (updateData.content && !isValidContent(updateData.content)) {
      return sendErrorResponse(res, "Invalid content structure.", 400);
    }

    const blog = await Blog.findByIdAndUpdate(id, updateData, { new: true });
    if (!blog) {
      return sendErrorResponse(res, "Blog not found", 404);
    }
    sendSuccessResponse(res, "Blog updated successfully", blog);
  } catch (error: unknown) {
    console.error(error);
    if (error instanceof Error) {
      sendErrorResponse(res, "Failed to update blog", 500, error.message);
    } else {
      sendErrorResponse(
        res,
        "Failed to update blog",
        500,
        "An unknown error occurred"
      );
    }
  }
};

export const deleteBlog = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findByIdAndDelete(id);
    if (!blog) {
      return sendErrorResponse(res, "Blog not found", 404);
    }
    sendSuccessResponse(res, "Blog deleted successfully");
  } catch (error: unknown) {
    console.error(error);
    if (error instanceof Error) {
      sendErrorResponse(res, "Failed to delete blog", 500, error.message);
    } else {
      sendErrorResponse(
        res,
        "Failed to delete blog",
        500,
        "An unknown error occurred"
      );
    }
  }
};

function isValidContent(content: any): content is blogContent[] {
  if (!Array.isArray(content)) return false;
  return content.every(
    (item) =>
      typeof item.sectionTitle === "string" &&
      Array.isArray(item.sectionImages) &&
      Array.isArray(item.sectionText)
  );
}
