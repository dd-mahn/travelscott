import React, { useEffect, useState } from "react";
import useFetch from "src/hooks/useFetch";
import { BASE_URL } from "src/utils/config";
import "src/styles/inspiration.css";
import { FetchBlogsType } from "src/types/FetchData";
import FeaturedBlogs from "src/components/ui/featuredBlogs";
import { CatalogPagination } from "src/components/ui/Pagination";
import { useNavigate } from "react-router-dom";

const Inspiration: React.FC = () => {
  const limit = 10;

  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [currentCategory, setCategory] = useState("All");
  const [continentFilter, setContinentFilter] = useState<string[]>([]);

  const categories = [
    "All",
    "Wilderness",
    "Culture&Heritage",
    "Food&Drink",
    "SoloJourneys",
    "CityScape",
    "Season&Festival",
    "Relaxation",
    "FirstTimeAbroad",
  ];

  const continents = [
    "Africa",
    "Asia",
    "Europe",
    "North America",
    "South America",
    "Oceania",
  ];

  const {
    data: blogsData,
    loading: blogsLoading,
    error: blogsError,
  } = useFetch<FetchBlogsType>(
    `${BASE_URL}/blogs?limit=${limit}&page=${currentPage}`,
  );

  const {
    data: allBlogsData,
    loading: allBlogsLoading,
    error: allBlogsError,
  } = useFetch<FetchBlogsType>(`${BASE_URL}/blogs?limit=1000`);

  if (!blogsData) {
    return <div>Loading...</div>;
  }

  const blogs = blogsData?.result.filter((blog) =>
    currentCategory !== "All" ? categories.includes(blog.category) : blog,
  );

  const allBlogs = allBlogsData?.result.filter((blog) =>
    currentCategory !== "All" ? categories.includes(blog.category) : blog,
  );

  const totalBlogs = blogsData?.count !== undefined ? blogsData.count : 0;
  const featuredBlogs = allBlogs?.filter((blog) => blog.featured);

  //   Handle pagination scroll

  const scrollToCatalog = () => {
    const catalogSection = document.querySelector(".catalog");

    if (catalogSection) {
      const rect = catalogSection.getBoundingClientRect();
      window.scrollTo({
        top: rect.top - 300 + window.scrollY,
        behavior: "smooth",
      });
    }
  };

  if (blogs !== undefined && blogs.length > 0) {
    return (
      <main
        className="inspiration relative flex min-h-screen flex-col items-center gap-8 pb-sect-default"
        data-filter={currentCategory}
      >
        <div className="hero-background absolute top-0 z-0 h-screen w-full"></div>
        <h1 className="big-heading z-10 mt-sect-short text-text-dark">
          Trending articles
        </h1>
        <div className="z-10 flex w-2/3 flex-row flex-wrap justify-center gap-x-4 gap-y-4 filter">
          {categories
            .filter((f) => f !== currentCategory)
            .map((f) => (
              <button
                key={f}
                onClick={() => setCategory(f)}
                className={`filter-btn span-medium rounded-xl px-10 py-4 font-prima text-text-dark shadow-component ${f === "Wilderness" ? "bg-wild-color" : f === "Culture&Heritage" ? "bg-culture-color" : f === "Food&Drink" ? "bg-food-color" : f === "SoloJourneys" ? "bg-solo-color" : f === "CityScape" ? "bg-city-color" : f === "Season&Festival" ? "bg-season-color" : f === "Relaxation" ? "bg-relax-color" : f === "FirstTimeAbroad" ? "bg-first-color" : "bg-background-dark"}`}
              >
                {f}
              </button>
            ))}
        </div>

        {featuredBlogs !== undefined && featuredBlogs.length > 0 && (
          <div className="z-10 mt-sect-default">
            <FeaturedBlogs blogs={featuredBlogs} />
          </div>
        )}

        <section className="catalog px-sect mt-sect-short flex flex-col items-center gap-20">
          <div className="continent-filter flex flex-row flex-nowrap justify-center gap-2 rounded-2xl px-sect-short py-8 shadow-component">
            {continents.map((continent) => (
              <button
                key={continent}
                onClick={() => {
                  if (continentFilter.includes(continent)) {
                    setContinentFilter(
                      continentFilter.filter((c) => c !== continent),
                    );
                  } else {
                    setContinentFilter([...continentFilter, continent]);
                  }
                }}
                className={`continent-btn span-regular rounded-3xl border border-gray px-8 py-2 ${
                  continentFilter.includes(continent)
                    ? "bg-background-dark text-text-dark"
                    : "bg-transparent text-text-light"
                }`}
              >
                {continent}
              </button>
            ))}
            <button title="filterBtn" className="p-large ml-4">
              <i className="ri-filter-2-line"></i>
            </button>
          </div>
          <div className="grid grid-cols-2 justify-between gap-x-8 gap-y-20">
            {blogs.map((blog) => (
              <div
                className="flex cursor-pointer flex-col gap-4"
                onClick={() => navigate(`/inspiration/${blog._id}`)}
              >
                <div
                  className="h-0.5svh w-full rounded-xl shadow-section"
                  style={{
                    backgroundImage: `url(${blog.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }}
                ></div>
                <div className="mt-4 flex flex-col gap-2">
                  <span className="span-regular text-gray">
                    {blog.category}
                  </span>
                  <h3 className="h3-md"> {blog.title}</h3>
                </div>
                <p className="p-regular w-3/4">
                  {" "}
                  {blog.content?.[0]?.sectionText?.[0]}
                </p>
                <span className="span-regular flex items-center gap-3">
                  <i className="ri-time-line p-medium"></i> {blog.time}
                </span>
              </div>
            ))}
          </div>

          <CatalogPagination
            count={totalBlogs}
            page={currentPage}
            limit={limit}
            handlePreviousClick={() => {
              setCurrentPage(Math.max(1, currentPage - 1));
              setTimeout(() => {
                scrollToCatalog();
              }, 200);
            }}
            handlePageClick={(page) => {
              {
                console.log(page);
                setCurrentPage(page);
                setTimeout(() => {
                  scrollToCatalog();
                }, 200);
              }
            }}
            handleNextClick={() => {
              setCurrentPage(currentPage + 1);
              setTimeout(() => {
                scrollToCatalog();
              }, 200);
            }}
          />
        </section>
      </main>
    );
  }
};

export default Inspiration;
