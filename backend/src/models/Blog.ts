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
  category:{
    type: String,
    default: "",
    required: true,
    enum: ["Wilderness", "Culture&Heritage", "Food&Drink", "SoloJourneys", "CityScape", "Season&Festival", "Relaxation", "FirstTimeAbroad"]
  },
  image: {
    type: String,
    default: "" 
  },
  content: {
    type: Array,
    default: [],
  },
  time: {
    type: Date,
    default: Date.now
  },
  tags: {
    type: [String],
    default: [],
    enum: ["Asia", "Europe", "Africa", "North America", "South America", "Australia", "Antarctica"]
  },
  relatedDestination: {
    type: String,
    default: ""
  },
  featured: {
    type: Boolean,
    default: false,
  },
});

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;
