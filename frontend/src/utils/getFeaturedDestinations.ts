import Destination from "src/types/Destination";

export const getFeaturedDestinations = (destinations: Destination[]) => {
  return destinations.filter((destination) => destination.featured).slice(0, 5);
};
