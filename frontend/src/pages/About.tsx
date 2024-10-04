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

// Framer motion variants
const variants = {
  hiddenY: VisibilityVariants.hiddenY,
  hiddenFullY: VisibilityVariants.hiddenFullY,
  visible: VisibilityVariants.visible,
};

// About page component
const About: React.FC = () => {
  const { refs, setRef } = useStackedSections();
  return (
    <main className="about">
      {/* Hero Section */}
      <AboutHero />

      {/* Stacked Section */}
      <section className="flex flex-col items-center justify-start py-32 md:py-48 lg:py-40 2xl:py-sect-default">
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
          <div ref={setRef(0)} className="sticky">
            <AboutHow />
          </div>

          {/* WHO SECTION */}
          <AboutWho />
        </div>
      </section>

      {/* WHY SECTION */}
      <AboutWhy />
    </main>
  );
};

export default memo(About);
