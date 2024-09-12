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
import useFetch from "src/hooks/useFetch";

// Components
import RelatedSections from "src/components/common/RelatedSections";
import Loading from "src/components/common/Loading";
import CountryInfo from "./CountryComponents/CountryInfo";
import CountryGuide from "./CountryComponents/CountryGuide";
import CountryArticles from "./CountryComponents/CountryArticles";
import CountryDestinations from "./CountryComponents/CountryDestinations";
import { BASE_URL } from "src/utils/config";
import NotFoundPage from "./404";
import { Carousel } from "@material-tailwind/react";
import Country from "src/types/Country";
import {
  HoverVariants,
  TapVariants,
  VisibilityVariants,
} from "src/utils/variants";

// Animation variants
const variants = {
  hiddenY: VisibilityVariants.hiddenY,
  hiddenShort: VisibilityVariants.hiddenShortY,
  hiddenFullY: VisibilityVariants.hiddenFullY,
  hiddenYScale: VisibilityVariants.hiddenYScale,
  exitScale: VisibilityVariants.exitScale,
  visible: VisibilityVariants.visible,
  exitX: VisibilityVariants.exitX,
  hoverScale: HoverVariants.hoverScale,
  tapScale: TapVariants.tapScale,
};

const CountryPage: React.FC = () => {
  const dispatch = useDispatch();
  const { currentCountry, loading, error } = useSelector(
    (state: RootState) => state.country,
  );
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

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <motion.div
        initial="hiddenY"
        animate="visible"
        variants={variants}
        transition={{ duration: 0.5 }}
        className="grid h-screen w-full place-items-center"
      >
        <h3 className="h3-md">{error}</h3>
      </motion.div>
    );
  }

  if (!currentCountry) {
    return <NotFoundPage />;
  }

  // Rest of the component remains the same, using currentCountry from Redux state
  return (
    <main className="country">
      {/* HERO SECTION */}
      <motion.section
        initial="hiddenY"
        animate="visible"
        variants={variants}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="hero flex h-screen flex-col gap-8"
      >
        {/* @ts-ignore */}
        <Carousel
          autoplay
          autoplayDelay={4000}
          transition={{ duration: 2 }}
          loop
        >
          {currentCountry.images.otherImages?.map((image, index) => (
            <div className="h-full w-svw" key={index}>
              <img
                src={image}
                alt={`${currentCountry.name} image`}
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </Carousel>

        <div className="px-sect flex items-center gap-8">
          <motion.img
            initial="hiddenY"
            animate="visible"
            variants={variants}
            transition={{ duration: 0.5, delay: 1 }}
            src={currentCountry.images.flagImages?.[0]}
            className="w-1/6 rounded-xl"
            alt={`${currentCountry.name} flag`}
          />
          <div className="big-heading overflow-hidden">
            {currentCountry.name.split("").map((letter, index) => (
              <motion.h1
                key={index}
                variants={variants}
                initial="hiddenFullY"
                animate="visible"
                transition={{
                  duration: 0.8,
                  delay: 1.2 + index * 0.1,
                  type: "spring",
                  bounce: 0.5,
                }}
                className="inline-block"
              >
                {letter}
              </motion.h1>
            ))}
          </div>
        </div>
      </motion.section>

      {/* INFORMATION SECTION */}
      <CountryInfo country={currentCountry} />

      {/* STACKED SECTIONS */}
      <section className="map 2xl:pt-30 relative lg:pt-sect-short">
        <motion.div
          variants={variants}
          initial="hiddenY"
          whileInView="visible"
          transition={{ duration: 0.5, delay: 0.5, ease: "easeInOut" }}
          viewport={{ once: true }}
          className="sticky right-0 top-0 z-0 ml-auto h-screen w-2/3"
        >
          <img
            src={currentCountry.images.mapImages?.[0]}
            alt={`${currentCountry.name} map`}
            className="h-full w-full object-cover"
          />
        </motion.div>

        <CountryGuide country={currentCountry} />
        <CountryArticles country={currentCountry} />
        <CountryDestinations country={currentCountry} />
      </section>

      {/* MORE COUNTRIES SECTION */}
      <section className="px-sect flex flex-col gap-4 lg:py-40 2xl:py-60">
        <div className="overflow-hidden">
          <motion.h2
            variants={variants}
            initial="hiddenFullY"
            whileInView="visible"
            transition={{ duration: 0.5, ease: "easeInOut" }}
            viewport={{ once: true }}
            className="h2-md"
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
