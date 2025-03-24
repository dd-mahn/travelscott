import React, { memo, useState, useEffect } from "react";
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
    const selectBlogState = createSelector(
      (state: RootState) => state.blog.inspirationCatalogBlogs,
      (state: RootState) => state.filter.blog.tags,
      (state: RootState) => state.filter.blog.searchQuery,
      (inspirationCatalogBlogs, blogTags, searchQuery) => ({
        inspirationCatalogBlogs,
        blogTags,
        searchQuery,
      }),
    );

    const { inspirationCatalogBlogs, blogTags, searchQuery } =
      useSelector(selectBlogState);
    const [currentPage, setCurrentPage] = useState(1);

    // Custom hook for pagination
    const { sectionRef, handlePagination } = usePagedData(
      currentPage,
      (newPage) => {
        setCurrentPage(newPage);
      },
    );

    useEffect(() => {
      setCurrentPage(1);
    }, [currentCategory, blogTags, searchQuery]);

    // Construct query parameters for fetching blogs
    const blogTagsQuery = blogTags.length > 0 ? blogTags.join(",") : "";
    const {
      data: blogsData,
      loading: blogsLoading,
      error: blogsError,
    } = useFetch<FetchBlogsType>(
      `/api/blogs?limit=${limit}&page=${currentPage}&category=${
        currentCategory === "All" ? "" : encodeURIComponent(currentCategory)
      }&tags=${blogTagsQuery}&searchQuery=${encodeURIComponent(searchQuery)}`,
      [currentCategory, currentPage, blogTags, searchQuery],
    );

    // Update Redux store with fetched blogs data
    useEffect(() => {
      if (blogsData?.result) {
        dispatch(setInspirationCatalogBlogs(blogsData.result));
      }
    }, [blogsData, dispatch]);

    return (
      <section
        ref={sectionRef}
        className="catalog px-sect mt-sect-short flex w-full flex-col items-center gap-8 md:gap-20"
      >
        <InspirationFilter continentNames={continentNames} />
        <AnimatePresence mode="wait">
          {blogsLoading ? (
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
                className="grid grid-cols-2 justify-between gap-x-4 gap-y-8 md:gap-y-20 lg:gap-x-8 lg:gap-y-12"
              >
                {inspirationCatalogBlogs.map((blog) => (
                  <InspirationCard key={blog._id} blog={blog} />
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {inspirationCatalogBlogs && inspirationCatalogBlogs.length > 0 && (
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
        )}
      </section>
    );
  },
);

export default InspirationCatalog;
