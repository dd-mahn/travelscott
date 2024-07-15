import React, { MouseEventHandler } from "react";

interface PaginationProps {
  count: number;
  page: number;
  limit: number;
  handlePreviousClick: MouseEventHandler;
  handlePageClick: (page:number) => void;
  handleNextClick: MouseEventHandler;
}

const Pagination: React.FC<PaginationProps> = ({
  page,
  count,
  limit,
  handlePreviousClick,
  handlePageClick,
  handleNextClick,
}) => {
  const totalPage = Math.ceil(count / limit);
  const startRange = page === 1 ? 1 :limit * page + 1;
  const endRange = Math.min(startRange + limit - 1, count);

  return (
    <div className="pagination mt-sect-short rounded-xl shadow-component px-4 w-full flex justify-between items-center py-2">
      <p className="p-regular">
        Showing {startRange} to {endRange} of <span className="text-main-brown">{count}</span> results
      </p>

      <div className="flex items-center gap-2">
        {page > 1 && (
          <button className="p-large outline-none" title="Previous" onClick={page > 1 ? handlePreviousClick : undefined} aria-label="Go to previous page">
            <i className="ri-arrow-left-s-line"></i>
          </button>
        )}
        {Array.from({ length: totalPage }, (_, i) => (
          <button
            key={`page-${i}`}
            className={page === i+1 ? "active page-btn" : "page-btn"}
            onClick={() => handlePageClick(i+1)}
            aria-label={`Go to page ${i + 1}`}
          >
            {i + 1}
          </button>
        ))}
        {page < totalPage || (page === totalPage && page === 1) && (
          <button className="p-large outline-none" title="Next" onClick={page < totalPage ? handleNextClick : undefined} aria-label="Go to next page">
            <i className="ri-arrow-right-s-line"></i>
          </button>
        )}
      </div>
    </div>
  );
};

export default Pagination;