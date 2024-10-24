export interface DestinationAdditionalInfo {
    whenToVisit: string;
    whoToGoWith: string;
    whatToExpect: string;
    healthAndSafety: string;
}

interface FromUs {
  tips: string[];
  article: Array<{
    title?: string;
    id?: string;
  }>;
}

interface FromOthers {
  title?: string;
  link?: string;
}

export interface DestinationInsight {
  from_us?: FromUs;
  from_others?: FromOthers[];
}

interface TransportationType {
  name: string;
  description?: string;
  image?: string;
  options?: Array<{
    name?: string;
    description?: string;
  }>;
  price_range?: {
    currency?: string;
    min_price?: number;
    max_price?: number;
  };
  additional_info?: {
    note?: string;
    phone_numbers?: {
      [name: string]: string;
    };
  };
  quick_review?: string;
  recommended?: boolean;
}

export interface DestinationTransportation {
  overview?: string;
  types?: TransportationType[];
}

type Rating = {
  website: string,
  value: number,
  link: string;
}

interface PlaceToStay {
  name: string;
  type?: string;
  image_url?: string;
  description?: string;
  location?: {
    on_map?: string;
    address?: string;
  };
  price?: {
    currency?: string;
    value?: number;
  };
  rating?: Rating[];
}

interface PlaceToVisit {
  name: string;
  type?: string;
  image_url?: string;
  description?: string;
  location?: {
    on_map?: string;
    address?: string;
  };
  tips?: string[];
}

interface PlaceToEat {
  name: string;
  type?: string;
  image_url?: string;
  description?: string;
  location?: {
    on_map?: string;
    address?: string;
  };
  price?: {
    currency?: string;
    value?: number;
  };
  favorites?: string[];
  rating?: Rating[];
}

export interface DestinationPlace {
  to_stay?: PlaceToStay[];
  to_visit?: PlaceToVisit[];
  to_eat?: PlaceToEat[];
}

// Main Destination interface
export interface IDestination {
  name: string;
  video: string;
  images: string[];
  country: string;
  continent: string;
  location: string;
  description: string;
  places: DestinationPlace;
  transportation: DestinationTransportation;
  additionalInfo: DestinationAdditionalInfo;
  tags: string[];
  insight: DestinationInsight;
  summary: string;
  featured: boolean;
}