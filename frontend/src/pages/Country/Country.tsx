import React, { useEffect, memo, useMemo } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "src/store/store";
import {
  setCurrentCountry,
  setLoading,
  setError,
} from "src/store/slices/countrySlice";
import { setPageLoading } from "src/store/slices/loadingSlice";
import useFetch from "src/hooks/useFetch/useFetch";

// Components
import RelatedSections from "src/common/RelatedSections/RelatedSections";
import Loading from "src/common/Loading/Loading";
import CountryGuide from "src/pages/Country/Components/Guide/CountryGuide";
import CountryArticles from "src/pages/Country/Components/Articles/CountryArticles";
import CountryDestinations from "src/pages/Country/Components/Destinations/CountryDestinations";
import CountryOverview from "src/pages/Country/Components/Overview/CountryOverview";
import CountryHero from "src/pages/Country/Components/Hero/CountryHero";
import NotFoundPage from "src/pages/404/404";

// Utilities
import { VisibilityVariants } from "src/utils/constants/variants";
import useStackedSections from "src/hooks/useStackedSections/useStackedSections";
import { selectIsDarkMode } from "src/store/slices/themeSlice";
import Country from "src/types/Country";
import OptimizedImage from "src/common/OptimizedImage/OptimizedImage";
import "src/styles/components/country.css";

// Animation variants
const variants = {
  hiddenY: VisibilityVariants.hiddenY,
  hiddenFullY: VisibilityVariants.hiddenFullY,
  visible: VisibilityVariants.visible,
};

const CountryPage: React.FC = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const isDarkMode = useSelector(selectIsDarkMode);
  const { currentCountry, loading, error } = useSelector(
    (state: RootState) => state.country,
  );

  // Fetch country data with optimized parameters
  const {
    data: countryData,
    isLoading: fetchLoading,
    error: fetchError,
    isSuccess: fetchSuccess,
  } = useFetch<Country>(
    `country-${id}`,
    `/countries/${id}`,
    "country",
    {
      staleTime: 5 * 60 * 1000, // 5 minutes cache
      cacheTime: 30 * 60 * 1000, // 30 minutes
    }
  );

  // Update global loading state
  useEffect(() => {
    if (fetchSuccess) {
      dispatch(setPageLoading({ page: 'country', isLoading: false }));
    }
    
    return () => {
      // Reset loading state when component unmounts
      dispatch(setPageLoading({ page: 'country', isLoading: true }));
    };
  }, [fetchSuccess, dispatch]);

  // Update Redux store with fetched data
  useEffect(() => {
    dispatch(setLoading(fetchLoading));
    if (fetchError) {
      dispatch(setError("Error fetching country data"));
    } else if (countryData) {
      dispatch(setError(null));
      dispatch(setCurrentCountry(countryData));
    }
  }, [dispatch, fetchLoading, fetchError, countryData]);

  // Handle sticky sections top value
  const { refs: stackedRefs, setRef } = useStackedSections();

  // Memoize the country map image source for better performance
  const mapImageSrc = useMemo(() => {
    if (!currentCountry?.images?.mapImages) return "";
    return isDarkMode
      ? (currentCountry.images.mapImages?.filter((image) =>
          image.includes("dark"),
        )[0] ?? "")
      : (currentCountry.images.mapImages?.filter(
          (image) => !image.includes("dark"),
        )[0] ?? "");
  }, [currentCountry?.images?.mapImages, isDarkMode]);

  // Render loading state
  if (loading) {
    return <Loading />;
  }

  // Render error state or not found page
  if (error || !currentCountry) {
    return <NotFoundPage />;
  }

  return (
    <main data-testid="country-page" className="country">
      <div className="hero-layer">
        <CountryHero country={currentCountry} />
      </div>

      <div className="overview-layer">
        <CountryOverview country={currentCountry} />
      </div>

      <section className="2xl:pt-30 relative lg:pt-sect-short">
        <motion.div
          variants={variants}
          initial="hiddenY"
          whileInView="visible"
          transition={{ duration: 0.5, delay: 0.5, ease: "easeInOut" }}
          viewport={{ once: true }}
          className="map-layer sticky right-0 top-0 z-0 ml-auto h-screen w-full rounded-2xl to-gray lg:w-2/3"
        >
          <OptimizedImage
            src={mapImageSrc}
            alt={`${currentCountry.name} map`}
            className="h-full w-full rounded-2xl"
            imageClassName="rounded-2xl"
          />
        </motion.div>

        <motion.section ref={setRef(0)} className="guide-layer sticky">
          <CountryGuide country={currentCountry} />
        </motion.section>

        <motion.section ref={setRef(1)} className="articles-layer sticky">
          <CountryArticles country={currentCountry} />
        </motion.section>

        <section ref={setRef(2)} className="destinations-layer sticky">
          <CountryDestinations country={currentCountry} />
        </section>
      </section>

      <section className="related-layer flex flex-col gap-4 py-24 lg:py-40 2xl:py-60">
        <div className="overflow-hidden">
          <motion.h2
            variants={variants}
            initial="hiddenFullY"
            whileInView="visible"
            transition={{ duration: 0.5, ease: "easeInOut" }}
            viewport={{ once: true }}
            className="h2-md px-sect"
          >
            More countries
          </motion.h2>
        </div>

        <motion.div
          className="w-screen overflow-x-hidden"
          initial="hiddenY"
          whileInView="visible"
          viewport={{ once: true }}
          variants={variants}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <RelatedSections type="country" data={currentCountry} />
        </motion.div>
      </section>
    </main>
  );
};

export default memo(CountryPage);
