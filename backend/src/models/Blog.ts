import mongoose, { Schema, Document } from "mongoose";
import { IBlog as IBlogBase } from "../types/blog";
import { getCurrentDate } from "../utils/getCurrentDate";

export interface IBlog extends IBlogBase, Document {}

const blogSchema: Schema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  category: {
    type: String,
    required: true,
    enum: [
      "Wilderness",
      "Culture&Heritage",
      "Food&Drink",
      "SoloJourneys",
      "CityScape",
      "Season&Festival",
      "Relaxation",
      "FirstTimeAbroad",
    ],
  },
  image: { type: String, default: "" },
  content: { type: [Object], default: [] },
  time: { type: String, default: getCurrentDate },
  tags: { type: [String], default: [] },
  related_destination: { type: String, default: "" },
  featured: { type: Boolean, default: false },
});

export default mongoose.model<IBlog>("Blog", blogSchema);
