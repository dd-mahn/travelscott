import React, { useEffect, useRef} from "react";
import { motion} from "framer-motion";
import "src/styles/home.css";

// Components
import Hero from "./HomeComponents/Hero";
import Brief from "./HomeComponents/Brief";
import Featured from "./HomeComponents/Featured";
import Starter from "./HomeComponents/Starter";
import Articles from "./HomeComponents/Articles";
import Inspired from "./HomeComponents/Inspired";
import Globe from "./HomeComponents/Globe";
import Quote from "./HomeComponents/Quote";

const variants = {
  hidden: { opacity: 0, y: 75 },
  hiddenY: (y: string) => {
    return {
      y: y,
    };
  },
  visible: { opacity: 1, y: 0 },
};
const Home: React.FC = () => {
  useEffect(() => {
    const stackedSection: NodeListOf<HTMLElement> =
      document.querySelectorAll(".stacked-section");
    if (stackedSection.length > 0) {
      stackedSection.forEach((section) => {
        section.style.top = window.innerHeight - section.offsetHeight + "px";
      });
    }
  }, []);

  const articlesHookRef = useRef<HTMLSpanElement>(null);
  // Handle featured section horizontal scroll
  return (
    <main className="home flex flex-col">
      {/* HERO SECTION */}
      <Hero />

      {/* BRIEF SECTION */}
      <Brief />

      {/* FEATURED DESTINATION SECTION */}
      <Featured />

      {/* STACKED SECTIONS CONTAINER, CONTAINING: INSPIRED, GLOBE, BLOGS, STARTER BLOGS */}
      <section className="stacked lg:pt-sect-default 2xl:pt-sect-semi">
        {/* INSPIRED SECTION */}
        <div className="sticky top-0 z-0">
          <Inspired />
        </div>

        {/* GLOBE SECTION */}
        <div className="stacked-section z-5 sticky">
          <Globe articlesHookRef={articlesHookRef} />
        </div>

        {/* FEATURED BLOGS SECTION */}
        <Articles articlesHookRef={articlesHookRef} />
        {/* STARTER HOOK SECTION */}
        <div className="sticky top-0 z-20 bg-background-light">
          <section className="hook px-sect pb-sect-semi pt-sect-default">
            <div className="overflow-hidden pb-4">
              <motion.h2
                initial={{
                  y: "var(--y-from)",
                }}
                whileInView="visible"
                viewport={{ once: true }}
                variants={variants}
                transition={{ duration: 0.4 }}
                className="h2-inter lg:[--y-from:50px] 2xl:[--y-from:75px]"
              >
                If you are still hesitant,
              </motion.h2>
            </div>
            <div className="overflow-hidden pb-4">
              <motion.h2
                initial={{
                  y: "var(--y-from)",
                }}
                whileInView="visible"
                viewport={{ once: true }}
                variants={variants}
                transition={{ duration: 0.4 }}
                className="h2-inter lg:[--y-from:50px] 2xl:[--y-from:75px]"
              >
                perhaps some of the articles below can help.
              </motion.h2>
            </div>
          </section>
        </div>

        {/* STARTER SECTION */}
        <div className="sticky top-0 z-30">
          <Starter />
        </div>
      </section>

      {/* QUOTE SECTION */}
      <Quote />
    </main>
  );
};

export default Home;
