import React, { memo, useCallback, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Select, Option } from "@material-tailwind/react";
import { useSelector } from "react-redux";
import { RootState } from "src/store/store";

// Component imports
import CountryCard from "src/common/CountryCard";
import RelatedSections from "src/common/RelatedSections";
import {
  HoverVariants,
  TapVariants,
  VisibilityVariants,
} from "src/utils/variants";
import {
  ErrorState,
  LoadingState,
  NotFoundState,
} from "src/common/CatalogStates";

// Framer motion variants
const variants = {
  hiddenY: VisibilityVariants.hiddenY,
  hiddenFullY: VisibilityVariants.hiddenFullY,
  hiddenYScale: VisibilityVariants.hiddenYScale,
  hiddenX: VisibilityVariants.hiddenX,
  exitScale: VisibilityVariants.exitScale,
  exitX: VisibilityVariants.exitX,
  visible: VisibilityVariants.visible,
  hoverScale: HoverVariants.hoverScale,
  tapScale: TapVariants.tapScale,
};

// DiscoverCountries component
const DiscoverCountries: React.FC = () => {
  const { continents } = useSelector((state: RootState) => state.continent);
  const { loading, error } = useSelector((state: RootState) => state.country);

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
  const selectProps = {
    color: "gray",
    label: "Select Continent",
    variant: "outlined",
    size: "lg",
    className: "span-small dark:bg-background-dark-transparent font-sans shadow-component dark:shadow-component-dark rounded-xl border-none",
    children: undefined,
    animate: {
      mount: { y: 0 },
      unmount: { y: 40 },
    },
    onChange: (value: string) => handleSelectContinent(value),
    menuProps: {
      className: "bg-background-light dark:bg-background-dark shadow-component dark:shadow-component-dark rounded-xl",
    },
    labelProps: {
      className:
        "font-medium text-text-light after:border-none before:border-none",
    },
  };

  const selectOptionProp = {
    className: "span-small font-sans",
  };

  const filterKey = useMemo(() => {
    return selectedContinentName;
  }, [selectedContinentName]);

  // Render logic
  return (
    <>
      <section className="countries px-sect flex w-full flex-col items-center gap-4 lg:pb-20 lg:pt-sect-default 2xl:pb-40 2xl:pt-sect-default">
        <div className="overflow-hidden">
          <motion.h1
            initial="hiddenFullY"
            whileInView="visible"
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            variants={variants}
            className="h1-md-bold"
          >
            Discover countries
          </motion.h1>
        </div>

        {/* SELECT ELEMENT */}
        <motion.div
          initial="hiddenY"
          whileInView="visible"
          transition={{ duration: 0.5, delay: 0.4 }}
          variants={variants}
          viewport={{ once: true }}
          className="grid w-1/6 place-items-center"
        >
          {/* @ts-ignore */}
          <Select {...selectProps}>
            {continents.map((continent) => (
              <Option
                key={continent.name}
                value={continent.name}
                {...selectOptionProp}
              >
                {continent.name}
              </Option>
            ))}
          </Select>
        </motion.div>

        {/* SELECTED COMPONENT AND COUNTRY LIST */}
        <div className="w-full lg:py-10 2xl:py-sect-short">
          <AnimatePresence mode="wait">
            {loading ? (
              <LoadingState keyName={`loading-${filterKey}`} />
            ) : error ? (
              <ErrorState keyName={`error-${filterKey}`} />
            ) : !selectedContinent || selectedContinent.count === 0 ? (
              <NotFoundState keyName={`not-found-${filterKey}`} />
            ) : (
              <motion.div
                key={filterKey}
                id="continent"
                initial="hiddenY"
                whileInView="visible"
                viewport={{ once: true }}
                exit="exitX"
                transition={{ duration: 0.5, delay: 0.8, ease: "easeInOut" }}
                variants={variants}
                className="flex min-h-[70svh] w-full flex-row items-start lg:gap-8 2xl:gap-12"
              >
                <div className="relative flex items-center justify-center">
                  <div className="h-[70svh] w-[40svw] overflow-hidden rounded-xl shadow-component dark:shadow-component-dark bg-gradient-to-t from-blue-gray-900 to-gray">
                    <motion.img
                      whileHover="hoverScale"
                      variants={variants}
                      transition={{
                        duration: 0.4,
                      }}
                      src={selectedContinent.image}
                      alt="map"
                      className="h-full w-full rounded-xl object-cover brightness-75"
                    />
                  </div>

                  <h2 className="h2-logo pointer-events-none absolute m-auto select-none uppercase text-text-dark">
                    {selectedContinent.name}
                  </h2>
                </div>
                <motion.div
                  initial="hiddenY"
                  whileInView="visible"
                  variants={variants}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: 0.8,
                    delayChildren: 1.2,
                    staggerChildren: 0.3,
                  }}
                  className="grid justify-between lg:grid-cols-3 lg:gap-8 2xl:grid-cols-4 2xl:gap-8"
                  aria-label="Country list"
                >
                  {selectedContinent.countries.map((country) => (
                    <motion.div variants={variants} key={country._id}>
                      <CountryCard country={country} />
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* RELATED SECTION */}
      <section className="related flex flex-col lg:gap-4 2xl:gap-8">
        <div className="px-sect overflow-hidden">
          <motion.h2
            initial="hiddenFullY"
            whileInView="visible"
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            variants={variants}
            className="h2-md"
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
