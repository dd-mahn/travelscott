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
import Pagination from "src/components/ui/Pagination";
import DestinationCard from "src/components/ui/DestinationCard";
import CountryCard from "src/components/ui/CountryCard";
import { FetchCountriesType, FetchDestinationType } from "src/types/FetchData";

const Discover: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedContinent, setSelectedContinent] = useState<string>("Asia");

  // Fetch data from API
  const {
    data: destinationData,
    loading: destinationLoading,
    error: destinationError,
  } = useFetch<FetchDestinationType>(`${BASE_URL}/destinations?page=${currentPage}`, [currentPage]);

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

  const featuredDestinations = useMemo(() => {
    if (destinations) {
      return getFeaturedDestinations(destinations);
    } else {
      return [];
    }
  }, [destinations]);

  // Handle select state

  const handleSelectContinent: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
    setSelectedContinent(event.currentTarget.value);
  };

  // Handle destination filter
  const filter = {
    locations: [],
    tags: [],
  };

  const countryNames = Array.isArray(countryData?.result)
    ? countryData.result.map((country) => country?.name)
    : [];
  const continentNames = Array.isArray(continents)
    ? continents.map((continent) => continent.name)
    : [];
  const filterLocations = [...countryNames, ...continentNames];

  const filterTags = [
    "Wilderness",
    "Culture&Heritage",
    "Food&Drink",
    "SoloJourneys",
    "CityScape",
    "Season&Festival",
    "Relaxation",
  ];

  const openFilterBoard = () => {
    const filterBoard = document.querySelector(".filter-board");
    if (filterBoard) {
      return () => {
        filterBoard.classList.toggle("hidden");
        filterBoard.classList.toggle("flex");
      };
    }
  };

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
              <div className="blur-blob blob-1 absolute z-0"></div>
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
      </section>

      {/* DESTINATION SECTION */}
      <section className="destinations px-sect flex flex-col items-center py-sect-default">
        <h1 className="h1-md">Discover destinations</h1>
        <div className="flex w-full flex-row justify-between py-sect-short">
          <p className="p-medium">
            Each destination we’ve covered here is fully filled <br />
            with significant information you will need
          </p>
          <div className="relative">
            <button
              title="filter"
              className="rounded-full bg-background-dark shadow-component lg:h-12 lg:w-12 xl:h-12 xl:w-12 2xl:h-16 2xl:w-16 3xl:h-16 3xl:w-16"
              onClick={openFilterBoard()}
            >
              <i className="ri-filter-3-line p-large m-auto text-text-dark"></i>
            </button>
            <div className="filter-board absolute right-5p top-2/3 z-10 hidden w-0.4svw flex-col items-center gap-8 rounded-xl bg-background-light px-4 pb-20 pt-4 shadow-section">
              <div className="flex w-full flex-row items-end gap-4">
                <div className="flex h-fit items-center justify-between rounded-md px-2 py-1 lg:border 2xl:border-2">
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
                  {filterLocations.map((location) => (
                    <span
                      key={location}
                      className="span-small rounded-2xl border-solid border-text-light px-4 lg:border 2xl:border-2"
                    >
                      {location}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex w-full flex-col items-start gap-2">
                <span className="span-regular uppercase">Tags</span>
                <div className="flex flex-wrap gap-2">
                  {filterTags.map((tag) => (
                    <span
                      key={tag}
                      className="span-small rounded-2xl border-solid border-text-light px-4 lg:border 2xl:border-2"
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
        {destinations && (
          <Pagination
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
