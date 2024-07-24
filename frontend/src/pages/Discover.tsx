import React, { useEffect, useMemo, useState } from "react";
import useFetch from "src/hooks/useFetch";
import Country from "src/types/Country";
import Destination from "src/types/Destination";
import { BASE_URL } from "src/utils/config";
import { useNavigate } from "react-router-dom";

import "src/styles/discover.css";

import asiaMap from "src/assets/images/ui/maps/Asia.png";
import europeMap from "src/assets/images/ui/maps/Europe.png";
import africaMap from "src/assets/images/ui/maps/Africa.png";
import northAmericaMap from "src/assets/images/ui/maps/NorthAmerica.png";
import southAmericaMap from "src/assets/images/ui/maps/SouthAmerica.png";
import oceaniaMap from "src/assets/images/ui/maps/Oceania.png";
import { getFeaturedDestinations } from "src/utils/getFeaturedDestinations";
import { getCountryByContinent } from "src/utils/getCountryByContinent";
import { CatalogPagination } from "src/components/ui/Pagination";
import DestinationCard from "src/components/ui/DestinationCard";
import CountryCard from "src/components/ui/CountryCard";
import { FetchCountriesType, FetchDestinationType } from "src/types/FetchData";
import RelatedSections from "src/components/ui/RelatedSections";
import { set } from "lodash";

