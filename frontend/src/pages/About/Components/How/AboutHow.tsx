import React, { memo } from "react";
import { motion } from "framer-motion";
import {
  HoverVariants,
  VisibilityVariants,
} from "src/utils/constants/variants";

// Define motion variants
const variants = {
  hiddenY: VisibilityVariants.hiddenY,
  hiddenFullY: VisibilityVariants.hiddenFullY,
  visible: VisibilityVariants.visible,
  hoverScale: HoverVariants.hoverScale,
};

// Define a reusable MotionNumber component
const MotionNumber = ({ number, delay }: { number: string; delay: number }) => (
  <motion.div
    initial="hiddenFullY"
    whileInView="visible"
    transition={{ duration: 0.4, delay }}
    viewport={{ once: true, margin: "0% 0% -10% 0%" }}
    variants={variants}
    className="text-stroke dark:text-stroke-dark h1-md-bold inline-block leading-[0.8] text-transparent dark:text-transparent"
  >
    {number}
  </motion.div>
);

// Define a reusable Section component
interface SectionProps {
  title: string;
  subtitle: string;
  number: [string, string];
  description: string;
  bgColor: string;
  topClass: string;
  zIndex: string;
}

const Section: React.FC<SectionProps> = ({
  title,
  subtitle,
  number,
  description,
  bgColor,
  topClass,
  zIndex,
}) => (
  <div
    className={`sticky ${topClass} ${zIndex} mx-auto mb-24 mt-sect-default flex w-4/5 flex-col items-start gap-8 rounded-xl md:mt-sect-medium md:gap-12 ${bgColor} px-8 pb-16 pt-4 shadow-section dark:shadow-section-dark md:h-[40svh] md:pb-24 lg:h-[50svh] lg:w-3/4 2xl:w-3/4`}
  >
    <div className="flex w-full justify-between">
      {/* Number */}
      <div className="flex h-fit w-fit gap-1 overflow-hidden md:gap-0">
        <MotionNumber number={number[0]} delay={0.6} />
        <MotionNumber number={number[1]} delay={0.8} />
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
              {title}
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
            {subtitle}
          </motion.span>
        </div>
      </div>
    </div>
    {/* Description */}
    <p className="p-medium w-full md:w-3/4 lg:w-2/3 2xl:w-2/3 3xl:w-2/3">
      {description}
    </p>
  </div>
);

const AboutHow = () => {
  return (
    <section data-testid="about-how" className="how relative">
      <Section
        title="Optimal"
        subtitle="Information"
        number={["0", "1"]}
        description="From the must-see landmarks to the hidden gems, our guides are designed to ensure you're well-informed. Whether it's an upcoming journey or a place you're curious about, our resources are tailored to provide just the right insights to fuel your wanderlust and help you travel smarter."
        bgColor="bg-background-light dark:bg-background-dark-transparent"
        topClass="top-20 md:top-24 lg:top-24 2xl:top-48"
        zIndex="z-0"
      />
      <Section
        title="Vibrant"
        subtitle="Experience"
        number={["0", "2"]}
        description="We provide a streamlined research experience with high-quality visual content that aims to inspire your travel plans. Each search is an opportunity for discovery, and our vivid imagery stirs the urge to see the world. With practical resources that vividly depict your next destination, we empower you to travel with enthusiasm and insight."
        bgColor="bg-light-brown dark:bg-background-dark-brown"
        topClass="top-40 md:top-48 lg:top-48 2xl:top-72"
        zIndex="z-10"
      />
      <Section
        title="Verified"
        subtitle="Resource"
        number={["0", "3"]}
        description="Our platform curates content from renowned travel websites and authentic traveler reviews to create a comprehensive travel resource. Rest assured, the credibility of our information is our top priority, ensuring you have reliable insights for your journey."
        bgColor="bg-light-green dark:bg-background-dark-green"
        topClass="top-60 md:top-72 lg:top-72 2xl:top-96"
        zIndex="z-20"
      />
      <div className="py-64 lg:py-72 2xl:py-sect-default"></div>
    </section>
  );
};

export default AboutHow;
