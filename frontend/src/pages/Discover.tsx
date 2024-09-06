import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

// Asset imports
import asiaMap from "src/assets/images/ui/maps/Asia.webp";
import europeMap from "src/assets/images/ui/maps/Europe.webp";
import africaMap from "src/assets/images/ui/maps/Africa.webp";
import northAmericaMap from "src/assets/images/ui/maps/NorthAmerica.webp";
import southAmericaMap from "src/assets/images/ui/maps/SouthAmerica.webp";
import oceaniaMap from "src/assets/images/ui/maps/Oceania.webp";

// Component imports
import "src/styles/discover.css";
import { BASE_URL } from "src/utils/config";
import { getFeaturedDestinations } from "src/utils/getFeaturedDestinations";
import { getCountryByContinent } from "src/utils/getCountryByContinent";
import { FetchCountriesType, FetchDestinationType } from "src/types/FetchData";
import NotFoundPage from "./404";
import Loading from "src/components/common/Loading";
import DiscoverDestinations from "./DiscoverComponents/DiscoverDestinations";
import DiscoverCountries from "./DiscoverComponents/DiscoverCountries";
import useFetch from "src/hooks/useFetch";
import Country from "src/types/Country";
import Destination from "src/types/Destination";
import DiscoverPoster from "./DiscoverComponents/DiscoverPoster";

// Discover component
const Discover: React.FC = () => {
  // State hooks for current page, destinations, countries, selected continent, filter tags, filter countries, filter continents
  const [allDestinations, setAllDestinations] = useState<Destination[]>([]);
  const [countries, setCountries] = useState<Country[]>([]);

  const {
    data: allDestinationData,
    loading: allDestinationLoading,
    error: allDestinationError,
  } = useFetch<FetchDestinationType>(`${BASE_URL}/destinations?limit=1000`);

  const {
    data: countryData,
    loading: countryLoading,
    error: countryError,
  } = useFetch<FetchCountriesType>(`${BASE_URL}/countries`);

  // Handle fetched data for rendering
  useEffect(() => {
    if (countryData?.result) {
      setCountries(countryData.result);
    }

    if (allDestinationData?.result) {
      setAllDestinations(allDestinationData.result);
    }
  }, [allDestinationData, countryData]);

  // Handle continent data
  const continents = useMemo(() => {
    return [
      {
        name: "Asia",
        countries: getCountryByContinent(countries, "Asia"),
        count: getCountryByContinent(countries, "Asia").length,
        image: asiaMap,
      },
      {
        name: "Africa",
        countries: getCountryByContinent(countries, "Africa"),
        count: getCountryByContinent(countries, "Africa").length,
        image: africaMap,
      },
      {
        name: "Europe",
        countries: getCountryByContinent(countries, "Europe"),
        count: getCountryByContinent(countries, "Europe").length,
        image: europeMap,
      },
      {
        name: "North America",
        countries: getCountryByContinent(countries, "North America"),
        count: getCountryByContinent(countries, "North America").length,
        image: northAmericaMap,
      },
      {
        name: "South America",
        countries: getCountryByContinent(countries, "South America"),
        count: getCountryByContinent(countries, "South America").length,
        image: southAmericaMap,
      },
      {
        name: "Oceania",
        countries: getCountryByContinent(countries, "Oceania"),
        count: getCountryByContinent(countries, "Oceania").length,
        image: oceaniaMap,
      },
    ];
  }, [countries]);

  // Handle featured destinations
  const featuredDestinations = useMemo(() => {
    return getFeaturedDestinations(allDestinations);
  }, [allDestinations]);

  // Handle country and continent names
  const countryNames = Array.isArray(countries)
    ? countries.map((country) => country?.name)
    : [];
  const continentNames = Array.isArray(continents)
    ? continents.map((continent) => continent.name)
    : [];

  // Handle render
  if (countryLoading || allDestinationLoading) {
    return <Loading />;
  }

  if (countryError || allDestinationError) {
    return <NotFoundPage />;
  }

  return (
    <main className="discover">
      {/* POSTER SECTION */}
      {!allDestinationError &&
        !allDestinationLoading &&
        featuredDestinations.length !== 0 && (
          <DiscoverPoster featuredDestinations={featuredDestinations} />
        )}

      {/* COUNTRY SECTION */}
      <DiscoverCountries
        countryLoading={countryLoading}
        countryError={countryError}
        continents={continents}
      />

      {/* DESTINATION SECTION */}
      <DiscoverDestinations
        countryNames={countryNames}
        continentNames={continentNames}
      />
    </main>
  );
};

export default Discover;
