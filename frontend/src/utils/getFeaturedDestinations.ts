import Destination from "src/types/Destination";

export const getFeaturedDestinations = (destinations: Destination[]) => {
    if (destinations !== undefined) {
      let featuredDestinations = destinations.filter(
        (destination) => destination.featured === true,
      );
      if (featuredDestinations.length > 5) {
        featuredDestinations = featuredDestinations.slice(0, 5);
      }
      return featuredDestinations;
    } else {
      return [];
    }
  };