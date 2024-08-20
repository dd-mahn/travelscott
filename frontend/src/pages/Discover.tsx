import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Carousel } from "@material-tailwind/react";
import { motion } from "framer-motion";

// Asset imports
import asiaMap from "src/assets/images/ui/maps/Asia.png";
import europeMap from "src/assets/images/ui/maps/Europe.png";
import africaMap from "src/assets/images/ui/maps/Africa.png";
import northAmericaMap from "src/assets/images/ui/maps/NorthAmerica.png";
import southAmericaMap from "src/assets/images/ui/maps/SouthAmerica.png";
import oceaniaMap from "src/assets/images/ui/maps/Oceania.png";

// Component imports
import "src/styles/discover.css";
import { BASE_URL } from "src/utils/config";
import { getFeaturedDestinations } from "src/utils/getFeaturedDestinations";
import { getCountryByContinent } from "src/utils/getCountryByContinent";
import { FetchCountriesType, FetchDestinationType } from "src/types/FetchData";
import NotFoundPage from "./404";
import Loading from "src/components/common/Loading";
import DiscoverDestinations from "./DiscoverComponents/DiscoverDestinations";
import DiscoverCountries from "./DiscoverComponents/DiscoverCountries";
import useFetch from "src/hooks/useFetch";
import Country from "src/types/Country";
import Destination from "src/types/Destination";

// Framer motion variants
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
    transition: { duration: 0.4 },
  },
};

// Discover component
const Discover: React.FC = () => {
  // State hooks for current page, destinations, countries, selected continent, filter tags, filter countries, filter continents
  const [allDestinations, setAllDestinations] = useState<Destination[]>([]);
  const [countries, setCountries] = useState<Country[]>([]);

  const {
    data: allDestinationData,
    loading: allDestinationLoading,
    error: allDestinationError,
  } = useFetch<FetchDestinationType>(`${BASE_URL}/destinations?limit=1000`);

  const {
    data: countryData,
    loading: countryLoading,
    error: countryError,
  } = useFetch<FetchCountriesType>(`${BASE_URL}/countries`);

  // Handle fetched data for rendering
  useEffect(() => {
    if (countryData?.result) {
      setCountries(countryData.result);
    }

    if (allDestinationData?.result) {
      setAllDestinations(allDestinationData.result);
    }
  }, [allDestinationData, countryData]);

  // Handle continent data
  const continents = useMemo(() => {
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
  }, [countries]);

  // Handle featured destinations
  const featuredDestinations = useMemo(() => {
    return getFeaturedDestinations(allDestinations);
  }, [allDestinations]);

  // Handle country and continent names
  const countryNames = Array.isArray(countries)
    ? countries.map((country) => country?.name)
    : [];
  const continentNames = Array.isArray(continents)
    ? continents.map((continent) => continent.name)
    : [];

  // Handle navigating
  const navigate = useNavigate();

  // Handle render
  if (countryLoading || allDestinationLoading) {
    return <Loading />;
  }

  if (countryError || allDestinationError) {
    return <NotFoundPage />;
  }

  return (
    <main className="discover">
      {/* POSTER SECTION */}
      {!allDestinationError &&
        !allDestinationLoading &&
        featuredDestinations.length !== 0 && (
          <motion.section
            initial="hiddenYScale"
            animate="visible"
            transition={{ duration: 0.5, delay: 0.1 }}
            variants={variants}
            className="posters h-screen w-screen"
          >
            <Carousel
              autoplay={featuredDestinations.length > 1}
              autoplayDelay={5000}
              transition={{ duration: 2 }}
              loop
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              {featuredDestinations.map((destination) => (
                <motion.div
                  className="poster px-sect relative flex h-[95%] w-screen cursor-pointer flex-col gap-0 bg-gradient-to-t from-background-dark to-transparent py-sect-short"
                  onClick={() => {
                    navigate(`destinations/${destination._id}`);
                  }}
                  key={destination._id}
                >
                  {destination.images.length > 0 && (
                    <div className="absolute left-0 top-0 h-full w-full overflow-hidden">
                      <motion.img
                        whileHover="scaleHover"
                        variants={variants}
                        src={destination.images[0]}
                        className="z-0 h-full w-full brightness-75"
                        alt="Featured destination"
                      />
                    </div>
                  )}

                  <div className="z-10 w-fit pt-sect-short">
                    <div className="overflow-hidden">
                      <motion.h1
                        initial={variants.hiddenY("var(--y-from)")}
                        whileInView="visible"
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        variants={variants}
                        className="big-heading text-text-dark lg:[--y-from:180px] 2xl:[--y-from:250px]"
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
                      <motion.span
                        variants={variants}
                        className="span-medium text-text-dark"
                      >
                        {destination.country}
                      </motion.span>
                      <motion.span
                        variants={variants}
                        className="span-medium mr-2 text-text-dark"
                      >
                        {destination.continent}
                      </motion.span>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </Carousel>
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
        countryNames={countryNames}
        continentNames={continentNames}
      />
    </main>
  );
};

export default Discover;
