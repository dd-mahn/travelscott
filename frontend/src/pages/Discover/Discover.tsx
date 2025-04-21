import React, { useEffect, useMemo } from "react";

// Component imports
import "src/styles/components/discover.css";
import {
  getCountryByContinent,
  getFeaturedDestinations,
} from "src/utils/filterUtils";
import { FetchCountriesType, FetchDestinationType } from "src/types/FetchData";
import NotFoundPage from "src/pages/404/404";
import Loading from "src/common/Loading/Loading";
import DiscoverDestinations from "src/pages/Discover/Components/Destinations/DiscoverDestinations";
import DiscoverCountries from "src/pages/Discover/Components/Countries/DiscoverCountries";
import useFetch from "src/hooks/useFetch/useFetch";
import DiscoverPoster from "src/pages/Discover/Components/Poster/DiscoverPoster";
import { setCountries } from "src/store/slices/countrySlice";
import { setAllDestinations, setFeaturedDestinations } from "src/store/slices/destinationSlice";
import { setContinents } from "src/store/slices/continentSlice";
import { setPageLoading } from "src/store/slices/loadingSlice";
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

  // Fetch data for all destinations with optimized parameters
  const {
    data: allDestinationData,
    isLoading: allDestinationLoading,
    error: allDestinationError,
    isSuccess: allDestinationSuccess
  } = useFetch<FetchDestinationType>(
    "discover-destinations",
    `/api/destinations?limit=50&featured=true`,
    "discover",
    {
      staleTime: 5 * 60 * 1000, // 5 minutes cache
      cacheTime: 30 * 60 * 1000, // 30 minutes
    }
  );

  const {
    data: countryData,
    isLoading: countryLoading,
    error: countryError,
    isSuccess: countrySuccess
  } = useFetch<FetchCountriesType>(
    "discover-countries",
    `/api/countries?limit=50`,
    "discover",
    {
      staleTime: 5 * 60 * 1000, // 5 minutes cache  
      cacheTime: 30 * 60 * 1000, // 30 minutes
    }
  );

  // Track loading state
  useEffect(() => {
    // Mark page as loaded when all critical data is loaded
    if (allDestinationSuccess && countrySuccess) {
      dispatch(setPageLoading({ page: 'discover', isLoading: false }));
    }
  }, [allDestinationSuccess, countrySuccess, dispatch]);

  // Handle fetched data for rendering
  useEffect(() => {
    if (countryData?.result) {
      dispatch(setCountries(countryData.result));
    }

    if (allDestinationData?.result) {
      dispatch(setAllDestinations(allDestinationData.result));
      dispatch(setFeaturedDestinations(getFeaturedDestinations(allDestinationData.result)));
    }
  }, [allDestinationData, countryData, dispatch]);

  // Handle continent data - memoize computation to prevent unnecessary recalculations
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

  // Memoize featured destinations to prevent unnecessary re-renders
  const memoizedFeaturedDestinations = useMemo(() => 
    featuredDestinations || 
    (allDestinationData?.result ? getFeaturedDestinations(allDestinationData.result) : []),
    [featuredDestinations, allDestinationData]
  );

  // Handle render
  if (!countries.length || !allDestinations.length) {
    if (countryError || allDestinationError) {
      return <NotFoundPage />;
    }
  }

  return (
    <main data-testid="discover-page" className="discover">
      {/* POSTER SECTION */}
      <DiscoverPoster featuredDestinations={memoizedFeaturedDestinations} />

      {/* COUNTRY SECTION */}
      <DiscoverCountries />

      {/* DESTINATION SECTION */}
      <DiscoverDestinations />
    </main>
  );
};

export default Discover;
