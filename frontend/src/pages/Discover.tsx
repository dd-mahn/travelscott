import React, { useState } from "react";
import useFetch from "src/hooks/useFetch";
import Country from "src/types/Country";
import Destination from "src/types/Destination";
import { BASE_URL } from "src/utils/config";

import "src/styles/discover.css";

import asiaMap from "src/assets/images/ui/maps/Asia.png";
import europeMap from "src/assets/images/ui/maps/Europe.png";
import africaMap from "src/assets/images/ui/maps/Africa.png";
import northAmericaMap from "src/assets/images/ui/maps/NorthAmerica.png";
import southAmericaMap from "src/assets/images/ui/maps/SouthAmerica.png";
import oceaniaMap from "src/assets/images/ui/maps/Oceania.png";

const getFeaturedDestinations = (destinations: Destination[]) => {
  if (destinations !== undefined) {
    let featuredDestinations = destinations.filter(
      (destination) => destination.featured === true,
    );
    if (featuredDestinations.length > 5) {
      featuredDestinations = featuredDestinations.slice(0, 5);
    }
    return featuredDestinations;
  } else {
    return [];
  }
};

const getCountryByContinent = (countries: Country[], continent: string) => {
  if (countries !== undefined) {
    return countries.filter((country) => country.continent === continent);
  } else {
    return [];
  }
};

const Discover: React.FC = () => {
  // Fetch data
  const {
    data: destinationData,
    loading: destinationLoading,
    error: destinationError,
  } = useFetch(`${BASE_URL}/destinations`);
  const {
    data: countryData,
    loading: countryLoading,
    error: countryError,
  } = useFetch(`${BASE_URL}/countries`);

  // Handle fetched data for rendering
  const countries = countryData?.result;
  const destinations = destinationData?.result;

  const continents = [
    {
      name: "Asia",
      countries: getCountryByContinent(countries as Country[], "Asia"),
      count: getCountryByContinent(countries as Country[], "Asia").length,
      image: asiaMap,
    },
    {
      name: "Africa",
      countries: getCountryByContinent(countries as Country[], "Africa"),
      count: getCountryByContinent(countries as Country[], "Africa").length,
      image: africaMap,
    },
    {
      name: "Europe",
      countries: getCountryByContinent(countries as Country[], "Europe"),
      count: getCountryByContinent(countries as Country[], "Europe").length,
      image: europeMap,
    },
    {
      name: "North America",
      countries: getCountryByContinent(countries as Country[], "North America"),
      count: getCountryByContinent(countries as Country[], "North America")
        .length,
      image: northAmericaMap,
    },
    {
      name: "South America",
      countries: getCountryByContinent(countries as Country[], "South America"),
      count: getCountryByContinent(countries as Country[], "South America")
        .length,
      image: southAmericaMap,
    },
    {
      name: "Oceania",
      countries: getCountryByContinent(countries as Country[], "Oceania"),
      count: getCountryByContinent(countries as Country[], "Oceania").length,
      image: oceaniaMap,
    },
  ];

  const featuredDestinations = getFeaturedDestinations(
    destinations as Destination[],
  );

  // Handle select state
  const [selectedContinent, setSelectedContinent] = useState("Asia");

  function handleSelectContinent(): React.ReactEventHandler<HTMLSelectElement> {
    return (event) => {
      setSelectedContinent(event.currentTarget.value);
    };
  }

  // Handle destination filter
  const filter = {
    country: [],
    tags: [],
  }

  // Render

  return (
    <main className="discover">
      {/* POSTER SECTION */}
      {!destinationError &&
        !destinationLoading &&
        featuredDestinations.length !== 0 && (
          <section className="posters h-screen">
            <div
              className="poster px-sect relative flex w-full flex-col gap-0 py-sect-short"
              style={{
                backgroundImage: `url(${featuredDestinations[0].images[5]})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="blur-blob blob-1 absolute z-0"></div>
              <div className="z-10 w-fit pt-sect-short">
                <h1 className="big-heading uppercase text-text-dark">
                  {featuredDestinations[0].name}
                </h1>
                <div className="flex w-full justify-between">
                  <span className="span-medium text-text-dark">
                    {featuredDestinations[0].country}
                  </span>
                  <span className="span-medium text-text-dark">
                    {featuredDestinations[0].tags[0]}
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
            onChange={handleSelectContinent()}
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
                    {continent.countries.map((country) => (
                      <div key={country.name} className="flex flex-row gap-4">
                        <div className="flex items-center justify-center rounded-xl bg-gray lg:h-20 lg:w-32">
                          <img
                            src={country?.images?.flagImage}
                            alt={country.name}
                            className="h-full w-full rounded-xl"
                          />
                        </div>
                        <div className="flex flex-col">
                          <span className="span-medium">{country.name}</span>
                          <span className="span-regular">
                            {country.totalDestinations} destinations
                          </span>
                        </div>
                      </div>
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
      <section className="related"></section>

      {/* DESTINATION SECTION */}
      <section className="destinations px-sect flex flex-col items-center">
        <h1 className="h1-md">Discover destinations</h1>
        <div className="flex flex-row justify-between w-full py-sect-short">
          <p className="p-medium">
            Each destination we’ve covered here is fully filled <br />
            with significant information you will need
          </p>
          <button
            title="filter"
            className="rounded-full bg-background-dark shadow-section lg:h-12 lg:w-12 xl:h-12 xl:w-12 2xl:h-16 2xl:w-16 3xl:h-16 3xl:w-16"
          >
            <i className="ri-filter-3-line p-large text-text-dark m-auto"></i>
          </button>
        </div>
      </section>
    </main>
  );
};

export default Discover;
