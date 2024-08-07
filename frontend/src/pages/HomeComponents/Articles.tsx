import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { DotPagination } from "src/components/ui/Pagination";
import useFetch from "src/hooks/useFetch";
import Blog from "src/types/Blog";
import { FetchBlogsType } from "src/types/FetchData";
import { BASE_URL } from "src/utils/config";
import { createBlogChunks } from "src/utils/createBlogChunks";
import { preloadImage } from "src/utils/preloadImage";
import { optimizeImage } from "src/utils/optimizeImage";
import {
  motion,
  useTransform,
  useScroll,
  AnimatePresence,
} from "framer-motion";

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
};

type ArticlesProps = {
  articlesHookRef: React.RefObject<HTMLSpanElement>;
  blogChunks: Blog[][];
};

const Articles: React.FC<ArticlesProps> = ({ articlesHookRef, blogChunks }) => {
  const navigate = useNavigate();

  // Handle chunks display
  const [direction, setDirection] = useState(1);
  const [chunkIndex, setChunkIndex] = useState(0);

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

  // optimize images

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
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
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
                <div
                  className="flex h-full w-full cursor-pointer flex-col gap-4"
                  onClick={() => {
                    navigate(`/inspiration/${blogChunks[chunkIndex][0]._id}`);
                  }}
                >
                  <img
                    loading="lazy"
                    // src={optimizeImage(blogChunks[chunkIndex][0].image).src}
                    // srcSet={
                    //   optimizeImage(blogChunks[chunkIndex][0].image).srcSet
                    // }
                    src={blogChunks[chunkIndex][0].image}
                    alt="featuredBlogImage"
                    className="h-[50svh] w-full rounded-lg"
                  />
                  <div className="flex flex-col">
                    <span className="span-small text-gray">
                      {blogChunks[chunkIndex][0].category}
                    </span>
                    <p className="span-medium uppercase">
                      {" "}
                      {blogChunks[chunkIndex][0].title}
                    </p>
                  </div>

                  <p className="p-regular overflow-hidden 2xl:w-4/5 3xl:w-3/4">
                    {blogChunks[chunkIndex][0].content[0].sectionText[0]}
                  </p>
                  <span className="span-regular w-3/4 overflow-hidden">
                    <i className="ri-time-line"></i>{" "}
                    {blogChunks[chunkIndex][0].time}
                  </span>
                </div>
                <div className="grid h-[75svh] w-full grid-flow-row auto-rows-[30%] gap-4">
                  {blogChunks[chunkIndex].slice(1).map((blog) => (
                    <div
                      className="flex h-full cursor-pointer flex-row gap-4"
                      key={blog._id}
                      onClick={() => {
                        navigate(`/inspiration/${blog._id}`);
                      }}
                    >
                      <img
                        // src={optimizeImage(blog.image).src}
                        // srcSet={optimizeImage(blog.image).srcSet}
                        loading="lazy"
                        src={blog.image}
                        alt="normalBlogImage"
                        className="h-full w-[45%] rounded-lg"
                      />
                      <div className="flex w-1/2 flex-col gap-4">
                        <div className="flex flex-col gap-0">
                          <span className="span-small text-gray">
                            {blog.category}
                          </span>
                          <span className="span-medium w-full">
                            {" "}
                            {blog.title}
                          </span>
                        </div>

                        <span className="span-regular w-3/4 overflow-hidden">
                          <i className="ri-time-line"></i> {blog.time}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
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
