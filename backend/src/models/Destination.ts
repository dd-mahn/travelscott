import mongoose from "mongoose";

const destinationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  video: {
    type: String,
    default: "",
  },
  images: {
    type: [],
    default: [],
  },
  country: {
    type: String,
    default: "",
  },
  continent: {
    type: String,
    default: "",
  },
  location: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    default: "",
  },
  places: {
    type: Object,
    default: { to_stay: [], to_visit: [], to_eat: [] },
  },
  transportation: {
    type: Object,
    default: { overview: "", types: [] },
  },
  additionalInfo: {
    type: Object,
    default: {
      whenToVisit: "",
      whoToGoWith: "",
      whatToExpect: "",
      healthAndSafety: "",
    },
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
    ],
  },
  insight: {
    type: Object,
    default: { fromUs: [], fromOthers: [] },
  },
  summary: {
    type: String,
    default: "",
  },
  featured: {
    type: Boolean,
    default: false,
  },
});

const Destination = mongoose.model("Destination", destinationSchema);

export default Destination;
