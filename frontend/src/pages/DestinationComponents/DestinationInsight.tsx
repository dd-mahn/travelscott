import React, { memo } from "react";
import RelatedSections from "src/common/RelatedSections";
import DestinationType from "src/types/Destination";
import { motion } from "framer-motion";
import { HoverVariants, VisibilityVariants } from "src/utils/variants";
import SlideRevealIconHeading from "src/common/SlideRevealIconHeading";
import { Link } from "react-router-dom";

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
        initial="hiddenY"
        whileHover="hoverRotate"
        whileInView="visible"
        viewport={{ once: true, margin: "-200px" }}
        variants={variants}
        transition={{ duration: 0.5 }}
        className="rounded-xl bg-background-light dark:bg-background-dark bg-opacity-70 px-4 py-2 md:px-6 md:py-4 shadow-component dark:shadow-component-dark"
        key={index}
      >
        <p className="p-medium text-text-light">{tip}</p>
      </motion.div>
    ));

  // Function to render articles from "from_others"
  const renderArticles = () =>
    destination.insight?.from_others?.map((article, index) => (
      <Link
        to={article.link ?? ""}
        target="_blank"
        key={index}
        className="cursor-hover"
      >
        <motion.div
          initial="hiddenY"
          whileHover="hoverRotate"
          whileInView="visible"
          viewport={{ once: true, margin: "-200px" }}
          variants={variants}
          transition={{ duration: 0.5 }}
          className="cursor-hover p-medium rounded-xl bg-background-light dark:bg-background-dark bg-opacity-70 px-4 md:px-6 py-2 shadow-component dark:shadow-component-dark"
          key={index}
        >
          {article.title}{" "}
          <i className="ri-arrow-right-up-line p-large cursor-hover"></i>
        </motion.div>
      </Link>
    ));

  return (
    <section
      id="insight"
      className="insight px-sect sticky flex flex-col gap-10 md:gap-20 rounded-3xl bg-light-brown dark:bg-background-dark-brown pb-sect-short lg:pb-sect-default pt-sect-short shadow-component"
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
        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-8">{renderTips()}</div>
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
          className="p-regular sm:w-3/4 md:w-2/5"
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
        <div className="mt-4 md:mt-8 flex flex-wrap gap-4">{renderArticles()}</div>
      </div>
    </section>
  );
};

export default memo(DestinationInsight);
