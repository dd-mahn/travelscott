import React, { memo, useCallback, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "src/store/store";
import { setHomeBlogs } from "src/store/slices/blogSlice";

import "src/styles/home.css";

// Component imports
import Hero from "src/pages/Home/Components/Hero";
import Brief from "src/pages/Home/Components/Brief";
import Featured from "src/pages/Home/Components/Featured";
import Starter from "src/pages/Home/Components/Starter";
import Articles from "src/pages/Home/Components/Articles";
import Inspired from "src/pages/Home/Components/Inspired";
import Quote from "src/pages/Home/Components/Quote";
import useFetch from "src/hooks/useFetch/useFetch";
import { FetchBlogsType } from "src/types/FetchData";
import config from "src/config/config";
import {
  useSectionTransition,
  useSectionTransition2,
} from "src/hooks/useSectionTransition/useSectionTransition";
import Hook from "src/pages/Home/Components/Hook";

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
    `${config.api.baseUrl}/blogs?limit=100`,
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
        <Hook />

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
