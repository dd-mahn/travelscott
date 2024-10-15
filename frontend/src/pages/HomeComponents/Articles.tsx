// Import necessary dependencies and components
import React, { memo, useState, useEffect, useMemo } from "react";
import { motion, useTransform, useScroll } from "framer-motion";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "src/store/store";
import { setBlogChunks } from "src/store/slices/blogSlice";

// Import custom types and utility functions
import Blog from "src/types/Blog";
import { formatDate } from "src/utils/formatDate";
import FeaturedContentSlider from "src/common/FeaturedContentSlider";
import {
  getImageSize,
  useViewportWidth,
  optimizeImage,
} from "src/utils/imageUtils";
import { HoverVariants, VisibilityVariants } from "src/utils/variants";
import { createBlogChunks } from "src/utils/createBlogChunks";
import SeasonHeading from "src/common/SeasonHeading";
import { getSeason } from "src/utils/getSeason";
import { selectIsDarkMode } from "src/store/slices/themeSlice";

// Define Framer Motion animation variants
const variants = {
  hiddenY: VisibilityVariants.hiddenY,
  hiddenFullY: VisibilityVariants.hiddenFullY,
  hiddenScale: VisibilityVariants.hiddenScale,
  visible: VisibilityVariants.visible,
  hoverScale: HoverVariants.hoverScale,
  hoverX: HoverVariants.hoverX,
};

// Define prop types for the Articles component
type ArticlesProps = {
  articlesHookRef: React.RefObject<HTMLSpanElement>;
  blogs: Blog[];
};

// Child component to render a blog
const RenderBlog: React.FC<{ blog: Blog; isFeatured: boolean }> = ({
  blog,
  isFeatured,
}) => {
  const optimizedImage = useMemo(() => {
    return optimizeImage(blog.image, {
      width: isFeatured ? 800 : 400,
      height: isFeatured ? 600 : 300,
      quality: 80,
      format: "auto",
    });
  }, [blog.image]);

  return (
    <div
      className={`h-full w-full ${isFeatured ? "flex flex-col gap-2 lg:gap-4" : "grid grid-cols-2 gap-2 lg:gap-4"}`}
      key={blog._id}
    >
      <Link
        to={`/inspiration/${blog._id}`}
        target="_top"
        className={`w-full overflow-hidden rounded-lg bg-gradient-to-t from-blue-gray-900 to-gray shadow-component dark:shadow-component-dark`}
      >
        <motion.img
          loading="lazy"
          {...optimizedImage}
          alt={`${isFeatured ? "featured" : "normal"}BlogImage`}
          whileHover="hoverScale"
          transition={{ duration: 0.4 }}
          variants={variants}
          className="cursor-hover h-full w-full rounded-lg object-cover"
        />
      </Link>
      <div
        className={`flex ${
          isFeatured
            ? "flex-col gap-2 lg:gap-4"
            : "w-full flex-col gap-2 lg:gap-4"
        }`}
      >
        <div className="flex flex-col gap-1 pt-2">
          <span className={`span-small text-blue-gray-100`}>
            {blog.category}
          </span>
          <Link to={`/inspiration/${blog._id}`} target="_top">
            <motion.p
              whileHover="hoverX"
              transition={{ duration: 0.3 }}
              variants={variants}
              className={`cursor-hover-small span-medium ${isFeatured ? "uppercase text-text-dark" : "w-full text-text-dark"}`}
            >
              {blog.title}
            </motion.p>
          </Link>
        </div>

        {isFeatured && (
          <>
            <p className="p-regular overflow-hidden text-blue-gray-50 2xl:w-4/5 3xl:w-3/4">
              {blog.content[0].sectionText[0]}
            </p>
            <span className="span-small 2xl:span-regular w-3/4 overflow-hidden text-blue-gray-50">
              <i className="ri-time-line text-blue-gray-50"></i>{" "}
              {formatDate(blog.time)}
            </span>
          </>
        )}
      </div>
    </div>
  );
};

// Articles component: Displays a list of blog articles
const Articles: React.FC<ArticlesProps> = memo(({ articlesHookRef, blogs }) => {
  const dispatch = useDispatch();
  const blogChunks = useSelector((state: RootState) => state.blog.blogChunks);
  const isDarkMode = useSelector(selectIsDarkMode);
  useEffect(() => {
    if (blogs.length > 0) {
      dispatch(setBlogChunks(createBlogChunks(blogs)));
    }
  }, [blogs, dispatch]);

  // Set up scroll-based animation
  const { scrollYProgress } = useScroll({
    target: articlesHookRef,
    offset: ["end end", "start start"],
  });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  // Set the background gradient based on the current season
  const [backgroundGradient, setBackgroundGradient] = useState("");

  useEffect(() => {
    const season = getSeason();
    const gradient = `var(--${season.toLowerCase().replace(/ /g, "-")}-gradient)`;
    const darkGradient = `var(--${season.toLowerCase().replace(/ /g, "-")}-gradient-dark)`;

    if (isDarkMode) {
      setBackgroundGradient(darkGradient);
    } else {
      setBackgroundGradient(gradient);
    }
  }, [isDarkMode]);

  // Render the entire Articles component
  return (
    <div className="relative">
      {/* Animated hook text */}
      <motion.span
        ref={articlesHookRef}
        style={{ x }}
        className="article-hook px-sect p-large absolute -top-6 left-0 font-semibold uppercase text-text-light dark:text-text-dark md:-top-6 lg:-top-10"
      >
        Discover the latest articles in
      </motion.span>
      {/* Render blog articles if available */}
      {blogChunks?.length > 0 && (
        <section
          className="blogs flex flex-col items-center justify-start gap-sect-short pb-48 pt-sect-short lg:pb-sect-default lg:pt-sect-short 2xl:pb-sect-medium 2xl:pt-60"
          style={{ background: backgroundGradient }}
        >
          <SeasonHeading />
          {/* Featured content slider for blog chunks */}
          <motion.div
            initial="hiddenY"
            whileInView="visible"
            transition={{ duration: 0.5, delay: 1 }}
            viewport={{ once: true }}
            variants={variants}
            className="w-screen"
          >
            <FeaturedContentSlider>
              {blogChunks.map((chunk, chunkIndex) => (
                <div
                  key={chunkIndex}
                  className="px-sect grid h-[60svh] md:h-[60svh] lg:h-[80svh] w-screen grid-cols-2 gap-2 pb-4  md:gap-4 lg:gap-8"
                >
                  <div className="pb-4 h-[60svh] md:h-[60svh] lg:h-[80svh]">
                    <RenderBlog blog={chunk[0]} isFeatured={true} />
                  </div>
                  <div className="grid w-full h-[60svh] md:h-[60svh] lg:h-[80svh] grid-rows-3 items-stretch gap-2 md:gap-4 pb-4">
                    {chunk.slice(1).map((blog) => (
                      <RenderBlog
                        key={blog._id}
                        blog={blog}
                        isFeatured={false}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </FeaturedContentSlider>
          </motion.div>
        </section>
      )}
    </div>
  );
});

// Export memoized Articles component
export default memo(Articles);
