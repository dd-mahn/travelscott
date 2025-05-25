import React, { memo, useCallback, useEffect, useMemo, useRef } from "react";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "src/store/store";
import {
  setHomeBlogs,
  setBlogChunks,
  setStarterBlogs,
} from "src/store/slices/blogSlice";
import { setPageLoading, startRequest, endRequest } from "src/store/slices/loadingSlice";
import { setFeaturedDestinations } from "src/store/slices/destinationSlice";

import "src/styles/components/home.css";

// Component imports
import Hero from "src/pages/Home/Components/Hero/Hero";
import Brief from "src/pages/Home/Components/Brief/Brief";
import Featured from "src/pages/Home/Components/Featured/Featured";
import Starter from "src/pages/Home/Components/Starter/Starter";
import Articles from "src/pages/Home/Components/Articles/Articles";
import Quote from "src/pages/Home/Components/Quote/Quote";
import useFetch from "src/hooks/useFetch/useFetch";
import { FetchBlogsType, FetchDestinationType } from "src/types/FetchData";
import { createBlogChunks } from "src/utils/createBlogChunks";
import {
  useSectionTransition,
  useSectionTransition2,
} from "src/hooks/useSectionTransition/useSectionTransition";
import Hook from "src/pages/Home/Components/Hook/Hook";
import useStackedSections from "src/hooks/useStackedSections/useStackedSections";

// Home component
const Home: React.FC = () => {
  const dispatch = useDispatch();

  // Selector to get blogs from the Redux store
  const { homeBlogs, starterBlogs, blogChunks } = useSelector(
    (state: RootState) => ({
      homeBlogs: state.blog.homeBlogs,
      starterBlogs: state.blog.starterBlogs,
      blogChunks: state.blog.blogChunks,
    }),
  );

  // Track initial loading
  useEffect(() => {
    // Set initial loading state
    dispatch(setPageLoading({ page: "home", isLoading: true }));
  }, [dispatch]);

  // Fetch featured destinations directly in Home component
  const {
    data: featuredData,
    isSuccess: featuredSuccess,
    isLoading: featuredLoading,
  } = useFetch<FetchDestinationType>(
    "featured-destinations",
    `/destinations?featured=true&limit=10`,
    "home",
    {
      staleTime: 5 * 60 * 1000,
      cacheTime: 30 * 60 * 1000,
    }
  );

  // Fetch regular blogs data for Articles section
  const {
    data: blogsData,
    isSuccess: blogsSuccess,
    isLoading: blogsLoading,
  } = useFetch<FetchBlogsType>(
    "home-blogs",
    `/blogs?limit=20`, // Fetch enough blogs for the Articles section
    "home", // Page identifier for loading state
    {
      staleTime: 5 * 60 * 1000, // 5 minutes cache
      cacheTime: 30 * 60 * 1000, // 30 minutes
    },
  );

  // Fetch starter blogs data using category filter
  const {
    data: starterBlogsData,
    isSuccess: starterSuccess,
    isLoading: starterLoading,
  } = useFetch<FetchBlogsType>(
    "starter-blogs",
    `/blogs?category=FirstTimeAbroad&limit=6`, // Directly fetch blogs with the right category
    "home", // Page identifier for loading state
    {
      staleTime: 5 * 60 * 1000, // 5 minutes cache
      cacheTime: 30 * 60 * 1000, // 30 minutes
    },
  );

  // Process fetched featured destinations data
  useEffect(() => {
    if (featuredData?.result && featuredData.result.length > 0) {
      dispatch(setFeaturedDestinations(featuredData.result));
    }
  }, [featuredData, dispatch]);

  // Mark page as loaded when all fetches complete
  useEffect(() => {
    const allDataLoaded = blogsSuccess && starterSuccess && featuredSuccess;

    if (allDataLoaded) {
      dispatch(setPageLoading({ page: "home", isLoading: false }));
    }
  }, [blogsSuccess, starterSuccess, featuredSuccess, dispatch]);

  // Process fetched blogs data for Articles section
  useEffect(() => {
    if (blogsData?.result && blogsData.result.length > 0) {
      // Store all blogs in home blogs slice
      dispatch(setHomeBlogs(blogsData.result));

      // Create and store blog chunks for Articles section
      const chunks = createBlogChunks(blogsData.result);
      dispatch(setBlogChunks(chunks));
    }
  }, [blogsData, dispatch]);

  // Process fetched starter blogs data
  useEffect(() => {
    if (starterBlogsData?.result && starterBlogsData.result.length > 0) {
      dispatch(setStarterBlogs(starterBlogsData.result));
    }
  }, [starterBlogsData, dispatch]);

  // Section transition hooks
  const {
    ref: refSO,
    scale: scaleSO,
    opacity: opacitySO,
  } = useSectionTransition();
  const { ref: refS, scale: scaleS } = useSectionTransition2();

  // Create a ref for the Articles hook
  const articlesHookRef = useRef<HTMLSpanElement>(null);

  // Stacked sections hook
  const { setRef } = useStackedSections();

  // Memoize blogs to prevent unnecessary re-renders
  const memoizedHomeBlogs = useMemo(() => homeBlogs, [homeBlogs]);
  const memoizedStarterBlogs = useMemo(() => starterBlogs, [starterBlogs]);
  
  // Pass featured data directly to Featured component
  const featuredDestinations = useMemo(() => 
    featuredData?.result?.slice(0, 10) || [], 
    [featuredData?.result]
  );

  return (
    <main data-testid="home-page" className="home flex flex-col">
      <div className="hero-layer">
        <Hero />
      </div>
      <div className="overview-layer">
        <Brief />
      </div>

      {/* Stacked sections container */}
      <motion.section
        style={{ scale: scaleS }}
        className="layer-optimize additional-layer"
      >
        <motion.div
          ref={setRef(0)}
          style={{ scale: scaleSO, opacity: opacitySO }}
          className="layer-optimize-opacity video-layer sticky pb-sect-default lg:pb-96"
        >
          <Featured featuredDestinations={featuredDestinations} isLoading={featuredLoading} />
        </motion.div>

        <div ref={refSO} className="layer-optimize places-layer">
          <Articles
            articlesHookRef={articlesHookRef}
            blogs={memoizedHomeBlogs}
          />
        </div>

        <div className="insight-layer">
          <Hook />
        </div>
        <div className="summary-layer">
          <Starter blogs={memoizedStarterBlogs} />
        </div>
      </motion.section>

      {/* Quote section with ref for section transition */}
      <div ref={refS} className="layer-optimize related-layer z-30">
        <Quote />
      </div>
    </main>
  );
};

// Memoize the Home component to prevent unnecessary re-renders
export default memo(Home);
