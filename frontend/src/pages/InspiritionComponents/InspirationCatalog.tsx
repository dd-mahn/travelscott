import React, { memo, useCallback, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ContinentFilter } from "src/components/common/FIlterBoard";
import { CatalogPagination } from "src/components/common/Pagination";
import { FetchBlogsType } from "src/types/FetchData";
import useFetch from "src/hooks/useFetch";
import { BASE_URL } from "src/utils/config";
import InspirationCard from "./InspirationCard";

const variants = {
  hiddenOpacity: { opacity: 0 },
  hidden: { opacity: 0, y: 40 },
  hiddenFullY: { y: "100%" },
  hiddenYScale: { scale: 0.95, y: 100, opacity: 0 },
  exitScale: { scale: 0, opacity: 0, y: 200, originX: 0 },
  exitX: { x: -1000, opacity: 0, transition: { duration: 4 } },
  visible: { opacity: 1, scale: 1, y: 0, x: 0 },
  hoverScale: {
    scale: 1.05,
    transition: { duration: 0.4, ease: "easeInOut" },
  },
  tapScale: {
    scale: 0.95,
    transition: { duration: 0.4, ease: "easeInOut" },
  },
  hoverX: {
    x: 5,
    transition: {
      duration: 1,
      type: "spring",
      bounce: 0.5,
    },
  },
};

const limit = 10;

interface InspirationCatalogProps {
  currentCategory: string;
}

const InspirationCatalog: React.FC<InspirationCatalogProps> = ({
  currentCategory,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [continentFilter, setContinentFilter] = useState<string[]>([]);
  const sectionRef = useRef<HTMLElement>(null);

  const constructUrl = useCallback(() => {
    let url = `${BASE_URL}/blogs?limit=${limit}&page=${currentPage}`;
    if (currentCategory && currentCategory !== "All") {
      url += `&category=${encodeURIComponent(currentCategory)}`;
    }
    if (continentFilter.length > 0) {
      url += `&tags=${continentFilter.map(encodeURIComponent).join(",")}`;
    }
    return url;
  }, [currentCategory, currentPage, continentFilter]);

  const {
    data: blogsData,
    loading: blogsLoading,
    error: blogsError,
  } = useFetch<FetchBlogsType>(constructUrl(), [currentPage]);

  const blogs = blogsData?.result;
  const totalBlogs = blogsData?.count !== undefined ? blogsData.count : 0;

  const handlePagination = useCallback((newPage: number) => {
    setCurrentPage(newPage);
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      className="catalog px-sect mt-sect-short flex w-full flex-col items-center gap-20"
    >
      <ContinentFilter
        continentFilter={continentFilter}
        setContinentFilter={setContinentFilter}
        setCurrentPage={setCurrentPage}
      />
      <AnimatePresence mode="wait">
        {blogsLoading && (
          <motion.div
            key="Loading..."
            initial="hidden"
            whileInView="visible"
            variants={variants}
            exit="hidden"
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="grid h-[50svh] w-full place-items-center py-sect-short"
          >
            <h3 className="h3-md">Loading...</h3>
          </motion.div>
        )}
        {blogsError && (
          <motion.div
            key={blogsError}
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
        )}
        {blogs && blogs.length === 0 && (
          <motion.div
            key="no-articles"
            initial="hidden"
            whileInView="visible"
            exit="hidden"
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="grid w-full place-items-center py-sect-short"
          >
            <h3 className="h3-md text-center">No articles found.</h3>
          </motion.div>
        )}
        {blogs && blogs.length > 0 && (
          <motion.div
            key={
              "inspiration-catalog" +
              "-" +
              continentFilter +
              "-" +
              currentPage +
              "-" +
              currentCategory
            }
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
              {blogs.map((blog) => (
                <InspirationCard key={blog._id} blog={blog} />
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {blogs && blogs.length > 0 && (
        <CatalogPagination
          count={totalBlogs}
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
};

export default memo(InspirationCatalog);
