import React, { useState } from "react";
import Country from "src/types/Country";
import { AnimatePresence, motion } from "framer-motion";

// Define the props for the CountryGuide component
interface CountryGuideProps {
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
  dropHidden: { opacity: 0 },
  rotate: { rotate: 180 },
};

// CountryGuide component to display guide sections
const CountryGuide: React.FC<CountryGuideProps> = ({ country }) => {
  const [visibleSection, setVisibleSection] = useState<string | null>(null);

  // Toggle the visibility of a guide section
  const toggleGuide = (section: string) => {
    setVisibleSection(visibleSection === section ? null : section);
  };

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      transition={{
        duration: 0.8,
        ease: "easeInOut",
        delayChildren: 0.5,
        staggerChildren: 0.5,
      }}
      viewport={{ once: true }}
      className="px-sect -gap-8 sticky top-20 z-10 flex h-screen w-full flex-col pb-sect-long"
    >
      <GuideSection
        title="When to visit?"
        content={country.additionalInfo.whenToVisit?.[0]}
        isVisible={visibleSection === "whenToVisit"}
        toggleVisibility={() => toggleGuide("whenToVisit")}
      />
      <GuideSection
        title="Transportation"
        content={country.additionalInfo.transportation?.[0]}
        isVisible={visibleSection === "transportation"}
        toggleVisibility={() => toggleGuide("transportation")}
      />
      <GuideSection
        title="Health & Safety"
        content={country.additionalInfo.healthAndSafety?.[0]}
        isVisible={visibleSection === "healthAndSafety"}
        toggleVisibility={() => toggleGuide("healthAndSafety")}
      />
    </motion.div>
  );
};

// Define the props for the GuideSection component
interface GuideSectionProps {
  title: string;
  content?: string;
  isVisible: boolean;
  toggleVisibility: () => void;
}

// GuideSection component to display individual guide sections
const GuideSection: React.FC<GuideSectionProps> = ({
  title,
  content,
  isVisible,
  toggleVisibility,
}) => (
  <motion.div
    variants={variants}
    initial="hidden"
    animate="visible"
    transition={{ duration: 0.5 }}
    className="z-10 w-[60%] rounded-3xl bg-background-light px-12 py-8 shadow-section"
  >
    <div className="flex flex-row items-center justify-between border-b pb-8">
      <h2 className="h2-md">{title}</h2>
      <motion.button
        whileHover="hoverScale"
        whileTap="tapScale"
        variants={variants}
        transition={{ duration: 0.4 }}
        animate={isVisible ? "rotate" : ""}
        className="rounded-full border lg:h-20 lg:w-20 xl:h-24 xl:w-24 2xl:h-28 2xl:w-28 3xl:h-28 3xl:w-28"
        title="open btn"
        onClick={toggleVisibility}
      >
        <i className="ri-arrow-up-line p-large"></i>
      </motion.button>
    </div>
    <AnimatePresence mode="popLayout">
      {isVisible && (
        <motion.div
          key={title}
          initial="dropHidden"
          animate="visible"
          variants={variants}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="flex flex-col gap-2 overflow-hidden py-8"
        >
          <p className="p-regular">{content}</p>
        </motion.div>
      )}
    </AnimatePresence>
  </motion.div>
);

export default CountryGuide;
