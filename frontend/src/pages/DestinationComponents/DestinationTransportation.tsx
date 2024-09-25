import React, { memo, useState } from "react";
import { destinationTransportation } from "src/types/Destination";
import { AnimatePresence, motion } from "framer-motion";
import { HoverVariants, VisibilityVariants } from "src/utils/variants";
import SlideRevealIconHeading from "src/common/SlideRevealIconHeading";

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
const DestinationTransportation: React.FC<DestinationTransportationProps> = ({ transportation }) => {
  const [transportationIndex, setTransportationIndex] = useState(0);

  // Handle transportation type change
  const handleTransportationChange = (index: number) => {
    setTransportationIndex((prev) => (prev === index ? 0 : index));
  };

  return (
    <section
      id="transportation"
      className="transportation px-sect sticky rounded-3xl bg-light-brown dark:bg-background-dark-brown pt-sect-short shadow-section lg:pb-40 2xl:pb-sect-short"
    >
      <div className="mt-sect-short flex flex-col gap-8">
        <SlideRevealIconHeading
          iconClass="ri-car-fill"
          headingText="Transportation"
        />

        <motion.p
          className="p-regular w-2/5"
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
          {transportation.types?.map((type, index) => (
            transportationIndex === index && (
              <motion.div
                key={`transportation-type-${type.name}`}
                className="h-[75svh] w-2/3 rounded-xl shadow-component dark:shadow-component-dark bg-gradient-to-t from-blue-gray-900 to-gray"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                exit="hidden"
                variants={variants}
                transition={{ duration: 0.5 }}
              >
                <img
                  className="h-full w-full rounded-xl object-cover"
                  src={type.image}
                  alt={type.name}
                />
              </motion.div>
            )
          ))}
        </AnimatePresence>

        <div className="absolute right-0 top-[20%] w-1/2">
          {transportation.types?.map((type, index) => (
            <motion.div
              key={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={variants}
              transition={{ duration: 0.5, delay: 0.5 + index * 0.2 }}
              className="flex w-full flex-col gap-8 rounded-xl bg-light-brown dark:bg-background-dark-brown px-8 py-4 shadow-component dark:shadow-component-dark"
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
                    className="flex flex-col gap-4"
                  >
                    <div className="flex flex-row gap-8">
                      <i className="ri-information-2-line p-large mt-4"></i>
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
                    <div className="flex flex-row items-center gap-8">
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
                      <div className="flex items-start gap-8">
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
