import React, { memo, useState, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { InspirationFilter } from "src/common/Filters/InspirationFilter";
import { CatalogPagination } from "src/common/Pagination/Pagination";
import { FetchBlogsType } from "src/types/FetchData";
import useFetch from "src/hooks/useFetch/useFetch";
import config from "src/config/config";
import InspirationCard from "src/pages/Inspiration/Components/Card/InspirationCard";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "src/store/store";
import { setInspirationCatalogBlogs } from "src/store/slices/blogSlice";
import { VisibilityVariants } from "src/utils/constants/variants";
import { usePagedData } from "src/hooks/usePagedData/usePagedData";
import { createSelector } from "reselect";
import {
  ErrorState,
  LoadingState,
  NotFoundState,
} from "src/common/Catalogs/CatalogStates";

// Animation variants for motion components
const variants = {
  hiddenOpacity: VisibilityVariants.hidden,
  hidden: VisibilityVariants.hiddenY,
  visible: VisibilityVariants.visible,
};

const limit = 10;

const continentNames = [
  "Africa",
  "Asia",
  "Europe",
  "North America",
  "South America",
  "Australia",
  "Antarctica",
];

interface InspirationCatalogProps {
  currentCategory: string;
}

const InspirationCatalog: React.FC<InspirationCatalogProps> = memo(
  ({ currentCategory }) => {
    const dispatch = useDispatch();

    // Memoized selector to get the required state from Redux store
    const selectBlogState = useMemo(() => createSelector(
      (state: RootState) => state.blog.inspirationCatalogBlogs,
      (state: RootState) => state.filter.blog.tags,
      (state: RootState) => state.filter.blog.searchQuery,
      (inspirationCatalogBlogs, blogTags, searchQuery) => ({
        inspirationCatalogBlogs,
        blogTags,
        searchQuery,
      }),
    ), []);

    const { inspirationCatalogBlogs, blogTags, searchQuery } =
      useSelector(selectBlogState);
    const [currentPage, setCurrentPage] = useState(1);

    // Reset to page 1 when filters change
    useEffect(() => {
      setCurrentPage(1);
    }, [currentCategory, blogTags, searchQuery]);

    // Custom hook for pagination
    const { sectionRef, handlePagination } = usePagedData(
      currentPage,
      useCallback((newPage) => {
        setCurrentPage(newPage);
        // Scroll back to top of catalog when page changes
        window.scrollTo({ 
          top: window.scrollY - 300, 
          behavior: 'smooth' 
        });
      }, []),
    );

    // Memoize the query parameters for fetching blogs
    const blogTagsQuery = useMemo(() => 
      blogTags.length > 0 ? blogTags.join(",") : "",
    [blogTags]);

    // Memoize the URL for fetching blogs
    const blogsUrl = useMemo(() => {
      return `/api/blogs?limit=${limit}&page=${currentPage}&category=${
        currentCategory === "All" ? "" : encodeURIComponent(currentCategory)
      }&tags=${blogTagsQuery}&searchQuery=${encodeURIComponent(searchQuery)}`;
    }, [currentPage, currentCategory, blogTagsQuery, searchQuery]);

    // Create a unique cache key for each query
    const cacheKey = useMemo(() => 
      `blogs-catalog-${currentCategory}-${currentPage}-${blogTagsQuery}-${searchQuery}`,
    [currentCategory, currentPage, blogTagsQuery, searchQuery]);

    // Fetch blogs data with optimized parameters
    const {
      data: blogsData,
      isLoading: blogsLoading,
      error: blogsError,
    } = useFetch<FetchBlogsType>(
      cacheKey,
      blogsUrl,
      "blog",
      {
        staleTime: 2 * 60 * 1000, // 2 minutes cache
        cacheTime: 10 * 60 * 1000, // 10 minutes
      }
    );

    // Update Redux store with fetched blogs data
    useEffect(() => {
      if (blogsData?.result) {
        dispatch(setInspirationCatalogBlogs(blogsData.result));
      }
    }, [blogsData, dispatch]);

    // Memoize the blog cards grid to prevent unnecessary re-renders
    const blogCards = useMemo(() => {
      if (!inspirationCatalogBlogs || inspirationCatalogBlogs.length === 0) {
        return null;
      }

      return (
        <motion.div
          key={`inspiration-catalog-${currentPage}-${blogTags}-${currentCategory}-${searchQuery}`}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={variants}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          exit="hidden"
        >
          <motion.div
            variants={variants}
            transition={{ staggerChildren: 0.2 }}
            className="grid grid-cols-2 justify-between gap-x-4 gap-y-8 md:gap-y-20 lg:gap-x-8 lg:gap-y-12 blog-grid-layer"
          >
            {inspirationCatalogBlogs.map((blog) => (
              <InspirationCard key={blog._id} blog={blog} />
            ))}
          </motion.div>
        </motion.div>
      );
    }, [inspirationCatalogBlogs, currentPage, blogTags, currentCategory, searchQuery, variants]);

    // Memoize the pagination component to prevent unnecessary re-renders
    const paginationComponent = useMemo(() => {
      if (!inspirationCatalogBlogs || inspirationCatalogBlogs.length === 0) {
        return null;
      }

      return (
        <CatalogPagination
          count={blogsData?.count || 0}
          page={currentPage}
          limit={limit}
          handlePreviousClick={() =>
            handlePagination(Math.max(1, currentPage - 1))
          }
          handlePageClick={(page) => handlePagination(page)}
          handleNextClick={() => handlePagination(currentPage + 1)}
        />
      );
    }, [inspirationCatalogBlogs, blogsData?.count, currentPage, handlePagination]);

    // Determine if loading state should be shown - only for navigation between pages
    // Modified to avoid showing loading state during filter changes
    const showLoading = useMemo(() => {
      // Only show loading on initial page load, not for filter changes
      return blogsLoading && !inspirationCatalogBlogs?.length;
    }, [blogsLoading, inspirationCatalogBlogs]);

    return (
      <section
        ref={sectionRef}
        className="catalog px-sect mt-sect-short flex w-full flex-col items-center gap-8 md:gap-20"
      >
        <InspirationFilter continentNames={continentNames} />
        <AnimatePresence mode="wait">
          {showLoading ? (
            <LoadingState
              keyName={`loading-state-${currentPage}-${blogTags}-${currentCategory}-${searchQuery}`}
            />
          ) : blogsError ? (
            <ErrorState
              keyName={`error-state-${currentPage}-${blogTags}-${currentCategory}-${searchQuery}`}
            />
          ) : inspirationCatalogBlogs &&
            inspirationCatalogBlogs.length === 0 ? (
            <NotFoundState
              keyName={`not-found-state-${currentPage}-${blogTags}-${currentCategory}-${searchQuery}`}
            />
          ) : (
            blogCards
          )}
        </AnimatePresence>

        {paginationComponent}
      </section>
    );
  },
);

export default InspirationCatalog;
