import React, { memo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import RelatedSections from "src/common/RelatedSections/RelatedSections";
import SlideRevealIconHeading from "src/common/SlideRevealIconHeading/SlideRevealIconHeading";
import DestinationType from "src/types/Destination";
import {
  HoverVariants,
  VisibilityVariants,
} from "src/utils/constants/variants";

// Define animation variants
const variants = {
  hidden: VisibilityVariants.hidden,
  hiddenY: VisibilityVariants.hiddenY,
  hiddenFullY: VisibilityVariants.hiddenFullY,
  visible: VisibilityVariants.visible,
  hoverX: HoverVariants.hoverX,
  hoverRotate: HoverVariants.hoverRotate,
};

// Define the props for the DestinationInsight component
type DestinationInsightProps = {
  destination: DestinationType;
};

// Main component to render insights
const DestinationInsight: React.FC<DestinationInsightProps> = ({
  destination,
}) => {
  // Function to render tips from "from_us"
  const renderTips = () =>
    destination.insight?.from_us?.tips.map((tip, index) => (
      <motion.div
        key={index}
        initial="hidden"
        whileHover="hoverRotate"
        whileInView="visible"
        viewport={{ once: true }}
        variants={variants}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="z-10 rounded-xl bg-background-light bg-opacity-70 px-4 py-2 shadow-component dark:bg-background-dark dark:shadow-component-dark md:px-6 md:py-4"
      >
        <p className="p-medium text-text-light">{tip}</p>
      </motion.div>
    ));

  // Function to render articles from "from_others"
  const renderArticles = () =>
    destination.insight?.from_others?.map((article, index) => (
      <Link
        key={index}
        to={article.link ?? ""}
        target="_blank"
        className="cursor-hover"
      >
        <motion.div
          initial="hidden"
          whileHover="hoverRotate"
          whileInView="visible"
          viewport={{ once: true }}
          variants={variants}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="cursor-hover p-medium z-10 rounded-xl bg-background-light bg-opacity-70 px-4 py-2 shadow-component dark:bg-background-dark dark:shadow-component-dark md:px-6"
        >
          {article.title}{" "}
          <i className="ri-arrow-right-up-line p-large cursor-hover"></i>
        </motion.div>
      </Link>
    ));

  return (
    <section
      id="insight"
      className="insight px-sect sticky flex flex-col gap-10 rounded-3xl bg-light-brown pb-sect-short pt-sect-short shadow-component dark:bg-background-dark-brown md:gap-20 lg:pb-sect-default"
    >
      <SlideRevealIconHeading iconClass="ri-eye-fill" headingText="Insight" />

      {/* Section for tips from "from_us" */}
      <div className="flex flex-col items-center gap-4 md:gap-8">
        <motion.h2
          className="h2-md"
          initial="hiddenY"
          whileInView="visible"
          viewport={{ once: true }}
          variants={variants}
          transition={{ duration: 0.5 }}
        >
          From us
        </motion.h2>
        <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3">
          {renderTips()}
        </div>
        <motion.div
          className="mt-8"
          initial="hiddenY"
          whileInView="visible"
          viewport={{ once: true }}
          variants={variants}
          transition={{ duration: 0.5 }}
        >
          <RelatedSections type={"blog"} data={destination} />
        </motion.div>
      </div>

      {/* Section for articles from "from_others" */}
      <div className="flex flex-col gap-4 md:gap-8">
        <motion.h2
          className="h2-md"
          initial="hiddenY"
          whileInView="visible"
          viewport={{ once: true }}
          variants={variants}
          transition={{ duration: 0.5 }}
        >
          From others
        </motion.h2>
        <motion.p
          className="p-regular sm:w-3/4 lg:w-2/5"
          initial="hiddenY"
          whileInView="visible"
          viewport={{ once: true }}
          variants={variants}
          transition={{ duration: 0.5 }}
        >
          Leveraging others’ travel experiences and insights can save you time
          and money by helping you avoid common mistakes. It also provides
          practical tips and recommendations that enhance your trip, making it
          more enjoyable and stress-free. Additionally, learning from others’
          experiences can inspire you and give you a clearer idea of what to
          expect.
        </motion.p>
        <div className="mt-4 flex flex-wrap gap-4 md:mt-8">
          {renderArticles()}
        </div>
      </div>
    </section>
  );
};

export default DestinationInsight;
