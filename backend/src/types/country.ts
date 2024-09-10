export interface CountryAdditionalInfo {
  whenToVisit: string[];
  transportation: string[];
  healthAndSafety: string[];
}

export interface CountryImages {
  flagImages: string[];
  mapImages: string[];
  otherImages: string[];
}

export interface ICountry {
  name: string;
  images: CountryImages;
  description: string[];
  capital: string;
  continent: string;
  currency: string;
  language: string;
  visaRequirement: string;
  dialInCode: string;
  timeZone: string;
  additionalInfo: CountryAdditionalInfo;
  totalDestinations: number;
}
