import React, { memo, useCallback, useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { InspirationFilter } from "src/common/FilterBoards";
import { CatalogPagination } from "src/common/Pagination";
import { FetchBlogsType } from "src/types/FetchData";
import useFetch from "src/hooks/useFetch";
import { BASE_URL } from "src/utils/config";
import InspirationCard from "./InspirationCard";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "src/store/store";
import { setAllBlogs } from "src/store/slices/blogSlice";
import Lenis from "lenis";
import { HoverVariants, TapVariants, VisibilityVariants } from "src/utils/variants";

const variants = {
  hiddenOpacity: VisibilityVariants.hidden,
  hidden: VisibilityVariants.hiddenY,
  hiddenFullY: VisibilityVariants.hiddenFullY,
  hiddenYScale: VisibilityVariants.hiddenYScale,
  exitScale: VisibilityVariants.exitScale,
  exitX: VisibilityVariants.exitX,
  visible: VisibilityVariants.visible,
  hoverScale: HoverVariants.hoverScale,
  tapScale: TapVariants.tapScale,
  hoverX: HoverVariants.hoverX,
};

const limit = 10;

interface InspirationCatalogProps {
  currentCategory: string;
}

const InspirationCatalog: React.FC<InspirationCatalogProps> = memo(
  ({ currentCategory }) => {
    const dispatch = useDispatch();
    const selectBlogState = useCallback(
      (state: RootState) => ({
        allBlogs: state.blog.allBlogs,
        blogTags: state.filter.blog.tags,
        searchQuery: state.filter.blog.searchQuery,
      }),
      [],
    );
    const { allBlogs, blogTags, searchQuery } = useSelector(selectBlogState);
    const [currentPage, setCurrentPage] = useState(1);
    const sectionRef = useRef<HTMLElement>(null);
    const lenisRef = useRef<Lenis | null>(null);

    const continentNames = [
      "Africa",
      "Asia",
      "Europe",
      "North America",
      "South America",
      "Australia",
      "Antarctica",
    ];

    // Initialize Lenis
    useEffect(() => {
      lenisRef.current = new Lenis({
        duration: 2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        touchMultiplier: 2,
        infinite: false,
      });

      function raf(time: number) {
        lenisRef.current?.raf(time);
        requestAnimationFrame(raf);
      }

      requestAnimationFrame(raf);

      return () => {
        lenisRef.current?.destroy();
      };
    }, []);

    // Update fetch logic to handle multiple blogTags and searchQuery
    const blogTagsQuery = blogTags.length > 0 ? blogTags.join(",") : "";
    const {
      data: blogsData,
      loading: blogsLoading,
      error: blogsError,
    } = useFetch<FetchBlogsType>(
      `${BASE_URL}/blogs?limit=${limit}&page=${currentPage}&category=${
        currentCategory === "All" ? "" : encodeURIComponent(currentCategory)
      }&tags=${blogTagsQuery}&searchQuery=${encodeURIComponent(searchQuery)}`,
      [currentCategory, currentPage, blogTags, searchQuery],
    );

    useEffect(() => {
      if (blogsData?.result) {
        dispatch(setAllBlogs(blogsData.result));
      }
    }, [blogsData, dispatch]);

    const handlePagination = useCallback((newPage: number) => {
      setCurrentPage(newPage);
      if (sectionRef.current && lenisRef.current) {
        lenisRef.current.scrollTo(sectionRef.current, { offset: -100 });
      }
    }, []);

    return (
      <section
        ref={sectionRef}
        className="catalog px-sect mt-sect-short flex w-full flex-col items-center gap-20"
      >
        <InspirationFilter continentNames={continentNames} />
        <AnimatePresence mode="wait">
          {blogsLoading ? (
            <motion.div
              key={`loading-state-${currentPage}-${blogTags}-${currentCategory}-${searchQuery}`}
              initial="hidden"
              whileInView="visible"
              variants={variants}
              exit="hidden"
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="grid h-[50svh] w-full place-items-center py-sect-short"
            >
              <h3 className="h3-md">Loading...</h3>
            </motion.div>
          ) : blogsError ? (
            <motion.div
              key={`error-state-${currentPage}-${blogTags}-${currentCategory}-${searchQuery}`}
              initial="hidden"
              whileInView="visible"
              variants={variants}
              exit="hidden"
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="grid h-[50svh] w-full place-items-center py-sect-short"
            >
              <h3 className="h3-md">
                Error... Please reload the page or try again later.
              </h3>
            </motion.div>
          ) : allBlogs && allBlogs.length === 0 ? (
            <motion.div
              key={`no-articles-${currentPage}-${blogTags}-${currentCategory}-${searchQuery}`}
              initial="hidden"
              whileInView="visible"
              exit="hidden"
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="grid w-full place-items-center py-sect-short"
            >
              <h3 className="h3-md text-center">No articles found.</h3>
            </motion.div>
          ) : (
            allBlogs &&
            allBlogs.length > 0 && (
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
                  className="grid grid-cols-2 justify-between gap-x-8 gap-y-20"
                >
                  {allBlogs.map((blog) => (
                    <InspirationCard key={blog._id} blog={blog} />
                  ))}
                </motion.div>
              </motion.div>
            )
          )}
        </AnimatePresence>

        {allBlogs && allBlogs.length > 0 && (
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
