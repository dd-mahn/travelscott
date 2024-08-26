import React, {
  MouseEventHandler,
  useCallback,
  useMemo,
  useState,
} from "react";
import { motion } from "framer-motion";

// Framer motion variants
const variants = {
  hoverScale: {
    scale: 1.05,
    transition: {
      duration: 0.3,
    },
  },

  tapScale: {
    scale: 0.95,
    transition: {
      duration: 0.3,
    },
  },
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
  const totalPage = useMemo(() => Math.ceil(count / limit), [count, limit]);
  const startRange = useMemo(
    () => (page === 1 ? 1 : limit * page - limit + 1),
    [page, limit],
  );
  const endRange = useMemo(
    () => Math.min(startRange + limit - 1, count),
    [startRange, count],
  );

  return (
    <div className="pagination mt-sect-short flex w-full items-center justify-between rounded-xl px-4 py-2 shadow-component">
      <p className="p-regular">
        Showing {startRange} to {endRange} of{" "}
        <span className="text-main-brown">{count}</span> results
      </p>

      <div className="flex items-center gap-2">
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
            <i className="pointer-events-none ri-arrow-left-s-line"></i>
          </motion.button>
        ) : (
          <button
            className="p-large outline-none"
            title="Previous"
            aria-label="Go to previous page"
          >
            <i className="pointer-events-none ri-arrow-left-s-line text-gray opacity-50"></i>
          </button>
        )}
        {Array.from({ length: totalPage }, (_, i) => (
          <motion.button
            whileHover="hoverScale"
            whileTap="tapScale"
            variants={variants}
            transition={{ duration: 0.3 }}
            key={`page-${i}`}
            className={page === i + 1 ? "active page-btn" : "page-btn"}
            onClick={() => handlePageClick(i + 1)}
            aria-label={`Go to page ${i + 1}`}
          >
            {i + 1}
          </motion.button>
        ))}
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
            <i className="pointer-events-none ri-arrow-right-s-line"></i>
          </motion.button>
        ) : (
          <button
            className="p-large outline-none"
            title="Next"
            aria-label="Go to next page"
          >
            <i className="pointer-events-none ri-arrow-right-s-line text-gray opacity-50"></i>
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
      {count > 1 && index > 0 && (
        <motion.button
          whileHover="hoverScale"
          whileTap="tapScale"
          variants={variants}
          transition={{ duration: 0.3 }}
          className="underline-btn uppercase"
          onClick={handlePreviousClick}
        >
          <i className="pointer-events-none ri-arrow-left-line"></i>
          Previous
        </motion.button>
      )}

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
          <i className="pointer-events-none ri-arrow-right-line"></i>
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
  const [activeDot, setActiveDot] = useState(1);

  const extendedHandlePreviousClick = useCallback(() => {
    handlePreviousClick();
    setActiveDot((prevActiveDot) =>
      prevActiveDot === 1 ? 3 : prevActiveDot - 1,
    );
  }, [activeDot]);

  const extendedHandleNextClick = useCallback(() => {
    handleNextClick();
    setActiveDot((prevActiveDot) => (prevActiveDot % 3) + 1);
  }, [activeDot]);

  return (
    <div className="pagination-bar flex w-fit flex-row items-center justify-between gap-8 rounded-3xl px-2 py-1 shadow-component">
      {count > 1 && index > 0 ? (
        <motion.button
          whileHover="hoverScale"
          whileTap="tapScale"
          variants={variants}
          transition={{ duration: 0.3 }}
          title="Prev"
          className=""
          onClick={() => extendedHandlePreviousClick()}
        >
          <i className="pointer-events-none p-large ri-arrow-left-s-line"></i>
        </motion.button>
      ) : (
        <button title="Prev" className="">
          <i className="pointer-events-none p-large ri-arrow-left-s-line text-gray opacity-70"></i>
        </button>
      )}

      <div className="flex items-center justify-center space-x-2">
        {[1, 2, 3].map((dot) => (
          <motion.span
            whileHover="hoverScale"
            whileTap="tapScale"
            layoutId="pagination-dot"
            variants={variants}
            transition={{ duration: 0.3 }}
            key={dot}
            className={`h-2 w-2 rounded-full ${activeDot === dot ? "bg-background-dark dark:bg-background-light" : "bg-gray"}`}
          ></motion.span>
        ))}
      </div>

      {count > 1 && index < count - 1 ? (
        <motion.button
          whileHover="hoverScale"
          whileTap="tapScale"
          variants={variants}
          transition={{ duration: 0.3 }}
          title="Next"
          className=""
          onClick={() => extendedHandleNextClick()}
        >
          <i className="pointer-events-none p-large ri-arrow-right-s-line"></i>
        </motion.button>
      ) : (
        <button title="Next" className="">
          <i className="pointer-events-none p-large ri-arrow-right-s-line text-gray opacity-70"></i>
        </button>
      )}
    </div>
  );
};
