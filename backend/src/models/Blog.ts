import mongoose from "mongoose";
import blogContent from "src/types/blogContent";

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: "" 
  },
  content: {
    type: Array,
    default: [],
  },
  featured: {
    type: Boolean,
    default: false,
  },
});

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;
