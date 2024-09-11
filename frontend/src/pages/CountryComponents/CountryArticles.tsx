import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "src/store/store";
import { setCountryBlogs } from "src/store/slices/countrySlice";

// Components
import FeaturedBlogs from "src/components/common/FeaturedBlogs";
import Country from "src/types/Country";
import Blog from "src/types/Blog";
import { FetchBlogsType } from "src/types/FetchData";
import useFetch from "src/hooks/useFetch";
import { BASE_URL } from "src/utils/config";

// Define the props for the CountryArticles component
interface CountryArticlesProps {
  country: Country;
}

// Animation variants for framer-motion
const variants = {
  hidden: { opacity: 0, y: 40 },
  hiddenShort: { opacity: 0, y: 20 },
  hiddenFullY: { y: "100%" },
  hiddenYScale: { scale: 0.95, y: 100, opacity: 0 },
  exitScale: { scale: 0, opacity: 0, y: 200, originX: 0 },
  visible: { opacity: 1, scale: 1, y: 0, x: 0 },
  exitX: { x: -1000, opacity: 0 },
  hoverScale: {
    scale: 1.05,
    transition: { duration: 0.4, ease: "easeInOut" },
  },
  tapScale: {
    scale: 0.95,
    transition: { duration: 0.4 },
  },
};

const CountryArticles: React.FC<CountryArticlesProps> = ({ country }) => {
  const dispatch = useDispatch();
  const { countryBlogs } = useSelector((state: RootState) => state.country);

  // Fetch blogs data
  const {
    data: blogData,
    loading: blogLoading,
    error: blogError,
  } = useFetch<FetchBlogsType>(`${BASE_URL}/blogs?limit=20`);

  // Filter blogs based on the country name
  useEffect(() => {
    if (blogData?.result) {
      const filteredBlogs = blogData.result.filter((blog) =>
        blog.tags.includes(country.name),
      );
      dispatch(setCountryBlogs(filteredBlogs));
    }
  }, [blogData, country.name, dispatch]);

  // Return null if there's an error or no blogs
  if (blogError || countryBlogs.length === 0) return null;

  return (
    <section className="stacked-section blogs sticky -top-sect-semi z-20 flex w-screen flex-col items-start gap-16 rounded-3xl bg-light-brown pt-sect-short shadow-section">
      <div className="mt-sect-short w-full overflow-hidden">
        <motion.h1
          variants={variants}
          initial="hiddenFullY"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="h1-md text-center"
        >
          Latest articles in {country.name}
        </motion.h1>
      </div>

      <AnimatePresence mode="wait">
        {blogLoading ? (
          <motion.div
            key={`loading-${country.name}`}
            variants={variants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
            exit="hiddenShort"
            transition={{ duration: 0.5 }}
            className="grid w-full place-items-center py-sect-short"
          >
            <h3 className="h3-md">Loading...</h3>
          </motion.div>
        ) : (
          <motion.div
            key={`articles-${country.name}`}
            variants={variants}
            initial="hidden"
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
