import React, { useEffect, memo } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import useFetch from "src/hooks/useFetch";
import { RootState } from "src/store/store";
import {
  setCurrentDestination,
  setLoading,
  setError,
} from "src/store/slices/destinationSlice";
import type Destination from "src/types/Destination";
import { BASE_URL } from "src/utils/config";
import "src/styles/destination.css";
import useStackedSections from "src/hooks/useStackedSections";

// Components
import RelatedSections from "src/common/RelatedSections";
import NotFoundPage from "./404";
import Loading from "src/common/Loading";
import DestinationHero from "./DestinationComponents/DestinationHero";
import DestinationOverview from "./DestinationComponents/DestinationOverview";
import DestinationTransportation from "./DestinationComponents/DestinationTransportation";
import DestinationPlaces from "./DestinationComponents/DestinationPlaces";
import DestinationInsight from "./DestinationComponents/DestinationInsight";
import DestinationVideo from "./DestinationComponents/DestinationVideo";
import DestinationSummary from "./DestinationComponents/DestinationSummary";

// Animation Variants
import { VisibilityVariants } from "src/utils/variants";

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
  } = useFetch<Destination>(`${BASE_URL}/destinations/${id}`);

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
    <main className="destination">
      <DestinationHero destination={currentDestination} />
      <DestinationOverview destination={currentDestination} />
      <DestinationVideo videoCode={currentDestination.video} />

      <section className="relative">
        <section
          id="additional"
          className="additional px-sect sticky top-0 grid grid-cols-2 grid-rows-2 gap-x-4 gap-y-16 lg:py-40 2xl:py-sect-default"
        >
          {Object.entries(currentDestination.additionalInfo).map(
            ([key, value], index) => (
              <motion.div
                key={key}
                className="flex flex-col gap-4"
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
                <p className="p-regular w-3/4">{value}</p>
              </motion.div>
            ),
          )}
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

      <section className="related lg:py-sect-short 2xl:py-40">
        <div className="overflow-hidden">
          <motion.h2
            className="h2-md px-sect w-full text-center"
            initial="hiddenFullY"
            whileInView="visible"
            viewport={{ once: true }}
            variants={variants}
            transition={{ duration: 0.5 }}
          >
            Related destination
          </motion.h2>
        </div>

        <motion.div
          className=""
          initial="hiddenY"
          whileInView="visible"
          viewport={{ once: true }}
          variants={variants}
          transition={{ duration: 0.5 }}
        >
          <RelatedSections type={"destination"} data={currentDestination} />
        </motion.div>
      </section>
    </main>
  );
};

export default memo(DestinationPage);
