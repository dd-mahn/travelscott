export type placeToStay = {
  name: string;
  type: string;
  image_url: string;
  description: string;
  location: {
    on_map: string;
    address: string;
  };
  price: {
    currency: string;
    value: number;
  };
  rating: {
    [website: string]: number;
  };
};

export type placeToVisit = {
  name: string;
  type: string;
  image_url: string;
  description: string;
  location: {
    on_map: string;
    address: string;
  };
  tips: string[];
};

export type placeToEat = {
  name: string;
  type: string;
  image_url: string;
  description: string;
  location: {
    on_map: string;
    address: string;
  };
  price: {
    currency: string;
    value: number;
  };
  favorites: string[];
  rating: {
    [website: string]: number;
  };
};

export interface destinationPlace {
  to_stay?: placeToStay[];
  to_visit?: placeToVisit[];
  to_eat?: placeToEat[];
}

type transportationType = {
  name: string;
  image?: string;
  description?: string;
  options?: [
    {
      name?: string;
      description?: string;
    },
  ];
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
};

export interface destinationTransportation {
  overview?: string;
  types?: transportationType[];
}

type fromUs = {
  tips: string[];
  article: [
    {
      title?: string;
      id?: string;
    }
  ];
};

type fromOthers = {
  title?: string;
  link?: string;
};

export interface destinationInsight {
  from_us?: fromUs;
  from_others?: fromOthers[];
}

type destinationAdditionalInfo = {
  whenToVisit?: string;
  whoToGoWith?: string;
  whatToExpect?: string;
  healthAndSafety?: string;
};

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
