import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import Lenis from "lenis";
import { BASE_URL } from "src/utils/config";
import useFetch from "src/hooks/useFetch";
import Destination from "src/types/Destination";
import { FetchDestinationType } from "src/types/FetchData";
import DestinationCard from "src/components/common/DestinationCard";
import { CatalogPagination } from "src/components/common/Pagination";
import Country from "src/types/Country";
import { CountryDestinationFilter } from "src/components/common/FIlterBoard";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "src/store/store";
import { useViewportWidth } from "src/utils/imageUtils";
import { optimizeImage } from "src/utils/optimizeImage";
import { setCountryDestinations } from "src/store/slices/countrySlice";

interface CountryDestinationsProps {
  country: Country;
}

// Animation variants for framer-motion
const variants = {
  hidden: { opacity: 0, y: 40 },
  hiddenShort: { opacity: 0, y: 20 },
  hiddenFullY: { y: "100%" },
  hiddenYScale: { scale: 0.95, y: 100, opacity: 0 },
  exitScale: { scale: 0, opacity: 0, y: 200, originX: 0 },
  visible: { opacity: 1, scale: 1, y: 0, x: 0 },
  exitX: { x: -1000, opacity: 0 },
  hoverScale: {
    scale: 1.05,
    transition: { duration: 0.4, ease: "easeInOut" },
  },
  tapScale: {
    scale: 0.95,
    transition: { duration: 0.4 },
  },
};

const limit = 18;

const CountryDestinations: React.FC<CountryDestinationsProps> = ({
  country,
}) => {
  const dispatch = useDispatch();
  const { countryDestinations } = useSelector(
    (state: RootState) => state.country,
  );
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isFilterBoardOpen, setIsFilterBoardOpen] = useState<boolean>(false);
  const sectionRef = useRef<HTMLElement>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const viewportWidth = useViewportWidth();

  const { tags, searchQuery } = useSelector(
    (state: RootState) => state.filter.destination,
  );

  // Construct the URL for fetching destinations
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

  const {
    data: destinationData,
    loading: destinationLoading,
    error: destinationError,
  } = useFetch<FetchDestinationType>(url, [url]);

  const totalDestinations = destinationData?.count as number;

  // Update destinations when data is fetched
  useEffect(() => {
    if (destinationData?.result) {
      dispatch(setCountryDestinations(destinationData.result));
    }
  }, [destinationData, dispatch]);

  // Initialize Lenis for smooth scrolling
  useEffect(() => {
    lenisRef.current = new Lenis({
      duration: 2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time: number) {
      lenisRef.current?.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenisRef.current?.destroy();
    };
  }, []);

  // Toggle the filter board visibility
  const toggleFilterBoard = useCallback(() => {
    setIsFilterBoardOpen((prev) => !prev);
  }, []);

  // Handle pagination and scroll to the top of the section
  const handlePagination = useCallback((newPage: number) => {
    setCurrentPage(newPage);
    if (sectionRef.current && lenisRef.current) {
      lenisRef.current.scrollTo(sectionRef.current, { offset: -100 });
    }
  }, []);

  // Optimize destination images based on viewport width
  const optimizedDestinations = useMemo(() => {
    return countryDestinations.map((destination) => ({
      ...destination,
      images: destination.images.map((image) =>
        optimizeImage(image, {
          width: Math.min(viewportWidth, 1920),
          quality: 80,
          format: "auto",
        }),
      ),
    }));
  }, [countryDestinations, viewportWidth]);

  return (
    <motion.section
      ref={sectionRef}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={variants}
      transition={{ duration: 0.5 }}
      className="stacked-section destinations px-sect sticky -top-4 z-30 flex flex-col items-center gap-8 rounded-3xl bg-light-green py-sect-short shadow-section"
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
          initial="hiddenFullY"
          whileInView="visible"
          viewport={{ once: true }}
          variants={variants}
          transition={{ duration: 0.5 }}
          className="h1-md mt-sect-short uppercase"
        >
          {country.name}'s destinations
        </motion.h1>
      </div>

      <div className="flex w-full flex-row justify-between pb-8 pt-sect-short">
        <motion.p
          initial="hidden"
          whileInView="visible"
          variants={variants}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
          className="p-medium"
        >
          Each destination we've covered here is fully filled <br />
          with significant information you will need
        </motion.p>
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={variants}
          transition={{ duration: 0.5, delay: 1 }}
          viewport={{ once: true }}
          className="relative"
        >
          <motion.button
            whileHover="hoverScale"
            transition={{ duration: 0.3 }}
            variants={variants}
            whileTap="tapScale"
            title="filter"
            className={`rounded-full bg-background-dark shadow-component lg:h-12 lg:w-12 xl:h-12 xl:w-12 2xl:h-16 2xl:w-16 3xl:h-16 3xl:w-16`}
            onClick={toggleFilterBoard}
          >
            <i
              className={`ri-filter-3-line p-large pointer-events-none m-auto select-none text-text-dark transition-all ${isFilterBoardOpen ? "rotate-180" : ""}`}
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
                className="filter-board absolute right-[5%] top-2/3 z-10 flex flex-col items-center gap-8 rounded-xl bg-background-light px-4 pb-8 pt-4 shadow-component lg:w-[30svw] 2xl:w-[25svw]"
              >
                <CountryDestinationFilter />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
      <div className="min-h-[60svh] w-full">
        <AnimatePresence mode="wait">
          {destinationLoading ? (
            <motion.div
              key={`loading-${country.name}-${currentPage}-${tags.join("-")}-${searchQuery}`}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={variants}
              exit="hiddenShort"
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="grid h-[50svh] w-full place-items-center py-sect-short"
            >
              <h3 className="h3-md">Loading...</h3>
            </motion.div>
          ) : destinationError ? (
            <motion.div
              key={`error-${country.name}-${currentPage}-${tags.join("-")}-${searchQuery}`}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={variants}
              exit="hiddenShort"
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="grid h-[50svh] w-full place-items-center py-sect-short"
            >
              <h3 className="h3-md">Error: {destinationError}</h3>
            </motion.div>
          ) : optimizedDestinations.length === 0 ? (
            <motion.div
              key={`no-destinations-${country.name}-${currentPage}-${tags.join("-")}-${searchQuery}`}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={variants}
              exit="hiddenShort"
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="grid h-[50svh] w-full place-items-center py-sect-short"
            >
              <h3 className="h3-md">No destinations found</h3>
            </motion.div>
          ) : (
            <motion.div
              key={`destinations-${country.name}-${currentPage}-${tags.join("-")}-${searchQuery}`}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              exit="hiddenShort"
              transition={{ duration: 0.5, ease: "easeInOut" }}
              variants={variants}
            >
              <motion.div
                variants={variants}
                transition={{ staggerChildren: 0.2 }}
                className="grid w-full grid-cols-3 gap-x-8 gap-y-12"
              >
                {optimizedDestinations?.map((destination) => (
                  <motion.div
                    variants={variants}
                    key={`destination-${destination._id}`}
                    className="w-full"
                  >
                    <DestinationCard
                      destination={{
                        ...destination,
                        images: destination.images.map((img) => img.src),
                      }}
                    />
                  </motion.div>
                ))}
              </motion.div>
              <motion.div variants={variants} className="w-full">
                <CatalogPagination
                  count={totalDestinations}
                  page={currentPage}
                  limit={limit}
                  handlePreviousClick={() =>
                    handlePagination(Math.max(1, currentPage - 1))
                  }
                  handlePageClick={(page) => handlePagination(page)}
                  handleNextClick={() => handlePagination(currentPage + 1)}
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  );
};

export default CountryDestinations;
