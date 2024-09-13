import React, { useCallback, useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import FeaturedBlogs from "src/common/FeaturedBlogs";
import NotFoundPage from "./404";
import Loading from "src/common/Loading";
import InspirationCatalog from "./InspiritionComponents/InspirationCatalog";
import useFetch from "src/hooks/useFetch";
import { BASE_URL } from "src/utils/config";
import { FetchBlogsType } from "src/types/FetchData";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "src/store/store";
import {
  setCategory,
  setCategoryImage,
  setHeading,
} from "src/store/slices/inspirationSlice";
import { setAllBlogs, setFeaturedBlogs } from "src/store/slices/blogSlice";

// Images
import wildernessImage from "src/assets/images/ui/inspiration/wilder-alt.webp";
import cultureHeritageImage from "src/assets/images/ui/inspiration/culture.webp";
import foodDrinkImage from "src/assets/images/ui/inspiration/food.webp";
import soloJourneyImage from "src/assets/images/ui/inspiration/solo.webp";
import cityScapeImage from "src/assets/images/ui/inspiration/city.webp";
import seasonFestivalImage from "src/assets/images/ui/inspiration/season.webp";
import relaxationImage from "src/assets/images/ui/inspiration/relax.webp";
import firstTimeAbroadImage from "src/assets/images/ui/inspiration/first.webp";
import {
  ButtonVariants,
  VisibilityVariants,
  HoverVariants,
  TapVariants,
} from "src/utils/variants";
import { getSeason } from "src/utils/getSeason";
import SeasonHeading from "src/common/SeasonHeading";

// Framer motion variants
const variants = {
  hidden: VisibilityVariants.hidden,
  hiddenY: VisibilityVariants.hiddenY,
  hiddenFullY: VisibilityVariants.hiddenFullY,
  hiddenYScale: VisibilityVariants.hiddenYScale,
  exitScale: VisibilityVariants.exitScale,
  exitX: VisibilityVariants.exitX,
  visible: VisibilityVariants.visible,
  hoverScale: HoverVariants.hoverScale,
  tapScale: TapVariants.tapScale,
  hoverX: HoverVariants.hoverX,
};

const categories = [
  "All",
  "Wilderness",
  "Culture&Heritage",
  "Food&Drink",
  "SoloJourneys",
  "CityScape",
  "Season&Festival",
  "Relaxation",
  "FirstTimeAbroad",
];

const Inspiration: React.FC = () => {
  const dispatch = useDispatch();
  const { currentCategory, currentCategoryImage, heading } = useSelector(
    (state: RootState) => state.inspiration,
  );
  const { allBlogs, featuredBlogs } = useSelector(
    (state: RootState) => state.blog,
  );

  // Get heading based on category
  const getHeading = useCallback(
    (category: string) => {
      const headings: { [key: string]: string } = {
        Wilderness: "Wilderness",
        "Culture&Heritage": "Culture & Heritage",
        "Food&Drink": "Food & Drink",
        SoloJourneys: "Solo Journeys",
        CityScape: "City Scape",
        "Season&Festival": "Season & Festival",
        Relaxation: "Relaxation",
        FirstTimeAbroad: "First Time Abroad",
      };
      return headings[category] || `${getSeason()} ${new Date().getFullYear()}`;
    },
    [getSeason],
  );

  useEffect(() => {
    dispatch(setHeading(getHeading(currentCategory)));
  }, [currentCategory, getHeading, dispatch]);

  // Handle category change
  const handleCategoryChange = useCallback(
    (category: string) => {
      dispatch(setCategory(category));
      const images: { [key: string]: string } = {
        Wilderness: wildernessImage,
        "Culture&Heritage": cultureHeritageImage,
        "Food&Drink": foodDrinkImage,
        SoloJourneys: soloJourneyImage,
        CityScape: cityScapeImage,
        "Season&Festival": seasonFestivalImage,
        Relaxation: relaxationImage,
        FirstTimeAbroad: firstTimeAbroadImage,
      };
      dispatch(setCategoryImage(images[category] || ""));
      dispatch(setHeading(getHeading(category)));
    },
    [dispatch, getHeading],
  );

  // Fetch blogs data
  const {
    data: allBlogsData,
    loading: allBlogsLoading,
    error: allBlogsError,
  } = useFetch<FetchBlogsType>(
    `${BASE_URL}/blogs?limit=1000&category=${
      currentCategory === "All" ? "" : encodeURIComponent(currentCategory)
    }`,
    [currentCategory],
  );

  useEffect(() => {
    if (allBlogsData?.result) {
      dispatch(setAllBlogs(allBlogsData.result));
      dispatch(
        setFeaturedBlogs(allBlogsData.result.filter((blog) => blog.featured)),
      );
    }
  }, [allBlogsData, dispatch]);

  if (allBlogsLoading) return <Loading />;
  if (allBlogsError) return <NotFoundPage />;

  return (
    <main
      className="inspiration relative flex min-h-screen flex-col items-center gap-8 pb-sect-default"
      data-filter={currentCategory}
    >
      {/* Hero Section */}
      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ duration: 1 }}
        variants={variants}
        className="absolute top-0 z-0 h-screen w-full"
        style={
          currentCategory !== "All"
            ? {
                backgroundImage: `url(${currentCategoryImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }
            : {
                background: `var(--${heading
                  .toLowerCase()
                  .replace(/ /g, "-")
                  .replace(/\d{4}/, "")
                  .trim()}gradient)`,
              }
        }
      >
        {currentCategory !== "All" && (
          <motion.div
            initial="hiddenY"
            animate="visible"
            transition={{ duration: 1 }}
            className="h-full w-full"
            style={{
              background:
                "linear-gradient(180deg,rgb(10.02, 10.23, 10.38, 0.2) 50%, #FBF9F7 100%)",
            }}
          />
        )}
      </motion.div>

      {/* Heading */}
      <div className="z-20 h-fit overflow-hidden lg:pt-10 2xl:pt-20">
        <SeasonHeading />
      </div>

      {/* Category Filters */}
      <motion.div
        initial="hiddenY"
        animate="visible"
        variants={variants}
        transition={{
          duration: 0.5,
          delay: 1,
          staggerChildren: 0.2,
          delayChildren: 1,
        }}
        className="z-10 flex w-2/3 flex-row flex-wrap justify-center gap-x-4 gap-y-4 filter"
      >
        {categories
          .filter((f) => f !== currentCategory)
          .map((f) => (
            <motion.div key={f} variants={variants}>
              <motion.button
                variants={ButtonVariants}
                whileHover="buttonHover"
                whileTap="buttonTap"
                onClick={() => handleCategoryChange(f)}
                className={`filter-btn span-medium rounded-xl px-10 py-4 font-prima text-text-dark shadow-component ${
                  f === "All"
                    ? "bg-background-dark"
                    : f === "Wilderness"
                      ? "bg-wilderness"
                      : f === "Culture&Heritage"
                        ? "bg-cultureheritage"
                        : f === "Food&Drink"
                          ? "bg-fooddrink"
                          : f === "SoloJourneys"
                            ? "bg-solojourneys"
                            : f === "CityScape"
                              ? "bg-cityscape"
                              : f === "Season&Festival"
                                ? "bg-seasonfestival"
                                : f === "Relaxation"
                                  ? "bg-relaxation"
                                  : f === "FirstTimeAbroad"
                                    ? "bg-firsttimeabroad"
                                    : "bg-background-dark"
                }`}
              >
                {f}
              </motion.button>
            </motion.div>
          ))}
      </motion.div>

      {/* Featured Blogs Section */}
      {featuredBlogs.length > 0 ? (
        <motion.div
          initial="hiddenY"
          animate="visible"
          variants={variants}
          transition={{ duration: 0.5, delay: 2.5 }}
          className="z-10 w-full lg:mt-sect-short 2xl:mt-[15rem]"
        >
          <FeaturedBlogs blogs={featuredBlogs} />
        </motion.div>
      ) : (
        <div className="h-[75svh]" />
      )}

      {/* Catalog Section */}
      <InspirationCatalog currentCategory={currentCategory} />
    </main>
  );
};

export default Inspiration;
