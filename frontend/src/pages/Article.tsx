import React from "react";
import { useParams } from "react-router-dom";
import RelatedSections from "src/components/ui/RelatedSections";
import useFetch from "src/hooks/useFetch";
import Blog from "src/types/Blog";
import { BASE_URL } from "src/utils/config";

const Article: React.FC = () => {
  const { id } = useParams();

  // Handle blog data
  const {
    data: blogData,
    loading: blogLoading,
    error: blogError,
  } = useFetch<Blog>(`${BASE_URL}/blogs/${id}`);

  if (blogLoading) return <div>Loading...</div>;
  if (blogError) return <div>Error...</div>;
  if (!blogData) return <div>No data...</div>;

  return (
    <main className="pb-sect-default">
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

        <div className="flex w-2/3 justify-end pt-2 border-t">
          <span className="span-large w-fit">By {" " + blogData.author}</span>
        </div>
      </div>

      <div className="px-sect flex flex-col items-center mt-sect-default">
        <h2 className="h2-md">Related articles</h2>
        <RelatedSections type={"blog"} data={blogData} />
      </div>
    </main>
  );
};

export default Article;
