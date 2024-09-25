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
      <div className="sticky z-0 mx-auto mb-24 flex h-[50svh] flex-row items-start justify-between rounded-xl bg-background-light px-8 pb-sect-short pt-4 shadow-section dark:bg-background-dark-transparent dark:shadow-section-dark lg:top-24 lg:mt-40 lg:w-3/4 2xl:top-48 2xl:mt-sect-medium 2xl:w-3/4">
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
                className="h1-md-bold"
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
          {/* Description */}
          <p className="p-medium lg:w-full 2xl:w-3/4 3xl:w-3/4">
            From the must-see landmarks to the hidden gems, our guides are
            designed to ensure you're well-informed. Whether it's an upcoming
            journey or a place you're curious about, our resources are tailored
            to provide just the right insights to fuel your wanderlust and help
            you travel smarter.
          </p>
        </div>
        {/* Number */}
        <div className="w-fit overflow-hidden">
          <motion.div
            initial="hiddenFullY"
            whileInView="visible"
            transition={{ duration: 0.4, delay: 0.6 }}
            viewport={{ once: true, margin: "0% 0% -10% 0%" }}
            variants={variants}
            className="text-stroke dark:text-stroke-dark h1-md-bold inline-block text-transparent dark:text-transparent"
          >
            0
          </motion.div>
          <motion.div
            initial="hiddenFullY"
            whileInView="visible"
            transition={{ duration: 0.4, delay: 0.8 }}
            viewport={{ once: true, margin: "0% 0% -10% 0%" }}
            variants={variants}
            className="text-stroke dark:text-stroke-dark h1-md-bold inline-block text-transparent dark:text-transparent"
          >
            1
          </motion.div>
        </div>
      </div>

      {/* Vibrant Experience */}
      <div className="sticky z-0 mx-auto mb-24 mt-sect-medium flex h-[50svh] flex-row items-start justify-between rounded-xl bg-light-brown px-8 pb-sect-short pt-4 shadow-section dark:bg-background-dark-brown dark:shadow-section-dark lg:top-48 lg:w-3/4 2xl:top-72 2xl:w-3/4">
        {/* Number */}
        <div className="w-2/3 overflow-hidden">
          <motion.div
            initial="hiddenFullY"
            whileInView="visible"
            transition={{ duration: 0.4, delay: 0.6 }}
            viewport={{ once: true, margin: "0% 0% -10% 0%" }}
            variants={variants}
            className="text-stroke dark:text-stroke-dark h1-md-bold inline-block text-transparent dark:text-transparent"
          >
            0
          </motion.div>
          <motion.div
            initial="hiddenFullY"
            whileInView="visible"
            transition={{ duration: 0.4, delay: 0.8 }}
            viewport={{ once: true, margin: "0% 0% -10% 0%" }}
            variants={variants}
            className="text-stroke dark:text-stroke-dark h1-md-bold inline-block text-transparent dark:text-transparent"
          >
            2
          </motion.div>
        </div>
        {/* Content */}
        <div className="flex flex-col items-end justify-start gap-12">
          {/* Title */}
          <div className="flex w-2/3 flex-col justify-end gap-0">
            <div className="overflow-hidden">
              <motion.h1
                initial="hiddenFullY"
                whileInView="visible"
                transition={{ duration: 0.4 }}
                viewport={{ once: true, margin: "0% 0% -10% 0%" }}
                variants={variants}
                className="h1-md-bold text-end"
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
              className="span-medium text-end uppercase"
            >
              Experience
            </motion.span>
          </div>
          {/* Description */}
          <p className="p-medium lg:w-full 2xl:w-3/4 3xl:w-3/4">
            We provide a streamlined research experience with high-quality
            visual content that aims to inspire your travel plans. Each search
            is an opportunity for discovery, and our vivid imagery stirs the
            urge to see the world. With practical resources that vividly depict
            your next destination, we empower you to travel with enthusiasm and
            insight.
          </p>
        </div>
      </div>

      {/* Verified Resource */}
      <div className="sticky z-0 mx-auto mb-24 mt-sect-medium flex h-[50svh] flex-row items-start justify-between rounded-xl bg-light-green px-8 pb-sect-short pt-4 shadow-section dark:bg-background-dark-green dark:shadow-section-dark lg:top-72 lg:w-3/4 2xl:top-96 2xl:w-3/4">
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
                className="h1-md-bold"
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

          <p className="p-medium lg:w-full 2xl:w-3/4 3xl:w-3/4">
            Our platform curates content from renowned travel
            websites and authentic traveler reviews to create a comprehensive
            travel resource. Rest assured, the credibility of our information is
            our top priority, ensuring you have reliable insights for your
            journey.
          </p>
        </div>

        <div className="w-fit overflow-hidden">
          <motion.div
            initial="hiddenFullY"
            whileInView="visible"
            transition={{ duration: 0.4, delay: 0.6 }}
            viewport={{ once: true, margin: "0% 0% -10% 0%" }}
            variants={variants}
            className="text-stroke dark:text-stroke-dark h1-md-bold inline-block text-transparent dark:text-transparent"
          >
            0
          </motion.div>
          <motion.div
            initial="hiddenFullY"
            whileInView="visible"
            transition={{ duration: 0.4, delay: 0.8 }}
            viewport={{ once: true, margin: "0% 0% -10% 0%" }}
            variants={variants}
            className="text-stroke dark:text-stroke-dark h1-md-bold inline-block text-transparent dark:text-transparent"
          >
            3
          </motion.div>
        </div>
      </div>

      <div className="lg:py-20 2xl:py-sect-default"></div>
    </section>
  );
};

export default memo(AboutHow);
