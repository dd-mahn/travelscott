import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "src/store/store";
import useFetch from "src/hooks/useFetch/useFetch";
import { FetchDestinationType } from "src/types/FetchData";
import { DestinationFilter } from "src/common/Filters/DestinationFilter";
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

// Define animation variants
const variants = {
  hiddenY: VisibilityVariants.hiddenY,
  hiddenShort: VisibilityVariants.hiddenShortY,
  hiddenFullY: VisibilityVariants.hiddenFullY,
  hiddenYScale: VisibilityVariants.hiddenYScale,
  exitScale: VisibilityVariants.exitScale,
  exitX: VisibilityVariants.exitX,
  visible: VisibilityVariants.visible,
  hoverScale: HoverVariants.hoverScale,
  tapScale: TapVariants.tapScale,
};

// Define the limit of destinations per page
const limit = 18;

const DiscoverDestinations: React.FC = () => {
  const viewportWidth = useViewportWidth();
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);

  // Extract necessary state from Redux store
  const {
    continents: computedContinents,
    countries: computedCountries,
    tags,
    searchQuery: destinationSearchQuery,
  } = useSelector((state: RootState) => state.filter.destination);

  const { destinations, totalDestinations, loading, error } = useSelector(
    (state: RootState) => state.destination,
  );

  // Construct the URL for fetching destinations
  const url = useMemo(() => {
    let url = `/destinations?page=${currentPage}&limit=${limit}`;
    if (tags.length > 0) {
      url += `&tags=${tags.join(",")}`;
    }
    if (computedCountries.length > 0) {
      url += `&countries=${computedCountries.join(",")}`;
    }
    if (computedContinents.length > 0) {
      url += `&continents=${computedContinents.join(",")}`;
    }
    if (destinationSearchQuery !== "") {
      url += `&searchQuery=${destinationSearchQuery}`;
    }
    return url;
  }, [
    currentPage,
    tags,
    computedCountries,
    computedContinents,
    destinationSearchQuery,
  ]);

  // Generate a unique key for filtering
  const filterKey = useMemo(
    () =>
      `${currentPage}-${tags.join(",")}-${computedCountries.join(",")}-${computedContinents.join(",")}-${destinationSearchQuery}`,
    [
      currentPage,
      tags,
      computedCountries,
      computedContinents,
      destinationSearchQuery,
    ],
  );

  // Fetch destination data with optimized parameters
  const {
    data: destinationData,
    isLoading: destinationLoading,
    error: destinationError,
    isFetching: destinationFetching,
  } = useFetch<FetchDestinationType>(
    `dest-page-${currentPage}`,
    url,
    "discover",
    {
      staleTime: 2 * 60 * 1000, // 2 minutes
      refetchOnWindowFocus: false,
      cacheTime: 10 * 60 * 1000, // 10 minutes
    }
  );

  // Update Redux store with fetched data
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
        page: 'discover', 
        requestId: `discover-destinations-${filterKey}`,
        isContentOnly: true 
      }));
    } else {
      dispatch(endRequest({ 
        page: 'discover', 
        requestId: `discover-destinations-${filterKey}`,
        isContentOnly: true 
      }));
    }
  }, [destinationFetching, filterKey, dispatch]);

  // Handle page change
  const handlePageChange = useCallback((newPage: number) => {
    setCurrentPage(newPage);
    
    // Scroll to top of destinations section when page changes
    const destinationsElement = document.getElementById("destinations");
    if (destinationsElement) {
      destinationsElement.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  // Determine if catalog should show loading state - only for navigation
  const showCatalogLoading = useMemo(() => {
    // Show loading only for initial page load or content updates
    return loading || destinationFetching;
  }, [loading, destinationFetching]);

  // Prefetch next page if needed
  useEffect(() => {
    // Calculate total pages
    const totalPages = Math.ceil((totalDestinations || 0) / limit);
    
    // If more pages exist and we're not on the last page, prefetch next page
    if (totalPages > currentPage) {
      const prefetchUrl = url.replace(`page=${currentPage}`, `page=${currentPage + 1}`);
      const img = new Image();
      img.src = prefetchUrl;
    }
  }, [currentPage, totalDestinations, url]);

  return (
    <section
      id="destinations"
      className="destinations px-sect flex flex-col items-center py-sect-short md:py-32 lg:py-sect-default"
    >
      <div className="overflow-hidden">
        <motion.h1
          initial="hiddenFullY"
          whileInView="visible"
          viewport={{ once: true }}
          variants={variants}
          transition={{ duration: 0.5 }}
          className="h1-md-bold"
        >
          Discover destinations
        </motion.h1>
      </div>

      <div className="z-50 flex w-full flex-row justify-between py-12 lg:py-sect-short">
        <motion.p
          initial="hiddenY"
          whileInView="visible"
          variants={variants}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
          className="p-medium"
        >
          Each destination we've covered here is fully filled
          {viewportWidth > 768 && <br />}
          with significant information you will need.
        </motion.p>
        <FilterButton>
          <DestinationFilter />
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
    </section>
  );
};

export default memo(DiscoverDestinations);
