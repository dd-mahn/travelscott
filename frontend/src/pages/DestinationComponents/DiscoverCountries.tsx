import React, { memo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Select, Option } from "@material-tailwind/react";
import type { SelectProps, SelectOptionProps } from "@material-tailwind/react";

import Country from "src/types/Country";
import CountryCard from "src/components/ui/CountryCard";
import RelatedSections from "src/components/ui/RelatedSections";

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

const DiscoverCountries: React.FC<DiscoverCountriesProps> = ({
  countryLoading,
  countryError,
  continents,
}) => {
  const [selectedContinent, setSelectedContinent] = useState<string>("Asia");

  const handleSelectContinent = (value: string) => {
    setSelectedContinent(value);
  };

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
  return (
    <>
      <section className="countries px-sect flex w-full flex-col items-center gap-4 lg:pb-40 lg:pt-sect-default 2xl:py-sect-default">
        <div className="overflow-hidden">
          <motion.h1
            initial={variants.hiddenY("var(--y-from)")}
            whileInView="visible"
            viewport={{ once: true }}
            variants={variants}
            transition={{ duration: 0.5 }}
            className="h1-md-bold lg:[--y-from:75px] 2xl:[--y-from:120px]"
          >
            Discover countries
          </motion.h1>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={variants}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
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

        <div className="w-full py-sect-short">
          {continents.map((continent) => {
            if (selectedContinent === continent.name) {
              return (
                <AnimatePresence mode="wait" key={continent.name + "Presence"}>
                  <motion.div
                    key={continent.name}
                    id="continent"
                    initial="hiddenYScale"
                    whileInView="visible"
                    viewport={{ once: true }}
                    exit="hiddenYScale"
                    variants={variants}
                    transition={{ duration: 0.5 }}
                    className="flex min-h-[70svh] w-full flex-row items-start gap-12"
                  >
                    <motion.div
                      // initial="hidden"
                      // whileInView="visible"
                      // variants={variants}
                      // viewport={{ once: true, margin: "0% 0% -10% 0%" }}
                      // transition={{ duration: 0.5 }}
                      className="relative flex items-center justify-center"
                    >
                      <div className="w-[40svw] overflow-hidden rounded-xl">
                        <motion.img
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.5 }}
                          src={continent.image}
                          alt="map"
                          className="w-full rounded-xl brightness-75"
                        />
                      </div>

                      <h2 className="h2-logo absolute m-auto uppercase text-text-dark">
                        {continent.name}
                      </h2>
                    </motion.div>

                    {countryLoading && <h2 className="h2-md">Loading...</h2>}
                    {countryError && (
                      <h2 className="h2-md">
                        Please reload the page or try again later.
                      </h2>
                    )}
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
                    >
                      {!countryLoading &&
                        !countryError &&
                        continent.countries.map((country) => (
                          <motion.div
                            key={country._id}
                            variants={variants}
                            viewport={{ once: true }}
                          >
                            <CountryCard country={country} />
                          </motion.div>
                        ))}
                    </motion.div>
                  </motion.div>
                </AnimatePresence>
              );
            }
            return null;
          })}
        </div>
      </section>
      <section className="related flex flex-col lg:gap-12 2xl:gap-20">
        <div className="px-sect overflow-hidden">
          <motion.h2
            initial={variants.hiddenY("var(--y-from)")}
            whileInView="visible"
            viewport={{ once: true }}
            variants={variants}
            transition={{ duration: 0.5 }}
            className="h2-md lg:[--y-from:50px] 2xl:[--y-from:60px]"
          >
            Related articles
          </motion.h2>
        </div>

        <RelatedSections type={"blog"} data={selectedContinent} />
      </section>
    </>
  );
};

export default memo(DiscoverCountries);
