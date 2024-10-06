import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import Blog from "src/types/Blog";
import FeaturedContentSlider from "./FeaturedContentSlider";
import { formatDate } from "src/utils/formatDate";
import { HoverVariants, TapVariants } from "src/utils/variants";
import { getImageSize, useViewportWidth, optimizeImage } from "src/utils/imageUtils";

type featuredBlogsProps = {
  blogs: Blog[];
};

const variants = {
  hoverScale: HoverVariants.hoverScale,
  tapScale: TapVariants.tapScale,
};

const FeaturedBlogs: React.FC<featuredBlogsProps> = ({ blogs }) => {
  const viewportWidth = useViewportWidth();

  const optimizedBlogs = useMemo(() => {
    return blogs.map((blog) => ({
      ...blog,
      image: optimizeImage(blog.image, {
        width: getImageSize(viewportWidth),
        quality: 100,
        format: "auto",
      }),
    }));
  }, [blogs, viewportWidth]);

  return (
    <div className="flex w-screen flex-col items-center gap-8 pb-sect-short lg:pb-sect-default">
      <FeaturedContentSlider>
        {optimizedBlogs.map((blog) => (
          <div
            key={blog._id}
            className="px-sect flex h-fit w-svw flex-col items-center gap-4 md:gap-6 lg:gap-8 pt-8"
          >
            <Link
              to={`/inspiration/${blog._id}`}
              target="_top"
              className="h-[50svh] md:h-[75svh] w-full overflow-hidden rounded-xl bg-gradient-to-t from-blue-gray-900 to-gray shadow-section dark:shadow-section-dark"
            >
              <motion.img
                whileHover="hoverScale"
                transition={{ duration: 0.4 }}
                variants={variants}
                src={
                  blog.image
                    ? typeof blog.image === "string"
                      ? blog.image
                      : blog.image.src || ""
                    : ""
                }
                srcSet={
                  blog.image && typeof blog.image !== "string"
                    ? blog.image.srcSet || ""
                    : ""
                }
                alt={blog.title}
                className="cursor-hover h-full w-full cursor-pointer rounded-xl object-cover"
              />
            </Link>
            <div className="flex flex-col items-center gap-1 md:gap-2">
              <span className="span-regular text-gray">{blog.category}</span>
              <Link to={`/inspiration/${blog._id}`} target="_top">
                <motion.h2
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.3 }}
                  className="cursor-hover-small h2-md cursor-pointer"
                >
                  {blog.title}
                </motion.h2>
              </Link>
            </div>
            <p className="p-regular md:w-2/3 lg:w-2/5 text-center">
              {blog.content?.[0]?.sectionText?.[0]}
            </p>
            <span className="span-regular flex items-center gap-3">
              <i className="ri-time-line p-medium"></i> {formatDate(blog.time)}
            </span>
          </div>
        ))}
      </FeaturedContentSlider>
    </div>
  );
};

export default FeaturedBlogs;
