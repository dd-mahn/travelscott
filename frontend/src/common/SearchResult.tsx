import React, { useMemo, useRef, useEffect, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Lenis from "lenis";
import Blog from "src/types/Blog";
import Country from "src/types/Country";
import Destination from "src/types/Destination";
import "src/common/styles/search-result.css";
import { Link } from "react-router-dom";
import {
  HoverVariants,
  TapVariants,
  VisibilityVariants,
} from "src/utils/constants/variants";

// Define the type for the component props
type SearchResultProps = {
  open: boolean;
  blogs: Blog[];
  countries: Country[];
  destinations: Destination[];
  closeFunc: () => void;
};

// Animation variants for the search result container
const variants = {
  hiddenY: VisibilityVariants.hiddenY,
  visible: VisibilityVariants.visible,
  exit: VisibilityVariants.hidden,
  hover: HoverVariants.hoverScale,
  tap: TapVariants.tapScale,
  hoverX: HoverVariants.hoverX,
};

// Define the SearchResult component
const SearchResult: React.FC<SearchResultProps> = ({
  open,
  blogs,
  countries,
  destinations,
  closeFunc,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Memoized render function for countries
  const renderCountries = useMemo(() => {
    if (countries.length === 0) return null;

    return (
      <div className="border-t border-gray pt-2">
        <p className="span-medium mb-2 font-prima">Countries</p>
        <div className="grid grid-cols-2 gap-x-2 gap-y-4 md:grid-cols-4">
          {countries.map((country) => (
            <Link
              to={`/discover/countries/${country._id}`}
              target="_top"
              key={country._id}
              className="flex cursor-pointer flex-col items-center gap-2"
            >
              <div className="h-full w-full overflow-hidden rounded-xl bg-gradient-to-t from-blue-gray-900 to-gray">
                <motion.img
                  whileHover="hover"
                  variants={variants}
                  src={country.images.flagImages?.[0]}
                  alt={country.name}
                  className="cursor-hover-small h-full w-full rounded-xl object-cover"
                  transition={{ duration: 0.4 }}
                />
              </div>
              <motion.span
                className="cursor-hover-small span-regular"
                whileHover="hoverX"
                variants={variants}
                transition={{ duration: 0.2 }}
              >
                {country.name}
              </motion.span>
            </Link>
          ))}
        </div>
      </div>
    );
  }, [countries]);

  // Memoized render function for destinations
  const renderDestinations = useMemo(() => {
    if (destinations.length === 0) return null;

    return (
      <div
        className={`${countries.length > 0 ? "mt-16" : ""} flex flex-col border-t border-gray pt-2`}
      >
        <p className="span-medium mb-2 font-prima">Destinations</p>
        <div className="grid h-fit grid-cols-2 gap-x-2 gap-y-4 md:grid-cols-3">
          {destinations.map((destination) => (
            <Link
              to={`/discover/destinations/${destination._id}`}
              target="_top"
              key={destination._id}
              className="flex h-[15svh] cursor-pointer flex-col items-center gap-2 rounded-xl"
            >
              <div className="h-full w-full overflow-hidden rounded-xl bg-gradient-to-t from-blue-gray-900 to-gray">
                <motion.img
                  whileHover="hover"
                  variants={variants}
                  src={destination.images?.[0]}
                  alt={destination.name}
                  className="cursor-hover-small h-full w-full rounded-xl object-cover"
                  transition={{ duration: 0.4 }}
                />
              </div>
              <motion.span
                className="cursor-hover-small span-regular"
                whileHover="hoverX"
                variants={variants}
                transition={{ duration: 0.2 }}
              >
                {destination.name}
              </motion.span>
            </Link>
          ))}
        </div>
      </div>
    );
  }, [destinations, countries.length]);

  // Memoized render function for blogs
  const renderBlogs = useMemo(() => {
    if (blogs.length === 0) return null;

    return (
      <div
        className={`${destinations.length > 0 || countries.length > 0 ? "mt-16" : ""} flex flex-col gap-4 border-t border-gray pt-2`}
      >
        <p className="span-medium mb-2 font-prima">Articles</p>
        {blogs.map((blog) => (
          <Link
            to={`/inspiration/${blog._id}`}
            target="_top"
            key={blog._id}
            className="flex h-20 cursor-pointer gap-4 rounded-xl lg:h-24 2xl:h-32"
          >
            <div className="h-full w-1/3 overflow-hidden rounded-xl bg-gradient-to-t from-blue-gray-900 to-gray">
              <motion.img
                whileHover="hover"
                variants={variants}
                src={blog.image}
                alt={blog.title}
                className="cursor-hover-small h-full w-full rounded-xl object-cover"
                transition={{ duration: 0.4 }}
              />
            </div>
            <motion.span
              className="cursor-hover-small span-regular mt-1 w-2/3 md:mt-3"
              whileHover="hoverX"
              variants={variants}
              transition={{ duration: 0.2 }}
            >
              {blog.title}
            </motion.span>
          </Link>
        ))}
      </div>
    );
  }, [blogs, destinations.length, countries.length]);

  // Effect for smooth scrolling using Lenis
  useEffect(() => {
    if (!open || !scrollContainerRef.current) return;

    const lenis = new Lenis({
      wrapper: scrollContainerRef.current,
      content: scrollContainerRef.current,
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
    });

    // Animation frame loop for Lenis
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Prevent default wheel behavior inside the scroll container
    const handleWheel = (e: WheelEvent) => {
      if (scrollContainerRef.current?.contains(e.target as Node)) {
        e.preventDefault();
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });

    // Cleanup function
    return () => {
      lenis.destroy();
      window.removeEventListener("wheel", handleWheel);
    };
  }, [open]);

  return (
    <AnimatePresence mode="wait">
      {open && (
        <motion.div
          key="search-result"
          initial="hiddenY"
          animate="visible"
          exit="exit"
          variants={variants}
          transition={{ duration: 0.4 }}
          className={`search-result fixed right-6 top-20 z-50 flex h-[60svh] w-[80svw] flex-col rounded-2xl bg-background-light pb-8 shadow-component dark:bg-background-dark-transparent dark:shadow-component-dark md:right-8 md:h-[50svh] md:w-[40svw] lg:right-12 xl:right-16 2xl:right-20 3xl:right-24`}
        >
          <div className="sticky top-0 z-10 flex w-full items-center justify-between rounded-2xl bg-background-light px-4 py-2 dark:bg-background-dark-transparent lg:px-8 lg:py-4">
            <span className="span-regular">
              {destinations.length + countries.length + blogs.length} results
              found
            </span>
            <motion.button
              variants={variants}
              whileHover="hover"
              whileTap="tap"
              title="Close"
              onClick={closeFunc}
            >
              <i className="cursor-hover-small p-large ri-close-line"></i>
            </motion.button>
          </div>
          <div
            ref={scrollContainerRef}
            className="custom-scrollbar flex-grow overflow-y-auto px-4 pb-4 lg:px-8 lg:pb-8"
          >
            {renderCountries}
            {renderDestinations}
            {renderBlogs}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default memo(SearchResult);
