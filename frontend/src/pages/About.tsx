import React, { memo } from "react";
import { motion } from "framer-motion";

// Asset imports
import "src/styles/about.css";
import { VisibilityVariants } from "src/utils/variants";
import AboutHero from "./AboutComponents/AboutHero";
import AboutHow from "./AboutComponents/AboutHow";
import AboutWho from "./AboutComponents/AboutWho";
import AboutWhy from "./AboutComponents/AboutWhy";
import useStackedSections from "src/hooks/useStackedSections";
import {
  useSectionTransition,
  useSectionTransition2,
} from "src/hooks/useSectionTransition";

// Framer motion variants
const variants = {
  hiddenY: VisibilityVariants.hiddenY,
  hiddenFullY: VisibilityVariants.hiddenFullY,
  visible: VisibilityVariants.visible,
};

// About page component
const About: React.FC = () => {
  const { refs, setRef } = useStackedSections();
  const { ref, scale, opacity } = useSectionTransition();
  const { ref: ref2, scale: scale2 } = useSectionTransition2();
  return (
    <main className="about">
      {/* Hero Section */}
      <AboutHero />

      {/* Stacked Section */}
      <motion.section
        style={{ scale: scale2 }}
        className="flex flex-col items-center justify-start pb-32 pt-64 md:py-48 lg:py-40 2xl:py-sect-default"
      >
        {/* How Section */}
        <motion.h2
          initial="hiddenY"
          whileInView="visible"
          variants={variants}
          viewport={{ once: true, margin: "0% 0% -30% 0%" }}
          transition={{ duration: 0.5 }}
          className="h3-inter text-center"
        >
          How?
        </motion.h2>

        <div className="stacked relative">
          <motion.div
            style={{ scale, opacity }}
            ref={setRef(0)}
            className="sticky"
          >
            <AboutHow />
          </motion.div>

          {/* WHO SECTION */}
          <div ref={ref} className="">
            <AboutWho />
          </div>
        </div>
      </motion.section>

      {/* WHY SECTION */}
      <div ref={ref2} className="z-30">
        <AboutWhy />
      </div>
    </main>
  );
};

export default memo(About);
