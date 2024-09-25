import React, { memo, useMemo } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { formatDate } from "src/utils/formatDate";
import Blog from "src/types/Blog";
import { useViewportWidth, getImageSize, optimizeImage } from "src/utils/imageUtils";
import { HoverVariants, VisibilityVariants } from "src/utils/variants";

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
  const viewportWidth = useViewportWidth();

  // Optimize the blog image based on the viewport width
  const optimizedImage = useMemo(() => {
    if (blog.image) {
      return optimizeImage(blog.image, {
        width: getImageSize(viewportWidth),
        quality: 80,
        format: "auto",
      });
    }
    return { src: "", srcSet: "" };
  }, [blog.image, viewportWidth]);

  const blogLink = `/inspiration/${blog._id}`;

  return (
    <motion.div
      initial="hiddenY"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 }}
      variants={variants}
      className="flex flex-col lg:gap-2 2xl:gap-4"
    >
      {/* Blog Image Link */}
      <Link
        to={blogLink}
        target="_top"
        className="h-[50svh] w-full overflow-hidden rounded-xl bg-gradient-to-t from-blue-gray-900 to-gray shadow-section dark:shadow-section-dark"
      >
        <motion.img
          whileHover="hoverScale"
          transition={{ duration: 0.4 }}
          variants={variants}
          src={optimizedImage.src}
          srcSet={optimizedImage.srcSet}
          alt={blog.title}
          className="cursor-hover h-full w-full rounded-xl object-cover"
          loading="lazy"
        />
      </Link>

      {/* Blog Title and Category */}
      <div className="mt-4 flex flex-col gap-2">
        <span className="span-regular text-gray">{blog.category}</span>
        <Link to={blogLink} target="_top">
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
      <p className="p-regular w-3/4">{blog.content?.[0]?.sectionText?.[0]}</p>

      {/* Blog Publish Time */}
      <span className="span-regular flex items-center gap-3">
        <i className="ri-time-line p-medium"></i> {formatDate(blog.time)}
      </span>
    </motion.div>
  );
});

export default InspirationCard;
