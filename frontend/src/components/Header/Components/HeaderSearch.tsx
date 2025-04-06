import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import ReactDOM from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import useDebounce from "src/hooks/useDebounce/useDebounce";
import useFetch from "src/hooks/useFetch/useFetch";
import {
  FetchBlogsType,
  FetchCountriesType,
  FetchDestinationType,
} from "src/types/FetchData";
import config from "src/config/config";
import SearchResult from "src/common/SearchResult/SearchResult";
import { BorderVariants, HoverVariants, InputVariants } from "src/utils/constants/headerVariants";
import { useViewportWidth } from "src/hooks/useViewportWidth/useViewportWidth";

const HeaderSearch: React.FC = () => {
  const viewportWidth = useViewportWidth();

  // State variables
  const [inputDisplay, setInputDisplay] = useState(false);
  const [searchResultOpen, setSearchResultOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Refs
  const searchRef = useRef<HTMLInputElement>(null);

  // Debounced search query
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  // Fetch data
  const { data: destinationsData } = useFetch<FetchDestinationType>(
    "destinations",
    `/api/destinations?searchQuery=${debouncedSearchQuery}`,
    inputDisplay && !!debouncedSearchQuery,
  );
  const { data: countriesData } = useFetch<FetchCountriesType>(
    "countries",
    `/api/countries?searchQuery=${debouncedSearchQuery}`,
    inputDisplay && !!debouncedSearchQuery,
  );
  const { data: blogsData } = useFetch<FetchBlogsType>(
    "blogs",
    `/api/blogs?searchQuery=${debouncedSearchQuery}`,
    inputDisplay && !!debouncedSearchQuery,
  );

  // Memoized data
  const destinations = useMemo(
    () => destinationsData?.result || [],
    [destinationsData],
  );
  const countries = useMemo(() => countriesData?.result || [], [countriesData]);
  const blogs = useMemo(() => blogsData?.result || [], [blogsData]);

  // Effect to handle search result visibility
  useEffect(() => {
    setSearchResultOpen(!!debouncedSearchQuery);
  }, [debouncedSearchQuery]);

  // Close search result
  const closeSearchResult = useCallback(() => {
    setSearchResultOpen(false);
    setInputDisplay(false);
    if (searchRef.current) searchRef.current.value = "";
    setSearchQuery("");
  }, []);

  // Handle click outside search result
  const handleSearchResultClickOutside = useCallback(
    (e: MouseEvent) => {
      const searchResult = document.querySelector(".search-result");
      if (
        searchRef.current &&
        !searchRef.current.contains(e.target as Node) &&
        searchResult &&
        !searchResult.contains(e.target as Node)
      ) {
        closeSearchResult();
      }
    },
    [closeSearchResult],
  );

  // Handle search button click
  const handleSearchClick = useCallback(() => {
    if (!inputDisplay) {
      setInputDisplay(true);
      setTimeout(() => {
        searchRef.current?.focus();
      }, 100);
    }
  }, [inputDisplay]);

  // Effect to add/remove event listener for click outside search result
  useEffect(() => {
    if (searchResultOpen) {
      document.addEventListener("mousedown", handleSearchResultClickOutside);
    } else {
      document.removeEventListener("mousedown", handleSearchResultClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleSearchResultClickOutside);
    };
  }, [searchResultOpen, handleSearchResultClickOutside]);

  return (
    <div className="search-bar relative flex items-center">
      <AnimatePresence>
        {inputDisplay && (
          <motion.div
            key="search-input-container"
            variants={InputVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.4 }}
            className="absolute right-full top-0 overflow-hidden md:right-0 md:top-full md:mr-0 lg:right-full lg:top-0 lg:mr-2"
          >
            <input
              type="text"
              placeholder="Search"
              id="search"
              autoComplete="off"
              ref={searchRef}
              className="span-small w-16 bg-transparent text-text-dark outline-none placeholder:text-gray dark:text-text-dark md:w-24 lg:w-40"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onBlur={() => {
                if (searchQuery === "") setInputDisplay(false);
              }}
            />
            <motion.div
              variants={BorderVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.4 }}
              className="absolute bottom-0 left-0 h-[1px] bg-text-dark dark:bg-text-dark 2xl:h-[1.5px]"
            />
          </motion.div>
        )}
      </AnimatePresence>
      <motion.button
        variants={HoverVariants}
        whileHover="hoverScale"
        transition={{ duration: 0.2 }}
        whileTap={{ scale: 1 }}
        title="Search"
        className={`${viewportWidth > 768 ? "p-large" : "h2-inter"} px-1`}
        onClick={handleSearchClick}
      >
        <i className="ri-search-2-line pointer-events-none"></i>
      </motion.button>
      {ReactDOM.createPortal(
        <SearchResult
          open={searchResultOpen}
          blogs={blogs}
          countries={countries}
          destinations={destinations}
          closeFunc={closeSearchResult}
        />,
        document.body,
      )}
    </div>
  );
};

export default memo(HeaderSearch);
