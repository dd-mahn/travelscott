import React, { memo, useMemo } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { formatDate } from "src/utils/formatDate";
import Blog from "src/types/Blog";
import { optimizeImage } from "src/utils/optimizeImage";
import { useViewportWidth, getImageSize } from "src/utils/imageUtils";

const variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, scale: 1, y: 0, x: 0 },
  hoverScale: {
    scale: 1.05,
    transition: { duration: 0.4, ease: "easeInOut" },
  },
  hoverX: {
    x: 5,
    transition: {
      duration: 1,
      type: "spring",
      bounce: 0.5,
    },
  },
};

interface InspirationCardProps {
  blog: Blog;
}

const InspirationCard: React.FC<InspirationCardProps> = memo(({ blog }) => {
  const viewportWidth = useViewportWidth();
  const imageSize = getImageSize(viewportWidth);

  const optimizedImage = useMemo(() => {
    if (blog.image) {
      return optimizeImage(blog.image, {
        width: imageSize,
        quality: 80,
        format: "auto",
      });
    }
    return { src: "", srcSet: "" };
  }, [blog.image, imageSize]);

  const blogLink = `/inspiration/${blog._id}`;

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 }}
      variants={variants}
      className="flex flex-col lg:gap-2 2xl:gap-4"
    >
      <Link
        to={blogLink}
        target="_top"
        className="h-[50svh] w-full overflow-hidden rounded-xl shadow-section bg-gradient-to-t from-background-dark to-transparent"
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

      <p className="p-regular w-3/4">{blog.content?.[0]?.sectionText?.[0]}</p>
      <span className="span-regular flex items-center gap-3">
        <i className="ri-time-line p-medium"></i> {formatDate(blog.time)}
      </span>
    </motion.div>
  );
});

export default InspirationCard;
