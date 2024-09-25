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

// Framer motion variants for animations
const variants = {
  hiddenFullY: VisibilityVariants.hiddenFullY,
  visible: VisibilityVariants.visible,
};

// Home component
const Home: React.FC = () => {
  const dispatch = useDispatch();
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

  useEffect(() => {
    if (blogsData?.result) {
      dispatch(setHomeBlogs(blogsData.result));
    }
  }, [blogsData, dispatch]);

  // Create a ref for the Articles component
  const articlesHookRef = useMemo(() => React.createRef<HTMLSpanElement>(), []);

  return (
    <main className="home flex flex-col">
      <Hero />
      <Brief />
      <Featured />

      {/* Stacked sections container */}
      <section className="lg:pt-sect-default 2xl:pt-sect-semi">
        <div className="sticky top-0 z-0">
          <Inspired />
        </div>

        <Articles articlesHookRef={articlesHookRef} blogs={blogs} />

        {/* Starter hook section */}
        <div className="sticky top-0 z-20 bg-background-light dark:bg-background-dark">
          <section className="hook px-sect pb-sect-semi pt-sect-default">
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
