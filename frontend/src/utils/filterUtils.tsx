import Country from "src/types/Country";
import Destination from "src/types/Destination";

export const getCountryByContinent = (
  countries: Country[],
  continent: string,
) => {
  return countries.filter((country) => country.continent === continent);
};

export const getFeaturedDestinations = (destinations: Destination[]) => {
  return destinations.filter((destination) => destination.featured).slice(0, 5);
};
