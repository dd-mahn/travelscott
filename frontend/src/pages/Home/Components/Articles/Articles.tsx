// Import necessary dependencies and components
import React, { memo, useState, useEffect } from "react";
import { motion, useTransform, useScroll } from "framer-motion";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "src/store/store";
import { setBlogChunks } from "src/store/slices/blogSlice";

// Import custom types and utility functions
import Blog from "src/types/Blog";
import { formatDate } from "src/utils/formatDate";
import FeaturedContentSlider from "src/common/FeaturedBlogsSlider/FeaturedContentSlider";
import OptimizedImage from "src/common/OptimizedImage/OptimizedImage";
import {
  HoverVariants,
  VisibilityVariants,
} from "src/utils/constants/variants";
import { createBlogChunks } from "src/utils/createBlogChunks";
import SeasonHeading from "src/common/SeasonHeading/SeasonHeading";
import { getSeason } from "src/utils/getSeason";
import { selectIsDarkMode } from "src/store/slices/themeSlice";
import { NotFoundState } from "src/common/Catalogs/CatalogStates";
import { useViewportWidth } from "src/hooks/useViewportWidth/useViewportWidth";

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
  return (
    <div
      className={`h-full w-full ${isFeatured ? "flex flex-col gap-2 lg:gap-4" : "grid grid-cols-2 gap-2 lg:gap-4"}`}
      key={blog._id}
    >
      <Link
        to={`/inspiration/${blog._id}`}
        className={`w-full overflow-hidden rounded-lg bg-gradient-to-t from-blue-gray-900 to-gray shadow-component dark:shadow-component-dark`}
      >
        <OptimizedImage
          src={blog.image}
          alt={`${isFeatured ? "featured" : "normal"}BlogImage`}
          className="cursor-hover h-full w-full rounded-lg object-cover"
          whileHover="hoverScale"
          transition={{ duration: 0.4 }}
          variants={variants}
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
          <Link to={`/inspiration/${blog._id}`}>
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
  const viewportWidth = useViewportWidth();

  // Dispatch blog chunks when blogs are updated
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
  console.log(x);

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
      {viewportWidth >= 768 && (
        <motion.span
          ref={articlesHookRef}
          style={{ x }}
          className="article-hook px-sect p-large absolute -top-6 left-0 whitespace-nowrap font-semibold uppercase text-text-light dark:text-text-dark md:-top-6 lg:-top-10"
        >
          Discover the latest articles in
        </motion.span>
      )}

      {/* Render blog articles if available */}

      <section
        className="blogs flex min-h-screen flex-col items-center justify-start gap-sect-short pb-48 pt-sect-short lg:pb-sect-default lg:pt-sect-short 2xl:pb-sect-medium 2xl:pt-60"
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
          {blogChunks?.length > 0 ? (
            <FeaturedContentSlider>
              {blogChunks.map((chunk, chunkIndex) => (
                <div
                  key={chunkIndex}
                  className="px-sect grid h-[60svh] w-screen grid-cols-2 gap-2 pb-4 md:h-[60svh] md:gap-4 lg:h-[80svh] lg:gap-8"
                >
                  <div className="h-[60svh] pb-4 md:h-[60svh] lg:h-[80svh]">
                    <RenderBlog blog={chunk[0]} isFeatured={true} />
                  </div>
                  <div className="grid h-[60svh] w-full grid-rows-3 items-stretch gap-2 pb-4 md:h-[60svh] md:gap-4 lg:h-[80svh]">
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
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <NotFoundState keyName="blogs" />
            </div>
          )}
        </motion.div>
      </section>
    </div>
  );
});

// Export memoized Articles component
export default memo(Articles);
