import React, { memo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePagedData } from "src/hooks/usePagedData";
import DestinationCard from "src/common/DestinationCard";
import { CatalogPagination } from "src/common/Pagination";
import { HoverVariants, VisibilityVariants } from "src/utils/variants";
import {
  ErrorState,
  LoadingState,
  NotFoundState,
} from "src/common/CatalogStates";
import Destination from "src/types/Destination";

const variants = {
  hiddenY: VisibilityVariants.hiddenY,
  hiddenShort: VisibilityVariants.hiddenShortY,
  hiddenFullY: VisibilityVariants.hiddenFullY,
  hiddenYScale: VisibilityVariants.hiddenYScale,
  exitScale: VisibilityVariants.exitScale,
  exitX: VisibilityVariants.exitX,
  visible: VisibilityVariants.visible,
  hoverScale: HoverVariants.hoverScale,
};

interface DestinationCatalogProps {
  destinations: Destination[];
  totalDestinations: number;
  loading: boolean;
  error: string | null;
  currentPage: number;
  onPageChange: (page: number) => void;
  limit: number;
  filterKey: string;
}

const DestinationCatalog: React.FC<DestinationCatalogProps> = ({
  destinations,
  totalDestinations,
  loading,
  error,
  currentPage,
  onPageChange,
  limit,
  filterKey,
}) => {
  const { sectionRef, handlePagination } = usePagedData(
    currentPage,
    onPageChange,
  );

  return (
    <section className="min-h-[50svh] z-0 w-full" ref={sectionRef}>
      <AnimatePresence mode="wait">
        {loading ? (
          <LoadingState keyName={`loading-state-${currentPage}-${filterKey}`} />
        ) : error ? (
          <ErrorState keyName={`error-state-${currentPage}-${filterKey}`} />
        ) : destinations.length === 0 ? (
          <NotFoundState keyName={`not-found-state-${currentPage}-${filterKey}`} />
        ) : (
          destinations.length > 0 && (
            <motion.div
              key={`discover-destinations-${currentPage}-${filterKey}`}
              initial="hiddenY"
              whileInView="visible"
              viewport={{ once: true }}
              exit="hiddenShort"
              transition={{
                duration: 0.5,
                ease: "easeInOut",
              }}
              variants={variants}
            >
              <motion.div
                variants={variants}
                transition={{
                  staggerChildren: 0.2,
                }}
                className="grid w-full grid-cols-2 md:grid-cols-3 items-start gap-x-4 gap-y-8 lg:gap-x-8 lg:gap-y-12"
              >
                {destinations.map((destination) => (
                  <motion.div
                    variants={variants}
                    key={`destination-${destination._id}`}
                    className="w-full"
                  >
                    <DestinationCard destination={destination} />
                  </motion.div>
                ))}
              </motion.div>
              <motion.div variants={variants} className="w-full">
                <CatalogPagination
                  count={totalDestinations}
                  page={currentPage}
                  limit={limit}
                  handlePreviousClick={() =>
                    handlePagination(Math.max(1, currentPage - 1))
                  }
                  handlePageClick={(page) => handlePagination(page)}
                  handleNextClick={() => handlePagination(currentPage + 1)}
                />
              </motion.div>
            </motion.div>
          )
        )}
      </AnimatePresence>
    </section>
  );
};

export default memo(DestinationCatalog);
