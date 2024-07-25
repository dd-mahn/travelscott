import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
  flagImages: {
    type: [String],
    default: [],
  },
  mapImages: {
    type: [String],
    default: [],
  },
  otherImages: {
    type: [String],
    default: [],
  },
});

const countrySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  images: {
    type: imageSchema,
    default: () => ({}),
  },
  description: {
    type: Array,
    default: [],
  },
  capital: {
    type: String,
    default: "",
  },
  continent: {
    type: String,
    default: "",
    enum: [
      "Africa",
      "Antarctica",
      "Asia",
      "Europe",
      "North America",
      "Oceania",
      "South America",
    ],
  },
  currency: {
    type: String,
    default: "",
  },
  language: {
    type: String,
    default: "",
  },
  visaRequirement: {
    type: String,
    default: "",
  },
  dialInCode: {
    type: String,
    default: "",
  },
  timeZone: {
    type: String,
    default: "",
  },
  additionalInfo: {
    type: Object,
    default: { 
      whenToVisit: [],
      transportation: [],
      healthAndSafety: [],
     },
  },
  totalDestinations: {
    type: Number,
    default: 0,
  },
});

const Country = mongoose.model("Country", countrySchema);

export default Country;
