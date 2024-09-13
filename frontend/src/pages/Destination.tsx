import React, { useEffect, memo } from "react";
import { useParams } from "react-router-dom";
import useFetch from "src/hooks/useFetch";
import type Destination from "src/types/Destination";
import { BASE_URL } from "src/utils/config";
import "src/styles/destination.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "src/store/store";
import {
  setCurrentDestination,
  setLoading,
  setError,
} from "src/store/slices/destinationSlice";

// Material Tailwind
import RelatedSections from "src/common/RelatedSections";
import NotFoundPage from "./404";
import Loading from "src/common/Loading";
import useStackedSections from "src/hooks/useStackedSections";
import DestinationHero from "./DestinationComponents/DestinationHero";
import DestinationOverview from "./DestinationComponents/DestinationOverview";
import DestinationTransportation from "./DestinationComponents/DestinationTransportation";
import DestinationPlaces from "./DestinationComponents/DestinationPlaces";
import DestinationInsight from "./DestinationComponents/DestinationInsight";

const DestinationPage: React.FC = () => {
  const dispatch = useDispatch();
  const { currentDestination, loading, error } = useSelector(
    (state: RootState) => state.destination,
  );
  // Handle destination data
  const { id } = useParams();
  const {
    data: destination,
    loading: destinationLoading,
    error: destinationError,
  } = useFetch<Destination>(`${BASE_URL}/destinations/${id}`);

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

  // Render logic
  if (loading) {
    return <Loading />;
  }
  if (error || !currentDestination) {
    return <NotFoundPage />;
  }

  return (
    <main className="destination">
      <DestinationHero destination={currentDestination} />

      <DestinationOverview destination={currentDestination} />

      <section className="video py-sect-short">
        <div className="grid h-screen place-items-center">
          <iframe
            title="destination-video"
            src={`https://www.youtube.com/embed/${currentDestination.video}?controls=0`}
            className="h-full w-full"
          ></iframe>
        </div>
      </section>

      <section className="relative">
        <section
          id="additional"
          className="additional px-sect sticky top-0 grid grid-cols-2 grid-rows-2 gap-x-4 gap-y-16 lg:py-40 2xl:py-sect-default"
        >
          {Object.entries(currentDestination.additionalInfo).map(
            ([key, value]) => (
              <div key={key} className="flex flex-col gap-4">
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
              </div>
            ),
          )}
        </section>

        <section ref={setRef(0)} className="sticky">
          <DestinationTransportation
            destination={currentDestination}
          />
        </section>

        <section ref={setRef(1)} className="sticky">
          <DestinationPlaces
            destination={currentDestination}
          />
        </section>

        <section ref={setRef(2)} className="sticky">
          <DestinationInsight
            destination={currentDestination}
          />
        </section>
      </section>

      <section
        id="summary"
        className="summary px-sect flex flex-col gap-sect-short rounded-3xl bg-background-light lg:py-60 2xl:py-sect-medium"
      >
        <h1 className="h1-md">
          <i className="ri-shining-2-fill"></i> Summary
        </h1>
        <div className="mt-sect-short grid place-items-center">
          <p className="p-medium w-2/5">
            {currentDestination.summary} <br /> <br />{" "}
            <p className="p-medium">Have a good trip!</p>
          </p>
        </div>
      </section>

      <section className="related lg:py-sect-short 2xl:py-40">
        <h2 className="h2-md px-sect w-full text-center">
          Related destination
        </h2>
        <RelatedSections type={"destination"} data={currentDestination} />
      </section>
    </main>
  );
};

export default memo(DestinationPage);
