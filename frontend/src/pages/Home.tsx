import React, { useEffect, useRef, useState } from "react";

import "src/styles/home.css";
import airplane1 from "src/assets/svg/airplane-1.svg";
import airplane2 from "src/assets/svg/airplane-2.svg";
import airplane3 from "src/assets/svg/airplane-3.svg";
import briefVideo from "src/assets/videos/brief.mp4";
import featured1 from "src/assets/images/ui/home/featured-1.jpg";
import featured2 from "src/assets/images/ui/home/featured-2.jpg";
import featured3 from "src/assets/images/ui/home/featured-3.jpg";
import featured4 from "src/assets/images/ui/home/featured-4.jpg";
import featured5 from "src/assets/images/ui/home/featured-5.jpg";
import featured6 from "src/assets/images/ui/home/featured-6.jpg";
import featured7 from "src/assets/images/ui/home/featured-7.jpg";
import featured8 from "src/assets/images/ui/home/featured-8.jpg";
import featured9 from "src/assets/images/ui/home/featured-9.jpg";
import featured10 from "src/assets/images/ui/home/featured-10.jpg";
import planeIcon from "src/assets/svg/plane-icon.svg";

import { useHorizontalScroll } from "src/utils/useHorizontalScroll";
import EarthScene from "src/pages/HomeComponents/EarthScene";
import StarterBlogs from "./HomeComponents/StarterBlog";
import Blog from "src/types/Blog";
import useFetch from "src/hooks/useFetch";
import { FetchBlogsType } from "src/types/FetchData";
import { BASE_URL } from "src/utils/config";
import { createBlogChunks } from "src/utils/createBlogChunks";
import { useNavigate } from "react-router-dom";
import { DotPagination } from "src/components/ui/Pagination";
import HorizontalScrollCarousel from "./HomeComponents/FeaturedHorizontalScroller";

const featuredDemo = [
  {
    _id: "1",
    places: {},
    insight: {},
    continent: "",
    description: "",
    transportation: {},
    additionalInfo: {},
    summary: "",
    location: "",
    video: "",
    featured: true,
    images: [featured1],
    name: "A destination with culture",
    country: "Country",
    tags: ["Nature&Adventure", "Africa", "SoloTravel"],
  },
  {
    _id: "2",
    places: {},
    insight: {},
    continent: "",
    description: "",
    transportation: {},
    additionalInfo: {},
    summary: "",
    location: "",
    video: "",
    featured: true,
    images: [featured2],
    name: "A destination with nature",
    country: "Country",
    tags: ["Nature&Adventure", "North America", "SoloTravel"],
  },
  {
    _id: "3",
    places: {},
    insight: {},
    continent: "",
    description: "",
    transportation: {},
    additionalInfo: {},
    summary: "",
    location: "",
    video: "",
    featured: true,
    images: [featured3],
    name: "A destination with nature",
    country: "Country",
    tags: ["Nature&Adventure", "Europe", "SoloTravel"],
  },
  {
    _id: "4",
    places: {},
    insight: {},
    continent: "",
    description: "",
    transportation: {},
    additionalInfo: {},
    summary: "",
    location: "",
    video: "",
    featured: true,
    images: [featured4],
    name: "A destination with nature",
    country: "Country",
    tags: ["Nature&Adventure", "Asia", "SoloTravel"],
  },
  {
    _id: "5",
    places: {},
    insight: {},
    continent: "",
    description: "",
    transportation: {},
    additionalInfo: {},
    summary: "",
    location: "",
    video: "",
    featured: true,
    images: [featured5],
    name: "A destination with nature",
    country: "Country",
    tags: ["Nature&Adventure", "Europe", "SoloTravel"],
  },
  {
    _id: "6",
    places: {},
    insight: {},
    continent: "",
    description: "",
    transportation: {},
    additionalInfo: {},
    summary: "",
    location: "",
    video: "",
    featured: true,
    images: [featured6],
    name: "A destination with nature",
    country: "Country",
    tags: ["Nature&Adventure", "Europe", "SoloTravel"],
  },
  {
    _id: "7",
    places: {},
    insight: {},
    continent: "",
    description: "",
    transportation: {},
    additionalInfo: {},
    summary: "",
    location: "",
    video: "",
    featured: true,
    images: [featured7],
    name: "A destination with nature",
    country: "Country",
    tags: ["Nature&Adventure", "Europe", "SoloTravel"],
  },
  {
    _id: "8",
    places: {},
    insight: {},
    continent: "",
    description: "",
    transportation: {},
    additionalInfo: {},
    summary: "",
    location: "",
    video: "",
    featured: true,
    images: [featured8],
    name: "A destination with nature",
    country: "Country",
    tags: ["Nature&Adventure", "Europe", "SoloTravel"],
  },
  {
    _id: "9",
    places: {},
    insight: {},
    continent: "",
    description: "",
    transportation: {},
    additionalInfo: {},
    summary: "",
    location: "",
    video: "",
    featured: true,
    images: [featured9],
    name: "A destination with nature",
    country: "Country",
    tags: ["Nature&Adventure", "Europe", "SoloTravel"],
  },
  {
    _id: "10",
    places: {},
    insight: {},
    continent: "",
    description: "",
    transportation: {},
    additionalInfo: {},
    summary: "",
    location: "",
    video: "",
    featured: true,
    images: [featured10],
    name: "A destination with nature",
    country: "Country",
    tags: ["Nature&Adventure", "Europe", "SoloTravel"],
  },
];

