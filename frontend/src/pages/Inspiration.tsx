import React, { useCallback, useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import FeaturedBlogs from "src/components/common/FeaturedBlogs";
import NotFoundPage from "./404";
import Loading from "src/components/common/Loading";
import InspirationCatalog from "./InspiritionComponents/InspirationCatalog";
import useFetch from "src/hooks/useFetch";
import { BASE_URL } from "src/utils/config";
import { FetchBlogsType } from "src/types/FetchData";

// Images
import wildernessImage from "src/assets/images/ui/inspiration/wilder-alt.webp";
import cultureHeritageImage from "src/assets/images/ui/inspiration/culture.webp";
import foodDrinkImage from "src/assets/images/ui/inspiration/food.webp";
import soloJourneyImage from "src/assets/images/ui/inspiration/solo.webp";
import cityScapeImage from "src/assets/images/ui/inspiration/city.webp";
import seasonFestivalImage from "src/assets/images/ui/inspiration/season.webp";
import relaxationImage from "src/assets/images/ui/inspiration/relax.webp";
import firstTimeAbroadImage from "src/assets/images/ui/inspiration/first.webp";

// Framer motion variants
const variants = {
  hiddenOpacity: { opacity: 0 },
  hidden: { opacity: 0, y: 40 },
  hiddenFullY: { y: "100%" },
  hiddenYScale: { scale: 0.95, y: 100, opacity: 0 },
  exitScale: { scale: 0, opacity: 0, y: 200, originX: 0 },
  exitX: { x: -1000, opacity: 0, transition: { duration: 4 } },
  visible: { opacity: 1, scale: 1, y: 0, x: 0 },
  hoverScale: {
    scale: 1.05,
    transition: { duration: 0.4, ease: "easeInOut" },
  },
  tapScale: {
    scale: 0.95,
    transition: { duration: 0.4, ease: "easeInOut" },
  },
  hoverX: {
    x: 5,
    transition: {
      duration: 1,
      type: "spring",
      bounce: 0.5,
    },
  },
};

const ButtonVariants = {
  buttonHover: {
    y: -3,
    scale: 1.02,
    rotate: -5,
    transition: { duration: 0.4, type: "spring", bounce: 0.5 },
  },
  buttonTap: {
    y: 3,
    scale: 0.98,
    rotate: 5,
    transition: { duration: 0.4, type: "spring", bounce: 0.5 },
  },
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
  const [currentCategory, setCategory] = useState("All");
  const [currentCategoryImage, setCategoryImage] = useState("");
  const [heading, setHeading] = useState("");

  // Get current season
  const getSeason = useCallback(() => {
    const month = new Date().getMonth();
    if (month >= 2 && month <= 4) return "Spring";
    if (month >= 5 && month <= 7) return "Summer";
    if (month >= 8 && month <= 10) return "Fall";
    if (month === 11 || month === 0 || month === 1) return "Winter";
    if (month === 1) return "Winter-Spring";
    if (month === 4) return "Spring-Summer";
    if (month === 7) return "Summer-Fall";
    if (month === 10) return "Fall-Winter";
    return "Unknown Season";
  }, []);

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
    setHeading(getHeading(currentCategory));
  }, [currentCategory, getHeading]);

  // Handle category change
  const handleCategoryChange = useCallback((category: string) => {
    setCategory(category);
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
    setCategoryImage(images[category] || "");
  }, []);

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

  // Memoize filtered featured blogs
  const featuredBlogs = useMemo(() => {
    return allBlogsData?.result?.filter((blog) => blog.featured) || [];
  }, [allBlogsData]);

  if (allBlogsLoading) return <Loading />;
  if (allBlogsError) return <NotFoundPage />;

  return (
    <main
      className="inspiration relative flex min-h-screen flex-col items-center gap-8 pb-sect-default"
      data-filter={currentCategory}
    >
      {/* Hero Section */}
      <motion.div
        initial="hiddenOpacity"
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
            initial="hidden"
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
      <div className="z-20 h-fit overflow-hidden">
        <motion.h1
          initial="hiddenFullY"
          animate="visible"
          variants={variants}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="big-heading z-20 mt-sect-short text-text-dark"
        >
          {heading}
        </motion.h1>
      </div>

      {/* Category Filters */}
      <motion.div
        initial="hidden"
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
          initial="hidden"
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
