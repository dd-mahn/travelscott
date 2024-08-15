import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import DestinationCard from "src/components/ui/DestinationCard";
import { CatalogPagination } from "src/components/ui/Pagination";
import Destination from "src/types/Destination";
import { FetchDestinationType } from "src/types/FetchData";

type DiscoverDestinationsProps = {
  destinationData: FetchDestinationType | undefined;
  destinationLoading: boolean;
  destinationError: string | null;
  countryNames: string[];
  continentNames: string[];
  filterTags: string[];
  filterCountries: string[];
  filterContinents: string[];
  setFilterTags: React.Dispatch<React.SetStateAction<string[]>>;
  setFilterCountries: React.Dispatch<React.SetStateAction<string[]>>;
  setFilterContinents: React.Dispatch<React.SetStateAction<string[]>>;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
};

const variants = {
  hidden: { opacity: 0, y: 40 },
  hiddenY: (y: string) => {
    return {
      y: y,
    };
  },
  hiddenYScale: { scale: 0.95, y: 100 },
  visible: { opacity: 1, scale: 1, y: 0, x: 0 },
  scaleHover: {
    scale: 1.05,
  },
};

const DiscoverDestinations: React.FC<DiscoverDestinationsProps> = ({
  destinationData,
  destinationLoading,
  destinationError,
  continentNames,
  countryNames,
  filterTags,
  filterCountries,
  filterContinents,
  setFilterTags,
  setFilterCountries,
  setFilterContinents,
  currentPage,
  setCurrentPage,
}) => {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [inputFocus, setInputFocus] = useState<boolean>(false);
  const destinationCatalogRef = useRef<HTMLDivElement>(null);

  const totalDestinations = destinationData?.count as number;

  useEffect(() => {
    if (destinationData?.result) {
      setDestinations(destinationData.result);
    }
  }, [destinationData]);

  // Handle filter board state
  const [isFilterBoardOpen, setIsFilterBoardOpen] = useState<boolean>(false);
  const toggleFilterBoard = () => {
    setIsFilterBoardOpen(!isFilterBoardOpen);
  };

  const tags = [
    "Wilderness",
    "Culture&Heritage",
    "Food&Drink",
    "SoloJourneys",
    "CityScape",
    "Season&Festival",
    "Relaxation",
  ];

  const scrollToCatalog = useCallback(() => {
    if (destinationCatalogRef.current) {
      const rect = destinationCatalogRef.current.getBoundingClientRect();
      window.scrollTo({
        top: rect.top - 300 + window.scrollY,
        behavior: "smooth",
      });
    }
  }, []);

  const continentFilterClick = useCallback(
    (continent: string) => {
      if (filterContinents.includes(continent)) {
        setFilterContinents(
          filterContinents.filter((item) => item !== continent),
        );
      } else {
        setFilterContinents([...filterContinents, continent]);
      }
      setTimeout(() => {
        scrollToCatalog();
      }, 200);
    },
    [filterContinents],
  );

  const countryFilterClick = useCallback(
    (country: string) => {
      if (filterCountries.includes(country)) {
        setFilterCountries(filterCountries.filter((item) => item !== country));
      } else {
        setFilterCountries([...filterCountries, country]);
      }
      setTimeout(() => {
        scrollToCatalog();
      }, 200);
    },
    [filterCountries],
  );

  const tagFilterClick = useCallback(
    (tag: string) => {
      if (filterTags.includes(tag)) {
        setFilterTags(filterTags.filter((item) => item !== tag));
      } else {
        setFilterTags([...filterTags, tag]);
      }
      setTimeout(() => {
        scrollToCatalog();
      }, 200);
    },
    [filterTags],
  );

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
          <AnimatePresence mode="wait">
            {isFilterBoardOpen && (
              <motion.div
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={variants}
                transition={{ duration: 0.3 }}
                key={"filter-board"}
                className={`filter-board absolute right-[5%] top-2/3 z-10 flex flex-col items-center gap-8 rounded-xl bg-background-light px-4 pb-20 pt-4 shadow-section lg:w-[40svw] 2xl:w-[30svw]`}
              >
                <div className="flex w-full flex-row items-end gap-4">
                  <div
                    className={`${inputFocus ? "border-text-light" : "border-gray border-opacity-50"} flex h-fit items-center justify-between rounded-md px-2 py-1 transition-all lg:border-[1.5px] 2xl:border-[2px]`}
                  >
                    <input
                      type="text"
                      placeholder="Search..."
                      className="span-small w-4/5 bg-transparent outline-none"
                      onClick={() => setInputFocus(true)}
                      onBlur={() => setInputFocus(false)}
                    />
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      variants={variants}
                      whileTap={{ scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      title="search"
                      className="outline-none"
                    >
                      <i className="ri-search-line span-regular"></i>
                    </motion.button>
                  </div>
                </div>

                <div className="flex w-full flex-col items-start gap-2">
                  <span className="span-medium font-prima uppercase">
                    Location
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {continentNames.map((continent) => (
                      <span
                        key={continent}
                        className={`${filterContinents.includes(continent) ? "bg-background-dark text-text-dark" : "bg-background-light text-text-light"} span-small cursor-pointer rounded-2xl border border-gray px-4 transition-all hover:scale-[1.05] hover:border-text-light`}
                        onClick={() => continentFilterClick(continent)}
                      >
                        {continent}
                      </span>
                    ))}
                    {countryNames.map((country) => (
                      <span
                        key={country}
                        className={`${filterCountries.includes(country) ? "bg-background-dark text-text-dark" : "bg-background-light text-text-light"} span-small cursor-pointer rounded-2xl border border-gray px-4 transition-all hover:scale-[1.05] hover:border-text-light`}
                        onClick={() => countryFilterClick(country)}
                      >
                        {country}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex w-full flex-col items-start gap-2">
                  <span className="span-medium font-prima uppercase">Tags</span>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className={`${filterTags.includes(tag) ? "bg-background-dark text-text-dark" : "bg-background-light text-text-light"} span-small cursor-pointer rounded-2xl border border-gray px-4 transition-all hover:scale-[1.05] hover:border-text-light`}
                        onClick={() => tagFilterClick(tag)}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <motion.div
        ref={destinationCatalogRef}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={variants}
        transition={{ duration: 0.5, staggerChildren: 0.2 }}
        className="grid min-h-[50svh] w-full place-items-center"
      >
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
          <AnimatePresence mode="wait">
            <motion.div
              initial="hiddenYScale"
              animate="visible"
              exit="hiddenYScale"
              variants={variants}
              transition={{ duration: 0.5, staggerChildren: 0.2 }}
              className="grid grid-cols-3 gap-x-8 gap-y-12"
            >
              {(destinations as Destination[])?.map((destination) => (
                <motion.div variants={variants} key={destination._id}>
                  <DestinationCard destination={destination} />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        )}
      </motion.div>
      {destinations.length > 0 && (
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={variants}
          transition={{ duration: 0.5 }}
          className="w-full"
        >
          <CatalogPagination
            count={totalDestinations}
            page={currentPage}
            limit={18}
            handlePreviousClick={() =>
              setCurrentPage(Math.max(1, currentPage - 1))
            }
            handlePageClick={(page) => {
              console.log(page);
              setCurrentPage(page);
            }}
            handleNextClick={() => setCurrentPage(currentPage + 1)}
          />
        </motion.div>
      )}
    </section>
  );
};

export default memo(DiscoverDestinations);
