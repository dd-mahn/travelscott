type countryImages = {
  flagImages?: string[];
  mapImages?: string[];
  otherImages?: string[];
}

type countryAdditionalInfo = {
  whenToVisit?: string;
  transportation?: string;
  healthAndSafety?: string;
}

interface Country{
    _id: string;
    name: string;
    images: countryImages;
    description: string[];
    capital: string;
    continent: string;
    currency: string;
    language: string;
    visaRequirement: string;
    dialInCode: string;
    timeZone: string;
    additionalInfo: countryAdditionalInfo;
    totalDestinations: number;
}

export default Country

