import React, { memo } from "react";
import { motion } from "framer-motion";
import { HoverVariants, VisibilityVariants } from "src/utils/variants";

const variants = {
  hiddenY: VisibilityVariants.hiddenY,
  hiddenFullY: VisibilityVariants.hiddenFullY,
  visible: VisibilityVariants.visible,
  hoverScale: HoverVariants.hoverScale,
};

const AboutHow = () => {
  return (
    <section className="how relative">
      {/* Optimal Information */}
      <div className="sticky top-20 md:top-24 z-0 mx-auto mb-24 mt-32 flex w-4/5 flex-col items-start gap-8 md:gap-12 rounded-xl bg-background-light px-8 pb-16 pt-4 shadow-section dark:bg-background-dark-transparent dark:shadow-section-dark md:h-[40svh] md:pb-24 lg:top-24 lg:mt-40 lg:h-[50svh] lg:w-3/4 2xl:top-48 2xl:mt-sect-medium 2xl:w-3/4">
        <div className="flex w-full justify-between">
          {/* Heading */}
          <div className="flex w-2/3 flex-col items-start justify-start gap-12">
            {/* Title */}
            <div className="flex flex-col justify-start gap-0">
              <div className="overflow-hidden">
                <motion.h1
                  initial="hiddenFullY"
                  whileInView="visible"
                  transition={{ duration: 0.4 }}
                  viewport={{ once: true, margin: "0% 0% -10% 0%" }}
                  variants={variants}
                  className="h1-md-bold leading-[0.8]"
                >
                  Optimal
                </motion.h1>
              </div>
              <motion.span
                initial="hiddenY"
                whileInView="visible"
                viewport={{ once: true, margin: "0% 0% -10% 0%" }}
                transition={{ duration: 0.4, delay: 0.4 }}
                variants={variants}
                className="span-medium uppercase"
              >
                Information
              </motion.span>
            </div>
          </div>
          {/* Number */}
          <div className="flex h-fit w-fit gap-1 overflow-hidden md:gap-0">
            <motion.div
              initial="hiddenFullY"
              whileInView="visible"
              transition={{ duration: 0.4, delay: 0.6 }}
              viewport={{ once: true, margin: "0% 0% -10% 0%" }}
              variants={variants}
              className="text-stroke dark:text-stroke-dark h1-md-bold inline-block leading-[0.8] text-transparent dark:text-transparent"
            >
              0
            </motion.div>
            <motion.div
              initial="hiddenFullY"
              whileInView="visible"
              transition={{ duration: 0.4, delay: 0.8 }}
              viewport={{ once: true, margin: "0% 0% -10% 0%" }}
              variants={variants}
              className="text-stroke dark:text-stroke-dark h1-md-bold inline-block leading-[0.8] text-transparent dark:text-transparent"
            >
              1
            </motion.div>
          </div>
        </div>
        {/* Description */}
        <p className="p-medium w-full md:w-3/4 lg:w-full 2xl:w-3/4 3xl:w-3/4">
          From the must-see landmarks to the hidden gems, our guides are
          designed to ensure you're well-informed. Whether it's an upcoming
          journey or a place you're curious about, our resources are tailored to
          provide just the right insights to fuel your wanderlust and help you
          travel smarter.
        </p>
      </div>
` `
      {/* Vibrant Experience */}
      <div className="sticky top-40 md:top-48 z-10 mx-auto mb-24 mt-sect-medium flex w-4/5 flex-col items-start gap-8 md:gap-12 rounded-xl bg-light-brown px-8 pb-16 pt-4 shadow-section dark:bg-background-dark-brown dark:shadow-section-dark md:h-[40svh] md:pb-24 lg:top-48 lg:h-[50svh] lg:w-3/4 2xl:top-72 2xl:w-3/4">
        <div className="flex w-full justify-between">
          {/* Number */}
          <div className="flex h-fit w-fit gap-1 overflow-hidden md:gap-0">
            <motion.div
              initial="hiddenFullY"
              whileInView="visible"
              transition={{ duration: 0.4, delay: 0.6 }}
              viewport={{ once: true, margin: "0% 0% -10% 0%" }}
              variants={variants}
              className="text-stroke dark:text-stroke-dark h1-md-bold inline-block leading-[0.8] text-transparent dark:text-transparent"
            >
              0
            </motion.div>
            <motion.div
              initial="hiddenFullY"
              whileInView="visible"
              transition={{ duration: 0.4, delay: 0.8 }}
              viewport={{ once: true, margin: "0% 0% -10% 0%" }}
              variants={variants}
              className="text-stroke dark:text-stroke-dark h1-md-bold inline-block leading-[0.8] text-transparent dark:text-transparent"
            >
              2
            </motion.div>
          </div>
          {/* Content */}
          <div className="flex flex-col items-end justify-start gap-12">
            {/* Title */}
            <div className="flex w-fit flex-col items-end justify-start gap-0">
              <div className="overflow-hidden">
                <motion.h1
                  initial="hiddenFullY"
                  whileInView="visible"
                  transition={{ duration: 0.4 }}
                  viewport={{ once: true, margin: "0% 0% -10% 0%" }}
                  variants={variants}
                  className="h1-md-bold leading-[0.8]"
                >
                  Vibrant
                </motion.h1>
              </div>
              <motion.span
                initial="hiddenY"
                whileInView="visible"
                viewport={{ once: true, margin: "0% 0% -10% 0%" }}
                transition={{ duration: 0.4, delay: 0.4 }}
                variants={variants}
                className="span-medium uppercase"
              >
                Experience
              </motion.span>
            </div>
          </div>
        </div>
        {/* Description */}
        <p className="p-medium w-full md:w-3/4 lg:w-full 2xl:w-3/4 3xl:w-3/4">
          We provide a streamlined research experience with high-quality visual
          content that aims to inspire your travel plans. Each search is an
          opportunity for discovery, and our vivid imagery stirs the urge to see
          the world. With practical resources that vividly depict your next
          destination, we empower you to travel with enthusiasm and insight.
        </p>
      </div>

      {/* Verified Resource */}
      <div className="sticky top-60 md:top-72 z-20 mx-auto mb-24 mt-sect-medium flex w-4/5 flex-col items-start gap-8 md:gap-12 rounded-xl bg-light-green px-8 pb-16 pt-4 shadow-section dark:bg-background-dark-green dark:shadow-section-dark md:h-[40svh] md:pb-24 lg:top-72 lg:h-[50svh] lg:w-3/4 2xl:top-96 2xl:w-3/4">
        <div className="flex w-full justify-between">
          {/* Content */}
          <div className="flex w-2/3 flex-col items-start justify-start gap-12">
            {/* Title */}
            <div className="flex flex-col justify-start gap-0">
              <div className="overflow-hidden">
                <motion.h1
                  initial="hiddenFullY"
                  whileInView="visible"
                  transition={{ duration: 0.4 }}
                  viewport={{ once: true, margin: "0% 0% -10% 0%" }}
                  variants={variants}
                  className="h1-md-bold leading-[0.8]"
                >
                  Verified
                </motion.h1>
              </div>

              <motion.span
                initial="hiddenY"
                whileInView="visible"
                viewport={{ once: true, margin: "0% 0% -10% 0%" }}
                transition={{ duration: 0.4, delay: 0.4 }}
                variants={variants}
                className="span-medium uppercase"
              >
                Resource
              </motion.span>
            </div>
          </div>

          <div className="flex h-fit w-fit gap-1 overflow-hidden md:gap-0">
            <motion.div
              initial="hiddenFullY"
              whileInView="visible"
              transition={{ duration: 0.4, delay: 0.6 }}
              viewport={{ once: true, margin: "0% 0% -10% 0%" }}
              variants={variants}
              className="text-stroke dark:text-stroke-dark h1-md-bold inline-block leading-[0.8] text-transparent dark:text-transparent"
            >
              0
            </motion.div>
            <motion.div
              initial="hiddenFullY"
              whileInView="visible"
              transition={{ duration: 0.4, delay: 0.8 }}
              viewport={{ once: true, margin: "0% 0% -10% 0%" }}
              variants={variants}
              className="text-stroke dark:text-stroke-dark h1-md-bold inline-block leading-[0.8] text-transparent dark:text-transparent"
            >
              3
            </motion.div>
          </div>
        </div>
        <p className="p-medium w-full md:w-3/4 lg:w-full 2xl:w-3/4 3xl:w-3/4">
          Our platform curates content from renowned travel
          websites and authentic traveler reviews to create a comprehensive
          travel resource. Rest assured, the credibility of our information is
          our top priority, ensuring you have reliable insights for your
          journey.
        </p>
      </div>

      <div className="py-64 lg:py-72 2xl:py-sect-default"></div>
    </section>
  );
};

export default memo(AboutHow);
