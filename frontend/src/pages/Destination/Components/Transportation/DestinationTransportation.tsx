import React, { memo, useState } from "react";
import { destinationTransportation } from "src/types/Destination";
import { AnimatePresence, motion } from "framer-motion";
import {
  HoverVariants,
  VisibilityVariants,
} from "src/utils/constants/variants";
import SlideRevealIconHeading from "src/common/SlideRevealIconHeading/SlideRevealIconHeading";
import OptimizedImage from "src/common/OptimizedImage/OptimizedImage";

// Define the props for the DestinationTransportation component
type DestinationTransportationProps = {
  transportation: destinationTransportation;
};

// Define animation variants
const variants = {
  hidden: VisibilityVariants.hidden,
  hiddenY: VisibilityVariants.hiddenY,
  hiddenFullY: VisibilityVariants.hiddenFullY,
  visible: VisibilityVariants.visible,
  hoverX: HoverVariants.hoverX,
};

// Main component to render transportation options
const DestinationTransportation: React.FC<DestinationTransportationProps> = ({
  transportation,
}) => {
  const [transportationIndex, setTransportationIndex] = useState(0);

  // Handle transportation type change
  const handleTransportationChange = (index: number) => {
    setTransportationIndex((prev) => (prev === index ? 0 : index));
  };

  return (
    <section
      id="transportation"
      className="transportation px-sect sticky rounded-3xl bg-light-brown pb-32 pt-sect-short shadow-section dark:bg-background-dark-brown lg:pb-40 2xl:pb-sect-short"
    >
      <div className="flex flex-col md:mt-sect-short md:gap-8">
        <SlideRevealIconHeading
          iconClass="ri-car-fill"
          headingText="Transportation"
        />

        <motion.p
          className="p-regular w-3/4 sm:w-4/5 md:w-2/5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={variants}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          {transportation.overview}
        </motion.p>
      </div>

      <motion.div
        className="relative flex w-full items-center justify-start pt-sect-short"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={variants}
        transition={{ duration: 0.5, delay: 1 }}
      >
        <AnimatePresence mode="popLayout">
          {transportation.types?.map(
            (type, index) =>
              transportationIndex === index && (
                <motion.div
                  key={`transportation-type-${type.name}`}
                  className="image-suspense h-[50svh] rounded-xl shadow-component dark:shadow-component-dark md:h-[75svh] md:w-2/3"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  exit="hidden"
                  variants={variants}
                  transition={{ duration: 0.5 }}
                >
                  <OptimizedImage
                    className="h-full w-full rounded-xl"
                    imageClassName="rounded-xl"
                    src={type.image || ""}
                    alt={type.name}
                  />
                </motion.div>
              ),
          )}
        </AnimatePresence>

        <div className="absolute right-0 top-[20%] w-4/5 md:w-1/2">
          {transportation.types?.map((type, index) => (
            <motion.div
              key={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={variants}
              transition={{ duration: 0.5, delay: 0.5 + index * 0.2 }}
              className="flex w-full flex-col gap-4 rounded-lg bg-light-brown px-4 pb-4 pt-2 shadow-component dark:bg-background-dark-brown dark:shadow-component-dark md:gap-8 md:rounded-xl md:px-8 md:py-4"
            >
              <motion.button
                whileHover="hoverX"
                variants={variants}
                transition={{ duration: 0.5 }}
                className={`p-large w-fit cursor-pointer font-prima uppercase ${transportationIndex === index ? "underline" : ""}`}
                onClick={() => handleTransportationChange(index)}
              >
                {type.name}
              </motion.button>
              <AnimatePresence>
                {transportationIndex === index && (
                  <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={variants}
                    transition={{ duration: 0.5 }}
                    key={`transportation-type-${type.name}`}
                    className="flex flex-col gap-2 md:gap-4"
                  >
                    <div className="flex flex-row items-center gap-4 md:gap-8">
                      <i className="ri-information-2-line p-large"></i>
                      <div className="flex flex-col">
                        <p className="p-regular">{type.description}</p>
                        <ul>
                          {type.options?.map((option, index) => (
                            <li
                              key={index}
                              className="flex list-disc flex-row gap-2"
                            >
                              <p className="p-regular">- {option.name}</p>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className="flex flex-row items-center gap-4 md:gap-8">
                      <i className="ri-price-tag-3-line p-large"></i>
                      <p className="p-regular">
                        {type.price_range?.currency &&
                        type.price_range?.min_price &&
                        type.price_range?.max_price
                          ? `${type.price_range.currency} ${type.price_range.min_price} - ${type.price_range.max_price}`
                          : "Price based on your need"}
                      </p>
                    </div>
                    {type.quick_review && (
                      <div className="flex items-center gap-4 md:gap-8">
                        <i className="ri-arrow-right-line p-large"></i>
                        <p className="p-regular">{type.quick_review}</p>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default memo(DestinationTransportation);
