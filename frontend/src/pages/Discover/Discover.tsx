import React, { useEffect } from "react";

// Component imports
import "src/styles/discover.css";
import config from "src/config/config";
import {
  getCountryByContinent,
  getFeaturedDestinations,
} from "src/utils/filterUtils";
import { FetchCountriesType, FetchDestinationType } from "src/types/FetchData";
import NotFoundPage from "../404/404";
import Loading from "src/common/Loading";
import DiscoverDestinations from "./Components/DiscoverDestinations";
import DiscoverCountries from "./Components/DiscoverCountries";
import useFetch from "src/hooks/useFetch/useFetch";
import DiscoverPoster from "./Components/DiscoverPoster";
import { setCountries } from "src/store/slices/countrySlice";
import { setAllDestinations, setFeaturedDestinations } from "src/store/slices/destinationSlice";
import { setContinents } from "src/store/slices/continentSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "src/store/store";
import { continents } from "src/utils/constants/continents";

// Discover component
const Discover: React.FC = () => {
  const dispatch = useDispatch();
  const { countries } = useSelector((state: RootState) => state.country);
  const { allDestinations, featuredDestinations } = useSelector(
    (state: RootState) => state.destination,
  );

  // Fetch data for all destinations
  const {
    data: allDestinationData,
    loading: allDestinationLoading,
    error: allDestinationError,
  } = useFetch<FetchDestinationType>(`${config.api.baseUrl}/destinations?limit=1000`);

  const {
    data: countryData,
    loading: countryLoading,
    error: countryError,
  } = useFetch<FetchCountriesType>(`${config.api.baseUrl}/countries?limit=1000`);

  // Handle fetched data for rendering
  useEffect(() => {
    if (countryData) {
      dispatch(setCountries(countryData.result));
    }

    if (allDestinationData) {
      dispatch(setAllDestinations(allDestinationData.result));
      dispatch(setFeaturedDestinations(getFeaturedDestinations(allDestinationData.result)));
    }
  }, [allDestinationData, countryData, dispatch]);

  // Handle continent data
  useEffect(() => {
    if (countries.length > 0) {
      const updatedContinents = continents.map((continent) => ({
        ...continent,
        countries: getCountryByContinent(countries, continent.name),
        count: getCountryByContinent(countries, continent.name).length,
      }));
      dispatch(setContinents(updatedContinents));
    }
  }, [countries, dispatch]);

  // Handle render
  if (countryLoading || allDestinationLoading) {
    return <Loading />;
  }

  if (countryError || allDestinationError || !countries || !allDestinations) {
    return <NotFoundPage />;
  }

  return (
    <main className="discover">
      {/* POSTER SECTION */}
      <DiscoverPoster featuredDestinations={featuredDestinations || getFeaturedDestinations(allDestinations)} />

      {/* COUNTRY SECTION */}
      <DiscoverCountries />

      {/* DESTINATION SECTION */}
      <DiscoverDestinations />
    </main>
  );
};

export default Discover;
