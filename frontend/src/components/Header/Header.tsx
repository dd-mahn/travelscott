import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  useMemo,
  memo,
} from "react";
import { NavLink } from "react-router-dom";
import "remixicon/fonts/remixicon.css";
import ReactDOM from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import useDebounce from "src/hooks/useDebounce"; // Import the useDebounce hook

// Styles and components
import "src/components/Header/header.css";
import useFetch from "src/hooks/useFetch";
import {
  FetchBlogsType,
  FetchCountriesType,
  FetchDestinationType,
} from "src/types/FetchData";
import { BASE_URL } from "src/utils/config";
import Destination from "src/types/Destination";
import Country from "src/types/Country";
import Blog from "src/types/Blog";
import SearchResult from "../../common/SearchResult";
import { search } from "src/utils/handleSearch";

// Navigation items
const navs = [
  { path: "/about", display: "About" },
  { path: "/discover", display: "Discover" },
  { path: "/inspiration", display: "Inspiration" },
  { path: "/contact", display: "Contact" },
];

// Animation variants
const HeaderVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const InputVariants = {
  hidden: { opacity: 0, x: 20, width: 0 },
  visible: {
    opacity: 1,
    x: 0,
    width: "10rem",
    transition: {
      duration: 0.5,
      width: { duration: 0.4 },
    },
  },
  exit: {
    opacity: 0,
    x: 20,
    width: 0,
    transition: {
      duration: 0.5,
      width: { duration: 0.4 },
    },
  },
};

const BorderVariants = {
  hidden: { width: 0 },
  visible: {
    width: "100%",
    transition: {
      duration: 0.3,
      delay: 0.2,
    },
  },
  exit: {
    width: 0,
    transition: {
      duration: 0.2,
    },
  },
};

const HoverVariants = {
  lineHover: (size: string) => ({ borderBottom: `${size} solid #fff` }),
  hoverScale: {
    scale: 1.1,
    transition: { duration: 0.3, ease: "easeInOut" },
  },
  rotateHover: {
    rotate: [0, 360, 360, 0],
    transition: { duration: 0.8, ease: "linear" },
  },
};

