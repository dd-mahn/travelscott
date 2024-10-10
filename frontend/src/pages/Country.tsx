import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "src/store/store";
import {
  setCurrentCountry,
  setLoading,
  setError,
} from "src/store/slices/countrySlice";
import useFetch from "src/hooks/useFetch";

// Components
import RelatedSections from "src/common/RelatedSections";
import Loading from "src/common/Loading";
import CountryGuide from "./CountryComponents/CountryGuide";
import CountryArticles from "./CountryComponents/CountryArticles";
import CountryDestinations from "./CountryComponents/CountryDestinations";
import { BASE_URL } from "src/utils/config";
import NotFoundPage from "./404";
import Country from "src/types/Country";
import { VisibilityVariants } from "src/utils/variants";
import CountryOverview from "./CountryComponents/CountryOverview";
import CountryHero from "./CountryComponents/CountryHero";
import useStackedSections from "src/hooks/useStackedSections";
import { selectIsDarkMode } from "src/store/slices/themeSlice";
import {
  useSectionTransition,
  useSectionTransition2,
} from "src/hooks/useSectionTransition";

// Animation variants
const variants = {
  hiddenY: VisibilityVariants.hiddenY,
  hiddenFullY: VisibilityVariants.hiddenFullY,
  visible: VisibilityVariants.visible,
};

const CountryPage: React.FC = () => {
  const dispatch = useDispatch();
  const { currentCountry, loading, error } = useSelector(
    (state: RootState) => state.country,
  );
  const isDarkMode = useSelector(selectIsDarkMode);
  const { id } = useParams();

  const {
    data: countryData,
    loading: fetchLoading,
    error: fetchError,
  } = useFetch(`${BASE_URL}/countries/${id}`, [id]);

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

  // Handle section transition
  const {
    ref: articleRef,
    scale: scaleArticle,
    opacity: opacityArticle,
  } = useSectionTransition(["start end", "start center"], [0.7, 1], [0, 1]);
  const {
    ref: destinationRef,
    scale: scaleDestination,
    opacity: opacityDestination,
  } = useSectionTransition(["start end", "start center"], [0.7, 1], [0, 1]);

  // Render logic
  if (loading) {
    return <Loading />;
  }

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
          style={{ scale: scaleArticle, opacity: opacityArticle }}
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

        <motion.section
          style={{ scale: scaleArticle, opacity: opacityArticle }}
          ref={setRef(0)}
          className="sticky"
        >
          <CountryGuide country={currentCountry} />
        </motion.section>

        <motion.section
          style={{ scale: scaleDestination, opacity: opacityDestination }}
          ref={setRef(1)}
          className="sticky"
        >
          <div ref={articleRef}>
            <CountryArticles country={currentCountry} />
          </div>
        </motion.section>

        <section ref={setRef(2)} className="sticky">
          <div ref={destinationRef}>
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
        <RelatedSections type="country" data={currentCountry} />
      </section>
    </main>
  );
};

export default CountryPage;
