import React, { memo, useEffect, useMemo, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "src/store/store";
import useFetch from "src/hooks/useFetch/useFetch";
import { FetchDestinationType } from "src/types/FetchData";
import Country from "src/types/Country";
import { CountryDestinationFilter } from "src/common/Filters/CountryDestinationFilter";
import {
  setDestinations,
  setTotalDestinations,
  setLoading,
  setError,
} from "src/store/slices/destinationSlice";
import {
  HoverVariants,
  TapVariants,
  VisibilityVariants,
} from "src/utils/constants/variants";
import FilterButton from "src/common/Filters/FilterButton";
import DestinationCatalog from "src/common/Catalogs/DestinationCatalog";
import { useViewportWidth } from "src/hooks/useViewportWidth/useViewportWidth";
import { startRequest, endRequest } from "src/store/slices/loadingSlice";

interface CountryDestinationsProps {
  country: Country;
}

// Animation variants for framer-motion
const variants = {
  hiddenY: VisibilityVariants.hiddenY,
  hiddenShort: VisibilityVariants.hiddenShortY,
  hiddenFullY: VisibilityVariants.hiddenFullY,
  hiddenYScale: VisibilityVariants.hiddenYScale,
  exitScale: VisibilityVariants.exitScale,
  visible: VisibilityVariants.visible,
  exitX: VisibilityVariants.exitX,
  hoverScale: HoverVariants.hoverScale,
  tapScale: TapVariants.tapScale,
};

const limit = 18;

const CountryDestinations: React.FC<CountryDestinationsProps> = memo(({ country }) => {
  const viewportWidth = useViewportWidth();
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);

  // Extracting necessary state from Redux store
  const { tags, searchQuery } = useSelector((state: RootState) => state.filter.destination);
  const { destinations, totalDestinations, loading, error } = useSelector((state: RootState) => state.destination);

  // Unique key for filtering - moved up before it's used
  const filterKey = useMemo(() => 
    `${currentPage}-${tags.join(",")}-${country.name}-${searchQuery}`,
    [currentPage, tags, country.name, searchQuery]
  );

  // Constructing the URL for fetching destinations
  const url = useMemo(() => {
    let baseUrl = `/destinations?page=${currentPage}&limit=${limit}&countries=${country.name}`;
    if (tags.length > 0) {
      baseUrl += `&tags=${tags.join(",")}`;
    }
    if (searchQuery) {
      baseUrl += `&searchQuery=${searchQuery}`;
    }
    return baseUrl;
  }, [currentPage, country.name, tags, searchQuery]);

  // Fetching destination data with optimized parameters
  const { 
    data: destinationData, 
    isLoading: destinationLoading, 
    error: destinationError,
    isFetching: destinationFetching
  } = useFetch<FetchDestinationType>(
    `country-destinations-${country._id}-${currentPage}`,
    url,
    "country",
    {
      staleTime: 2 * 60 * 1000, // 2 minutes cache
      cacheTime: 10 * 60 * 1000, // 10 minutes
    }
  );

  // Updating Redux store with fetched data
  useEffect(() => {
    if (destinationData) {
      dispatch(setDestinations(destinationData.result));
      dispatch(setTotalDestinations(destinationData.count || 0));
      
      // Only set loading for initial page load and navigation
      dispatch(setLoading(destinationLoading));
      dispatch(setError(destinationError ? destinationError.message : null));
    }
  }, [destinationData, destinationLoading, destinationError, dispatch]);

  // Handle filter changes with content-only loading
  useEffect(() => {
    if (destinationFetching) {
      dispatch(startRequest({ 
        page: 'country', 
        requestId: `country-destinations-${filterKey}`,
        isContentOnly: true 
      }));
    } else {
      dispatch(endRequest({ 
        page: 'country', 
        requestId: `country-destinations-${filterKey}`,
        isContentOnly: true 
      }));
    }
  }, [destinationFetching, filterKey, dispatch]);

  // Handling page change
  const handlePageChange = useCallback((newPage: number) => {
    setCurrentPage(newPage);
    
    // Scroll to top of destinations section when page changes
    window.scrollTo({ top: window.scrollY - 200, behavior: 'smooth' });
  }, []);

  // Determine if catalog should show loading state
  const showCatalogLoading = useMemo(() => {
    // Show loading for both initial page load and content updates
    return loading || destinationFetching;
  }, [loading, destinationFetching]);

  // Prefetch next page if needed
  useEffect(() => {
    // Calculate total pages
    const totalPages = Math.ceil((totalDestinations || 0) / limit);
    
    // If more pages exist and we're not on the last page, prefetch next page
    if (totalPages > currentPage) {
      const prefetchUrl = url.replace(`page=${currentPage}`, `page=${currentPage + 1}`);
      // Preload next page data
      const img = new Image();
      img.src = prefetchUrl;
    }
  }, [currentPage, totalDestinations, url]);

  return (
    <motion.section
      initial="hiddenY"
      whileInView="visible"
      viewport={{ once: true }}
      variants={variants}
      transition={{ duration: 0.5 }}
      className="destinations px-sect z-30 flex flex-col items-center gap-8 rounded-3xl bg-light-green dark:bg-background-dark-green py-sect-short shadow-section"
    >
      <div className="overflow-hidden">
        <motion.h1
          initial="hiddenFullY"
          whileInView="visible"
          viewport={{ once: true }}
          variants={variants}
          transition={{ duration: 0.5 }}
          className="h1-md md:mt-sect-short uppercase text-center leading-[0.9]"
        >
          {country.name}'s destinations
        </motion.h1>
      </div>

      <div className="flex w-full flex-row z-50 justify-between pb-4 md:pb-8 md:pt-sect-short">
        <motion.p
          initial="hiddenY"
          whileInView="visible"
          variants={variants}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
          className="p-medium w-3/4 md:w-auto"
        >
          Each destination we've covered here is fully filled {viewportWidth > 768 ? <br /> : ""}
          with significant information you will need
        </motion.p>

        <FilterButton>
          <CountryDestinationFilter />
        </FilterButton>
      </div>
      <DestinationCatalog
        destinations={destinations}
        totalDestinations={totalDestinations}
        loading={showCatalogLoading}
        error={error}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        limit={limit}
        filterKey={filterKey}
      />
    </motion.section>
  );
});

export default CountryDestinations;
