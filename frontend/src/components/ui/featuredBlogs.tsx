import React, { useEffect, useState } from "react";
import Blog from "src/types/Blog";
import { DotPagination } from "./Pagination";
import { useNavigate } from "react-router-dom";

type featuredBlogsProps = {
  blogs: Blog[];
};

const FeaturedBlogs: React.FC<featuredBlogsProps> = ({ blogs }) => {  
  const [currentBlogIndex, setCurrentBlogIndex] = useState<number>(0);
  const [currentBlog, setCurrentBlog] = useState<Blog>(blogs[currentBlogIndex]);

  const navigate = useNavigate()

  useEffect(() => {
    setCurrentBlog(blogs[currentBlogIndex]);
  }, [currentBlogIndex]);

  const handleNextBlog = () => {
    if (currentBlogIndex < blogs.length - 1) {
      setCurrentBlogIndex(currentBlogIndex + 1);
    }
  };

  const handlePrevBlog = () => {
    if (currentBlogIndex > 0) {
      setCurrentBlogIndex(currentBlogIndex - 1);
    }
  };


  return (
    <div className="flex flex-col items-center gap-8 pb-sect-default">
      <div className="px-sect flex w-svw flex-col items-center gap-8 cursor-pointer" onClick={() => navigate(`/inspiration/${currentBlog._id}`)}>
        <div
          className="h-[75svh] w-full rounded-xl shadow-section"
          style={{
            backgroundImage: `url(${currentBlog?.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        ></div>
        <div className="flex flex-col items-center gap-2">
          <span className="span-regular text-gray">{currentBlog?.category}</span>
          <h2 className="h2-md"> {currentBlog?.title}</h2>
        </div>
        <p className="p-regular w-2/5 text-center">
          {" "}
          {currentBlog?.content?.[0]?.sectionText?.[0]}
        </p>
        <span className="span-regular flex items-center gap-3">
          <i className="ri-time-line p-medium"></i> {currentBlog?.time}
        </span>
      </div>

      <DotPagination count={blogs.length} index={currentBlogIndex} handlePreviousClick={handlePrevBlog} handleNextClick={handleNextBlog} />
    </div>
  );
};

export default FeaturedBlogs;
