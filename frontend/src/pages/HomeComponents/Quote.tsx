import React, { memo, useCallback, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useAnimation, useInView } from "framer-motion";

const variants = {
  hidden: { opacity: 0, y: 20 },
  hiddenY: (y: string) => {
    return { y: y };
  },
  hiddenWidth: { opacity: 0, x: -50 },
  visibleWidth: { opacity: 1, x: 0 },
  visible: { opacity: 1, y: 0, x: 0 },
};

const Quote = () => {
  const navigate = useNavigate();
  const iconContainerRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ];
  const iconSiblingRefs = [
    useRef<HTMLHeadingElement>(null),
    useRef<HTMLHeadingElement>(null),
  ];
  const iconSiblingInView = iconSiblingRefs.map((ref) => useInView(ref));
  const iconContainerInView = iconContainerRefs.map((ref) => useInView(ref));
  const iconSiblingControls = [useAnimation(), useAnimation()];

  useEffect(() => {
    if (
      iconContainerRefs[0].current &&
      iconSiblingRefs[0].current &&
      iconSiblingRefs[0].current.parentElement
    ) {
      iconContainerRefs[0].current.style.right = `${iconSiblingRefs[0].current.parentElement.offsetWidth - iconContainerRefs[0].current.offsetWidth}px`;
      iconSiblingRefs[0].current.parentElement.style.width = `${iconSiblingRefs[0].current.offsetWidth + iconContainerRefs[0].current.offsetWidth}px`;
      if (iconSiblingInView[0] && iconContainerInView[0]) {
        iconSiblingControls[0].start("visible");
        iconSiblingControls[0].start({
          x: iconContainerRefs[0].current.offsetWidth,
          transition: { delay: 1, duration: 0.5, ease: "circInOut" },
        });
      }
    }
    if (
      iconContainerRefs[1].current &&
      iconSiblingRefs[1].current &&
      iconSiblingRefs[1].current.parentElement
    ) {
      iconContainerRefs[1].current.style.right = `${iconSiblingRefs[1].current.parentElement.offsetWidth - iconContainerRefs[1].current.offsetWidth}px`;
      iconSiblingRefs[1].current.parentElement.style.width = `${iconSiblingRefs[1].current.offsetWidth + iconContainerRefs[1].current.offsetWidth}px`;
      if (iconSiblingInView[1] && iconContainerInView[1]) {
        iconSiblingControls[1].start("visible");
        iconSiblingControls[1].start({
          x: iconContainerRefs[1].current.offsetWidth,
          transition: { delay: 1.5, duration: 0.5, ease: "circInOut" },
        });
      }
    }
  }, [iconContainerRefs, iconSiblingRefs]);

  const handleButtonClick = useCallback(() => {
    navigate("/contact");
  }, []);

  return (
    <section className="quote px-sect flex flex-col gap-4 lg:py-sect-default 2xl:py-sect-medium">
      <div className="flex flex-row items-end justify-between">
        <div className="big-heading">
          <div className="relative flex items-center">
            <div className="inline-block overflow-hidden">
              <motion.h1
                initial={variants.hiddenY("var(--y-from)")}
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                variants={variants}
                className="lg:[--y-from:100px] 2xl:[--y-from:150px]"
              >
                " To{" "}
              </motion.h1>
            </div>

            <div
              ref={iconContainerRefs[0]}
              className="absolute inline-block overflow-hidden"
            >
              <motion.i
                initial="hiddenWidth"
                whileInView="visibleWidth"
                transition={{ delay: 1.8, duration: 0.5 }}
                viewport={{ once: true }}
                variants={variants}
                className="ri-footprint-fill px-4"
              ></motion.i>
            </div>

            <div className={`inline-block overflow-hidden pl-4`}>
              <motion.h1
                ref={iconSiblingRefs[0]}
                initial={variants.hiddenY("var(--y-from)")}
                animate={iconSiblingControls[0]}
                // whileInView="visible"
                // viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                variants={variants}
                className="w-fit uppercase text-main-green lg:[--y-from:100px] 2xl:[--y-from:150px]"
              >
                travel
              </motion.h1>
            </div>
          </div>

          <div className="relative flex w-fit items-center">
            <div className="inline-block overflow-hidden">
              <motion.h1
                initial={variants.hiddenY("var(--y-from)")}
                whileInView="visible"
                viewport={{ once: true }}
                variants={variants}
                transition={{ duration: 0.5 }}
                className="lg:[--y-from:100px] 2xl:[--y-from:150px]"
              >
                is to <span className="uppercase text-main-brown">live</span>{" "}
              </motion.h1>
            </div>

            <div
              ref={iconContainerRefs[1]}
              className="absolute inline-block overflow-hidden"
            >
              <motion.i
                initial="hiddenWidth"
                whileInView="visibleWidth"
                transition={{ delay: 2, duration: 0.5 }}
                viewport={{ once: true }}
                variants={variants}
                className="ri-sun-line px-4"
              ></motion.i>
            </div>

            <div className="inline-block overflow-hidden">
              <motion.h1
                ref={iconSiblingRefs[1]}
                initial={variants.hiddenY("var(--y-from)")}
                animate={iconSiblingControls[1]}
                // whileInView="visible"
                // viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                variants={variants}
                className="w-fit lg:[--y-from:100px] 2xl:[--y-from:150px]"
              >
                "
              </motion.h1>
            </div>
          </div>
        </div>
        <motion.span
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={variants}
          className="p-medium uppercase"
        >
          - Hans Christian Andersen
        </motion.span>
      </div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        variants={variants}
        className="flex flex-row justify-end"
      >
        <button className="btn btn-primary" onClick={handleButtonClick}>
          Have any questions?
        </button>
      </motion.div>
    </section>
  );
};

export default memo(Quote);
