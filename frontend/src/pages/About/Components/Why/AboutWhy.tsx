import React, { memo } from "react";
import { motion } from "framer-motion";
import {
  HoverVariants,
  VisibilityVariants,
} from "src/utils/constants/variants";
import { useViewportWidth } from "src/hooks/useViewportWidth/useViewportWidth";

// Importing assets
import airplane1 from "src/assets/svg/airplane-1.svg";
import airplane2 from "src/assets/svg/airplane-2.svg";
import airplane3 from "src/assets/svg/airplane-3.svg";
import OptimizedImage from "src/common/OptimizedImage/OptimizedImage";

// Defining motion variants
const variants = {
  hiddenY: VisibilityVariants.hiddenY,
  hiddenFullY: VisibilityVariants.hiddenFullY,
  visible: VisibilityVariants.visible,
  hoverScale: HoverVariants.hoverScale,
};

const AboutWhy = () => {
  const viewportWidth = useViewportWidth();

  return (
    <section
      data-testid="about-why"
      className="why px-sect relative mb-32 mt-40 flex h-[50svh] flex-col items-center gap-24 lg:mb-32 lg:mt-20 lg:gap-48 2xl:mb-40 2xl:mt-24 2xl:gap-64"
    >
      {/* Airplane images */}
      <OptimizedImage
        src={airplane1}
        alt="Airplane 1"
        className="plane-1 absolute"
      />
      <OptimizedImage
        src={airplane2}
        alt="Airplane 2"
        className="plane-2 absolute"
      />
      <OptimizedImage
        src={airplane3}
        alt="Airplane 3"
        className="plane-3 absolute"
      />

      {/* Motion div for the heading */}
      <motion.div
        initial="hiddenY"
        whileInView="visible"
        variants={variants}
        transition={{ duration: 0.5 }}
        viewport={{ once: true, margin: "0% 0% -30% 0%" }}
        className="h3-inter text-center"
      >
        <h2>Why?</h2>
      </motion.div>

      {/* Motion paragraph for the description */}
      <motion.p
        initial="hiddenY"
        whileInView="visible"
        variants={variants}
        transition={{ duration: 0.5 }}
        viewport={{ once: true, margin: "0% 0% -30% 0%" }}
        className="p-large text-center md:text-left"
      >
        “A paper plane’s journey, however brief, reminds us that{" "}
        {viewportWidth > 576 && <br />} even the simplest dreams can take
        flight.”
      </motion.p>
    </section>
  );
};

export default memo(AboutWhy);
