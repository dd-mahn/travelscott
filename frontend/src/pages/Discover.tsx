import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Carousel } from "@material-tailwind/react";
import { motion } from "framer-motion";

import asiaMap from "src/assets/images/ui/maps/Asia.png";
import europeMap from "src/assets/images/ui/maps/Europe.png";
import africaMap from "src/assets/images/ui/maps/Africa.png";
import northAmericaMap from "src/assets/images/ui/maps/NorthAmerica.png";
import southAmericaMap from "src/assets/images/ui/maps/SouthAmerica.png";
import oceaniaMap from "src/assets/images/ui/maps/Oceania.png";

import "src/styles/discover.css";
import { BASE_URL } from "src/utils/config";
import { getFeaturedDestinations } from "src/utils/getFeaturedDestinations";
import { getCountryByContinent } from "src/utils/getCountryByContinent";
import { FetchCountriesType, FetchDestinationType } from "src/types/FetchData";
import NotFoundPage from "./404";
import Loading from "src/components/ui/Loading";
import DiscoverDestinations from "./DestinationComponents/DiscoverDestinations";
import DiscoverCountries from "./DestinationComponents/DiscoverCountries";
import useFetch from "src/hooks/useFetch";
import Country from "src/types/Country";
import Destination from "src/types/Destination";

const variants = {
  hidden: { opacity: 0, y: 40 },
  hiddenY: (y: string) => {
    return {
      y: y,
    };
  },
  hiddenYScale: { scale: 0.95, y: 100 },
  visible: { opacity: 1, scale: 1, y: 0, x: 0 },
  scaleHover: {
    scale: 1.05,
  },
};

const Discover: React.FC = () => {
  // State hooks for current page, destinations, countries, selected continent, filter tags, filter countries, filter continents
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [countries, setCountries] = useState<Country[]>([]);
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

  // Handle country and continent names
  const countryNames = Array.isArray(countryData?.result)
    ? countryData.result.map((country) => country?.name)
    : [];
  const continentNames = Array.isArray(continents)
    ? continents.map((continent) => continent.name)
    : [];

  // Handle navigating
  const navigate = useNavigate();

  // Handle render
  if (countryLoading || destinationLoading) {
    return <Loading />;
  }

  if (countryError || destinationError) {
    return <NotFoundPage />;
  }

  return (
    <main className="discover">
      {/* POSTER SECTION */}
      {!destinationError &&
        !destinationLoading &&
        featuredDestinations.length !== 0 && (
          <motion.section
            initial="hiddenYScale"
            animate="visible"
            transition={{ duration: 0.5, delay: 0.1 }}
            variants={variants}
            className="posters h-screen w-screen"
          >
            {featuredDestinations.length > 1 ? (
              <Carousel
                autoplay
                autoplayDelay={5000}
                transition={{ duration: 2 }}
                loop
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                {featuredDestinations.map((destination) => (
                  <motion.div
                    className="poster px-sect relative flex w-screen cursor-pointer flex-col gap-0 bg-gradient-to-t from-background-dark to-transparent py-sect-short"
                    onClick={() => {
                      navigate(`destinations/${destination._id}`);
                    }}
                    key={destination._id}
                  >
                    <div className="absolute left-0 top-0 h-full w-full overflow-hidden">
                      <motion.img
                        whileHover="scaleHover"
                        variants={variants}
                        transition={{ duration: 0.5 }}
                        src={destination.images[1]}
                        className="z-0 h-full w-full brightness-75"
                        alt=""
                      />
                    </div>

                    <div className="z-10 w-fit pt-sect-short">
                      <div className="overflow-hidden">
                        <motion.h1
                          initial={variants.hiddenY("var(--y-from)")}
                          whileInView="visible"
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: 0.5 }}
                          variants={variants}
                          className="big-heading text-text-dark lg:[--y-from:200px] 2xl:[--y-from:250px]"
                        >
                          {destination.name}
                        </motion.h1>
                      </div>

                      <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.5,
                          delay: 1,
                          staggerChildren: 0.2,
                        }}
                        variants={variants}
                        className="flex w-full justify-between"
                      >
                        <span className="span-medium text-text-dark">
                          {destination.country}
                        </span>
                        <span className="span-medium mr-2 text-text-dark">
                          {destination.continent}
                        </span>
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </Carousel>
            ) : (
              <motion.div
                className="poster px-sect relative flex w-screen cursor-pointer flex-col gap-0 bg-gradient-to-t from-background-dark to-transparent py-sect-short"
                onClick={() => {
                  navigate(`destinations/${featuredDestinations[0]._id}`);
                }}
              >
                <div className="absolute left-0 top-0 h-full w-full overflow-hidden">
                  <motion.img
                    whileHover="scaleHover"
                    variants={variants}
                    transition={{ duration: 0.5 }}
                    src={featuredDestinations[0].images[1]}
                    className="z-0 h-full w-full brightness-75"
                    alt=""
                  />
                </div>

                <div className="z-10 w-fit pt-sect-short">
                  <div className="overflow-hidden">
                    <motion.h1
                      initial={variants.hiddenY("var(--y-from)")}
                      whileInView="visible"
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                      variants={variants}
                      className="big-heading text-text-dark lg:[--y-from:200px] 2xl:[--y-from:250px]"
                    >
                      {featuredDestinations[0].name}
                    </motion.h1>
                  </div>

                  <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.5,
                      delay: 1,
                      staggerChildren: 0.2,
                    }}
                    variants={variants}
                    className="flex w-full justify-between"
                  >
                    <span className="span-medium text-text-dark">
                      {featuredDestinations[0].country}
                    </span>
                    <span className="span-medium mr-2 text-text-dark">
                      {featuredDestinations[0].continent}
                    </span>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </motion.section>
        )}

      {/* COUNTRY SECTION */}
      <DiscoverCountries
        countryLoading={countryLoading}
        countryError={countryError}
        continents={continents}
      />

      {/* DESTINATION SECTION */}
      <DiscoverDestinations
        destinationData={destinationData}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        filterTags={filterTags}
        setFilterTags={setFilterTags}
        filterCountries={filterCountries}
        setFilterCountries={setFilterCountries}
        filterContinents={filterContinents}
        setFilterContinents={setFilterContinents}
        countryNames={countryNames}
        continentNames={continentNames}
        destinationError={destinationError}
        destinationLoading={destinationLoading}
      />
    </main>
  );
};

export default Discover;
