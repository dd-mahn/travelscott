import Country from "src/types/Country";
import Destination from "src/types/Destination";

/**
 * Filters the list of countries by the specified continent.
 * @param {Country[]} countries - The list of countries to filter.
 * @param {string} continent - The continent to filter by.
 * @returns {Country[]} - The filtered list of countries.
 */
export const getCountryByContinent = (
  countries: Country[],
  continent: string,
): Country[] => {
  return countries.filter((country) => country.continent === continent);
};

/**
 * Gets the top 5 featured destinations.
 * @param {Destination[]} destinations - The list of destinations to filter.
 * @returns {Destination[]} - The top 5 featured destinations.
 */
export const getFeaturedDestinations = (
  destinations: Destination[],
): Destination[] => {
  return destinations.filter((destination) => destination.featured).slice(0, 5);
};
