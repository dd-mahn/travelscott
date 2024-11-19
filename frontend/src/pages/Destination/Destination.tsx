import React, { useEffect, memo } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import useFetch from "src/hooks/useFetch/useFetch";
import { RootState } from "src/store/store";
import {
  setCurrentDestination,
  setLoading,
  setError,
} from "src/store/slices/destinationSlice";
import type Destination from "src/types/Destination";
import config from "src/config/config";
import "src/styles/destination.css";
import useStackedSections from "src/hooks/useStackedSections/useStackedSections";

// Components
import RelatedSections from "src/common/RelatedSections/RelatedSections";
import NotFoundPage from "src/pages/404/404";
import Loading from "src/common/Loading/Loading";
import DestinationHero from "src/pages/Destination/Components/Hero/DestinationHero";
import DestinationOverview from "src/pages/Destination/Components/Overview/DestinationOverview";
import DestinationTransportation from "src/pages/Destination/Components/Transportation/DestinationTransportation";
import DestinationPlaces from "src/pages/Destination/Components/Places/DestinationPlaces";
import DestinationInsight from "src/pages/Destination/Components/Insight/DestinationInsight";
import DestinationVideo from "src/pages/Destination/Components/Video/DestinationVideo";
import DestinationSummary from "src/pages/Destination/Components/Summary/DestinationSummary";

// Animation Variants
import { VisibilityVariants } from "src/utils/constants/variants";

// Define animation variants
const variants = {
  hiddenY: VisibilityVariants.hiddenY,
  hiddenFullY: VisibilityVariants.hiddenFullY,
  visible: VisibilityVariants.visible,
};

const DestinationPage: React.FC = () => {
  const dispatch = useDispatch();
  const { currentDestination, loading, error } = useSelector(
    (state: RootState) => state.destination,
  );

  // Get destination ID from URL parameters
  const { id } = useParams();

  // Fetch destination data
  const {
    data: destination,
    loading: destinationLoading,
    error: destinationError,
  } = useFetch<Destination>(`${config.api.baseUrl}/destinations/${id}`);

  // Update Redux store based on fetch results
  useEffect(() => {
    dispatch(setLoading(destinationLoading));
    if (destinationError) {
      dispatch(setError(destinationError));
    } else {
      dispatch(setError(null));
      dispatch(setCurrentDestination(destination as Destination));
    }
  }, [dispatch, destinationLoading, destinationError, destination]);

  // Handle sticky sections top value
  const { refs: stackedRefs, setRef } = useStackedSections();

  // Render loading state
  if (loading) {
    return <Loading />;
  }

  // Render error state or not found page
  if (error || !currentDestination) {
    return <NotFoundPage />;
  }

  // Render main content
  return (
    <main data-testid="destination-page" className="destination relative">
      <DestinationHero destination={currentDestination} />
      <DestinationOverview destination={currentDestination} />

      <motion.div className="z-30">
        <DestinationVideo videoCode={currentDestination.video} />
      </motion.div>

      <section className="relative">
        <section
          id="additional"
          className="additional px-sect sticky top-0 grid h-[120svh] place-items-start pb-32 md:pt-40 2xl:pt-sect-default"
        >
          <div className="grid grid-cols-1 gap-x-3 gap-y-10 md:grid-cols-2 md:gap-x-4 md:gap-y-16">
            {Object.entries(currentDestination.additionalInfo).map(
              ([key, value], index) => (
                <motion.div
                  key={key}
                  className="flex h-fit flex-col items-center gap-4 md:items-start"
                  variants={variants}
                  initial="hiddenY"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                  <h2 className="h2-md">
                    {key === "whenToVisit"
                      ? "When to visit?"
                      : key === "whoToGoWith"
                        ? "Who to go with?"
                        : key === "whatToExpect"
                          ? "What to expect?"
                          : key === "healthAndSafety"
                            ? "Health and safety"
                            : ""}
                  </h2>
                  <p className="p-regular sm:w-4/5 md:w-3/4">{value}</p>
                </motion.div>
              ),
            )}
          </div>
        </section>

        <section ref={setRef(0)} className="sticky">
          <DestinationTransportation
            transportation={currentDestination.transportation}
          />
        </section>

        <section ref={setRef(1)} className="sticky">
          <DestinationPlaces places={currentDestination.places} />
        </section>

        <section ref={setRef(2)} className="sticky">
          <DestinationInsight destination={currentDestination} />
        </section>
      </section>

      <DestinationSummary summary={currentDestination.summary} />

      <section className="related py-sect-short lg:py-sect-short 2xl:py-40">
        <div className="overflow-hidden">
          <motion.h2
            className="h2-md px-sect w-full text-center"
            initial="hiddenFullY"
            whileInView="visible"
            viewport={{ once: true }}
            variants={variants}
            transition={{ duration: 0.5 }}
          >
            More destinations
          </motion.h2>
        </div>

        <motion.div
          className="mt-4"
          initial="hiddenY"
          whileInView="visible"
          viewport={{ once: true }}
          variants={variants}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <RelatedSections type={"destination"} data={currentDestination} />
        </motion.div>
      </section>
    </main>
  );
};

export default memo(DestinationPage);
