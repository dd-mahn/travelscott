import React, { memo, useState, useCallback, useMemo } from "react";
import {
  destinationPlace,
  placeToEat,
  placeToStay,
  placeToVisit,
} from "src/types/Destination";
import PlaceDialog from "./PlaceDialog";
import SlideRevealIconHeading from "src/common/SlideRevealIconHeading";
import { AnimatePresence, motion } from "framer-motion";
import { HoverVariants, VisibilityVariants } from "src/utils/variants";
import { optimizeImage } from "src/utils/imageUtils";
import { getSelectedCategoryPlaces } from "src/utils/destinationPlaceUtils";
import {
  getDestinationPlaceHeading,
  getPlaceCategoryChange,
} from "src/utils/destinationPlaceUtils";

// Define the props for the DestinationPlaces component
type DestinationPlacesProps = {
  places: destinationPlace;
};

// Define animation variants
const variants = {
  hidden: VisibilityVariants.hidden,
  hiddenY: VisibilityVariants.hiddenY,
  hiddenFullY: VisibilityVariants.hiddenFullY,
  visible: VisibilityVariants.visible,
  hoverX: HoverVariants.hoverX,
  hoverScale: HoverVariants.hoverScale,
};

// Define category descriptions
const CATEGORY_DESCRIPTIONS = {
  to_stay:
    "These places were chosen after carefully considering a balance of several important factors: price, distance, quality, and ratings. By evaluating these elements, we ensured that the selection offers the best overall value and convenience.",
  to_visit:
    "These are the most popular places that are truly worth visiting. Each destination offers unique experiences and attractions that make them stand out as must-see locations.",
  to_eat:
    "Don't miss out on enjoying delicious local dishes at these excellent restaurants. They offer a variety of flavors and culinary experiences that are sure to satisfy your taste buds.",
};

const DestinationPlaces: React.FC<DestinationPlacesProps> = ({ places }) => {
  // State to manage the current place category
  const [placeCategory, setPlaceCategory] = useState("to_stay");

  // Callback to handle place category change
  const handlePlaceCategoryChange = useCallback((category: string) => {
    setPlaceCategory(category);
  }, []);

  // State to manage the current dialog
  const [currentDialog, setCurrentDialog] = useState<string | null>(null);

  // Memoized selected category places
  const selectedCategoryPlaces = useMemo(() => {
    return getSelectedCategoryPlaces(placeCategory, places);
  }, [placeCategory, places]);

  return (
    <section
      id="places"
      className="places px-sect rounded-3xl bg-light-green pb-sect-short pt-sect-short dark:bg-background-dark-green"
    >
      <SlideRevealIconHeading
        iconClass="ri-map-pin-fill"
        headingText="Places"
      />

      <AnimatePresence mode="wait">
        {selectedCategoryPlaces && (
          <motion.div
            key={`places-${placeCategory}-${selectedCategoryPlaces.length}`}
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={variants}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-col gap-10 md:mt-sect-short md:gap-20">
              <div className="flex flex-col gap-4 md:gap-6">
                <motion.h2
                  className="h2-inter"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={variants}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <span>{getDestinationPlaceHeading(placeCategory)}</span>
                  {["visit", "eat", "stay"]
                    .filter(
                      (category) =>
                        category !== placeCategory.replace("to_", ""),
                    )
                    .map((category, index) => (
                      <span
                        key={index}
                        className="cursor-pointer text-gray transition-colors duration-300 hover:text-text-light"
                        onClick={() =>
                          handlePlaceCategoryChange(
                            getPlaceCategoryChange(placeCategory, category),
                          )
                        }
                      >
                        /{category}
                      </span>
                    ))}
                </motion.h2>
                <motion.p
                  className="p-regular w-3/4 sm:w-4/5 md:w-2/5"
                  initial="hiddenY"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={variants}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  {
                    CATEGORY_DESCRIPTIONS[
                      placeCategory as keyof typeof CATEGORY_DESCRIPTIONS
                    ]
                  }
                </motion.p>
              </div>
            </div>

            <div className="mt-10 md:mt-20 grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-8 md:gap-x-8 md:gap-y-16">
              {selectedCategoryPlaces?.map((place, index) => (
                <PlaceCard
                  key={index}
                  place={place}
                  callBack={() => setCurrentDialog(place.name)}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {currentDialog && (
          <motion.div
            key={`${currentDialog}-dialog`}
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={variants}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
            onClick={() => setCurrentDialog(null)}
          >
            <PlaceDialog
              place={
                selectedCategoryPlaces?.find(
                  (place) => place.name === currentDialog,
                ) as placeToStay | placeToVisit | placeToEat
              }
              category={placeCategory}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default memo(DestinationPlaces);

// PlaceCard component to display individual place cards
const PlaceCard: React.FC<{
  place: placeToStay | placeToVisit | placeToEat;
  callBack: () => void;
}> = memo(({ place, callBack }) => {
  // Memoized optimized image
  const optimizedImage = useMemo(() => {
    return optimizeImage(place.image_url, {
      width: 600,
      height: 600,
      quality: 70,
      format: "auto",
    });
  }, [place]);

  return (
    <motion.div
      initial="hiddenY"
      whileInView="visible"
      viewport={{ once: true }}
      variants={variants}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col gap-2 md:gap-4">
        <div className="overflow-hidden rounded-xl shadow-component dark:shadow-component-dark">
          <motion.img
            whileHover="hoverScale"
            variants={variants}
            transition={{ duration: 0.5 }}
            className="cursor-hover-small h-[30svh] md:h-[50svh] cursor-pointer rounded-xl"
            src={optimizedImage.src}
            srcSet={optimizedImage.srcSet}
            alt="place image"
            onClick={callBack}
          />
        </div>

        <motion.span
          variants={variants}
          whileHover="hoverX"
          transition={{ duration: 0.5 }}
          className="span-medium cursor-hover-small cursor-pointer"
          onClick={callBack}
        >
          {place?.name}
        </motion.span>
      </div>
    </motion.div>
  );
});
