import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { AnimatePresence, motion } from "framer-motion";

// Component imports
import DestinationCard from "src/components/common/DestinationCard";
import { CatalogPagination } from "src/components/common/Pagination";
import Destination from "src/types/Destination";
import { FetchDestinationType } from "src/types/FetchData";
import { FullFilterBoard } from "src/components/common/FIlterBoard";
import { BASE_URL } from "src/utils/config";
import useFetch from "src/hooks/useFetch";

// Component props type
type DiscoverDestinationsProps = {
  countryNames: string[];
  continentNames: string[];
};

// Framer motion variants
const variants = {
  hidden: { opacity: 0, y: 40 },
  hiddenY: (y: string) => {
    return {
      y: y,
    };
  },
  hiddenYScale: { scale: 0.95, y: 100 },
  exitScale: { scale: 0, opacity: 0, y: 200, originX: 0 },
  visible: { opacity: 1, scale: 1, y: 0, x: 0 },
  scaleHover: {
    scale: 1.05,
  },
};

// DiscoverDestinations component
const DiscoverDestinations: React.FC<DiscoverDestinationsProps> = ({
  continentNames,
  countryNames,
}) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [filterTags, setFilterTags] = useState<string[]>([]);
  const [filterCountries, setFilterCountries] = useState<string[]>([]);
  const [filterContinents, setFilterContinents] = useState<string[]>([]);

  // Handle url for fetching destination data
  const url = useMemo(() => {
    let url = `${BASE_URL}/destinations?page=${currentPage}`;
    if (filterTags.length > 0) {
      url += `&tags=${filterTags.join(",")}`;
    }
    if (filterCountries.length > 0) {
      url += `&countries=${filterCountries.join(",")}`;
    }
    if (filterContinents.length > 0) {
      url += `&continents=${filterContinents.join(",")}`;
    }
    return url;
  }, [currentPage, filterTags, filterCountries, filterContinents]);

  // Fetch destination and country data
  const {
    data: destinationData,
    loading: destinationLoading,
    error: destinationError,
  } = useFetch<FetchDestinationType>(url, [currentPage]);

  const totalDestinations = destinationData?.count as number;

  useEffect(() => {
    if (destinationData?.result) {
      setDestinations(destinationData.result);
    }
  }, [destinationData]);

  // Handle filter board state
  const [isFilterBoardOpen, setIsFilterBoardOpen] = useState<boolean>(false);
  const toggleFilterBoard = useCallback(() => {
    setIsFilterBoardOpen((prev) => !prev);
  }, []);
  const tags = useMemo(
    () => [
      "Wilderness",
      "Culture&Heritage",
      "Food&Drink",
      "SoloJourneys",
      "CityScape",
      "Season&Festival",
      "Relaxation",
    ],
    [],
  );

  // Pagination handler
  const handlePreviousClick = useCallback(() => {
    setCurrentPage((prevPage) => Math.max(1, prevPage - 1));
  }, []);

  const handlePageClick = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const handleNextClick = useCallback(() => {
    setCurrentPage((prevPage) => prevPage + 1);
  }, []);

  return (
    <section
      id="destinations"
      className="destinations px-sect flex flex-col items-center py-sect-default"
      onClick={(e) => {
        const filterBoard = document.querySelector(".filter-board");
        if (
          filterBoard &&
          filterBoard.classList.contains("flex") &&
          !filterBoard.contains(e.target as Node)
        ) {
          setIsFilterBoardOpen(false);
        }
      }}
    >
      <div className="overflow-hidden">
        <motion.h1
          initial={variants.hiddenY("var(--y-from)")}
          whileInView="visible"
          viewport={{ once: true }}
          variants={variants}
          transition={{ duration: 0.5 }}
          className="h1-md lg:[--y-from:75px] 2xl:[--y-from:100px]"
        >
          Discover destinations
        </motion.h1>
      </div>

      <div className="flex w-full flex-row justify-between py-sect-short">
        <p className="p-medium">
          Each destination we’ve covered here is fully filled <br />
          with significant information you will need
        </p>
        <div className="relative">
          <motion.button
            whileHover="scaleHover"
            variants={variants}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
            title="filter"
            className={`rounded-full bg-background-dark shadow-component lg:h-12 lg:w-12 xl:h-12 xl:w-12 2xl:h-16 2xl:w-16 3xl:h-16 3xl:w-16`}
            onClick={() => toggleFilterBoard()}
          >
            <i
              className={`ri-filter-3-line p-large m-auto text-text-dark transition-all`}
            ></i>
          </motion.button>
          <FullFilterBoard
            isFilterBoardOpen={isFilterBoardOpen}
            tags={tags}
            countryNames={countryNames}
            continentNames={continentNames}
            filterTags={filterTags}
            filterCountries={filterCountries}
            filterContinents={filterContinents}
            setFilterTags={setFilterTags}
            setFilterCountries={setFilterCountries}
            setFilterContinents={setFilterContinents}
          />
        </div>
      </div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={variants}
        transition={{ duration: 0.5, staggerChildren: 0.2 }}
        className="grid min-h-[50svh] w-full place-items-center"
      >
        <AnimatePresence mode="wait">
          {destinationLoading && (
            <div className="grid w-full place-items-center py-sect-short">
              <h3 className="h3-md">Loading...</h3>
            </div>
          )}
          {destinationError && (
            <div className="grid w-full place-items-center py-sect-short">
              <h3 className="h3-md">
                Error... Please reload the page or try again later.
              </h3>
            </div>
          )}
          {destinations.length === 0 && (
            <div className="grid w-full place-items-center py-sect-short">
              <h3 className="h3-md">No destinations found.</h3>
            </div>
          )}
          {destinations && (
            <motion.div
              key={"destinationCatalog"}
              initial="hidden"
              animate="visible"
              exit="exitScale"
              variants={variants}
              transition={{
                duration: 0.5,
                ease: "easeInOut",
                staggerChildren: 0.1,
              }}
              className="grid grid-cols-3 gap-x-8 gap-y-12"
            >
              {(destinations as Destination[])?.map((destination) => (
                <motion.div variants={variants} key={destination._id}>
                  <DestinationCard destination={destination} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      {destinations.length > 0 && (
        <motion.div
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          variants={variants}
          className="w-full"
        >
          <CatalogPagination
            count={totalDestinations}
            page={currentPage}
            limit={18}
            handlePreviousClick={handlePreviousClick}
            handlePageClick={(page) => handlePageClick(page)}
            handleNextClick={handleNextClick}
          />
        </motion.div>
      )}
    </section>
  );
};

export default memo(DiscoverDestinations);
