import React, { useEffect, memo, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "src/store/store";
import { setAllBlogs, setFeaturedBlogs } from "src/store/slices/blogSlice";
import { setPageLoading } from "src/store/slices/loadingSlice";
import useFetch from "src/hooks/useFetch/useFetch";
import config from "src/config/config";
import { FetchBlogsType } from "src/types/FetchData";
import { VisibilityVariants } from "src/utils/constants/variants";

import FeaturedBlogs from "src/common/FeaturedBlogsSlider/FeaturedBlogs";
import NotFoundPage from "src/pages/404/404";
import Loading from "src/common/Loading/Loading";
import InspirationCatalog from "src/pages/Inspiration/Components/Catalog/InspirationCatalog";
import InspirationHero from "src/pages/Inspiration/Components/Hero/InspirationHero";
import InspirationButtons from "src/pages/Inspiration/Components/Buttons/InspirationButtons";
import InspirationHeading from "src/pages/Inspiration/Components/Heading/InspirationHeading";

// Framer motion variants
const variants = {
  hidden: VisibilityVariants.hidden,
  hiddenY: VisibilityVariants.hiddenY,
  visible: VisibilityVariants.visible,
};

const Inspiration: React.FC = () => {
  const dispatch = useDispatch();
  const { currentCategory } = useSelector((state: RootState) => state.inspiration);
  const { featuredBlogs } = useSelector((state: RootState) => state.blog);

  // Memoize the URL for fetching blogs to prevent unnecessary data fetching
  const blogsUrl = useMemo(() => {
    return `/api/blogs?category=${currentCategory === "All" ? "" : encodeURIComponent(currentCategory)}`;
  }, [currentCategory]);

  // Fetch blogs data with optimized parameters
  const {
    data: allBlogsData,
    isLoading: allBlogsLoading,
    error: allBlogsError,
    isSuccess: allBlogsSuccess,
  } = useFetch<FetchBlogsType>(
    `blogs-${currentCategory}`,
    blogsUrl,
    "blog",
    {
      staleTime: 5 * 60 * 1000, // 5 minutes cache
      cacheTime: 30 * 60 * 1000, // 30 minutes
    }
  );

  // Update global loading state
  useEffect(() => {
    if (allBlogsSuccess) {
      dispatch(setPageLoading({ page: 'inspiration', isLoading: false }));
    }
    
    return () => {
      // Reset loading state when component unmounts
      dispatch(setPageLoading({ page: 'inspiration', isLoading: true }));
    };
  }, [allBlogsSuccess, dispatch]);

  // Update blogs data in the store
  useEffect(() => {
    if (allBlogsData?.result) {
      dispatch(setAllBlogs(allBlogsData.result));
      // Only update featured blogs if we have them
      const newFeaturedBlogs = allBlogsData.result.filter((blog) => blog.featured);
      if (newFeaturedBlogs.length > 0) {
        dispatch(setFeaturedBlogs(newFeaturedBlogs));
      }
    }
  }, [allBlogsData, dispatch]);

  // Memoize the featured blogs section to prevent unnecessary re-renders
  const featuredBlogsSection = useMemo(() => {
    if (featuredBlogs.length > 0) {
      return (
        <motion.div
          initial="hiddenY"
          animate="visible"
          variants={variants}
          transition={{ duration: 0.5, delay: 2.5 }}
          className="z-10 w-full mt-sect-short lg:mt-sect-short 2xl:mt-[15rem]"
        >
          <FeaturedBlogs blogs={featuredBlogs} />
        </motion.div>
      );
    } else {
      return <div className="h-[50svh] md:h-[75svh]" />;
    }
  }, [featuredBlogs, variants]);

  // Render loading or error state
  if (allBlogsLoading) return <Loading />;
  if (allBlogsError) return <NotFoundPage />;

  return (
    <AnimatePresence mode="wait">
      {currentCategory !== "" && (
        <motion.main
          data-testid="inspiration-page"
          key={`inspiration-page-category-${currentCategory}`}
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={variants}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="inspiration relative flex min-h-screen flex-col items-center gap-8 pb-sect-short md:pb-sect-default"
          data-filter={currentCategory}
        >
          {/* Hero Section */}
          <InspirationHero currentCategory={currentCategory} />

          {/* Heading */}
          <InspirationHeading currentCategory={currentCategory} />

          {/* Category Filters */}
          <InspirationButtons />

          {/* Featured Blogs Section */}
          {featuredBlogsSection}

          {/* Catalog Section */}
          <InspirationCatalog currentCategory={currentCategory} />
        </motion.main>
      )}
    </AnimatePresence>
  );
};

export default memo(Inspiration);
