import React, { memo } from "react";
import { motion } from "framer-motion";
import { ButtonVariants, VisibilityVariants } from "src/utils/variants";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "src/store/store";
import {
  setCategory,
  setCategoryImage,
} from "src/store/slices/inspirationSlice";

import wildernessImage from "src/assets/images/ui/inspiration/wilder-alt.webp";
import cultureHeritageImage from "src/assets/images/ui/inspiration/culture.webp";
import foodDrinkImage from "src/assets/images/ui/inspiration/food.webp";
import soloJourneyImage from "src/assets/images/ui/inspiration/solo.webp";
import cityScapeImage from "src/assets/images/ui/inspiration/city.webp";
import seasonFestivalImage from "src/assets/images/ui/inspiration/season.webp";
import relaxationImage from "src/assets/images/ui/inspiration/relax.webp";
import firstTimeAbroadImage from "src/assets/images/ui/inspiration/first.webp";

const variants = {
  hiddenY: VisibilityVariants.hiddenY,
  visible: VisibilityVariants.visible,
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

const InspirationButtons = () => {
  const dispatch = useDispatch();
  const { currentCategory } = useSelector(
    (state: RootState) => state.inspiration,
  );

  const handleCategoryChange = (category: string) => {
    dispatch(setCategory(category));
    dispatch(setCategoryImage(images[category] || ""));
  };
  return (
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
  );
};

export default memo(InspirationButtons);
