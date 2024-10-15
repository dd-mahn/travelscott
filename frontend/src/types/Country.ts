// Define a type for country images with optional arrays of strings
type CountryImages = {
  flagImages?: string[];
  mapImages?: string[];
  otherImages?: string[];
}

// Define a type for additional information about the country with optional strings
type CountryAdditionalInfo = {
  whenToVisit?: string;
  transportation?: string;
  healthAndSafety?: string;
}

// Define an interface for the Country object
interface Country {
  _id: string; // Unique identifier for the country
  name: string; // Name of the country
  images: CountryImages; // Images related to the country
  description: string[]; // Description of the country
  capital: string; // Capital city of the country
  continent: string; // Continent where the country is located
  currency: string; // Currency used in the country
  language: string; // Official language of the country
  visaRequirement: string; // Visa requirements for visiting the country
  dialInCode: string; // Dial-in code for the country
  timeZone: string; // Time zone of the country
  additionalInfo: CountryAdditionalInfo; // Additional information about the country
  totalDestinations: number; // Total number of destinations in the country
}

export default Country;
