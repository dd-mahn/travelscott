import React, { memo } from "react";
import { motion } from "framer-motion";
import { VisibilityVariants } from "src/utils/variants";
import SlideRevealIconHeading from "src/common/SlideRevealIconHeading";

const variants = {
  hidden: VisibilityVariants.hidden,
  hiddenY: VisibilityVariants.hiddenY,
  visible: VisibilityVariants.visible,
};

const DestinationSummary = ({ summary }: { summary: string }) => {
  return (
    <section
      id="summary"
      className="summary px-sect flex flex-col gap-10 md:gap-sect-short rounded-3xl bg-background-light dark:bg-background-dark py-sect-short lg:py-sect-short 2xl:py-sect-default"
    >
      <SlideRevealIconHeading
        iconClass="ri-shining-2-fill"
        headingText="Summary"
      />
      <div className="md:mt-sect-short grid place-items-center">
        <div className="flex md:w-3/4 lg:w-2/5 flex-col gap-8">
          <motion.p
            className="p-medium w-full"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={variants}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            {summary}
          </motion.p>
          <motion.p
            className="p-medium"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={variants}
            transition={{ duration: 0.5, delay: 2 }}
          >
            Have a good trip!
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default memo(DestinationSummary);
