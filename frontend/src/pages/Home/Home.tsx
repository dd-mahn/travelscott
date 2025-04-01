import React, { memo, useCallback, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "src/store/store";
import { setHomeBlogs } from "src/store/slices/blogSlice";

import "src/styles/components/home.css";

// Component imports
import Hero from "src/pages/Home/Components/Hero/Hero";
import Brief from "src/pages/Home/Components/Brief/Brief";
import Featured from "src/pages/Home/Components/Featured/Featured";
import Starter from "src/pages/Home/Components/Starter/Starter";
import Articles from "src/pages/Home/Components/Articles/Articles";
import Quote from "src/pages/Home/Components/Quote/Quote";
import useFetch from "src/hooks/useFetch/useFetch";
import { FetchBlogsType } from "src/types/FetchData";
import config from "src/config/config";
import {
  useSectionTransition,
  useSectionTransition2,
} from "src/hooks/useSectionTransition/useSectionTransition";
import Hook from "src/pages/Home/Components/Hook/Hook";
import useStackedSections from "src/hooks/useStackedSections/useStackedSections";

// Home component
const Home: React.FC = () => {
  const dispatch = useDispatch();

  // Selector to get home blogs from the Redux store
  const selectHomeState = (state: RootState) => ({
    blogs: state.blog.homeBlogs,
  });

  const { blogs } = useSelector(selectHomeState);

  // Fetch blogs data for Articles and Starter sections
  const { data: blogsData } = useFetch<FetchBlogsType>(
    "blogs",
    `/api/blogs?limit=100`,
  );

  // Dispatch fetched blogs data to the Redux store
  useEffect(() => {
    if (blogsData?.result) {
      dispatch(setHomeBlogs(blogsData.result));
    }
  }, [blogsData, dispatch]);

  // Refs for the Articles component
  const articlesHookRef = () => {
    return React.createRef<HTMLSpanElement>();
  };

  // Stacked section refs
  const { refs, setRef } = useStackedSections();

  // Section transition hook
  const {
    ref: refSO,
    scale: scaleSO,
    opacity: opacitySO,
  } = useSectionTransition(undefined, [1, 0.95], undefined);
  const { ref: refS, scale: scaleS } = useSectionTransition2();

  return (
    <main data-testid="home-page" className="home flex flex-col">
      <Hero />
      <Brief />

      {/* Stacked sections container */}
      <motion.section style={{ scale: scaleS }}>
        <motion.div
          ref={setRef(0)}
          style={{ scale: scaleSO, opacity: opacitySO }}
          className="sticky pb-sect-default lg:pb-96"
        >
          <Featured />
        </motion.div>

        <div ref={refSO}>
          <Articles articlesHookRef={articlesHookRef()} blogs={blogs} />
        </div>

        <Hook />
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
