import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DotPagination } from "src/components/ui/Pagination";
import useFetch from "src/hooks/useFetch";
import Blog from "src/types/Blog";
import { FetchBlogsType } from "src/types/FetchData";
import { BASE_URL } from "src/utils/config";
import { createBlogChunks } from "src/utils/createBlogChunks";

const Articles: React.FC = () => {
  const navigate = useNavigate();
  // Handle blog data
  const {
    data: blogsData,
    loading: blogsLoading,
    error: blogsError,
  } = useFetch<FetchBlogsType>(`${BASE_URL}/blogs?limit=100`);

  const blogs = blogsData?.result !== undefined ? blogsData.result : [];
  let blogChunks: Blog[][] = [];

  if (blogs.length !== 0) blogChunks = createBlogChunks(blogs);

  // Handle chunks display
  const [chunkIndex, setChunkIndex] = useState(0);
  const handleNextChunk = () => {
    if (chunkIndex < blogChunks.length - 1) {
      setChunkIndex(chunkIndex + 1);
    }
  };
  const handlePrevChunk = () => {
    if (chunkIndex > 0) {
      setChunkIndex(chunkIndex - 1);
    }
  };
  return (
    <div className="relative mt-sect-long">
      <span className="px-sect p-large absolute -top-10 left-0 font-semibold uppercase text-text-dark">
        Discover the latest articles in
      </span>
      {blogChunks !== undefined && blogChunks.length !== 0 && (
        <section className="blogs px-sect relative flex flex-col items-center justify-start gap-sect-short lg:pb-sect-default lg:pt-sect-short 2xl:pb-sect-medium 2xl:pt-sect-default">
          <h1 className="h1-md">
            {new Date().toLocaleString("default", {
              month: "long",
              year: "numeric",
            })}
          </h1>
          <div className="flex h-fit w-full flex-row gap-8">
            <div
              className="flex h-full w-full cursor-pointer flex-col gap-4"
              onClick={() => {
                navigate(`/inspiration/${blogChunks[chunkIndex][0]._id}`);
              }}
            >
              <img
                src={blogChunks[chunkIndex][0].image}
                alt="featuredBlogImage"
                className="h-[50svh] w-full rounded-lg"
              />
              <div className="flex flex-col">
                <span className="span-regular text-gray">
                  {blogChunks[chunkIndex][0].category}
                </span>
                <span className="span-medium uppercase">
                  {" "}
                  {blogChunks[chunkIndex][0].title}
                </span>
              </div>

              <p className="p-regular overflow-hidden 2xl:w-4/5 3xl:w-3/4">
                {blogChunks[chunkIndex][0].content[0].sectionText[0]}
              </p>
              <span className="span-regular w-3/4 overflow-hidden">
                <i className="ri-time-line"></i>{" "}
                {blogChunks[chunkIndex][0].time}
              </span>
            </div>
            <div className="grid h-[75svh] w-full grid-flow-row auto-rows-[33.33%] gap-4">
              {blogChunks[chunkIndex].slice(1).map((blog, index) => (
                <div
                  className="flex h-full cursor-pointer flex-row gap-4"
                  key={index}
                  onClick={() => {
                    navigate(`/inspiration/${blog._id}`);
                  }}
                >
                  <img
                    src={blog.image}
                    alt="normalBlogImage"
                    className="h-full w-[45%] rounded-lg"
                  />
                  <div className="flex w-1/2 flex-col gap-4">
                    <div className="flex flex-col gap-0">
                      <span className="span-regular text-gray">
                        {blog.category}
                      </span>
                      <span className="span-medium w-full"> {blog.title}</span>
                    </div>

                    <span className="span-regular w-3/4 overflow-hidden">
                      <i className="ri-time-line"></i> {blog.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex w-full justify-center">
            <DotPagination
              count={blogChunks.length}
              index={chunkIndex}
              handleNextClick={handleNextChunk}
              handlePreviousClick={handlePrevChunk}
            />
          </div>
        </section>
      )}
    </div>
  );
};

export default Articles;