const Home: React.FC = () => {
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

  // Handle featured section horizontal scroll
  return (
    <main className="home flex flex-col">
      {/* HERO SECTION */}

      <section className="hero px-sect relative flex h-screen flex-col justify-center lg:gap-6 xl:gap-8 2xl:gap-8 3xl:gap-8">
        <div className="blob-1 blur-blob h-1/3 w-1/3"></div>
        <div className="blob-2 blur-blob h-3/5 w-3/5"></div>

        <h1 className="z-15 h1-md relative">
          <div className="airplane-1 absolute z-10 transform lg:-bottom-full lg:-right-[10%] lg:scale-[60] xl:-bottom-full xl:right-0 xl:scale-90 2xl:-bottom-full 2xl:-right-[5%] 2xl:scale-90 3xl:-bottom-full 3xl:right-[5%] 3xl:scale-125">
            <img src={airplane1} alt="Airplane" />
            <div className="blob-3 blur-blob z-0 h-1/3"></div>
          </div>
          <img src={airplane2} className="airplane-2 absolute z-10 transform lg:-top-1/2 lg:right-[5%] lg:scale-[40] xl:-top-1/3 xl:right-[5%] xl:scale-[70] 2xl:-top-1/3 2xl:right-0 2xl:scale-75 3xl:-top-1/3 3xl:right-[5%] 3xl:scale-100" alt="Airplane"/>
          <img src={airplane3} className="airplane-3 absolute z-10 transform lg:-top-2/3 lg:right-[40%] lg:scale-[40] xl:-top-1/2 xl:right-1/3 xl:scale-[60] 2xl:-top-1/2 2xl:right-[40%] 2xl:scale-75 3xl:-top-1/2 3xl:right-1/2 3xl:scale-100" alt="Airplane"  />
          <i className="ri-shining-2-fill absolute -top-[5%] rotate-[30deg] transform text-yellow lg:text-5.5xl xl:text-6xl 2xl:text-6.5xl 3xl:text-7.5xl"></i>{" "}
          <span className="opacity-0">---</span> From your new <br></br>
          favorite{" "}
          <span className="uppercase text-main-green">travel guide</span>{" "}
          <br></br>
          to{" "}
          <span className="border-b-4 border-solid border-text-light dark:border-text-dark">
            unforgettable
          </span>{" "}
          <span className="uppercase text-main-brown">experience</span>.
        </h1>

        <p className="p-medium lg:w-2/5 xl:w-2/5 2xl:w-1/3 3xl:w-1/3">
          From the smallest idea to the most memorable journeys. Join us to
          awaken your traveling spirit and discover the adventurer within you.
        </p>

        <div className="flex flex-row lg:gap-4 xl:gap-4 2xl:gap-6 3xl:gap-8">
          <button
            className="btn btn-primary"
            onClick={() => navigate("/discover")}
          >
            Get started
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => navigate("/about")}
          >
            Learn more
          </button>
        </div>
      </section>

      {/* BRIEF SECTION */}

      <section className="brief px-sect flex flex-col lg:gap-36 lg:py-sect-medium xl:gap-48 xl:py-sect-semi 2xl:gap-64 2xl:py-sect-long 3xl:gap-80 3xl:py-sect-long">
        <div className="flex min-h-40 flex-row items-center lg:gap-28 xl:gap-28 2xl:gap-44 3xl:gap-60">
          <img src={airplane1} alt="" className="rotate-[30deg] lg:w-20 xl:w-24 2xl:w-28 3xl:w-32 transform" />
          <h1 className="h2-inter">
            A <span className="text-main-green">Comprehensive Catalog</span> of{" "}
            <br />
            Destinations with Tailored Travel Insights.
          </h1>
        </div>
        <div className="relative flex lg:h-[225svh] lg:flex-row lg:gap-20 xl:h-[175svh] xl:gap-28 2xl:h-[200svh] 2xl:gap-32 3xl:h-[200svh] 3xl:gap-40">
          <div className="sticky top-0 z-0 h-svh rounded-lg py-4">
            <video src={briefVideo} autoPlay muted loop className="h-full rounded-lg"></video>
          </div>
          <div className="relative flex flex-col items-center justify-center lg:w-2/5 lg:gap-16 xl:gap-20 2xl:gap-20 3xl:gap-24 3xl:pt-40">
            <div className="blob-1 blur-blob absolute h-1/3 w-1/3"></div>
            <div className="blob-2 blur-blob absolute h-1/3 w-1/3"></div>
            <p className="p-medium active opacity-20 lg:w-4/5 3xl:w-2/3">
              Pause the hustle of everyday life and breathe in a moment of
              tranquility. Embark on a journey guided by your emotions with our
              unique, mood-based travel analysis. Our website invites you to
              partake in adventures that harmonize with your spirit, awaiting
              your personal touch.
            </p>

            <p className="p-medium opacity-20 lg:w-4/5 3xl:w-2/3">
              Then explore our virtual gallery for a curated selection of global
              destinations, complete with beautiful visuals and key information
              to simplify your travel planning. It’s the ideal resource for
              inspiration or booking your next journey, offering a gateway to
              the world’s most rewarding experiences.
            </p>

            <p className="p-medium opacity-20 lg:w-4/5 3xl:w-2/3">
              If you find yourself captivated by the myriad ways in which people
              explore the world, then our blog is a must-visit for you. It’s
              packed with engaging travel tales and tips that ignite your desire
              to explore and help navigate your upcoming escapades.
            </p>
          </div>
        </div>
      </section>

      {/* FEATURED DESTINATION SECTION */}

      <section className="featured flex flex-col lg:gap-28 xl:gap-32 2xl:gap-36 3xl:gap-40">
        <div className="px-sect grid w-full place-items-center">
          <h1 className="h1-md relative">
            <i className="ri-shining-2-fill absolute -left-[5%] -top-1/3 rotate-30 transform text-yellow lg:text-3xl xl:text-4xl 2xl:text-4xl 3xl:text-5xl"></i>{" "}
            Featured Destinations
          </h1>
        </div>
        <HorizontalScrollCarousel data={featuredDemo} />
        <div className="px-sect flex w-full flex-row justify-between">
          <p className="p-large">
            They are just so few among the{" "}
            <span className="font-semibold text-main-brown lg:text-xl xl:text-2xl 2xl:text-3xl 3xl:text-4xl">
              100
            </span>
            + <br />
            destinations that we have covered in our Catalogue.
          </p>
          <div className="relative flex items-end">
            <div className="blob blur-blob absolute z-0 h-full w-1/3"></div>
            <button
              title="navigate"
              className="btn btn-secondary z-5"
              onClick={() => {
                navigate("/discover");
              }}
            >
              discover them <img src={planeIcon} alt="" />
            </button>
          </div>
        </div>
      </section>

      {/* STACKED SECTIONS CONTAINER, CONTAINING: INSPIRED, GLOBE, BLOGS, STARTER BLOGS */}
      <section className="stacked relative lg:pt-sect-default 2xl:pt-sect-semi">
        {/* INSPIRED SECTION */}

        <div className="sticky top-0 z-0">
          <section className="px-sect inspired flex items-center justify-center lg:pb-sect-semi lg:pt-sect-default 2xl:pb-sect-semi 2xl:pt-sect-medium">
            <div className="relative flex w-fit flex-col lg:gap-2 xl:gap-2 2xl:gap-4 3xl:gap-4">
              <div className="blob blur-blob absolute z-0 h-full w-1/2"></div>
              <h1 className="h2-inter text-center leading-normal tracking-tight">
                We got inspired by travelers of <br />
                <span className="text-main-green">20</span>+ countries around
                the world
              </h1>
              <span className="p-medium self-end">(Maybe you are one)</span>
            </div>
          </section>
        </div>

        {/* GLOBE SECTION */}

        <div className="z-5 sticky -top-[5%] left-0">
          <section className="globe relative grid items-center rounded-5xl lg:pb-sect-long lg:pt-sect-short 2xl:pb-sect-long 2xl:pt-sect-short">
            <span className="px-sect p-large absolute -top-10 right-0 font-semibold uppercase">
              And we've covered these countries in our catalog too!
            </span>
            <EarthScene />
          </section>
        </div>

        {/* FEATURED BLOGS SECTION */}

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
                <div className="grid h-[75svh] w-full grid-flow-row auto-rows-1/3 gap-4">
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
                        className="w-4[5%] h-full rounded-lg"
                      />
                      <div className="flex w-1/2 flex-col gap-4">
                        <div className="flex flex-col gap-0">
                          <span className="span-regular text-gray">
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

        {/* STARTER HOOK SECTION */}

        <div className="sticky left-0 top-0 z-20 bg-background-light">
          <section className="hook px-sect pb-sect-semi pt-sect-default">
            <p className="h2-inter">
              If you are still hesitant, <br />
              perhaps some of the articles below can help.
            </p>
          </section>
        </div>

        {/* STARTER SECTION */}

        <div className="sticky left-0 top-0 z-30">
          <section className="starter relative rounded-5xl bg-main-brown lg:py-sect-medium 2xl:py-sect-semi">
            <img
              src={airplane1}
              alt=""
              className="absolute -top-[5%] left-[5%] z-0 lg:w-44 xl:w-44 2xl:w-44 3xl:w-48"
            />
            <div className="h-full w-full overflow-hidden">
              <StarterBlogs blogs={blogs} />
            </div>
            <button
              className="btn btn-secondary absolute -bottom-4 right-0 lg:mr-12 xl:mr-16 2xl:mr-20 3xl:mr-24"
              onClick={() => navigate("/inspiration")}
            >
              Find more <img src={planeIcon} alt="" />
            </button>
          </section>
        </div>
      </section>

      {/* QUOTE SECTION */}

      <section className="quote px-sect flex flex-col gap-4 lg:py-sect-default 2xl:py-sect-medium">
        <div className="flex h-fit flex-row items-end justify-between">
          <h1 className="big-heading">
            " To <i className="ri-footprint-fill"></i>{" "}
            <span className="uppercase text-main-green">travel</span> <br />
            is to <span className="uppercase text-main-brown">live</span>{" "}
            <i className="ri-sun-line"></i> "
          </h1>
          <span className="p-medium uppercase">- Hans Christian Andersen</span>
        </div>
        <div className="flex flex-row justify-end">
          <button
            className="btn btn-primary"
            onClick={() => navigate("/contact")}
          >
            Have any questions?
          </button>
        </div>
      </section>
    </main>
  );
};

export default Home;