const Discover: React.FC = () => {
  // State hooks for current page, destinations, countries, selected continent, filter tags, filter countries, filter continents
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedContinent, setSelectedContinent] = useState<string>("Asia");
  const [filterTags, setFilterTags] = useState<string[]>([]);
  const [filterCountries, setFilterCountries] = useState<string[]>([]);
  const [filterContinents, setFilterContinents] = useState<string[]>([]);

  // Handle url for fetching destination data
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

  // Fetch destination and country data
  const {
    data: destinationData,
    loading: destinationLoading,
    error: destinationError,
  } = useFetch<FetchDestinationType>(url, [currentPage]);

  const {
    data: countryData,
    loading: countryLoading,
    error: countryError,
  } = useFetch<FetchCountriesType>(`${BASE_URL}/countries`);

  // Handle fetched data for rendering
  const totalDestinations = destinationData?.count as number;
  useEffect(() => {
    if (destinationData?.result) {
      setDestinations(destinationData.result);
    }

    if (countryData?.result) {
      setCountries(countryData.result);
    }
  }, [destinationData, countryData]);

  // Handle continent data
  const continents = useMemo(() => {
    if (countryData?.result) {
      return [
        {
          name: "Asia",
          countries: getCountryByContinent(countries, "Asia"),
          count: getCountryByContinent(countries, "Asia").length,
          image: asiaMap,
        },
        {
          name: "Africa",
          countries: getCountryByContinent(countries, "Africa"),
          count: getCountryByContinent(countries, "Africa").length,
          image: africaMap,
        },
        {
          name: "Europe",
          countries: getCountryByContinent(countries, "Europe"),
          count: getCountryByContinent(countries, "Europe").length,
          image: europeMap,
        },
        {
          name: "North America",
          countries: getCountryByContinent(countries, "North America"),
          count: getCountryByContinent(countries, "North America").length,
          image: northAmericaMap,
        },
        {
          name: "South America",
          countries: getCountryByContinent(countries, "South America"),
          count: getCountryByContinent(countries, "South America").length,
          image: southAmericaMap,
        },
        {
          name: "Oceania",
          countries: getCountryByContinent(countries, "Oceania"),
          count: getCountryByContinent(countries, "Oceania").length,
          image: oceaniaMap,
        },
      ];
    } else {
      return [];
    }
  }, [countryData]);

  // Handle featured destinations
  const featuredDestinations = useMemo(() => {
    if (destinations) {
      return getFeaturedDestinations(destinations);
    } else {
      return [];
    }
  }, [destinations]);

  // Handle select state for continent
  const handleSelectContinent: React.ChangeEventHandler<HTMLSelectElement> = (
    event,
  ) => {
    setSelectedContinent(event.currentTarget.value);
  };

  // Handle filter board state
  const [isFilterBoardOpen, setIsFilterBoardOpen] = useState<boolean>(false);
  const toggleFilterBoard = () => {
    setIsFilterBoardOpen(!isFilterBoardOpen);
  };
  // Handle country and continent names
  const countryNames = Array.isArray(countryData?.result)
    ? countryData.result.map((country) => country?.name)
    : [];
  const continentNames = Array.isArray(continents)
    ? continents.map((continent) => continent.name)
    : [];

  // Static tags
  const tags = [
    "Wilderness",
    "Culture&Heritage",
    "Food&Drink",
    "SoloJourneys",
    "CityScape",
    "Season&Festival",
    "Relaxation",
  ];

  // Handle navigating
  const navigate = useNavigate();

  return (
    <main className="discover">
      {/* POSTER SECTION */}
      {!destinationError &&
        !destinationLoading &&
        featuredDestinations.length !== 0 && (
          <section className="posters h-screen">
            <div
              className="poster px-sect relative flex w-full cursor-pointer flex-col gap-0 py-sect-short"
              style={{
                backgroundImage: `url(${featuredDestinations[0].images[5]})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              onClick={() => {
                navigate(`destinations/${featuredDestinations[0]._id}`);
              }}
            >
              <div className="absolute right-0 top-0 h-full w-full bg-background-dark bg-opacity-30"></div>
              <div className="z-10 w-fit pt-sect-short">
                <h1 className="big-heading text-text-dark">
                  {featuredDestinations[0].name}
                </h1>
                <div className="flex w-full justify-between">
                  <span className="span-medium text-text-dark">
                    {featuredDestinations[0].country}
                  </span>
                  <span className="span-medium mr-2 text-text-dark">
                    {featuredDestinations[0].continent}
                  </span>
                </div>
              </div>
            </div>
          </section>
        )}

      {/* COUNTRY SECTION */}
      <section className="countries px-sect flex w-full flex-col items-center gap-4 py-sect-default">
        <h1 className="h1-md">Discover countries</h1>
        <form action="" className="w-1/6">
          <select
            title="continent"
            id="continentSelect"
            className="p-regular w-full rounded-md border bg-transparent px-2 py-1 outline-none"
            onChange={handleSelectContinent}
          >
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="Africa">Africa</option>
            <option value="South America">South America</option>
            <option value="North America">North America</option>
            <option value="Oceania">Oceania</option>
          </select>
        </form>
        <div className="w-full py-sect-short">
          {continents.map((continent) => {
            if (selectedContinent === continent.name) {
              return (
                <div
                  key={continent.name}
                  id="continent"
                  className="flex w-full flex-row gap-12"
                >
                  <div className="relative flex items-center justify-center">
                    <img
                      src={continent.image}
                      alt="map"
                      className="w-0.4svw rounded-xl"
                    />
                    <h2 className="h2-md absolute m-auto uppercase text-main-brown">
                      {continent.name}
                    </h2>
                  </div>

                  <div className="flex flex-wrap justify-between gap-12">
                    {countryLoading && <p className="p-regular">Loading...</p>}
                    {countryError && (
                      <p className="p-regular">
                        Please reload the page or <br /> try again later.
                      </p>
                    )}
                    {!countryLoading &&
                      !countryError &&
                      continent.countries.map((country) => (
                        <CountryCard country={country} key={country._id} />
                      ))}
                  </div>
                </div>
              );
            }
            return null;
          })}
        </div>
      </section>

      {/* RELATED ARTICLES SECTION */}
      <section className="related px-sect flex flex-col">
        <h2 className="h2-md">Related articles</h2>
        <RelatedSections type={"blog"} data={selectedContinent} />
      </section>

      {/* DESTINATION SECTION */}
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
        <h1 className="h1-md">Discover destinations</h1>
        <div className="flex w-full flex-row justify-between py-sect-short">
          <p className="p-medium">
            Each destination we’ve covered here is fully filled <br />
            with significant information you will need
          </p>
          <div className="relative">
            <button
              title="filter"
              className={`${isFilterBoardOpen ? "rotate-180" : ""} rounded-full bg-background-dark shadow-component lg:h-12 lg:w-12 xl:h-12 xl:w-12 2xl:h-16 2xl:w-16 3xl:h-16 3xl:w-16`}
              onClick={() => toggleFilterBoard()}
            >
              <i className="ri-filter-3-line p-large m-auto text-text-dark"></i>
            </button>
            <div
              className={`${isFilterBoardOpen ? "flex" : "hidden"} filter-board absolute right-5p top-2/3 z-10 w-0.4svw flex-col items-center gap-8 rounded-xl bg-background-light px-4 pb-20 pt-4 shadow-section`}
            >
              <div className="flex w-full flex-row items-end gap-4">
                <div className="flex h-fit items-center justify-between rounded-md border border-gray px-2 py-1">
                  <input
                    type="text"
                    placeholder="Search..."
                    className="p-regular w-4/5 bg-transparent outline-none"
                  />
                  <button title="search" className="outline-none">
                    <i className="ri-search-line span-regular"></i>
                  </button>
                </div>
              </div>

              <div className="flex w-full flex-col items-start gap-2">
                <span className="span-regular uppercase">Location</span>
                <div className="flex flex-wrap gap-2">
                  {continentNames.map((continent) => (
                    <span
                      key={continent}
                      className={`${filterContinents.includes(continent) ? "bg-background-dark text-text-dark" : "bg-background-light text-text-light"} span-small cursor-pointer rounded-2xl border border-gray px-4`}
                      onClick={() => {
                        if (filterContinents.includes(continent)) {
                          setFilterContinents(
                            filterContinents.filter(
                              (item) => item !== continent,
                            ),
                          );
                        } else {
                          setFilterContinents([...filterContinents, continent]);
                        }
                      }}
                    >
                      {continent}
                    </span>
                  ))}
                  {countryNames.map((country) => (
                    <span
                      key={country}
                      className={`${filterCountries.includes(country) ? "bg-background-dark text-text-dark" : "bg-background-light text-text-light"}span-small cursor-pointer rounded-2xl border border-gray px-4`}
                      onClick={() => {
                        if (filterCountries.includes(country)) {
                          setFilterCountries(
                            filterCountries.filter((item) => item !== country),
                          );
                        } else {
                          setFilterCountries([...filterCountries, country]);
                        }
                      }}
                    >
                      {country}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex w-full flex-col items-start gap-2">
                <span className="span-regular uppercase">Tags</span>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className={`${filterTags.includes(tag) ? "bg-background-dark text-text-dark" : "bg-background-light text-text-light"} span-small cursor-pointer rounded-2xl border border-gray px-4`}
                      onClick={() => {
                        if (filterTags.includes(tag)) {
                          setFilterTags(
                            filterTags.filter((item) => item !== tag),
                          );
                        } else {
                          setFilterTags([...filterTags, tag]);
                        }
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="grid w-full auto-cols-1/3 grid-flow-col gap-8">
          {destinationLoading && <p>Loading...</p>}
          {destinationError && (
            <p>
              Please reload the page or <br /> try again later.
            </p>
          )}
          {destinations &&
            (destinations as Destination[])?.map((destination) => (
              <DestinationCard
                destination={destination}
                key={destination._id}
              />
            ))}
        </div>
        {destinations.length > 0 && (
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
        )}
      </section>
    </main>
  );
};

export default Discover;
