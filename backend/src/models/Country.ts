import mongoose from "mongoose";

const countrySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  images: {
    type: Object,
    default: { flagImages: [], mapImages: [], otherImages: [] },
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
