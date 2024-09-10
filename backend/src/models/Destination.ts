import mongoose, { Schema, Document } from "mongoose";
import { IDestination as IDestinationBase } from "../types/destination";

export interface IDestination extends IDestinationBase, Document {}

const destinationSchema: Schema = new Schema({
  name: { type: String, required: true },
  video: { type: String, default: "" },
  images: { type: [String], default: [] },
  country: { type: String, default: "" },
  continent: { type: String, default: "" },
  location: { type: String, default: "" },
  description: { type: String, default: "" },
  places: {
    type: {
      to_stay: [String],
      to_visit: [String],
      to_eat: [String]
    },
    default: { to_stay: [], to_visit: [], to_eat: [] }
  },
  transportation: {
    type: {
      overview: String,
      types: [String]
    },
    default: { overview: "", types: [] }
  },
  additionalInfo: {
    type: {
      whenToVisit: String,
      whoToGoWith: String,
      whatToExpect: String,
      healthAndSafety: String
    },
    default: {
      whenToVisit: "",
      whoToGoWith: "",
      whatToExpect: "",
      healthAndSafety: ""
    }
  },
  tags: {
    type: [String],
    default: [],
    enum: [
      "Wilderness",
      "Culture&Heritage",
      "Food&Drink",
      "SoloJourneys",
      "CityScape",
      "Season&Festival",
      "Relaxation",
      "FirstTimeAbroad",
    ]
  },
  insight: {
    type: {
      fromUs: [String],
      fromOthers: [String]
    },
    default: { fromUs: [], fromOthers: [] }
  },
  summary: { type: String, default: "" },
  featured: { type: Boolean, default: false },
});

export default mongoose.model<IDestination>("Destination", destinationSchema);
