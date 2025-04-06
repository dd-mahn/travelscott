import React, { memo, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { setPageLoading } from "src/store/slices/loadingSlice";
import RelatedSections from "src/common/RelatedSections/RelatedSections";
import useFetch from "src/hooks/useFetch/useFetch";
import Blog from "src/types/Blog";
import NotFoundPage from "src/pages/404/404";
import Loading from "src/common/Loading/Loading";
import { VisibilityVariants } from "src/utils/constants/variants";
import { formatDate } from "src/utils/formatDate";
import OptimizedImage from "src/common/OptimizedImage/OptimizedImage";

// Define motion variants
const variants = {
  hidden: VisibilityVariants.hidden,
  visible: VisibilityVariants.visible,
  hiddenY: VisibilityVariants.hiddenY,
  hiddenFullY: VisibilityVariants.hiddenFullY,
};

const Article: React.FC = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  // Fetch blog data with optimized parameters
  const {
    data: blogData,
    isLoading: blogLoading,
    error: blogError,
    isSuccess: blogSuccess,
  } = useFetch<Blog>(
    `blog-${id}`,
    `/api/blogs/${id}`,
    "blog",
    {
      staleTime: 5 * 60 * 1000, // 5 minutes cache
      cacheTime: 30 * 60 * 1000, // 30 minutes
    }
  );

  // Update global loading state
  useEffect(() => {
    if (blogSuccess) {
      dispatch(setPageLoading({ page: 'article', isLoading: false }));
    }
    
    return () => {
      // Reset loading state when component unmounts
      dispatch(setPageLoading({ page: 'article', isLoading: true }));
    };
  }, [blogSuccess, dispatch]);

  // Memoize formatted date to prevent unnecessary re-renders
  const formattedDate = useMemo(() => {
    if (!blogData?.time) return "";
    return formatDate(blogData.time);
  }, [blogData?.time]);

  // Memoize blog content rendering to prevent unnecessary re-renders
  const blogContent = useMemo(() => {
    if (!blogData) return null;

    return blogData.content.map((content, index) => {
      return (
        <div
          key={index}
          className="flex w-[90%] flex-col items-center gap-8 sm:w-3/4 md:gap-12 lg:w-2/3 lg:gap-20"
        >
          <motion.div
            variants={variants}
            initial="hiddenY"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-4 lg:w-2/3"
          >
            <h3 className="h3-md">{content.sectionTitle}</h3>
            {content.sectionText.map((sectionText, index) => (
              <p className="p-regular" key={index}>
                {sectionText}
              </p>
            ))}
          </motion.div>

          {/* Blog section images */}
          <motion.div
            variants={variants}
            initial="hiddenY"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center gap-2 md:gap-4"
          >
            {content.sectionImages && content.sectionImages.length > 0 && (
              <OptimizedImage
                className="image-suspense w-full rounded-xl"
                imageClassName="cursor-hover-small rounded-xl"
                src={content.sectionImages[0].url}
                alt={content.sectionTitle}
                loading="lazy"
              />
            )}
            <span className="span-small text-gray">
              {content.sectionImages?.[0].description}
            </span>
          </motion.div>
        </div>
      );
    });
  }, [blogData?.content]);

  // Handle loading and error states
  if (blogLoading) return <Loading />;
  if (!blogData || blogError) return <NotFoundPage />;

  return (
    <main data-testid="article-page" className="article">
      {/* Blog header image */}
      <motion.div
        variants={variants}
        initial="hiddenY"
        animate="visible"
        transition={{ duration: 0.5 }}
        className="image-suspense h-[50svh] md:h-[75svh]"
      >
        {blogData.image && (
          <OptimizedImage
            src={blogData.image}
            alt={blogData.title}
            className="h-full w-full"
            loading="eager" // Prioritize header image loading
          />
        )}
      </motion.div>

      {/* Blog metadata */}
      <div className="mt-12 flex h-[20svh] flex-col items-center gap-2 md:mt-20 lg:h-[35svh] lg:gap-2 2xl:gap-4">
        <motion.span
          variants={variants}
          initial="hiddenY"
          animate="visible"
          transition={{ duration: 0.5, delay: 0.5 }}
          className="span-medium text-gray"
        >
          {blogData.category}
        </motion.span>
        <div className="h-fit overflow-hidden">
          <motion.h2
            variants={variants}
            initial="hiddenFullY"
            animate="visible"
            transition={{ duration: 0.5, delay: 1 }}
            className="h2-md text-center"
          >
            {blogData.title}
          </motion.h2>
        </div>
        <motion.span
          variants={variants}
          initial="hiddenY"
          animate="visible"
          transition={{ duration: 0.5, delay: 1.5 }}
          className="span-regular"
        >
          {blogData.author}
        </motion.span>
        <motion.span
          variants={variants}
          initial="hiddenY"
          animate="visible"
          transition={{ duration: 0.5, delay: 2 }}
          className="span-regular"
        >
          <i className="ri-time-line"></i>
          {" " + formattedDate}
        </motion.span>
      </div>

      {/* Blog content */}
      <div className="flex flex-col items-center gap-20">
        {blogContent}

        {/* Blog author */}
        <motion.div
          variants={variants}
          initial="hiddenY"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex w-[90%] justify-end border-t pt-2 sm:w-3/4 lg:w-2/3"
        >
          <span className="span-large w-fit">By {" " + blogData.author}</span>
        </motion.div>
      </div>

      {/* Related articles */}
      <div className="py-20 lg:py-40 2xl:py-sect-default">
        <div className="overflow-hidden">
          <motion.h2
            variants={variants}
            initial="hiddenFullY"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="h2-md px-sect w-full pb-4 text-center lg:pb-8 2xl:pb-12"
          >
            More articles
          </motion.h2>
        </div>
        <motion.div
          variants={variants}
          initial="hiddenY"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <RelatedSections type={"blog"} data={blogData} />
        </motion.div>
      </div>
    </main>
  );
};

export default memo(Article); 