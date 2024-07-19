type transportationType = {
  name: string;
  description?: string;
  image?: string;
  options?: [
    {
      name?: string;
      description?: string;
    }
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

interface destinationTransportation {
  overview?: string;
  types?: transportationType[];
}

export default destinationTransportation;
