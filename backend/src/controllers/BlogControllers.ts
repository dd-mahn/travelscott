import { Request, Response } from "express";
import Blog from "src/models/Blog";
import blogContent from "src/types/blogContent";

type contentType = blogContent[];

function isValidContent(content: any): content is contentType {
  // Check if content is an array
  if (!Array.isArray(content)) {
    return false;
  }

  return content.every((item) => {
    return (
      typeof item.sectionTitle === "string" &&
      (!item.sectionImage ||
        (item.sectionImage && Array.isArray(item.sectionImages))) &&
        Array.isArray(item.sectionText)
    );
  });
}

interface updateData {
  title?: string;
  author?: string;
  image?: string;
  content?: contentType;
  featured?: boolean;
}

const DEFAULT_PAGE = "1";
const DEFAULT_LIMIT = "10";

// Create blog
interface createBlogRequest {
  title: string;
  author: string;
  image?: string;
  content?: contentType;
  featured?: boolean;
}

export const createBlog = async (req: Request, res: Response) => {
  try {
    const newBlog: createBlogRequest = req.body;

    // Validate input
    if (!newBlog.title || !newBlog.author) {
      return res.status(400).json({ message: "Some fields are missing." });
    }

    // Validate content type
    if (newBlog.content && !isValidContent(newBlog.content)) {
      return res.status(400).json({ message: "Invalid content structure." });
    }

    const blog = new Blog(newBlog);
    await blog.save();
    res.status(201).json(blog);
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

// Get all blogs
export const getBlogs = async (req: Request, res: Response) => {
  try {
    const {
      page = DEFAULT_PAGE,
      pageSize = DEFAULT_LIMIT,
    }: { page?: string; pageSize?: string } = req.query;

    const pageNumber = parseInt(page);
    const limitNumber = parseInt(pageSize);

    const skip = (pageNumber - 1) * limitNumber;

    const blogsPromise = Blog.find().skip(skip).limit(limitNumber);
    const countPromise = Blog.countDocuments();

    const [blogs, count] = await Promise.all([blogsPromise, countPromise]);
    const totalPages = Math.ceil(count / limitNumber);

    res.status(200).json({
      result: blogs,
      count,
      page: pageNumber,
      totalPages,
    });
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res
        .status(500)
        .json({ message: "An error occurred while processing your request." });
    }
  }
};

// Get blog by ID
export const getBlogById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found." });
    }
    res.status(200).json(blog);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while processing your request." });
  }
};

// Update blog
export const updateBlog = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateData: updateData = {};

    // Dynamically add fields to updateData if they are provided in the request body
    const fieldsToUpdate = ["title", "author", "image", "content", "featured"];
    fieldsToUpdate.forEach((field) => {
      if (req.body[field] !== undefined) {
        updateData[field] = req.body[field];
      }
    });

    // Validate content type if content is being updated
    if (updateData.content && !isValidContent(updateData.content)) {
      return res.status(400).json({ message: "Invalid content structure." });
    }

    const blog = await Blog.findByIdAndUpdate(id, updateData, { new: true });
    if (!blog) {
      return res.status(404).json({ message: "Blog not found." });
    }
    res.status(200).json(blog);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while processing your request." });
  }
};

// Delete blog
export const deleteBlog = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findByIdAndDelete(id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found." });
    }
    res.status(200).json(blog);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while processing your request." });
  }
};
