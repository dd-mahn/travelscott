// Import necessary dependencies and components
import React, { memo, useCallback } from "react";
import { motion, useTransform, useScroll } from "framer-motion";
import { Link } from "react-router-dom";

// Import custom types and utility functions
import Blog from "src/types/Blog";
import { formatDate } from "src/utils/formatDate";
import FeaturedContentSlider from "src/components/common/FeaturedContentSlider";
import { optimizeImage } from "src/utils/optimizeImage";

// Define Framer Motion animation variants
const variants = {
  hidden: { opacity: 0, y: 20 },
  hiddenFullY: { y: "100%" },
  hiddenScale: { opacity: 0, scale: 0.8, y: 30 },
  visible: { opacity: 1, y: 0, scale: 1 },
  enter: (direction: number) => ({ x: direction > 0 ? 1000 : -1000, opacity: 0 }),
  center: { zIndex: 1, x: 0, opacity: 1 },
  exit: (direction: number) => ({ zIndex: 0, x: direction < 0 ? 1000 : -1000, opacity: 0 }),
  hoverScale: { scale: 1.05, transition: { duration: 0.4, ease: "easeInOut" } },
  hoverX: { x: 5, transition: { duration: 1, type: "spring", bounce: 0.5 } },
};

// Define prop types for the Articles component
type ArticlesProps = {
  articlesHookRef: React.RefObject<HTMLSpanElement>;
  blogChunks: Blog[][];
};

// Articles component: Displays a list of blog articles
const Articles: React.FC<ArticlesProps> = memo(({ articlesHookRef, blogChunks }) => {
  // Set up scroll-based animation
  const { scrollYProgress } = useScroll({
    target: articlesHookRef,
    offset: ["end end", "start start"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  // Determine the current season based on the month
  const getSeason = useCallback(() => {
    const month = new Date().getMonth();
    if (month >= 2 && month <= 4) return "Spring";
    if (month >= 5 && month <= 7) return "Summer";
    if (month >= 8 && month <= 10) return "Fall";
    return "Winter";
  }, []);

  // Render the season heading with animated letters
  const renderSeasonHeading = () => (
    <motion.div className="big-heading flex h-fit items-center gap-[2svw] overflow-hidden">
      <div className="inline-block h-fit w-fit overflow-hidden border-b-4 border-text-dark dark:border-text-light">
        {getSeason().split("").map((letter, index) => (
          <motion.h1
            key={index}
            initial="hiddenFullY"
            whileInView="visible"
            transition={{ duration: 0.5, delay: index * 0.1, type: "spring", bounce: 0.5 }}
            viewport={{ once: true }}
            variants={variants}
            className="inline-block text-text-dark dark:text-text-light"
            style={{ lineHeight: 0.8 }}
          >
            {letter}
          </motion.h1>
        ))}
      </div>
      <motion.h1
        initial="hiddenFullY"
        whileInView="visible"
        transition={{ duration: 0.5, delay: 1 }}
        viewport={{ once: true }}
        variants={variants}
        className="text-stroke-light-bold inline-block border-b-4 border-transparent text-transparent"
      >
        {new Date().getFullYear()}
      </motion.h1>
    </motion.div>
  );

  // Render a featured blog article
  const renderFeaturedBlog = (blog: Blog) => (
    <Link
      to={`/inspiration/${blog._id}`}
      target="_top"
      className="flex h-full w-full cursor-pointer flex-col gap-4"
    >
      <div className="h-[50svh] w-full overflow-hidden rounded-lg shadow-component">
        <motion.img
          loading="lazy"
          {...optimizeImage(blog.image, { width: 800, height: 600 })}
          alt="featuredBlogImage"
          whileHover="hoverScale"
          transition={{ duration: 0.4 }}
          variants={variants}
          className="cursor-hover h-full w-full rounded-lg object-cover"
        />
      </div>
      <div className="flex flex-col">
        <span className="span-small text-white">{blog.category}</span>
        <motion.p
          whileHover="hoverX"
          variants={variants}
          className="cursor-hover-small span-medium uppercase text-text-dark dark:text-text-light"
        >
          {blog.title}
        </motion.p>
      </div>
      <p className="p-regular overflow-hidden 2xl:w-4/5 3xl:w-3/4 text-text-dark dark:text-text-light">
        {blog.content[0].sectionText[0]}
      </p>
      <span className="span-regular w-3/4 overflow-hidden text-text-dark dark:text-text-light">
        <i className="ri-time-line span-regular text-text-dark dark:text-text-light"></i>{" "}
        {formatDate(blog.time)}
      </span>
    </Link>
  );

  // Render a normal (non-featured) blog article
  const renderNormalBlog = (blog: Blog) => (
    <Link
      to={`/inspiration/${blog._id}`}
      target="_top"
      className="flex h-full cursor-pointer flex-row gap-4"
      key={blog._id}
    >
      <div className="h-full w-[45%] overflow-hidden rounded-lg shadow-component">
        <motion.img
          loading="lazy"
          {...optimizeImage(blog.image, { width: 400, height: 300 })}
          alt="normalBlogImage"
          whileHover="hoverScale"
          transition={{ duration: 0.4 }}
          variants={variants}
          className="cursor-hover h-full w-full rounded-lg object-cover"
        />
      </div>
      <div className="flex w-1/2 flex-col gap-4">
        <div className="flex flex-col gap-0">
          <span className="span-small text-blue-gray-100">{blog.category}</span>
          <motion.span
            whileHover="hoverX"
            variants={variants}
            className="cursor-hover-small span-medium w-full text-text-dark dark:text-text-light"
          >
            {blog.title}
          </motion.span>
        </div>
        <span className="span-small w-3/4 overflow-hidden text-text-dark dark:text-text-light">
          <i className="ri-time-line span-regular text-text-dark dark:text-text-light"></i>{" "}
          {formatDate(blog.time)}
        </span>
      </div>
    </Link>
  );

  // Render the entire Articles component
  return (
    <div className="relative">
      {/* Animated hook text */}
      <motion.span
        ref={articlesHookRef}
        style={{ x }}
        className="article-hook px-sect p-large absolute -top-10 left-0 font-semibold uppercase text-text-light dark:text-text-dark"
      >
        Discover the latest articles in
      </motion.span>
      {/* Render blog articles if available */}
      {blogChunks?.length > 0 && (
        <section 
          className="blogs flex flex-col items-center justify-start gap-sect-short lg:pb-sect-default lg:pt-sect-short 2xl:pb-sect-medium 2xl:pt-60"
          style={{background: "var(--inspiration-gradient)"}}
        >
          {renderSeasonHeading()}
          {/* Featured content slider for blog chunks */}
          <FeaturedContentSlider>
            {blogChunks.map((chunk, chunkIndex) => (
              <div
                key={chunkIndex}
                className="px-sect flex h-full w-screen flex-row gap-8"
              >
                {renderFeaturedBlog(chunk[0])}
                <div className="grid h-[75svh] w-full grid-flow-row auto-rows-[30%] gap-4">
                  {chunk.slice(1).map(renderNormalBlog)}
                </div>
              </div>
            ))}
          </FeaturedContentSlider>
        </section>
      )}
    </div>
  );
});

// Export memoized Articles component
export default memo(Articles);
