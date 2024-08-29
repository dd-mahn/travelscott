import React, { memo, useEffect, useMemo } from "react";
import { motion } from "framer-motion";

import "src/styles/home.css";

// Component imports
import Hero from "./HomeComponents/Hero";
import Brief from "./HomeComponents/Brief";
import Featured from "./HomeComponents/Featured";
import Starter from "./HomeComponents/Starter";
import Articles from "./HomeComponents/Articles";
import Inspired from "./HomeComponents/Inspired";
import Quote from "./HomeComponents/Quote";
import useFetch from "src/hooks/useFetch";
import { FetchBlogsType } from "src/types/FetchData";
import { BASE_URL } from "src/utils/config";
import Blog from "src/types/Blog";
import { createBlogChunks } from "src/utils/createBlogChunks";

// Framer motion variants for animations
const variants = {
  hidden: { opacity: 0, y: 75 },
  hiddenFullY: { y: "100%" },
  visible: { opacity: 1, y: 0 },
};

// Home component
const Home: React.FC = () => {
  // Fetch blogs data for Articles and Starter sections
  const { data: blogsData } = useFetch<FetchBlogsType>(`${BASE_URL}/blogs?limit=100`);

  // Memoize blogs data to prevent unnecessary recalculations
  const blogs = useMemo(() => blogsData?.result || [], [blogsData]);

  // Create blog chunks for efficient rendering
  const blogChunks: Blog[][] = useMemo(() => 
    blogs.length ? createBlogChunks(blogs) : [], [blogs]
  );

  // Handle sticky sections top value
  useEffect(() => {
    const stackedSections = document.querySelectorAll<HTMLElement>(".stacked-section");
    stackedSections.forEach((section) => {
      section.style.top = `${window.innerHeight - section.offsetHeight}px`;
    });
  }, []);

  // Create a ref for the Articles component
  const articlesHookRef = useMemo(() => React.createRef<HTMLSpanElement>(), []);

  return (
    <main className="home flex flex-col">
      <Hero />
      <Brief />
      <Featured />

      {/* Stacked sections container */}
      <section className="stacked lg:pt-sect-default 2xl:pt-sect-semi">
        <div className="sticky top-0 z-0">
          <Inspired />
        </div>

        <Articles articlesHookRef={articlesHookRef} blogChunks={blogChunks} />

        {/* Starter hook section */}
        <div className="sticky top-0 z-20 bg-background-light">
          <section className="hook px-sect pb-sect-semi pt-sect-default">
            <div className="overflow-hidden pb-4">
              <motion.h2
                initial="hiddenFullY"
                whileInView="visible"
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                variants={variants}
                className="h2-inter"
              >
                If you are still hesitant,
              </motion.h2>
            </div>
            <div className="overflow-hidden pb-4">
              <motion.h2
                initial="hiddenFullY"
                whileInView="visible"
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                variants={variants}
                className="h2-inter"
              >
                perhaps some of the articles below can help.
              </motion.h2>
            </div>
          </section>
        </div>

        {/* Starter section */}
        <div className="sticky top-0 z-30">
          <Starter blogs={blogs} />
        </div>
      </section>

      <Quote />
    </main>
  );
};

// Memoize the Home component to prevent unnecessary re-renders
export default memo(Home);
