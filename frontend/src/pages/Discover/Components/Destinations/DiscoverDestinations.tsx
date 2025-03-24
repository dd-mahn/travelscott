import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "src/store/store";
import config from "src/config/config";
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
    let url = `/api/destinations?page=${currentPage}&limit=${limit}`;
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

  // Fetch destination data
  const {
    data: destinationData,
    loading: destinationLoading,
    error: destinationError,
  } = useFetch<FetchDestinationType>(url, [url]);

  // Update Redux store with fetched data
  useEffect(() => {
    if (destinationData) {
      dispatch(setDestinations(destinationData.result));
      dispatch(setTotalDestinations(destinationData.count || 0));
      dispatch(setLoading(destinationLoading));
      dispatch(setError(destinationError));
    }
  }, [destinationData, destinationLoading, destinationError, dispatch]);

  // Handle page change
  const handlePageChange = useCallback((newPage: number) => {
    setCurrentPage(newPage);
  }, []);

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
        loading={loading}
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
