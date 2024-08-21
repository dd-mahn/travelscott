import React, { memo, useCallback, useState } from "react";
import {
  motion,
  useTransform,
  useScroll,
  AnimatePresence,
} from "framer-motion";

// Component imports
import { DotPagination } from "src/components/common/Pagination";
import Blog from "src/types/Blog";
import { formatDate } from "src/utils/formatDate";
import { Link } from "react-router-dom";

// Framer motion variants
const variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },

  hiddenY: (y: string) => {
    return { y: y };
  },

  hiddenScale: {
    opacity: 0,
    scale: 0.8,
    y: 30,
  },

  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
  },

  enter: (direction: number) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    };
  },

  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },

  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    };
  },

  hoverScale: {
    scale: 1.05,
    transition: {
      duration: 0.4,
      ease: "easeInOut",
    },
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

// Component props
type ArticlesProps = {
  articlesHookRef: React.RefObject<HTMLSpanElement>;
  blogChunks: Blog[][];
};

// Articles component
const Articles: React.FC<ArticlesProps> = ({ articlesHookRef, blogChunks }) => {
  // Set up states for chunk display
  const [direction, setDirection] = useState(1);
  const [chunkIndex, setChunkIndex] = useState(0);

  // Handle pagination
  const handleNextChunk = useCallback(() => {
    if (chunkIndex < blogChunks.length - 1) {
      setDirection(1);
      setChunkIndex(chunkIndex + 1);
    }
  }, [chunkIndex, blogChunks.length]);

  const handlePrevChunk = useCallback(() => {
    if (chunkIndex > 0) {
      setDirection(-1);
      setChunkIndex(chunkIndex - 1);
    }
  }, [chunkIndex]);

  // Handle scroll animation
  const { scrollYProgress } = useScroll({
    target: articlesHookRef,
    offset: ["end end", "start start"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  // Render logic
  return (
    <div className="relative">
      <motion.span
        ref={articlesHookRef}
        style={{ x }}
        className="article-hook px-sect p-large absolute -top-10 left-0 font-semibold uppercase text-text-dark"
      >
        Discover the latest articles in
      </motion.span>
      {blogChunks !== undefined && blogChunks.length !== 0 && (
        <section className="blogs flex flex-col items-center justify-start gap-sect-short lg:pb-sect-default lg:pt-sect-short 2xl:pb-sect-medium 2xl:pt-60">
          <div className="overflow-hidden">
            <motion.h1
              initial={variants.hiddenY("var(--y-from)")}
              whileInView="visible"
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              variants={variants}
              className="h1-md lg:[--y-from:75px] 2xl:[--y-from:100px]"
            >
              {new Date().toLocaleString("default", {
                month: "long",
                year: "numeric",
              })}
            </motion.h1>
          </div>

          <div className="relative min-h-[75svh] w-full">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={chunkIndex}
                custom={direction}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                variants={variants}
                className="px-sect absolute left-0 top-0 flex h-full w-screen flex-row gap-8"
              >
                <Link
                  to={`/inspiration/${blogChunks[chunkIndex][0]._id}`}
                  target="_top"
                  className="flex h-full w-full cursor-pointer flex-col gap-4"
                >
                  <div className="h-[50svh] w-full overflow-hidden rounded-lg">
                    <motion.img
                      loading="lazy"
                      src={blogChunks[chunkIndex][0].image}
                      alt="featuredBlogImage"
                      whileHover="hoverScale"
                      transition={{ duration: 0.4 }}
                      variants={variants}
                      className="h-full w-full rounded-lg object-cover"
                    />
                  </div>

                  <div className="flex flex-col">
                    <span className="span-small text-gray">
                      {blogChunks[chunkIndex][0].category}
                    </span>
                    <motion.p
                      whileHover="hoverX"
                      variants={variants}
                      className="span-medium uppercase"
                    >
                      {" "}
                      {blogChunks[chunkIndex][0].title}
                    </motion.p>
                  </div>

                  <p className="p-regular overflow-hidden 2xl:w-4/5 3xl:w-3/4">
                    {blogChunks[chunkIndex][0].content[0].sectionText[0]}
                  </p>
                  <span className="span-regular w-3/4 overflow-hidden">
                    <i className="ri-time-line span-regular"></i>{" "}
                    {formatDate(blogChunks[chunkIndex][0].time)}
                  </span>
                </Link>
                <div className="grid h-[75svh] w-full grid-flow-row auto-rows-[30%] gap-4">
                  {blogChunks[chunkIndex].slice(1).map((blog) => (
                    <Link
                      to={`/inspiration/${blog._id}`}
                      target="_top"
                      className="flex h-full cursor-pointer flex-row gap-4"
                      key={blog._id}
                    >
                      <div className="h-full w-[45%] overflow-hidden rounded-lg">
                        <motion.img
                          loading="lazy"
                          src={blog.image}
                          alt="normalBlogImage"
                          whileHover="hoverScale"
                          transition={{ duration: 0.4 }}
                          variants={variants}
                          className="h-full w-full rounded-lg object-cover"
                        />
                      </div>

                      <div className="flex w-1/2 flex-col gap-4">
                        <div className="flex flex-col gap-0">
                          <span className="span-small text-gray">
                            {blog.category}
                          </span>
                          <motion.span
                            whileHover="hoverX"
                            variants={variants}
                            className="span-medium w-full"
                          >
                            {" "}
                            {blog.title}
                          </motion.span>
                        </div>

                        <span className="span-regular w-3/4 overflow-hidden">
                          <i className="ri-time-line span-regular"></i>{" "}
                          {formatDate(blog.time)}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
            variants={variants}
            className="flex w-full justify-center"
          >
            <DotPagination
              count={blogChunks.length}
              index={chunkIndex}
              handleNextClick={handleNextChunk}
              handlePreviousClick={handlePrevChunk}
            />
          </motion.div>
        </section>
      )}
    </div>
  );
};

export default memo(Articles);
