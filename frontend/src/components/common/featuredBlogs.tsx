import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import Blog from "src/types/Blog";
import FeaturedContentSlider from "./FeaturedContentSlider";
import { formatDate } from "src/utils/formatDate";

type featuredBlogsProps = {
  blogs: Blog[];
};

const variants = {
  hoverScale: {
    scale: 1.05,
    transition: {
      duration: 0.4,
    },
  },

  tapScale: {
    scale: 0.95,
    transition: {
      duration: 0.4,
    },
  },
};

const FeaturedBlogs: React.FC<featuredBlogsProps> = ({ blogs }) => {
  return (
    <div className="flex flex-col items-center gap-8 pb-sect-default w-screen">
      <FeaturedContentSlider>
        {blogs.map((blog) => (
          <div
            key={blog._id}
            className="px-sect pt-8 flex h-fit w-svw flex-col items-center gap-8"
          >
            <Link
              to={`/inspiration/${blog._id}`}
              target="_top"
              className="h-[75svh] w-full overflow-hidden rounded-xl shadow-section"
            >
              <motion.img
                whileHover="hoverScale"
                transition={{ duration: 0.4 }}
                variants={variants}
                src={blog.image}
                alt={blog.title}
                className="cursor-hover h-full w-full rounded-xl cursor-pointer object-cover"
              />
            </Link>
            <div className="flex flex-col items-center gap-2">
              <span className="span-regular text-gray">{blog.category}</span>
              <Link to={`/inspiration/${blog._id}`} target="_top">
                <motion.h2 whileHover={{y: -3}} transition={{duration: 0.3}} className="cursor-hover-small cursor-pointer h2-md">{blog.title}</motion.h2>
              </Link>
            </div>
            <p className="p-regular w-2/5 text-center">
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
