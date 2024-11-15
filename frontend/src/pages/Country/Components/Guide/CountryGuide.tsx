import React, { memo, useState } from "react";
import Country from "src/types/Country";
import { AnimatePresence, motion } from "framer-motion";
import { HoverVariants, TapVariants, VisibilityVariants } from "src/utils/constants/variants";

// Define the props for the CountryGuide component
interface CountryGuideProps {
  country: Country;
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
  dropHidden: VisibilityVariants.dropHidden,
  rotate: VisibilityVariants.rotate,
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
      initial="hiddenY"
      whileInView="visible"
      transition={{
        duration: 0.8,
        ease: "easeInOut",
        delayChildren: 0.5,
        staggerChildren: 0.5,
      }}
      viewport={{ once: true }}
      className="px-sect -gap-8 z-10 flex h-screen w-full flex-col pt-24 pb-sect-long"
    >
      {/* Render guide sections */}
      {[
        { title: "When to visit?", content: country.additionalInfo.whenToVisit, section: "whenToVisit" },
        { title: "Transportation", content: country.additionalInfo.transportation, section: "transportation" },
        { title: "Health & Safety", content: country.additionalInfo.healthAndSafety, section: "healthAndSafety" },
      ].map(({ title, content, section }) => (
        <GuideSection
          key={section}
          title={title}
          content={content}
          isVisible={visibleSection === section}
          toggleVisibility={() => toggleGuide(section)}
        />
      ))}
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
    initial="hiddenY"
    animate="visible"
    transition={{ duration: 0.5 }}
    className="z-10 w-full md:w-[80%] lg:w-[60%] rounded-xl md:rounded-3xl bg-background-light dark:bg-background-dark px-6 py-3 md:px-8 md:py-6 2xl:px-12 2xl:py-8 shadow-section dark:shadow-section-dark"
  >
    <div className="flex flex-row items-center justify-between border-b pb-8">
      <h2 className="h2-md">{title}</h2>
      <motion.button
        whileHover="hoverScale"
        whileTap="tapScale"
        variants={variants}
        transition={{ duration: 0.4 }}
        animate={isVisible ? "rotate" : ""}
        className="rounded-full border h-10 w-10 md:h-12 md:w-12 lg:h-16 lg:w-16 xl:h-24 xl:w-24 2xl:h-28 2xl:w-28 3xl:h-28 3xl:w-28"
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
          <p className="p-regular" data-testid={`${title.toLowerCase().replace(/\s+/g, '-')}-content`}>
            {content}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  </motion.div>
);

export default memo(CountryGuide);
