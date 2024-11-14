import React, { MouseEventHandler, useMemo } from "react";
import { motion } from "framer-motion";
import { HoverVariants, TapVariants } from "src/utils/constants/variants";

// Framer motion variants
const variants = {
  hoverScale: HoverVariants.hoverScale,
  tapScale: TapVariants.tapScale,
};

// Catalog pagination
interface CatalogPaginationProps {
  count: number;
  page: number;
  limit: number;
  handlePreviousClick: MouseEventHandler;
  handlePageClick: (page: number) => void;
  handleNextClick: MouseEventHandler;
}

export const CatalogPagination: React.FC<CatalogPaginationProps> = ({
  page,
  count,
  limit,
  handlePreviousClick,
  handlePageClick,
  handleNextClick,
}) => {
  // Calculate total pages
  const totalPage = useMemo(() => Math.ceil(count / limit), [count, limit]);

  // Calculate start range of items
  const startRange = useMemo(
    () => (page === 1 ? 1 : limit * page - limit + 1),
    [page, limit],
  );

  // Calculate end range of items
  const endRange = useMemo(
    () => Math.min(startRange + limit - 1, count),
    [startRange, count],
  );

  return (
    <div className="pagination mt-sect-short flex w-full items-center justify-between rounded-xl bg-opacity-75 px-4 py-2 shadow-component dark:shadow-component-dark">
      <p className="p-regular">
        Showing {startRange} to {endRange} of{" "}
        <span className="text-main-brown dark:text-dark-brown">{count}</span>{" "}
        results
      </p>

      <div className="flex items-center gap-2">
        {/* Previous button */}
        {page > 1 ? (
          <motion.button
            whileHover="hoverScale"
            whileTap="tapScale"
            variants={variants}
            transition={{ duration: 0.3 }}
            className="p-large outline-none"
            title="Previous"
            onClick={handlePreviousClick}
            aria-label="Go to previous page"
          >
            <i className="cursor-hover-small ri-arrow-left-s-line pointer-events-none"></i>
          </motion.button>
        ) : (
          <button
            className="p-large outline-none"
            title="Previous"
            aria-label="Go to previous page"
          >
            <i className="cursor-hover-small ri-arrow-left-s-line pointer-events-none text-gray opacity-50 dark:text-blue-gray-700"></i>
          </button>
        )}

        {/* Page buttons */}
        {Array.from({ length: totalPage }, (_, i) => (
          <motion.button
            whileHover="hoverScale"
            whileTap="tapScale"
            variants={variants}
            transition={{ duration: 0.3 }}
            key={`page-${i}`}
            className={
              page === i + 1 ? "active page-btn cursor-hover-small" : "page-btn"
            }
            onClick={() => handlePageClick(i + 1)}
            aria-label={`Go to page ${i + 1}`}
          >
            {i + 1}
          </motion.button>
        ))}

        {/* Next button */}
        {page < totalPage && !(totalPage === 1 && page === 1) ? (
          <motion.button
            whileHover="hoverScale"
            whileTap="tapScale"
            variants={variants}
            transition={{ duration: 0.3 }}
            className="p-large outline-none"
            title="Next"
            onClick={handleNextClick}
            aria-label="Go to next page"
          >
            <i className="cursor-hover-small ri-arrow-right-s-line pointer-events-none"></i>
          </motion.button>
        ) : (
          <button
            className="p-large outline-none"
            title="Next"
            aria-label="Go to next page"
          >
            <i className="cursor-hover-small ri-arrow-right-s-line pointer-events-none text-gray opacity-50 dark:text-blue-gray-700"></i>
          </button>
        )}
      </div>
    </div>
  );
};

// Button pagination
interface ButtonPaginationProps {
  count: number;
  index: number;
  handlePreviousClick: MouseEventHandler;
  handleNextClick: MouseEventHandler;
}

export const ButtonPagination: React.FC<ButtonPaginationProps> = ({
  count,
  index,
  handlePreviousClick,
  handleNextClick,
}) => {
  return (
    <div
      className="px-sect flex w-full items-center"
      style={
        index > 0
          ? { justifyContent: "space-between" }
          : { justifyContent: "flex-end" }
      }
    >
      {/* Previous button */}
      {count > 1 && index > 0 && (
        <motion.button
          whileHover="hoverScale"
          whileTap="tapScale"
          variants={variants}
          transition={{ duration: 0.3 }}
          className="underline-btn uppercase"
          onClick={handlePreviousClick}
        >
          <i className="cursor-hover-small ri-arrow-left-line pointer-events-none"></i>
          Previous
        </motion.button>
      )}

      {/* Next button */}
      {count > 1 && index < count - 1 && (
        <motion.button
          whileHover="hoverScale"
          whileTap="tapScale"
          variants={variants}
          transition={{ duration: 0.3 }}
          className="underline-btn uppercase"
          onClick={handleNextClick}
        >
          Next
          <i className="cursor-hover-small ri-arrow-right-line pointer-events-none"></i>
        </motion.button>
      )}
    </div>
  );
};

// Dot pagination
interface DotPaginationProps {
  count: number;
  index: number;
  handlePreviousClick: () => void;
  handleNextClick: () => void;
}

export const DotPagination: React.FC<DotPaginationProps> = ({
  count,
  index,
  handlePreviousClick,
  handleNextClick,
}) => {
  // Button animation variants
  const buttonVariants = {
    hover: { scale: 1.1 },
    tap: { scale: 0.9 },
  };

  // Dot animation variants
  const dotVariants = {
    inactive: { scale: 1, backgroundColor: "#808080" },
    active: { scale: 1.2, backgroundColor: "#000000" },
  };

  return (
    <motion.div
      layout
      className="pagination-bar flex w-fit flex-row items-center justify-between gap-8 rounded-3xl bg-background-light bg-opacity-75 px-2 py-1 shadow-component dark:shadow-component-dark"
    >
      {/* Previous button */}
      <motion.button
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
        title="Prev"
        className="cursor-hover-small"
        onClick={handlePreviousClick}
        disabled={index === 0}
      >
        <i
          className={`cursor-hover-small p-large ri-arrow-left-s-line pointer-events-none text-text-light dark:text-text-light ${index === 0 ? "text-gray opacity-70 dark:text-gray" : ""}`}
        ></i>
      </motion.button>

      {/* Dots */}
      <div className="flex items-center justify-center space-x-2">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            data-testid="pagination-dot"
            variants={dotVariants}
            animate={i === index % 3 ? "active" : "inactive"}
            transition={{ duration: 0.3 }}
            className="h-2 w-2 rounded-full"
          ></motion.span>
        ))}
      </div>

      {/* Next button */}
      <motion.button
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
        title="Next"
        className="cursor-hover-small"
        onClick={handleNextClick}
        disabled={index === count - 1}
      >
        <i
          className={`cursor-hover-small p-large ri-arrow-right-s-line text-text-light dark:text-text-light ${index === count - 1 ? "text-gray opacity-70 dark:text-gray" : ""}`}
        ></i>
      </motion.button>
    </motion.div>
  );
};
