import React, { memo } from "react";
import { motion } from "framer-motion";
import { HoverVariants, VisibilityVariants } from "src/utils/variants";

import airplane1 from "src/assets/svg/airplane-1.svg";
import airplane2 from "src/assets/svg/airplane-2.svg";
import airplane3 from "src/assets/svg/airplane-3.svg";

const variants = {
  hiddenY: VisibilityVariants.hiddenY,
  hiddenFullY: VisibilityVariants.hiddenFullY,
  visible: VisibilityVariants.visible,
  hoverScale: HoverVariants.hoverScale,
};

const AboutWhy = () => {
  return (
    <section className="why px-sect relative flex h-[50svh] flex-col items-center lg:mb-32 lg:mt-20 lg:gap-48 2xl:mt-24 2xl:mb-40 2xl:gap-64">
        <img src={airplane1} alt="" className="plane-1 absolute" />
        <img src={airplane2} alt="" className="plane-2 absolute" />
        <img src={airplane3} alt="" className="plane-3 absolute" />
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
        <motion.p
          initial="hiddenY"
          whileInView="visible"
          variants={variants}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "0% 0% -30% 0%" }}
          className="p-large"
        >
          “A paper plane’s journey, however brief, reminds us that <br /> even
          the simplest dreams can take flight.”
        </motion.p>
      </section>
  );
};

export default memo(AboutWhy);
