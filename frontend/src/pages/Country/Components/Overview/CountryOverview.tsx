import React, { memo } from "react";
import Country from "src/types/Country";
import { motion } from "framer-motion";
import {
  HoverVariants,
  TapVariants,
  VisibilityVariants,
} from "src/utils/constants/variants";

// Define the props for the CountryOverview component
interface CountryOverviewProps {
  country: Country;
}

// Define the props for the InfoItem component
interface InfoItemProps {
  icon: string;
  label: string;
  value: string;
}

// Animation variants for framer-motion
const variants = {
  hiddenY: VisibilityVariants.hiddenY,
  hiddenShort: VisibilityVariants.hiddenShortY,
  hiddenFullY: VisibilityVariants.hiddenFullY,
  hiddenYScale: VisibilityVariants.hiddenYScale,
  exitScale: VisibilityVariants.exitScale,
  visible: VisibilityVariants.visible,
  exitX: VisibilityVariants.exitX,
  hoverScale: HoverVariants.hoverScale,
  tapScale: TapVariants.tapScale,
};

// InfoItem component to display individual pieces of information
const InfoItem: React.FC<InfoItemProps> = ({ icon, label, value }) => (
  <motion.div variants={variants} className="flex flex-col gap-2">
    <span className="span-medium uppercase">
      <i className={icon}></i> {label}
    </span>
    <p className="p-regular">{value}</p>
  </motion.div>
);

// CountryOverview component to display country information
const CountryOverview: React.FC<CountryOverviewProps> = ({ country }) => {
  return (
    <section data-testid="country-overview" className="brief px-sect flex flex-col md:flex-row gap-16 justify-between pb-sect-default pt-sect-short">
      <motion.div className="flex w-full md:w-1/2 flex-col gap-4 lg:gap-4 2xl:gap-8">
        {country.description.map((desc, index) => (
          <motion.p
            key={index}
            variants={variants}
            initial="hiddenY"
            whileInView="visible"
            transition={{
              duration: 0.5,
              delay: 0.1 + index * 0.1,
              ease: "easeInOut",
            }}
            viewport={{ once: true }}
            className="p-regular"
          >
            {desc}
          </motion.p>
        ))}
      </motion.div>

      <motion.div
        variants={variants}
        initial="hiddenY"
        whileInView="visible"
        transition={{
          duration: 0.5,
          delay: 0.5,
          ease: "easeInOut",
          delayChildren: 0.5,
          staggerChildren: 0.1,
        }}
        viewport={{ once: true }}
        className="grid w-full md:w-2/5 grid-cols-2 grid-rows-3 gap-x-4 md:gap-x-0 gap-y-4"
      >
        <InfoItem
          icon="ri-global-line"
          label="Language"
          value={country.language}
        />
        <InfoItem
          icon="ri-money-dollar-circle-line"
          label="Currency"
          value={country.currency}
        />
        <InfoItem
          icon="ri-government-line"
          label="Capital"
          value={country.capital}
        />
        <InfoItem
          icon="ri-visa-fill"
          label="Visa requirement"
          value={country.visaRequirement}
        />
        <InfoItem
          icon="ri-phone-line"
          label="Dial-in code"
          value={country.dialInCode}
        />
        <InfoItem
          icon="ri-time-line"
          label="Time zone"
          value={country.timeZone}
        />
      </motion.div>
    </section>
  );
};

export default memo(CountryOverview);
