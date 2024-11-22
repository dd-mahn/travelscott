import React, { memo } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { formatDate } from "src/utils/formatDate";
import Blog from "src/types/Blog";
import {
  HoverVariants,
  VisibilityVariants,
} from "src/utils/constants/variants";
import OptimizedImage from "src/common/OptimizedImage/OptimizedImage";

// Define motion variants for animations
const variants = {
  hiddenY: VisibilityVariants.hiddenY,
  visible: VisibilityVariants.visible,
  hoverScale: HoverVariants.hoverScale,
  hoverX: HoverVariants.hoverX,
};

interface InspirationCardProps {
  blog: Blog;
}

const InspirationCard: React.FC<InspirationCardProps> = memo(({ blog }) => {
  const blogLink = `/inspiration/${blog._id}`;

  return (
    <motion.div
      initial="hiddenY"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 }}
      variants={variants}
      className="flex flex-col gap-3 lg:gap-2 2xl:gap-4"
    >
      {/* Blog Image Link */}
      <Link
        to={blogLink}
        className="h-[30svh] w-full overflow-hidden rounded-xl shadow-section dark:shadow-section-dark md:h-[50svh]"
      >
        <OptimizedImage
          whileHover="hoverScale"
          transition={{ duration: 0.4 }}
          variants={variants}
          src={blog.image ?? ""}
          alt={blog.title}
          className="h-full w-full rounded-xl"
          hoverClassName="cursor-hover"
        />
      </Link>

      {/* Blog Title and Category */}
      <div className="mt-4 flex flex-col md:gap-2">
        <span className="span-regular text-gray">{blog.category}</span>
        <Link to={blogLink}>
          <motion.h3
            variants={variants}
            whileHover="hoverX"
            transition={{ duration: 0.3 }}
            className="h3-md cursor-hover-small w-fit"
          >
            {blog.title}
          </motion.h3>
        </Link>
      </div>

      {/* Blog Content Preview */}
      <p className="p-regular line-clamp-3 md:line-clamp-none md:w-3/4">
        {blog.content?.[0]?.sectionText?.[0]}
      </p>

      {/* Blog Publish Time */}
      <span className="span-regular flex items-center gap-1 md:gap-3">
        <i className="ri-time-line p-medium"></i> {formatDate(blog.time)}
      </span>
    </motion.div>
  );
});

export default InspirationCard;
