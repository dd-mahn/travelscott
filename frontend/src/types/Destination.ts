// Define a common location type to avoid repetition
type Location = {
  on_map: string;
  address: string;
};

// Define a common price type to avoid repetition
type Price = {
  currency: string;
  value: number;
};

// Define a common rating type to avoid repetition
export type Rating = {
  website: string;
  value: number;
  link: string;
};

// Define the type for a place to stay
export type placeToStay = {
  name: string;
  type: string;
  image_url: string;
  description: string;
  location: Location;
  price: Price;
  rating: Rating;
};

// Define the type for a place to visit
export type placeToVisit = {
  name: string;
  type: string;
  image_url: string;
  description: string;
  location: Location;
  tips: string[];
};

// Define the type for a place to eat
export type placeToEat = {
  name: string;
  type: string;
  image_url: string;
  description: string;
  location: Location;
  price: Price;
  favorites: string[];
  rating: Rating;
};

// Define the interface for destination places
export interface destinationPlace {
  to_stay?: placeToStay[];
  to_visit?: placeToVisit[];
  to_eat?: placeToEat[];
}

// Define the type for transportation options
type transportationOption = {
  name?: string;
  description?: string;
};

// Define the type for transportation price range
type transportationPriceRange = {
  currency?: string;
  min_price?: number;
  max_price?: number;
};

// Define the type for additional transportation info
type transportationAdditionalInfo = {
  note?: string;
  phone_numbers?: {
    [name: string]: string;
  };
};

// Define the type for transportation type
type transportationType = {
  name: string;
  image?: string;
  description?: string;
  options?: transportationOption[];
  price_range?: transportationPriceRange;
  additional_info?: transportationAdditionalInfo;
  quick_review?: string;
  recommended?: boolean;
};

// Define the interface for destination transportation
export interface destinationTransportation {
  overview?: string;
  types?: transportationType[];
}

// Define the type for insights from us
type fromUs = {
  tips: string[];
  article: {
    title?: string;
    id?: string;
  }[];
};

// Define the type for insights from others
type fromOthers = {
  title?: string;
  link?: string;
};

// Define the interface for destination insights
export interface destinationInsight {
  from_us?: fromUs;
  from_others?: fromOthers[];
}

// Define the type for additional destination info
type destinationAdditionalInfo = {
  whenToVisit?: string;
  whoToGoWith?: string;
  whatToExpect?: string;
  healthAndSafety?: string;
};

// Define the main Destination interface
export default interface Destination {
  _id: string;
  name: string;
  location: string;
  video: string;
  images: string[];
  country: string;
  continent: string;
  description: string;
  additionalInfo: destinationAdditionalInfo;
  places: destinationPlace;
  transportation: destinationTransportation;
  tags: string[];
  insight: destinationInsight;
  summary: string;
  featured: Boolean;
}
