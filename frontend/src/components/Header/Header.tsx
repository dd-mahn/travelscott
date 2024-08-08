import React, { useCallback, useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import "remixicon/fonts/remixicon.css";
import ReactDOM from "react-dom";
import { motion } from "framer-motion";

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
import SearchResult from "../ui/SearchResult";
import { input } from "@material-tailwind/react";
import { search } from "src/utils/handleSearch";

// Navigation items
const navs = [
  {
    path: "/about",
    display: "About",
  },
  {
    path: "/discover",
    display: "Discover",
  },
  {
    path: "/inspiration",
    display: "Inspiration",
  },
  {
    path: "/contact",
    display: "Contact",
  },
];
// Handle motions
const HeaderVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },

  inputVisible: {
    width: "100%",
    transition: { duration: 0.3 },
  },
  inputHidden: {
    width: 0,
    transition: { duration: 0.3 },
    transitionEnd: {
      display: "none",
    },
  },
};

const HoverVariants = {
  lineHover: (size: string) => {
    return {
      borderBottom: `${size} solid #fff`,
    };
  },
  scaleHover: {
    scale: 1.1,
    transition: {
      duration: 0.2,
      type: "tween",
    },
  },
  rotateHover: {
    rotate: [0, 360, 360, 0],
    transition: {
      duration: 0.8,
      ease: "linear",
    },
  },
};

// Header component
const Header = () => {
  const [inputDisplay, setInputDisplay] = useState(false);
  const [searchResultOpen, setSearchResultOpen] = useState(false);
  const [destinationResults, setDestinationResults] = useState<Destination[]>(
    [],
  );
  const [countryResults, setCountryResults] = useState<Country[]>([]);
  const [blogResults, setBlogResults] = useState<Blog[]>([]);

  // Handle fetch data for search
  const {
    data: destinationsData,
    loading: destinationsLoading,
    error: destinationsError,
  } = useFetch<FetchDestinationType>(`${BASE_URL}/destinations?limit=100`);

  const {
    data: countriesData,
    loading: countriesLoading,
    error: countriesError,
  } = useFetch<FetchCountriesType>(`${BASE_URL}/countries?limit=100`);

  const {
    data: blogsData,
    loading: blogsLoading,
    error: blogsError,
  } = useFetch<FetchBlogsType>(`${BASE_URL}/blogs?limit=100`);

  // Handle fetched data
  const destinations = destinationsData?.result as Destination[];
  const countries = countriesData?.result as Country[];
  const blogs = blogsData?.result as Blog[];

  // Handle search
  const searchRef = useRef<HTMLInputElement>(null);

  const handleSearch = useCallback(() => {
    search(
      searchRef,
      destinations,
      countries,
      blogs,
      setDestinationResults,
      setCountryResults,
      setBlogResults,
      setSearchResultOpen,
    );
  }, [destinations, countries, blogs]);

  // Handle close search result
  const closeSearchResult = () => {
    setSearchResultOpen(false);
    if (inputDisplay) setInputDisplay(false);
    searchRef.current!.value = "";
  };

  const handleSearchResultClickOutside = (e: Event) => {
    const searchResult = document.querySelector(".search-result");

    if (
      searchRef.current &&
      !searchRef.current.contains(e.target as HTMLElement) &&
      searchResult &&
      !searchResult.contains(e.target as HTMLElement)
    ) {
      closeSearchResult();
    }
  };

  useEffect(() => {
    if (searchResultOpen) {
      document.addEventListener("mousedown", handleSearchResultClickOutside);
    } else {
      document.removeEventListener("mousedown", handleSearchResultClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleSearchResultClickOutside);
    };
  }, [searchResultOpen]);

  // Render logic
  return (
    <motion.header
      variants={HeaderVariants}
      initial="hidden"
      animate="visible"
      transition={{
        duration: 0.3,
      }}
      className="px-sect fixed top-0 z-50 min-h-16 w-svw bg-transparent py-4 mix-blend-difference"
    >
      <div className="lg:flex lg:items-center lg:justify-between">
        <NavLink to={"/"}>
          <motion.h1
            variants={HoverVariants}
            whileHover="scaleHover"
            whileTap={{ scale: 1 }}
            className="font-kaushan p-large"
          >
            TravelScott
          </motion.h1>
        </NavLink>
        <nav>
          <ul className="lg:flex lg:flex-row lg:justify-between lg:gap-4 xl:gap-6 2xl:gap-8 3xl:gap-8">
            {navs.map((item, index) => (
              <motion.li
                variants={HoverVariants}
                whileHover="scaleHover"
                whileTap={{ scale: 1 }}
                // whileHover={HoverVariants.lineHover("var(--size)")}
                // transition={{ duration: 0.3, ease: "linear" }}
                className="nav__item lg:[--size:1px] 2xl:[--size:1.5px]"
                key={index}
                layout
              >
                <NavLink to={item.path} className={"p-regular transition-all"}>
                  {item.display}
                </NavLink>
              </motion.li>
            ))}
          </ul>
        </nav>
        <div className="lg:flex lg:gap-2 xl:gap-3 2xl:gap-3 3xl:gap-4">
          <div
            className={`search-bar relative transition-all duration-300 ${inputDisplay ? "border-white px-2 lg:border-b-[1px] 2xl:border-b-[1.5px]" : ""} flex items-center`}
          >
            <motion.input
              type="text"
              placeholder="Search"
              id="search"
              autoComplete="off"
              ref={searchRef}
              className={`${inputDisplay ? "" : "hidden"} p-small bg-transparent text-text-dark outline-none`}
              onChange={() => {
                if (searchRef.current?.value) handleSearch();
                if (searchRef.current?.value === "") setSearchResultOpen(false);
              }}
              onBlur={() => {
                if (searchRef.current?.value === "") setInputDisplay(false);
              }}
            />
            <motion.button
              variants={HoverVariants}
              whileHover="scaleHover"
              whileTap={{ scale: 1 }}
              title="Search"
              className="p-large px-1"
              onClick={() => {
                if (!inputDisplay) {
                  setInputDisplay(true);
                  console.log(inputDisplay);
                  setTimeout(() => {
                    searchRef.current?.focus();
                    if (searchRef.current?.value !== "") handleSearch();
                  }, 100);
                } else if (searchRef.current?.value) {
                  handleSearch();
                }
              }}
            >
              <i className="ri-search-2-line"></i>
            </motion.button>
            {ReactDOM.createPortal(
              <SearchResult
                open={searchResultOpen}
                blogs={blogResults}
                countries={countryResults}
                destinations={destinationResults}
                closeFunc={closeSearchResult}
              />,
              document.body, // Render the search result block outside of the header
            )}
          </div>

          <motion.button
            variants={HoverVariants}
            whileHover="scaleHover"
            whileTap={{ scale: 1 }}
            title="Toggle Contrast"
            className="p-large"
          >
            <i className="ri-contrast-2-fill"></i>
          </motion.button>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