// Header component
const Header: React.FC = () => {
  // State management
  const [inputDisplay, setInputDisplay] = useState(false);
  const [searchResultOpen, setSearchResultOpen] = useState(false);
  const [destinationResults, setDestinationResults] = useState<Destination[]>(
    [],
  );
  const [countryResults, setCountryResults] = useState<Country[]>([]);
  const [blogResults, setBlogResults] = useState<Blog[]>([]);

  // Fetch data for search
  const { data: destinationsData } = useFetch<FetchDestinationType>(
    `${BASE_URL}/destinations?limit=100`,
  );
  const { data: countriesData } = useFetch<FetchCountriesType>(
    `${BASE_URL}/countries?limit=100`,
  );
  const { data: blogsData } = useFetch<FetchBlogsType>(
    `${BASE_URL}/blogs?limit=100`,
  );

  // Extract results from fetched data
  const destinations = useMemo(
    () => (destinationsData?.result as Destination[]) || [],
    [destinationsData],
  );
  const countries = useMemo(
    () => (countriesData?.result as Country[]) || [],
    [countriesData],
  );
  const blogs = useMemo(() => (blogsData?.result as Blog[]) || [], [blogsData]);

  // Ref for search input
  const searchRef = useRef<HTMLInputElement>(null);

  // Handle search functionality
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 300); // Debounce for 300ms

  const handleSearch = useCallback(() => {
    if (debouncedSearchQuery) {
      search(
        debouncedSearchQuery,
        destinations,
        countries,
        blogs,
        setDestinationResults,
        setCountryResults,
        setBlogResults,
        setSearchResultOpen,
      );
    } else {
      setSearchResultOpen(false);
    }
  }, [debouncedSearchQuery, destinations, countries, blogs]);

  // Use effect to trigger search when debounced query changes
  useEffect(() => {
    handleSearch();
  }, [debouncedSearchQuery, handleSearch]);

  // Update the search input change handler
  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Close search result
  const closeSearchResult = useCallback(() => {
    setSearchResultOpen(false);
    setInputDisplay(false);
    if (searchRef.current) searchRef.current.value = "";
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

  // Handle search click
  const handleSearchClick = useCallback(() => {
    if (!inputDisplay) {
      setInputDisplay(true);
      setTimeout(() => {
        if (searchRef.current) {
          searchRef.current.focus();
          if (searchRef.current.value !== "") handleSearch();
        }
      }, 100);
    } else if (searchRef.current?.value) {
      handleSearch();
    }
  }, [inputDisplay, handleSearch]);

  // Add/remove event listener for click outside search result
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

  const renderNavItems = useMemo(
    () =>
      navs.map((item, index) => (
        <motion.li
          key={index}
          variants={HoverVariants}
          whileHover="hoverScale"
          transition={{ duration: 0.2 }}
          whileTap={{ scale: 1 }}
          className="nav__item h-fit w-fit"
        >
          <NavLink
            to={item.path}
            target="_top"
            className={({ isActive, isPending }) =>
              isPending
                ? "p-regular opacity-40"
                : isActive
                  ? "p-regular"
                  : "p-regular opacity-40 transition-opacity duration-300 hover:opacity-100"
            }
          >
            {item.display}
          </NavLink>
        </motion.li>
      )),
    [],
  );

  return (
    <motion.header
      variants={HeaderVariants}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.3 }}
      className="px-sect fixed top-0 z-50 min-h-16 w-svw bg-transparent py-4 mix-blend-difference"
    >
      <div className="lg:flex lg:items-center lg:justify-between">
        {/* Logo */}
        <NavLink to="/" target="_top">
          <motion.h1
            layoutId="main-logo"
            variants={HoverVariants}
            whileHover="hoverScale"
            transition={{ duration: 0.2 }}
            whileTap={{ scale: 1 }}
            className="cursor-hover-small p-large font-logo"
          >
            TravelScott
          </motion.h1>
        </NavLink>

        {/* Navigation menu */}
        <motion.ul
          layout
          className="lg:flex lg:flex-row lg:justify-between lg:gap-4 xl:gap-6 2xl:gap-8 3xl:gap-8"
        >
          {renderNavItems}
        </motion.ul>

        {/* Search and contrast toggle */}
        <div className="lg:flex lg:gap-2 xl:gap-3 2xl:gap-3 3xl:gap-4">
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
                  className="absolute right-full mr-2 overflow-hidden"
                >
                  <input
                    type="text"
                    placeholder="Search"
                    id="search"
                    autoComplete="off"
                    ref={searchRef}
                    className="p-small w-40 bg-transparent text-text-dark outline-none"
                    value={searchQuery}
                    onChange={handleSearchInputChange}
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
                    className="absolute bottom-0 left-0 bg-white lg:h-[1px] 2xl:h-[1.5px]"
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
              className="p-large px-1"
              onClick={handleSearchClick}
            >
              <i className="ri-search-2-line pointer-events-none"></i>
            </motion.button>
            {ReactDOM.createPortal(
              <SearchResult
                open={searchResultOpen}
                blogs={blogResults}
                countries={countryResults}
                destinations={destinationResults}
                closeFunc={closeSearchResult}
              />,
              document.body,
            )}
          </div>

          <motion.button
            variants={HoverVariants}
            whileHover="hoverScale"
            transition={{ duration: 0.2 }}
            whileTap={{ scale: 1 }}
            title="Toggle Contrast"
            className="p-large"
          >
            <i className="ri-contrast-2-fill pointer-events-none"></i>
          </motion.button>
        </div>
      </div>
    </motion.header>
  );
};

export default memo(Header);
