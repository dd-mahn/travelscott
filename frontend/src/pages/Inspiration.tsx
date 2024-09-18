import React, { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "src/store/store";
import { setAllBlogs, setFeaturedBlogs } from "src/store/slices/blogSlice";
import useFetch from "src/hooks/useFetch";
import { BASE_URL } from "src/utils/config";
import { FetchBlogsType } from "src/types/FetchData";
import { VisibilityVariants } from "src/utils/variants";

import FeaturedBlogs from "src/common/FeaturedBlogs";
import NotFoundPage from "./404";
import Loading from "src/common/Loading";
import InspirationCatalog from "./InspirationComponents/InspirationCatalog";
import InspirationHero from "./InspirationComponents/InspirationHero";
import InspirationButtons from "./InspirationComponents/InspirationButtons";
import InspirationHeading from "./InspirationComponents/InspirationHeading";

// Framer motion variants
const variants = {
  hidden: VisibilityVariants.hidden,
  hiddenY: VisibilityVariants.hiddenY,
  visible: VisibilityVariants.visible,
};

const Inspiration: React.FC = () => {
  const dispatch = useDispatch();
  const { currentCategory } = useSelector((state: RootState) => state.inspiration);
  const { featuredBlogs } = useSelector((state: RootState) => state.blog);

  // Fetch blogs data
  const {
    data: allBlogsData,
    loading: allBlogsLoading,
    error: allBlogsError,
  } = useFetch<FetchBlogsType>(
    `${BASE_URL}/blogs?limit=1000&category=${currentCategory === "All" ? "" : encodeURIComponent(currentCategory)}`,
    [currentCategory],
  );

  // Update blogs data in the store
  useEffect(() => {
    if (allBlogsData?.result) {
      dispatch(setAllBlogs(allBlogsData.result));
      dispatch(setFeaturedBlogs(allBlogsData.result.filter((blog) => blog.featured)));
    }
  }, [allBlogsData, dispatch]);

  // Render loading or error state
  if (allBlogsLoading) return <Loading />;
  if (allBlogsError) return <NotFoundPage />;

  return (
    <AnimatePresence mode="sync">
      {currentCategory && (
        <motion.main
          key={`inspiration-page-category-${currentCategory}`}
          initial="hiddenY"
          animate="visible"
          exit="hiddenY"
          variants={variants}
          transition={{ duration: 1 }}
          className="inspiration relative flex min-h-screen flex-col items-center gap-8 pb-sect-default"
          data-filter={currentCategory}
        >
          {/* Hero Section */}
          <InspirationHero currentCategory={currentCategory} />

          {/* Heading */}
          <InspirationHeading currentCategory={currentCategory} />

          {/* Category Filters */}
          <InspirationButtons />

          {/* Featured Blogs Section */}
          {featuredBlogs.length > 0 ? (
            <motion.div
              initial="hiddenY"
              animate="visible"
              variants={variants}
              transition={{ duration: 0.5, delay: 2.5 }}
              className="z-10 w-full lg:mt-sect-short 2xl:mt-[15rem]"
            >
              <FeaturedBlogs blogs={featuredBlogs} />
            </motion.div>
          ) : (
            <div className="h-[75svh]" />
          )}

          {/* Catalog Section */}
          <InspirationCatalog currentCategory={currentCategory} />
        </motion.main>
      )}
    </AnimatePresence>
  );
};

export default Inspiration;
