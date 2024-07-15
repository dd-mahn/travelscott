import Country from "src/types/Country";

export const getCountryByContinent = (countries: Country[], continent: string) => {
    if (countries !== undefined) {
      return countries.filter((country) => country.continent === continent);
    } else {
      return [];
    }
  };