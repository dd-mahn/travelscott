import mongoose, { Schema, Document } from "mongoose";
import { ICountry as ICountryBase } from "src/types/country";

export interface ICountry extends ICountryBase, Document {}

const countrySchema: Schema = new Schema({
  name: { type: String, required: true },
  images: {
    type: {
      flagImages: [String],
      mapImages: [String],
      otherImages: [String]
    },
    default: { flagImages: [], mapImages: [], otherImages: [] }
  },
  description: { type: [String], default: [] },
  capital: { type: String, default: "" },
  continent: {
    type: String,
    enum: [
      "Africa",
      "Antarctica",
      "Asia",
      "Europe",
      "North America",
      "Oceania",
      "South America",
    ],
    default: ""
  },
  currency: { type: String, default: "" },
  language: { type: String, default: "" },
  visaRequirement: { type: String, default: "" },
  dialInCode: { type: String, default: "" },
  timeZone: { type: String, default: "" },
  additionalInfo: {
    type: {
      whenToVisit: [String],
      transportation: [String],
      healthAndSafety: [String],
    },
    default: { whenToVisit: [], transportation: [], healthAndSafety: [] }
  },
  totalDestinations: { type: Number, default: 0 },
});

export default mongoose.model<ICountry>("Country", countrySchema);
