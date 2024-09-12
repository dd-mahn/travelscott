import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import Lenis from "lenis";

// Component imports
import DestinationCard from "src/components/common/DestinationCard";
import { CatalogPagination } from "src/components/common/Pagination";
import Destination from "src/types/Destination";
import { FetchDestinationType } from "src/types/FetchData";
import { DestinationFilter } from "src/components/common/FIlterBoard";
import { BASE_URL } from "src/utils/config";
import useFetch from "src/hooks/useFetch";
import { useViewportWidth } from "src/utils/imageUtils";
import { optimizeImage } from "src/utils/optimizeImage";
import { useSelector } from "react-redux";
import { RootState } from "src/store/store";
import { HoverVariants, TapVariants, VisibilityVariants } from "src/utils/variants";

// Component props type
type DiscoverDestinationsProps = {
  countryNames: string[];
  continentNames: string[];
};

// Framer motion variants
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

const limit = 18;

// DiscoverDestinations component
const DiscoverDestinations: React.FC<DiscoverDestinationsProps> = ({
  continentNames,
  countryNames,
}) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const sectionRef = useRef<HTMLElement>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const viewportWidth = useViewportWidth();

  // Initialize Lenis
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

  // Handle url for fetching destination data
  const {
    continents,
    countries,
    tags,
    searchQuery: destinationSearchQuery,
  } = useSelector((state: RootState) => state.filter.destination);

  const url = useMemo(() => {
    let url = `${BASE_URL}/destinations?page=${currentPage}&limit=${limit}`;
    if (tags.length > 0) {
      url += `&tags=${tags.join(",")}`;
    }
    if (countries.length > 0) {
      url += `&countries=${countries.join(",")}`;
    }
    if (continents.length > 0) {
      url += `&continents=${continents.join(",")}`;
    }
    if (destinationSearchQuery !== "") {
      url += `&searchQuery=${destinationSearchQuery}`;
    }
    return url;
  }, [currentPage, tags, countries, continents, destinationSearchQuery]);

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

  // Pagination handler
  const handlePagination = useCallback((newPage: number) => {
    setCurrentPage(newPage);
    if (sectionRef.current && lenisRef.current) {
      lenisRef.current.scrollTo(sectionRef.current, { offset: -100 });
    }
  }, []);

  // Optimize images for destinations
  const optimizedDestinations = useMemo(() => {
    return destinations.map((destination) => ({
      ...destination,
      images: destination.images.map((image) =>
        optimizeImage(image, {
          width: Math.min(viewportWidth, 1920),
          quality: 80,
          format: "auto",
        }),
      ),
    }));
  }, [destinations, viewportWidth]);

  return (
    <section
      ref={sectionRef}
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
          initial="hiddenFullY"
          whileInView="visible"
          viewport={{ once: true }}
          variants={variants}
          transition={{ duration: 0.5 }}
          className="h1-md"
        >
          Discover destinations
        </motion.h1>
      </div>

      <div className="flex w-full flex-row justify-between py-sect-short">
        <motion.p
          initial="hiddenY"
          whileInView="visible"
          variants={variants}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
          className="p-medium"
        >
          Each destination we've covered here is fully filled <br />
          with significant information you will need.
        </motion.p>
        <motion.div
          initial="hiddenY"
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
            onClick={() => toggleFilterBoard()}
          >
            <i
              className={`ri-filter-3-line p-large pointer-events-none m-auto select-none text-text-dark transition-all`}
            ></i>
          </motion.button>
          <AnimatePresence mode="wait">
            {isFilterBoardOpen && (
              <DestinationFilter
                key="destination-filter"
                countryNames={countryNames}
                continentNames={continentNames}
              />
            )}
          </AnimatePresence>
        </motion.div>
      </div>
      <div className="min-h-[50svh] w-full">
        <AnimatePresence mode="wait">
          {destinationLoading ? (
            <motion.div
              key={`loading-state-${currentPage}-${tags.join(',')}-${countries.join(',')}-${continents.join(',')}-${destinationSearchQuery}`}
              initial="hiddenY"
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
              key={`error-state-${currentPage}-${tags.join(',')}-${countries.join(',')}-${continents.join(',')}-${destinationSearchQuery}`}
              initial="hiddenY"
              whileInView="visible"
              viewport={{ once: true }}
              variants={variants}
              exit="hiddenShort"
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="grid h-[50svh] w-full place-items-center py-sect-short"
            >
              <h3 className="h3-md">
                Error... Please reload the page or try again later.
              </h3>
            </motion.div>
          ) : optimizedDestinations.length === 0 ? (
            <motion.div
              key={`no-destinations-state-${currentPage}-${tags.join(',')}-${countries.join(',')}-${continents.join(',')}-${destinationSearchQuery}`}
              initial="hiddenY"
              whileInView="visible"
              viewport={{ once: true }}
              variants={variants}
              exit="hiddenShort"
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="grid h-[50svh] w-full place-items-center py-sect-short"
            >
              <h3 className="h3-md">No destinations found.</h3>
            </motion.div>
          ) : (
            optimizedDestinations.length > 0 && (
              <motion.div
                key={`discover-destinations-${currentPage}-${tags.join(',')}-${countries.join(',')}-${continents.join(',')}-${destinationSearchQuery}`}
                initial="hiddenY"
                whileInView="visible"
                viewport={{ once: true }}
                exit="hiddenShort"
                transition={{
                  duration: 0.5,
                  ease: "easeInOut",
                }}
                variants={variants}
              >
                <motion.div
                  variants={variants}
                  transition={{
                    staggerChildren: 0.2,
                  }}
                  className="grid w-full grid-cols-3 items-start gap-x-8 gap-y-12"
                >
                  {(destinations as Destination[])?.map((destination) => (
                    <motion.div
                      variants={variants}
                      key={`destination-${destination._id}`}
                      className="w-full"
                    >
                      <DestinationCard destination={destination} />
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
            )
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default memo(DiscoverDestinations);
