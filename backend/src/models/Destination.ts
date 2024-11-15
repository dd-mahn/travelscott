import mongoose, { Schema, Document } from "mongoose";
import { IDestination as IDestinationBase } from "src/types/destination";

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
    to_stay: [Object],
    to_visit: [Object],
    to_eat: [Object]
  },
  transportation: {
    overview: String,
    types: [Object]
  },
  additionalInfo: {
    whenToVisit: String,
    whoToGoWith: String,
    whatToExpect: String,
    healthAndSafety: String
  },
  tags: {
    type: [String],
    enum: [
      "Wilderness",
      "Culture&Heritage",
      "FoodLovers",
      "SoloJourneys",
      "CityScape",
      "Season&Festival",
      "Relaxation",
      "FirstTimeAbroad",
    ]
  },
  insight: {
    from_us: {
      tips: [String],
      article: [{
        title: String,
        id: String
      }]
    },
    from_others: [{
      title: String,
      link: String
    }]
  },
  summary: { type: String, default: "" },
  featured: { type: Boolean, default: false },
});

export default mongoose.model<IDestination>("Destination", destinationSchema);
