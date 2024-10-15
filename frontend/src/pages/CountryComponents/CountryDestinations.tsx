import React, { memo, useEffect, useMemo, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "src/store/store";
import { BASE_URL } from "src/utils/config";
import useFetch from "src/hooks/useFetch";
import { FetchDestinationType } from "src/types/FetchData";
import Country from "src/types/Country";
import { CountryDestinationFilter } from "src/common/FilterBoards";
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
} from "src/utils/variants";
import FilterButton from "src/common/FilterButton";
import DestinationCatalog from "src/common/DestinationCatalog";

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

const CountryDestinations: React.FC<CountryDestinationsProps> = ({ country }) => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const { tags, searchQuery } = useSelector((state: RootState) => state.filter.destination);
  const { destinations, totalDestinations, loading, error } = useSelector((state: RootState) => state.destination);

  const url = useMemo(() => {
    let baseUrl = `${BASE_URL}/destinations?page=${currentPage}&limit=${limit}&countries=${country.name}`;
    if (tags.length > 0) {
      baseUrl += `&tags=${tags.join(",")}`;
    }
    if (searchQuery) {
      baseUrl += `&searchQuery=${searchQuery}`;
    }
    return baseUrl;
  }, [currentPage, country.name, tags, searchQuery]);

  const { data: destinationData, loading: destinationLoading, error: destinationError } = useFetch<FetchDestinationType>(url, [url]);

  useEffect(() => {
    if (destinationData) {
      dispatch(setDestinations(destinationData.result));
      dispatch(setTotalDestinations(destinationData.count || 0));
      dispatch(setLoading(destinationLoading));
      dispatch(setError(destinationError));
    }
  }, [destinationData, destinationLoading, destinationError, dispatch]);

  const handlePageChange = useCallback((newPage: number) => {
    setCurrentPage(newPage);
  }, []);

  const filterKey = `${currentPage}-${tags.join(",")}-${country.name}-${searchQuery}`;

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
          className="p-medium"
        >
          Each destination we've covered here is fully filled <br />
          with significant information you will need
        </motion.p>

        <FilterButton>
          <CountryDestinationFilter />
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
    </motion.section>
  );
};

export default memo(CountryDestinations);
