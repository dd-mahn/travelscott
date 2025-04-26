import React, { memo, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "src/store/store";
import { setCountryBlogs } from "src/store/slices/countrySlice";

// Components
import FeaturedBlogs from "src/common/FeaturedBlogsSlider/FeaturedBlogs";
import { LoadingState } from "src/common/Catalogs/CatalogStates";

// Types
import Country from "src/types/Country";
import { FetchBlogsType } from "src/types/FetchData";

// Hooks
import useFetch from "src/hooks/useFetch/useFetch";

// Utils
import config from "src/config/config";
import {
  HoverVariants,
  TapVariants,
  VisibilityVariants,
} from "src/utils/constants/variants";

// Define the props for the CountryArticles component
interface CountryArticlesProps {
  country: Country;
}

// Animation variants for framer-motion
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

const CountryArticles: React.FC<CountryArticlesProps> = ({ country }) => {
  const dispatch = useDispatch();
  const { countryBlogs } = useSelector((state: RootState) => state.country);

  // Fetch blogs data
  const {
    data: blogData,
    isLoading: blogLoading,
    error: blogError,
  } = useFetch<FetchBlogsType>(
    "blogs",
    `/blogs?limit=20&tags=${country.name}`,
  );

  // Update the country blogs in the store when blogData changes
  useEffect(() => {
    if (blogData?.result) {
      dispatch(setCountryBlogs(blogData.result));
    }
  }, [blogData, dispatch]);

  // Return null if there's an error or no blogs
  if (blogError || countryBlogs.length === 0) return null;

  return (
    <section className="blogs z-20 flex min-h-screen w-screen flex-col items-start gap-8 md:gap-16 rounded-3xl bg-light-brown dark:bg-background-dark-brown pt-sect-short shadow-section pb-20">
      <div className="md:mt-sect-short w-full overflow-hidden">
        <motion.h1
          variants={variants}
          initial="hiddenFullY"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="h1-md text-center leading-[0.9]"
        >
          Latest articles in {country.name}
        </motion.h1>
      </div>

      <AnimatePresence mode="wait">
        {blogLoading ? (
          <LoadingState keyName={`loading-${country.name}`} />
        ) : (
          <motion.div
            key={`articles-${country.name}`}
            variants={variants}
            initial="hiddenY"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
            exit="hiddenShort"
            transition={{ duration: 0.5 }}
          >
            <FeaturedBlogs blogs={countryBlogs} />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default CountryArticles;
