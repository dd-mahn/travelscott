type countryImages = {
  flagImage?: string;
  mapImage?: string;
  additionalImages?: string[];
}

type countryAdditionalInfo = {
  whenToVisit?: string;
  transportation?: string;
  healthSafety?: string;
}

interface Country{
    _id: string;
    name: string;
    images: countryImages;
    description: string;
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

