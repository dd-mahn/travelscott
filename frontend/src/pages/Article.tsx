import React from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";

import RelatedSections from "src/common/RelatedSections";
import useFetch from "src/hooks/useFetch";
import Blog from "src/types/Blog";
import { BASE_URL } from "src/utils/config";
import NotFoundPage from "./404";
import Loading from "src/common/Loading";
import { VisibilityVariants } from "src/utils/variants";
import { formatDate } from "src/utils/formatDate";

const variants = {
  hidden: VisibilityVariants.hidden,
  visible: VisibilityVariants.visible,
  hiddenY: VisibilityVariants.hiddenY,
  hiddenFullY: VisibilityVariants.hiddenFullY,
};

const Article: React.FC = () => {
  const { id } = useParams();

  // Handle blog data
  const {
    data: blogData,
    loading: blogLoading,
    error: blogError,
  } = useFetch<Blog>(`${BASE_URL}/blogs/${id}`);

  if (blogLoading) return <Loading />;
  if (!blogData || blogError) return <NotFoundPage />;

  return (
    <main className="">
      <motion.div
        variants={variants}
        initial="hiddenY"
        animate="visible"
        transition={{ duration: 0.5 }}
        className="h-[75svh] bg-gradient-to-t from-blue-gray-900 to-gray"
      >
        <img
          src={blogData.image}
          alt={blogData.title}
          className="h-full w-full object-cover"
        />
      </motion.div>

      <div className="mt-20 flex h-[35svh] flex-col items-center lg:gap-2 2xl:gap-4">
        <motion.span
          variants={variants}
          initial="hiddenY"
          animate="visible"
          transition={{ duration: 0.5, delay: 0.5 }}
          className="span-medium text-gray"
        >
          {blogData.category}
        </motion.span>
        <div className="overflow-hidden h-fit">
          <motion.h2
            variants={variants}
            initial="hiddenFullY"
            animate="visible"
            transition={{ duration: 0.5, delay: 1 }}
            className="h2-md"
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
          {" " + formatDate(blogData.time)}
        </motion.span>
      </div>

      <div className="flex flex-col items-center gap-20">
        {blogData.content.map((content, index) => (
          <div key={index} className="flex w-2/3 flex-col items-center gap-20">
            <motion.div
              variants={variants}
              initial="hiddenY"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex w-2/3 flex-col gap-4"
            >
              <h3 className="h3-md">{content.sectionTitle}</h3>
              {content.sectionText.map((sectionText, index) => (
                <p className="p-regular" key={index}>
                  {sectionText}
                </p>
              ))}
            </motion.div>

            <motion.div
              variants={variants}
              initial="hiddenY"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center gap-4"
            >
              <img
                className="w-full rounded-xl"
                src={content.sectionImages?.[0].url}
                alt={content.sectionTitle}
              />
              <span className="span-small text-gray">
                {content.sectionImages?.[0].description}
              </span>
            </motion.div>
          </div>
        ))}

        <motion.div
          variants={variants}
          initial="hiddenY"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex w-2/3 justify-end border-t pt-2"
        >
          <span className="span-large w-fit">By {" " + blogData.author}</span>
        </motion.div>
      </div>

      <motion.div
        variants={variants}
        initial="hiddenY"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="lg:py-40 2xl:py-sect-default"
      >
        <div className="overflow-hidden">
          <motion.h2
            variants={variants}
            initial="hiddenFullY"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="h2-md px-sect w-full text-center lg:pb-8 2xl:pb-12"
          >
            Related articles
          </motion.h2>
        </div>

        <RelatedSections type={"blog"} data={blogData} />
      </motion.div>
    </main>
  );
};

export default Article;
