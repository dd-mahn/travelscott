import React, { memo, useCallback, useEffect, useMemo, useRef } from "react";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "src/store/store";
import { setHomeBlogs, setBlogChunks, setStarterBlogs } from "src/store/slices/blogSlice";
import { setPageLoading } from "src/store/slices/loadingSlice";

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
  const { homeBlogs, starterBlogs, blogChunks } = useSelector((state: RootState) => ({
    homeBlogs: state.blog.homeBlogs,
    starterBlogs: state.blog.starterBlogs,
    blogChunks: state.blog.blogChunks
  }));

  // Fetch regular blogs data for Articles section
  const { 
    data: blogsData, 
    isSuccess: blogsSuccess, 
    isLoading: blogsLoading 
  } = useFetch<FetchBlogsType>(
    "home-blogs",
    `/api/blogs?limit=20`, // Fetch enough blogs for the Articles section
    "home", // Page identifier for loading state
    {
      staleTime: 5 * 60 * 1000, // 5 minutes cache
      cacheTime: 30 * 60 * 1000, // 30 minutes
    }
  );

  // Fetch starter blogs data using category filter
  const { 
    data: starterBlogsData, 
    isSuccess: starterSuccess, 
    isLoading: starterLoading 
  } = useFetch<FetchBlogsType>(
    "starter-blogs",
    `/api/blogs?category=FirstTimeAbroad&limit=6`, // Directly fetch blogs with the right category
    "home", // Page identifier for loading state
    {
      staleTime: 5 * 60 * 1000, // 5 minutes cache
      cacheTime: 30 * 60 * 1000, // 30 minutes
    }
  );

  // Mark page as loaded when all fetches complete
  useEffect(() => {
    const allDataLoaded = blogsSuccess && starterSuccess;
    
    if (allDataLoaded) {
      dispatch(setPageLoading({ page: 'home', isLoading: false }));
    }
    
    return () => {
      // Reset loading state when component unmounts
      dispatch(setPageLoading({ page: 'home', isLoading: true }));
    };
  }, [blogsSuccess, starterSuccess, dispatch]);

  // Process fetched blogs data for Articles section
  useEffect(() => {
    if (blogsData?.result && blogsData.result.length > 0) {
      // Store all blogs in home blogs slice
      dispatch(setHomeBlogs(blogsData.result));
      
      // Create and store blog chunks for Articles section
      const chunks = createBlogChunks(blogsData.result);
      dispatch(setBlogChunks(chunks));
      
      console.log("Home blogs processed:", {
        totalBlogs: blogsData.result.length,
        chunks: chunks.length
      });
    }
  }, [blogsData, dispatch]);

  // Process fetched starter blogs data
  useEffect(() => {
    if (starterBlogsData?.result && starterBlogsData.result.length > 0) {
      dispatch(setStarterBlogs(starterBlogsData.result));
      
      console.log("Starter blogs processed:", {
        starterBlogs: starterBlogsData.result.length
      });
    }
  }, [starterBlogsData, dispatch]);

  // Section transition hooks
  const { ref: refSO, scale: scaleSO, opacity: opacitySO } = useSectionTransition();
  const { ref: refS, scale: scaleS } = useSectionTransition2();

  // Create a ref for the Articles hook
  const articlesHookRef = useRef<HTMLSpanElement>(null);

  // Stacked sections hook
  const { setRef } = useStackedSections();

  // Memoize blogs to prevent unnecessary re-renders
  const memoizedHomeBlogs = useMemo(() => homeBlogs, [homeBlogs]);
  const memoizedStarterBlogs = useMemo(() => starterBlogs, [starterBlogs]);

  // Log data availability for debugging
  useEffect(() => {
    console.log("Home rendering with:", {
      homeBlogs: homeBlogs.length,
      blogChunks: blogChunks.length,
      starterBlogs: starterBlogs.length,
      isLoading: blogsLoading || starterLoading
    });
  }, [homeBlogs, blogChunks, starterBlogs, blogsLoading, starterLoading]);

  return (
    <main data-testid="home-page" className="home flex flex-col">
      <div className="hero-layer">
        <Hero />
      </div>
      <div className="overview-layer">
        <Brief />
      </div>

      {/* Stacked sections container */}
      <motion.section style={{ scale: scaleS }} className="layer-optimize additional-layer">
        <motion.div
          ref={setRef(0)}
          style={{ scale: scaleSO, opacity: opacitySO }}
          className="sticky pb-sect-default lg:pb-96 layer-optimize-opacity video-layer"
        >
          <Featured />
        </motion.div>

        <div ref={refSO} className="layer-optimize places-layer">
          <Articles articlesHookRef={articlesHookRef} blogs={memoizedHomeBlogs} />
        </div>

        <div className="insight-layer">
          <Hook />
        </div>
        <div className="summary-layer">
          <Starter blogs={memoizedStarterBlogs} />
        </div>
      </motion.section>

      {/* Quote section with ref for section transition */}
      <div ref={refS} className="z-30 layer-optimize related-layer">
        <Quote />
      </div>
    </main>
  );
};

// Memoize the Home component to prevent unnecessary re-renders
export default memo(Home);
