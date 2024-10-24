import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "src/store/store";
import {
  setCurrentCountry,
  setLoading,
  setError,
} from "src/store/slices/countrySlice";
import useFetch from "src/hooks/useFetch/useFetch";

// Components
import RelatedSections from "src/common/RelatedSections";
import Loading from "src/common/Loading";
import CountryGuide from "src/pages/Country/Components/CountryGuide";
import CountryArticles from "src/pages/Country/Components/CountryArticles";
import CountryDestinations from "src/pages/Country/Components/CountryDestinations";
import CountryOverview from "src/pages/Country/Components/CountryOverview";
import CountryHero from "src/pages/Country/Components/CountryHero";
import NotFoundPage from "src/pages/404/404";

// Utilities
import config from "src/config/config";
import { VisibilityVariants } from "src/utils/constants/variants";
import useStackedSections from "src/hooks/useStackedSections/useStackedSections";
import { selectIsDarkMode } from "src/store/slices/themeSlice";
import Country from "src/types/Country";

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

  // Fetch country data
  const {
    data: countryData,
    loading: fetchLoading,
    error: fetchError,
  } = useFetch(`${config.api.baseUrl}/countries/${id}`, [id]);

  useEffect(() => {
    dispatch(setLoading(fetchLoading));
    if (fetchError) {
      dispatch(setError("Error fetching country data"));
    } else {
      dispatch(setError(null));
      dispatch(setCurrentCountry(countryData as Country));
    }
  }, [dispatch, fetchLoading, fetchError, countryData]);

  // Handle sticky sections top value
  const { refs: stackedRefs, setRef } = useStackedSections();

  // Render loading state
  if (loading) {
    return <Loading />;
  }

  // Render error state or not found page
  if (error || !currentCountry) {
    return <NotFoundPage />;
  }

  return (
    <main className="country">
      {/* HERO SECTION */}
      <CountryHero country={currentCountry} />

      {/* OVERVIEW SECTION */}
      <motion.div>
        <CountryOverview country={currentCountry} />
      </motion.div>

      {/* STACKED SECTIONS */}
      <section className="2xl:pt-30 relative lg:pt-sect-short">
        <motion.div
          variants={variants}
          initial="hiddenY"
          whileInView="visible"
          transition={{ duration: 0.5, delay: 0.5, ease: "easeInOut" }}
          viewport={{ once: true }}
          className="sticky right-0 top-0 z-0 ml-auto h-screen w-full rounded-2xl bg-gradient-to-t from-blue-gray-900 to-gray lg:w-2/3"
        >
          <img
            src={
              isDarkMode
                ? currentCountry.images.mapImages?.filter((image) =>
                    image.includes("dark"),
                  )[0]
                : currentCountry.images.mapImages?.filter(
                    (image) => !image.includes("dark"),
                  )[0]
            }
            alt={`${currentCountry.name} map`}
            className="h-full w-full rounded-2xl object-cover"
          />
        </motion.div>

        <motion.section ref={setRef(0)} className="sticky">
          <CountryGuide country={currentCountry} />
        </motion.section>

        <motion.section ref={setRef(1)} className="sticky">
          <div>
            <CountryArticles country={currentCountry} />
          </div>
        </motion.section>

        <section ref={setRef(2)} className="sticky">
          <div>
            <CountryDestinations country={currentCountry} />
          </div>
        </section>
      </section>

      {/* MORE COUNTRIES SECTION */}
      <section className="flex flex-col gap-4 py-24 lg:py-40 2xl:py-60">
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

export default CountryPage;
