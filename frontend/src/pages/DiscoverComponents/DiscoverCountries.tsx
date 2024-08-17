import React, { memo, useCallback, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Select, Option } from "@material-tailwind/react";
import type { SelectProps, SelectOptionProps } from "@material-tailwind/react";

// Component imports
import Country from "src/types/Country";
import CountryCard from "src/components/common/CountryCard";
import RelatedSections from "src/components/common/RelatedSections";

// Component props type
type DiscoverCountriesProps = {
  countryLoading: boolean;
  countryError: string | null;
  continents: {
    name: string;
    countries: Country[];
    count: number;
    image: string;
  }[];
};

// Framer motion variants
const variants = {
  hidden: { opacity: 0, y: 40 },
  hiddenY: (y: string) => {
    return {
      y: y,
    };
  },
  hiddenYScale: { scale: 0.95, y: 100 },
  exitScale: { scale: 0, opacity: 0, y: 200, originX: 0 },
  hiddenX: { x: 1000, opacity: 0 },
  exitX: { x: -1000, opacity: 0 },
  visible: { opacity: 1, scale: 1, y: 0, x: 0 },
  hoverScale: {
    scale: 1.05,
    transition: { duration: 0.4 },
  },
};

// DiscoverCountries component
const DiscoverCountries: React.FC<DiscoverCountriesProps> = ({
  countryLoading,
  countryError,
  continents,
}) => {
  // State hooks for selected continent name
  const [selectedContinentName, setSelectedContinentName] =
    useState<string>("Asia");

  // Memoized selected continent object
  const selectedContinent = useMemo(() => {
    return continents.find(
      (continent) => continent.name === selectedContinentName,
    );
  }, [selectedContinentName, continents]);

  // Handle select continent
  const handleSelectContinent = useCallback((value: string) => {
    setSelectedContinentName(value);
  }, []);

  // Select and SelectOption elements props
  const selectProps: SelectProps = {
    color: "gray",
    label: "Select Continent",
    variant: "outlined",
    size: "lg",
    className: "span-small font-sans shadow-component rounded-lg border-none",
    children: undefined,
    animate: {
      mount: { y: 0 },
      unmount: { y: 40 },
    },
    onChange: (value) => handleSelectContinent(value as string),
    menuProps: {
      className: "bg-background-light shadow-component",
    },
    labelProps: {
      className:
        "font-medium text-text-light after:border-none before:border-none",
    },
  };

  const selectOptionProp: SelectOptionProps = {
    className: "span-small font-sans",
    children: undefined,
  };

  // Render logic
  return (
    <>
      <section className="countries px-sect flex w-full flex-col items-center gap-4 lg:pb-40 lg:pt-sect-default 2xl:py-sect-default">
        <div className="overflow-hidden">
          <motion.h1
            initial={variants.hiddenY("var(--y-from)")}
            whileInView="visible"
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            variants={variants}
            className="h1-md-bold lg:[--y-from:75px] 2xl:[--y-from:120px]"
          >
            Discover countries
          </motion.h1>
        </div>

        {/* SELECT ELEMENT */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 0.5 }}
          variants={variants}
          viewport={{ once: true }}
          className="grid w-1/6 place-items-center"
        >
          <Select
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            {...selectProps}
          >
            <Option {...selectOptionProp} value="Asia">
              Asia
            </Option>
            <Option {...selectOptionProp} value="Europe">
              Europe
            </Option>
            <Option {...selectOptionProp} value="Africa">
              Africa
            </Option>
            <Option {...selectOptionProp} value="South America">
              South America
            </Option>
            <Option {...selectOptionProp} value="North America">
              North America
            </Option>
            <Option {...selectOptionProp} value="Oceania">
              Oceania
            </Option>
          </Select>
        </motion.div>

        {/* SELECTED COMPONENT AND COUNTRY LIST */}
        <div className="w-full py-sect-short">
          <AnimatePresence mode="wait">
            {selectedContinent && (
              <motion.div
                key={selectedContinent.name}
                id="continent"
                initial="hiddenYScale"
                whileInView="visible"
                viewport={{ once: true }}
                exit="exitX"
                transition={{ duration: 0.5, ease: "easeInOut" }}
                variants={variants}
                className="flex min-h-[70svh] w-full flex-row items-start gap-12"
              >
                <div className="relative flex items-center justify-center">
                  <div className="w-[40svw] overflow-hidden rounded-xl">
                    <motion.img
                      whileHover="hoverScale"
                      variants={variants}
                      src={selectedContinent.image}
                      alt="map"
                      className="w-full rounded-xl brightness-75"
                    />
                  </div>

                  <h2 className="h2-logo absolute m-auto uppercase text-text-dark">
                    {selectedContinent.name}
                  </h2>
                </div>

                {countryLoading && <h2 className="h2-md">Loading...</h2>}
                {countryError && (
                  <h2 className="h2-md">
                    Please reload the page or try again later.
                  </h2>
                )}
                {!countryLoading && !countryError && (
                  <motion.div
                    initial="hidden"
                    whileInView="visible"
                    variants={variants}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.5,
                      delay: 0.2,
                      staggerChildren: 0.2,
                    }}
                    className="grid justify-between gap-12 lg:grid-cols-3"
                    aria-label="Country list"
                  >
                    {selectedContinent.countries.map((country) => (
                      <CountryCard country={country} key={country._id} />
                    ))}
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* RELATED SECTION */}
      <section className="related flex flex-col lg:gap-12 2xl:gap-20">
        <div className="px-sect overflow-hidden">
          <motion.h2
            initial={variants.hiddenY("var(--y-from)")}
            whileInView="visible"
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            variants={variants}
            className="h2-md lg:[--y-from:50px] 2xl:[--y-from:60px]"
          >
            Related articles
          </motion.h2>
        </div>

        <RelatedSections type={"blog"} data={selectedContinentName} />
      </section>
    </>
  );
};

export default memo(DiscoverCountries);
