import React, { memo } from "react";
import { motion } from "framer-motion";

// Asset imports
import "src/styles/about.css";
import { VisibilityVariants } from "src/utils/constants/variants";
import AboutHero from "src/pages/About/Components/AboutHero";
import AboutHow from "src/pages/About/Components/AboutHow";
import AboutWho from "src/pages/About/Components/AboutWho";
import AboutWhy from "src/pages/About/Components/AboutWhy";
import useStackedSections from "src/hooks/useStackedSections/useStackedSections";
import {
  useSectionTransition,
  useSectionTransition2,
} from "src/hooks/useSectionTransition/useSectionTransition";

// Framer motion variants
const variants = {
  hiddenY: VisibilityVariants.hiddenY,
  hiddenFullY: VisibilityVariants.hiddenFullY,
  visible: VisibilityVariants.visible,
};

// About page component
const About: React.FC = () => {
  // Hook to manage stacked sections
  const { refs, setRef } = useStackedSections();

  // Hook to manage section transition with scale and opacity
  const { ref: transitionRef, scale, opacity } = useSectionTransition();

  // Hook to manage section transition with only scale
  const { ref: transitionRef2, scale: scale2 } = useSectionTransition2();

  return (
    <main className="about">
      {/* Hero Section */}
      <AboutHero />

      {/* Stacked Section */}
      <motion.section
        style={{ scale: scale2 }}
        className="flex flex-col items-center justify-start pb-32 pt-64 md:py-48 lg:py-64 2xl:py-sect-default"
        data-testid="stacked-section"
      >
        {/* How Section */}
        <motion.h2
          initial="hiddenY"
          whileInView="visible"
          variants={variants}
          viewport={{ once: true, margin: "0% 0% -30% 0%" }}
          transition={{ duration: 0.5 }}
          className="h3-inter text-center"
          data-testid="about-how"
        >
          How?
        </motion.h2>

        <div className="stacked relative">
          {/* AboutHow Section */}
          <motion.div
            style={{ scale, opacity }}
            ref={setRef(0)}
            className="sticky"
            data-testid="about-how-section"
          >
            <AboutHow />
          </motion.div>

          {/* AboutWho Section */}
          <div ref={transitionRef} className="" data-testid="about-who-section">
            <AboutWho />
          </div>
        </div>
      </motion.section>

      {/* AboutWhy Section */}
      <div ref={transitionRef2} className="z-30" data-testid="about-why-section">
        <AboutWhy />
      </div>
    </main>
  );
};

export default memo(About);
