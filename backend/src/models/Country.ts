import mongoose from "mongoose";
import { setFlagsFromString } from "v8";

const countrySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  images: {
    type: Object,
    default: { _dummy: null },
  },
  description: {
    type: String,
    default: "",
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
    default: { _dummy: null },
  },
  totalDestinations: {
    type: Number,
    default: 0,
  },
});

const Country = mongoose.model("Country", countrySchema);

export default Country;
