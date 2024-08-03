import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  hiddenY:{
    opacity: 0,
    y: 100,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
  },
}

const Inspired: React.FC = () => {
  const targetRef = useRef<HTMLHeadingElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "start center"],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0.05, 1]);
  return (
    <section className="px-sect inspired flex items-center justify-center lg:pb-sect-semi lg:pt-sect-default 2xl:pb-sect-semi 2xl:pt-sect-medium">
      <div className="relative flex w-fit flex-col lg:gap-2 xl:gap-2 2xl:gap-4 3xl:gap-4">
        <div className="blob blur-blob absolute z-0 h-full w-1/2"></div>
        <motion.h1
          // ref={targetRef}
          // style={{ opacity }}
          variants={variants}
          initial="hiddenY"
          whileInView="visible"
          viewport={{ once: true, margin: "-300px" }}
          transition={{ duration: 0.8 }}
          className="h2-inter text-center leading-normal tracking-tight"
        >
          We got inspired by travelers of <br />
          <span className="text-main-green">20</span>+ countries around the
          world
        </motion.h1>
        <motion.span
          initial="hidden"
          whileInView="visible"
          transition={{ delay: 1, duration: 0.5 }}
          variants={variants}
          viewport={{ once: true, margin: "-300px" }}
          className="p-medium self-end"
        >
          (Maybe you are one)
        </motion.span>
      </div>
    </section>
  );
};

export default Inspired;
