type placeToStay = {
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
  rating?: {
    [website: string]: number;
  };
};

type placeToVisit = {
  name: string;
  type?: string;
  image_url?: string;
  description?: string;
  location?: {
    on_map?: string;
    address?: string;
  };
  tips?: string[];
};

type placeToEat = {
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
  rating?: {
    [website: string]: number;
  };
};

interface destinationPlace {
  to_stay?: placeToStay[];
  to_visit?: placeToVisit[];
  to_eat?: placeToEat[];
}

export default destinationPlace;
