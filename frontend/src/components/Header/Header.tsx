import React, { useEffect, useRef, useState } from "react";
import "remixicon/fonts/remixicon.css";
import "src/components/Header/header.css";
import { NavLink } from "react-router-dom";
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
import ReactDOM from "react-dom";

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

  const handleSearch = () => {
    const searchValue = searchRef.current?.value;
    if (searchValue && searchValue !== "") {
      const filteredDestinations = destinations.filter(
        (destination) =>
          destination.name.toLowerCase().includes(searchValue.toLowerCase()) ||
          destination.country
            .toLowerCase()
            .includes(searchValue.toLowerCase()) ||
          destination.continent
            .toLowerCase()
            .includes(searchValue.toLowerCase()) ||
          destination.tags.some((tag) =>
            tag.toLowerCase().includes(searchValue.toLowerCase()),
          ),
      );
      const filteredCountries = countries.filter(
        (country) =>
          country.name.toLowerCase().includes(searchValue.toLowerCase()) ||
          country.continent.toLowerCase().includes(searchValue.toLowerCase()),
      );
      const filteredBlogs = blogs.filter(
        (blog) =>
          blog.title.toLowerCase().includes(searchValue.toLowerCase()) ||
          blog.tags.some((tag) =>
            tag.toLowerCase().includes(searchValue.toLowerCase()),
          ),
      );

      if (
        filteredDestinations.length > 0 ||
        filteredCountries.length > 0 ||
        filteredBlogs.length > 0
      ) {
        setDestinationResults(filteredDestinations);
        setCountryResults(filteredCountries);
        setBlogResults(filteredBlogs);
        setSearchResultOpen(true);
      }
    }
  };

  // Handle close search result
  const closeSearchResult = () => {
    setSearchResultOpen(false);
    if (inputDisplay) setInputDisplay(false);
    searchRef.current!.value = "";
  };

  const handleClickOutside = (e: Event) => {
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
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchResultOpen]);

  // Render logic

  return (
    <header className="px-sect fixed top-0 z-50 min-h-16 w-svw bg-transparent py-4 mix-blend-difference">
      <div className="lg:flex lg:items-center lg:justify-between">
        <NavLink to={"/"}>
          <h1 className="font-kaushan p-large">TravelScott</h1>
        </NavLink>
        <nav>
          <ul className="lg:flex lg:flex-row lg:justify-between lg:gap-4 xl:gap-6 2xl:gap-8 3xl:gap-8">
            {navs.map((item, index) => (
              <li className="nav__item" key={index}>
                <NavLink to={item.path} className={"p-regular transition-all"}>
                  {item.display}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className="lg:flex lg:gap-2 xl:gap-3 2xl:gap-3 3xl:gap-4">
          <div
            className={`search-bar relative transition-all duration-300 ${inputDisplay ? "border-white px-2 lg:border-b-2" : ""} flex items-center`}
          >
            <input
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
                // if (searchResultOpen) setSearchResultOpen(false);
              }}
            />
            <button
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
            </button>
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

          <button title="Toggle Contrast" className="p-large">
            <i className="ri-contrast-2-fill"></i>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
