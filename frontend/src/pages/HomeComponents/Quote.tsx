import React, { memo, useEffect, useRef, useState } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { PrimaryButton } from "src/components/common/Button";
import { VisibilityVariants } from "src/utils/variants";

// Animation variants for Framer Motion
const variants = {
  hiddenY: VisibilityVariants.hiddenY,
  hiddenFullY: VisibilityVariants.hiddenFullY,
  hiddenLeft: VisibilityVariants.hiddenLeft,
  visible: VisibilityVariants.visible,
};

const Quote = () => {
  // State to track if icons have been viewed
  const [inViewed, setInViewed] = useState([false, false]);

  // Refs for icon containers and their sibling elements
  const iconContainerRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ];
  const iconSiblingRefs = [
    useRef<HTMLHeadingElement>(null),
    useRef<HTMLHeadingElement>(null),
  ];

  // Animation controls for icon siblings
  const iconSiblingControls = [useAnimation(), useAnimation()];

  // Check if icon siblings are in view
  const iconSiblingInView = iconSiblingRefs.map((ref, index) => {
    const inView = useInView(ref, { once: true });
    useEffect(() => {
      if (inView) {
        setInViewed((prev) => {
          const newInViewed = [...prev];
          newInViewed[index] = true;
          return newInViewed;
        });
      }
    }, [inView, index]);
    return inView;
  });

  // Effect to handle icon positioning and animations
  useEffect(() => {
    iconSiblingRefs.forEach((ref, index) => {
      const iconContainer = iconContainerRefs[index].current;
      const iconSibling = ref.current;
      const parentElement = iconSibling?.parentElement;

      if (iconContainer && iconSibling && parentElement) {
        // Position the icon container
        iconContainer.style.right = `${parentElement.offsetWidth - iconContainer.offsetWidth}px`;

        // Adjust parent element width
        parentElement.style.width = `${iconSibling.offsetWidth + iconContainer.offsetWidth}px`;

        // Trigger animations when in view
        if (inViewed[index]) {
          iconSiblingControls[index].start("visible");
          iconSiblingControls[index].start({
            x: iconContainer.offsetWidth,
            transition: {
              delay: 1 + index * 0.5,
              duration: 0.5,
              ease: "circInOut",
            },
          });
        }
      }
    });
  }, [inViewed, iconContainerRefs, iconSiblingRefs, iconSiblingControls]);

  return (
    <section className="quote px-sect flex flex-col gap-4 lg:py-sect-default 2xl:py-sect-medium">
      <div className="flex flex-row items-end justify-between">
        <div className="big-heading">
          {/* First line of the quote */}
          <div className="relative flex items-center">
            <div className="inline-block overflow-hidden">
              <motion.h1
                initial="hiddenFullY"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                variants={variants}
                className=""
              >
                " To{" "}
              </motion.h1>
            </div>

            <div
              ref={iconContainerRefs[0]}
              className="absolute inline-block overflow-hidden"
            >
              <motion.i
                initial="hiddenLeft"
                whileInView="visible"
                transition={{ delay: 1.8, duration: 0.5 }}
                viewport={{ once: true }}
                variants={variants}
                className="ri-footprint-fill px-4"
              ></motion.i>
            </div>

            <div className={`inline-block overflow-hidden pl-4`}>
              <motion.h1
                ref={iconSiblingRefs[0]}
                initial="hiddenFullY"
                animate={iconSiblingControls[0]}
                transition={{ duration: 0.5 }}
                variants={variants}
                className="w-fit uppercase text-main-green"
              >
                travel
              </motion.h1>
            </div>
          </div>

          {/* Second line of the quote */}
          <div className="relative flex w-fit items-center">
            <div className="inline-block overflow-hidden">
              <motion.h1
                initial="hiddenFullY"
                whileInView="visible"
                viewport={{ once: true }}
                variants={variants}
                transition={{ duration: 0.5 }}
                className=""
              >
                is to <span className="uppercase text-main-brown">live</span>{" "}
              </motion.h1>
            </div>

            <div
              ref={iconContainerRefs[1]}
              className="absolute inline-block overflow-hidden"
            >
              <motion.i
                initial="hiddenLeft"
                whileInView="visible"
                transition={{ delay: 2, duration: 0.5 }}
                viewport={{ once: true }}
                variants={variants}
                className="ri-sun-line px-4"
              ></motion.i>
            </div>

            <div className="inline-block overflow-hidden">
              <motion.h1
                ref={iconSiblingRefs[1]}
                initial="hiddenFullY"
                animate={iconSiblingControls[1]}
                transition={{ duration: 0.5 }}
                variants={variants}
                className="w-fit"
              >
                "
              </motion.h1>
            </div>
          </div>
        </div>
        {/* Quote attribution */}
        <motion.span
          initial="hiddenY"
          whileInView="visible"
          viewport={{ once: true }}
          variants={variants}
          className="p-medium uppercase"
        >
          - Hans Christian Andersen
        </motion.span>
      </div>
      {/* CTA button */}
      <motion.div
        initial="hiddenY"
        whileInView="visible"
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        variants={variants}
        className="flex flex-row justify-end"
      >
        <PrimaryButton text="Have any question?" link="/contact" />
      </motion.div>
    </section>
  );
};

export default memo(Quote);
