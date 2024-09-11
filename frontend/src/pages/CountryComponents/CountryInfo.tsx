import React from "react";
import Country from "src/types/Country";
import { motion } from "framer-motion";

// Define the props for the CountryInfo component
interface CountryInfoProps {
  country: Country;
}

// Animation variants for framer-motion
const variants = {
  hidden: { opacity: 0, y: 40 },
  hiddenShort: { opacity: 0, y: 20 },
  hiddenFullY: { y: "100%" },
  hiddenYScale: { scale: 0.95, y: 100, opacity: 0 },
  exitScale: { scale: 0, opacity: 0, y: 200, originX: 0 },
  visible: { opacity: 1, scale: 1, y: 0, x: 0 },
  exitX: { x: -1000, opacity: 0 },
  hoverScale: {
    scale: 1.05,
    transition: { duration: 0.4, ease: "easeInOut" },
  },
  tapScale: {
    scale: 0.95,
    transition: { duration: 0.4 },
  },
};

// CountryInfo component to display country information
const CountryInfo: React.FC<CountryInfoProps> = ({ country }) => {
  return (
    <section className="brief px-sect flex justify-between pb-sect-default pt-sect-short">
      <div className="flex w-1/2 flex-col lg:gap-4 2xl:gap-8">
        {country.description.map((desc, index) => (
          <motion.p
            key={index}
            variants={variants}
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 0.5, delay: 0.1 + index * 0.1, ease: "easeInOut" }}
            viewport={{ once: true }}
            className="p-regular"
          >
            {desc}
          </motion.p>
        ))}
      </div>

      <motion.div
        variants={variants}
        initial="hidden"
        whileInView="visible"
        transition={{ duration: 0.5, delay: 0.5, ease: "easeInOut", delayChildren: 0.5, staggerChildren: 0.1 }}
        viewport={{ once: true }}
        className="grid w-2/5 grid-cols-2 grid-rows-3 gap-y-4"
      >
        <InfoItem icon="ri-global-line" label="Language" value={country.language} />
        <InfoItem icon="ri-money-dollar-circle-line" label="Currency" value={country.currency} />
        <InfoItem icon="ri-government-line" label="Capital" value={country.capital} />
        <InfoItem icon="ri-visa-fill" label="Visa requirement" value={country.visaRequirement} />
        <InfoItem icon="ri-phone-line" label="Dial-in code" value={country.dialInCode} />
        <InfoItem icon="ri-time-line" label="Time zone" value={country.timeZone} />
      </motion.div>
    </section>
  );
};

// Define the props for the InfoItem component
interface InfoItemProps {
  icon: string;
  label: string;
  value: string;
}

// InfoItem component to display individual pieces of information
const InfoItem: React.FC<InfoItemProps> = ({ icon, label, value }) => (
  <motion.div variants={variants} className="flex flex-col gap-2">
    <span className="span-medium uppercase">
      <i className={icon}></i> {label}
    </span>
    <p className="p-regular">{value}</p>
  </motion.div>
);

export default CountryInfo;
