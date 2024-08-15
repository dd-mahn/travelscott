import React, { memo, useCallback, useMemo } from "react";
import useFetch from "src/hooks/useFetch";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import StarterBlogs from "./StarterBlog";
import { FetchBlogsType } from "src/types/FetchData";
import { BASE_URL } from "src/utils/config";
import airplane1 from "src/assets/svg/airplane-1.svg";
import planeIcon from "src/assets/svg/plane-icon.svg";
import Blog from "src/types/Blog";
import { SecondaryButton } from "src/components/ui/Button";

const variants = {
  hidden: {
    opacity: 0,
  },
  hiddenPlane: {
    opacity: 0,
    scale: 0.8,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
  },
};

const Starter: React.FC<{ blogs: Blog[] }> = ({ blogs }) => {
  const navigate = useNavigate();

  const handleButtonClick = useCallback(() => {
    navigate("/inspiration");
  }, []);

  return (
    <section className="starter relative rounded-5xl bg-main-brown lg:py-sect-medium 2xl:py-sect-semi">
      <motion.img
        initial="hiddenPlane"
        whileInView="visible"
        variants={variants}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        drag
        dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
        src={airplane1}
        alt=""
        className="absolute -top-[5%] left-[5%] z-0 lg:w-44 xl:w-44 2xl:w-44 3xl:w-48"
      />
      <div className="h-full w-full overflow-hidden">
        <StarterBlogs blogs={blogs} />
      </div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={variants}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="absolute -bottom-4 right-0 lg:mr-12 xl:mr-16 2xl:mr-20 3xl:mr-24"
      >
        <SecondaryButton text="Find More" onClick={handleButtonClick} />
      </motion.div>
    </section>
  );
};

export default memo(Starter);
