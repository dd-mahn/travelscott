import React, { memo, useCallback, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "src/store/store";
import { setHomeBlogs } from "src/store/slices/blogSlice";

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
import { VisibilityVariants } from "src/utils/variants";
import {
  useSectionTransition,
  useSectionTransition2,
} from "src/hooks/useSectionTransition";

// Framer motion variants for animations
const variants = {
  hiddenFullY: VisibilityVariants.hiddenFullY,
  visible: VisibilityVariants.visible,
};

// Home component
const Home: React.FC = () => {
  const dispatch = useDispatch();

  // Selector to get home blogs from the Redux store
  const selectHomeState = useCallback(
    (state: RootState) => ({
      blogs: state.blog.homeBlogs,
    }),
    [],
  );
  const { blogs } = useSelector(selectHomeState);

  // Fetch blogs data for Articles and Starter sections
  const { data: blogsData } = useFetch<FetchBlogsType>(
    `${BASE_URL}/blogs?limit=100`,
  );

  // Dispatch fetched blogs data to the Redux store
  useEffect(() => {
    if (blogsData?.result) {
      dispatch(setHomeBlogs(blogsData.result));
    }
  }, [blogsData, dispatch]);

  // Create a ref for the Articles component
  const articlesHookRef = useMemo(() => React.createRef<HTMLSpanElement>(), []);
  const { ref: refSO, scale: scaleSO, opacity: opacitySO } = useSectionTransition();
  const { ref: refS, scale: scaleS } = useSectionTransition2();

  return (
    <main className="home flex flex-col">
      <Hero />
      <Brief />
      <Featured />

      {/* Stacked sections container */}
      <motion.section
        style={{ scale: scaleS }}
        className="pt-40 md:pt-64 lg:pt-sect-default 2xl:pt-sect-semi"
      >
        {/* Inspired section with scale and opacity transitions */}
        <motion.div style={{ scale: scaleSO, opacity: opacitySO }} className="sticky top-0 z-0">
          <Inspired />
        </motion.div>

        {/* Articles section with ref for section transition */}
        <div ref={refSO}>
          <Articles articlesHookRef={articlesHookRef} blogs={blogs} />
        </div>

        {/* Starter hook section */}
        <motion.div className="sticky top-0 -z-10">
          <section className="hook px-sect flex h-[120svh] items-center">
            <div className="mb-20 md:mb-40">
              <div className="overflow-hidden lg:pb-2">
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
              <div className="overflow-hidden lg:pb-2">
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
            </div>
          </section>
        </motion.div>

        {/* Starter section */}
        <Starter blogs={blogs} />
      </motion.section>

      {/* Quote section with ref for section transition */}
      <div ref={refS} className="z-30">
        <Quote />
      </div>
    </main>
  );
};

// Memoize the Home component to prevent unnecessary re-renders
export default memo(Home);
