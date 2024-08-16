import Country from "src/types/Country";

export const getCountryByContinent = (
  countries: Country[],
  continent: string,
) => {
  return countries.filter((country) => country.continent === continent);
};
