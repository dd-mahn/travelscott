import React from "react";
import { useParams } from "react-router-dom";
import RelatedSections from "src/components/ui/RelatedSections";
import useFetch from "src/hooks/useFetch";
import Blog from "src/types/Blog";
import { BASE_URL } from "src/utils/config";
import NotFoundPage from "./404";

const Article: React.FC = () => {
  const { id } = useParams();

  // Handle blog data
  const {
    data: blogData,
    loading: blogLoading,
    error: blogError,
  } = useFetch<Blog>(`${BASE_URL}/blogs/${id}`);

  if (blogLoading)
    return (
      <div className="grid h-screen w-full place-items-center">
        <h3 className="h3-md">Loading...</h3>
      </div>
    );
  if (blogError)
    return (
      <div className="grid h-screen w-full place-items-center">
        <h3 className="h3-md">Error... Please reload the page or try again later.</h3>
      </div>
    );
  if (!blogData) return <NotFoundPage />;

  return (
    <main className="">
      <div
        className="h-0.75svh"
        style={{
          backgroundImage: `url(${blogData.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>

      <div className="mt-20 flex h-0.35svh flex-col items-center gap-4">
        <span className="span-medium text-gray">{blogData.category}</span>
        <h2 className="h2-md">{blogData.title}</h2>
        <span className="span-regular">{blogData.author}</span>
        <span className="span-regular">
          <i className="ri-time-line"></i>
          {" " + blogData.time}
        </span>
      </div>

      <div className="flex flex-col items-center gap-20">
        {blogData.content.map((content, index) => (
          <div key={index} className="flex w-2/3 flex-col items-center gap-20">
            <div className="flex w-2/3 flex-col gap-4">
              <p className="p-large font-prima">{content.sectionTitle}</p>
              {content.sectionText.map((sectionText, index) => (
                <p className="p-regular" key={index}>
                  {sectionText}
                </p>
              ))}
            </div>

            <div className="flex flex-col items-center gap-4">
              <img
                className="w-full rounded-xl"
                src={content.sectionImages?.[0].url}
                alt={content.sectionTitle}
              />
              <span className="span-small text-gray">
                {content.sectionImages?.[0].description}
              </span>
            </div>
          </div>
        ))}

        <div className="flex w-2/3 justify-end border-t pt-2">
          <span className="span-large w-fit">By {" " + blogData.author}</span>
        </div>
      </div>

      <div className="lg:py-40 2xl:py-sect-default">
        <h2 className="h2-md px-sect 2xl:pb-12 lg:pb-8 w-full text-center">Related articles</h2>
        <RelatedSections type={"blog"} data={blogData} />
      </div>
    </main>
  );
};

export default Article;
