import React, { useState } from "react";
import useFetch from "src/hooks/useFetch";
import { BASE_URL } from "src/utils/config";
import "src/styles/inspiration.css";
import { FetchBlogsType } from "src/types/FetchData";
import FeaturedBlogs from "src/components/common/featuredBlogs";
import { CatalogPagination } from "src/components/common/Pagination";

// Images
import wildernessImage from "src/assets/images/ui/inspiration/wilder-alt.jpg";
import cultureHeritageImage from "src/assets/images/ui/inspiration/culture.jpg";
import foodDrinkImage from "src/assets/images/ui/inspiration/food.jpg";
import soloJourneyImage from "src/assets/images/ui/inspiration/solo.jpg";
import cityScapeImage from "src/assets/images/ui/inspiration/city.jpg";
import seasonFestivalImage from "src/assets/images/ui/inspiration/season.jpg";
import relaxationImage from "src/assets/images/ui/inspiration/relax.jpg";
import firstTimeAbroadImage from "src/assets/images/ui/inspiration/first.jpg";
import NotFoundPage from "./404";
import { Link } from "react-router-dom";
import Loading from "src/components/common/Loading";

const limit = 10;

const Inspiration: React.FC = () => {
  // State hooks for pagination, category selection, category image and continent filters
  const [currentPage, setCurrentPage] = useState(1);
  const [currentCategory, setCategory] = useState("All");
  const [currentCategoryImage, setCategoryImage] = useState("");
  const [continentFilter, setContinentFilter] = useState<string[]>([]);

  // Static data for categories and continents
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

  // Constructing the URL for fetching blogs based on current filters
  let url = `${BASE_URL}/blogs?limit=${limit}&page=${currentPage}`;
  if (currentCategory && currentCategory !== "All") {
    // URL-encode the category to handle special characters like &
    url += `&category=${encodeURIComponent(currentCategory)}`;
  }
  if (continentFilter.length > 0) {
    // URL-encode each tag and join them with commas
    url += `&tags=${continentFilter.map(encodeURIComponent).join(",")}`;
  }

  // Fetching blogs data with the constructed URL
  const {
    data: blogsData,
    loading: blogsLoading,
    error: blogsError,
  } = useFetch<FetchBlogsType>(url, [currentCategory]);

  // Fetching all blogs for the selected category to find featured blogs
  const {
    data: allBlogsData,
    loading: allBlogsLoading,
    error: allBlogsError,
  } = useFetch<FetchBlogsType>(
    `${BASE_URL}/blogs?limit=1000&category=${currentCategory === "All" ? "" : encodeURIComponent(currentCategory)}`,
    [currentCategory],
  );

  // Extracting blogs and featured blogs from fetched data
  const blogs = blogsData?.result;
  const allBlogs = allBlogsData?.result;
  const featuredBlogs = allBlogs?.filter((blog) => blog.featured);
  const totalBlogs = blogsData?.count !== undefined ? blogsData.count : 0;

  // Pagination scroll handler
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

  // Component render logic (simplified for brevity)
  if (blogsLoading) {
    return <Loading />;
  }
  if (blogsError || allBlogsError) {
    return <NotFoundPage />;
  }
  return (
    <main
      className="inspiration relative flex min-h-screen flex-col items-center gap-8 pb-sect-default"
      data-filter={currentCategory}
    >
      {/* Hero Section */}
      <div
        className="hero-background absolute top-0 z-0 h-screen w-full"
        style={
          currentCategory !== "All"
            ? {
                backgroundImage: `url(${currentCategoryImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }
            : undefined
        }
      >
        {currentCategory !== "All" && (
          <div
            className="h-full w-full"
            style={{
              background:
                "linear-gradient(180deg,rgb(10.02, 10.23, 10.38, 0.2) 50%, #FBF9F7 100%)",
            }}
          ></div>
        )}
      </div>
      <h1 className="big-heading z-10 mt-sect-short text-text-dark">
        {currentCategory === "All"
          ? "Trending articles"
          : currentCategory === "Wilderness"
            ? "Wilderness"
            : currentCategory === "Culture&Heritage"
              ? "Culture & Heritage"
              : currentCategory === "Food&Drink"
                ? "Food & Drink"
                : currentCategory === "SoloJourneys"
                  ? "Solo Journeys"
                  : currentCategory === "CityScape"
                    ? "City Scape"
                    : currentCategory === "Season&Festival"
                      ? "Season & Festival"
                      : currentCategory === "Relaxation"
                        ? "Relaxation"
                        : currentCategory === "FirstTimeAbroad"
                          ? "First Time Abroad"
                          : "Trending articles"}
      </h1>
      <div className="z-10 flex w-2/3 flex-row flex-wrap justify-center gap-x-4 gap-y-4 filter">
        {categories
          .filter((f) => f !== currentCategory)
          .map((f) => (
            <button
              key={f}
              onClick={() => {
                setCategory(f);
                setCategoryImage(
                  f === "Wilderness"
                    ? wildernessImage
                    : f === "Culture&Heritage"
                      ? cultureHeritageImage
                      : f === "Food&Drink"
                        ? foodDrinkImage
                        : f === "SoloJourneys"
                          ? soloJourneyImage
                          : f === "CityScape"
                            ? cityScapeImage
                            : f === "Season&Festival"
                              ? seasonFestivalImage
                              : f === "Relaxation"
                                ? relaxationImage
                                : f === "FirstTimeAbroad"
                                  ? firstTimeAbroadImage
                                  : "",
                );
              }}
              className={`filter-btn span-medium rounded-xl px-10 py-4 font-prima text-text-dark shadow-component ${f === "Wilderness" ? "bg-wild-color" : f === "Culture&Heritage" ? "bg-culture-color" : f === "Food&Drink" ? "bg-food-color" : f === "SoloJourneys" ? "bg-solo-color" : f === "CityScape" ? "bg-city-color" : f === "Season&Festival" ? "bg-season-color" : f === "Relaxation" ? "bg-relax-color" : f === "FirstTimeAbroad" ? "bg-first-color" : "bg-background-dark"}`}
            >
              {f}
            </button>
          ))}
      </div>

      {/* Featured Blogs Section */}
      {featuredBlogs !== undefined && featuredBlogs.length > 0 ? (
        <div className="z-10 lg:mt-sect-short 2xl:mt-sect-default">
          <FeaturedBlogs blogs={featuredBlogs} />
        </div>
      ) : (
        <div className="h-[75svh]"></div>
      )}

      {/* Catalog Section */}
      <section className="catalog px-sect mt-sect-short flex w-full flex-col items-center gap-20">
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
        {blogs && blogs.length > 0 ? (
          <div className="grid grid-cols-2 justify-between gap-x-8 gap-y-20">
            {blogs.map((blog) => (
              <Link
                to={`/inspiration/${blog._id}`}
                target="_top"
                className="flex cursor-pointer flex-col gap-4"
                key={blog._id}
              >
                <div
                  className="h-[50svh] w-full rounded-xl shadow-section"
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
              </Link>
            ))}
          </div>
        ) : (
          <div className="grid w-full place-items-center py-sect-short">
            <p className="p-medium text-center">
              There are no related articles at the moment.
            </p>
          </div>
        )}

        {blogs && blogs.length > 0 && (
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
        )}
      </section>
    </main>
  );
};

export default Inspiration;
