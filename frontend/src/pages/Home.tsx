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

const featuredDemo = [
  {
    img: featured1,
    title: "A destination with culture",
    country: "Country",
    tags: ["Nature&Adventure", "Africa", "SoloTravel"],
  },
  {
    img: featured2,
    title: "A destination with nature",
    country: "Country",
    tags: ["Nature&Adventure", "North America", "SoloTravel"],
  },
  {
    img: featured3,
    title: "A destination with nature",
    country: "Country",
    tags: ["Nature&Adventure", "Europe", "SoloTravel"],
  },
  {
    img: featured4,
    title: "A destination with nature",
    country: "Country",
    tags: ["Nature&Adventure", "Asia", "SoloTravel"],
  },
  {
    img: featured5,
    title: "A destination with nature",
    country: "Country",
    tags: ["Nature&Adventure", "Europe", "SoloTravel"],
  },
  {
    img: featured6,
    title: "A destination with nature",
    country: "Country",
    tags: ["Nature&Adventure", "Europe", "SoloTravel"],
  },
  {
    img: featured7,
    title: "A destination with nature",
    country: "Country",
    tags: ["Nature&Adventure", "Europe", "SoloTravel"],
  },
  {
    img: featured8,
    title: "A destination with nature",
    country: "Country",
    tags: ["Nature&Adventure", "Europe", "SoloTravel"],
  },
  {
    img: featured9,
    title: "A destination with nature",
    country: "Country",
    tags: ["Nature&Adventure", "Europe", "SoloTravel"],
  },
  {
    img: featured10,
    title: "A destination with nature",
    country: "Country",
    tags: ["Nature&Adventure", "Europe", "SoloTravel"],
  },
];

const blogDemo = [
  {
    title: "The 10 Best Destinations for Solo Travelers",
    author: "Someone",
    category: "Starter",
    image:
      "https://explore.bustickets.com/wp-content/uploads/2019/09/solo-travel-backpack-tips.jpg",
    content: [
      {
        sectionTitle: "Introduction",
        sectionImages: [],
        sectionText: [
          "Traveling alone can be a rewarding experience. It allows you to explore new places at your own pace, meet new people, and learn more about yourself. If you're thinking about taking a solo trip, here are 10 destinations that are perfect for solo travelers.",
        ],
      },
    ],
    time: new Date().toLocaleDateString("default", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }),
    featured: false,
  },
  {
    title: "How to Plan a Budget-Friendly Trip to Europe",
    author: "Someone",
    category: "Starter",
    image:
      "https://i.pinimg.com/564x/08/59/ac/0859ac1c3569b78bbc0a20239078a557.jpg",
    content: [
      {
        sectionTitle: "Introduction",
        sectionImages: [],
        sectionText: [
          "Traveling to Europe can be expensive, but it doesn't have to break the bank. With a little planning and some budget-friendly tips, you can enjoy a fantastic trip to Europe without spending a fortune. Here are some tips to help you plan a budget-friendly trip to Europe.",
        ],
      },
    ],
    time: new Date().toLocaleDateString("default", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }),
    featured: false,
  },
  {
    title: "The Best Destinations for Food Lovers",
    author: "Someone",
    category: "Starter",
    image:
      "https://www.mistay.in/travel-blog/content/images/2020/05/cover-12.jpg",
    content: [
      {
        sectionTitle: "Introduction",
        sectionImages: [],
        sectionText: [
          "If you're a food lover, there's no better way to explore the world than through its cuisine. From street food stalls to Michelin-starred restaurants, there's something for every palate. Here are some of the best destinations for food lovers.",
        ],
      },
    ],
    time: new Date().toLocaleDateString("default", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }),
    featured: false,
  },
  {
    title: "The Ultimate Guide to Adventure Travel",
    author: "Someone",
    category: "Starter",
    image:
      "https://i.pinimg.com/564x/fa/41/d1/fa41d199e9be453fe1f0dc103e4c615f.jpg",
    content: [
      {
        sectionTitle: "Introduction",
        sectionImages: [],
        sectionText: [
          "If you're an adrenaline junkie, adventure travel is the perfect way to get your fix. From hiking and biking to surfing and skydiving, there are endless opportunities for adventure around the world. Here's everything you need to know about adventure travel.",
        ],
      },
    ],
    time: new Date().toLocaleDateString("default", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }),
    featured: false,
  },
  {
    title: "The 10 Best Destinations for Solo Travelers",
    author: "Someone",
    category: "SoloTravel",
    image:
      "https://explore.bustickets.com/wp-content/uploads/2019/09/solo-travel-backpack-tips.jpg",
    content: [
      {
        sectionTitle: "Introduction",
        sectionImages: [],
        sectionText: [
          "Traveling alone can be a rewarding experience. It allows you to explore new places at your own pace, meet new people, and learn more about yourself. If you're thinking about taking a solo trip, here are 10 destinations that are perfect for solo travelers.",
        ],
      },
    ],
    time: new Date().toLocaleDateString("default", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }),
    featured: true,
  },
  {
    title: "How to Plan a Budget-Friendly Trip to Europe",
    author: "Someone",
    category: "Nature&Adventure",
    image:
      "https://i.pinimg.com/564x/08/59/ac/0859ac1c3569b78bbc0a20239078a557.jpg",
    content: [
      {
        sectionTitle: "Introduction",
        sectionImages: [],
        sectionText: [
          "Traveling to Europe can be expensive, but it doesn't have to break the bank. With a little planning and some budget-friendly tips, you can enjoy a fantastic trip to Europe without spending a fortune. Here are some tips to help you plan a budget-friendly trip to Europe.",
        ],
      },
    ],
    time: new Date().toLocaleDateString("default", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }),
    featured: false,
  },
  {
    title: "The Best Destinations for Food Lovers",
    author: "Someone",
    category: "Trending",
    image:
      "https://www.mistay.in/travel-blog/content/images/2020/05/cover-12.jpg",
    content: [
      {
        sectionTitle: "Introduction",
        sectionImages: [],
        sectionText: [
          "If you're a food lover, there's no better way to explore the world than through its cuisine. From street food stalls to Michelin-starred restaurants, there's something for every palate. Here are some of the best destinations for food lovers.",
        ],
      },
    ],
    time: new Date().toLocaleDateString("default", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }),
    featured: false,
  },
  {
    title: "The Ultimate Guide to Adventure Travel",
    author: "Someone",
    category: "Culture&Heritage",
    image:
      "https://i.pinimg.com/564x/fa/41/d1/fa41d199e9be453fe1f0dc103e4c615f.jpg",
    content: [
      {
        sectionTitle: "Introduction",
        sectionImages: [],
        sectionText: [
          "If you're an adrenaline junkie, adventure travel is the perfect way to get your fix. From hiking and biking to surfing and skydiving, there are endless opportunities for adventure around the world. Here's everything you need to know about adventure travel.",
        ],
      },
    ],
    time: new Date().toLocaleDateString("default", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }),
    featured: false,
  },
];

const normalBlogs = blogDemo.filter(
  (blog) => blog.featured === false && blog.category !== "Starter",
);
const featuredBlogs = blogDemo.filter(
  (blog) => blog.featured === true && blog.category !== "Starter",
);

function createBlogChunks(featuredBlogs: Blog[], normalBlogs: Blog[]) {
  const chunks = [];
  let featuredIndex = 0;
  let normalIndex = 0;

  while (
    featuredIndex < featuredBlogs.length &&
    normalIndex + 2 < normalBlogs.length
  ) {
    const chunk = [
      featuredBlogs[featuredIndex],
      ...normalBlogs.slice(normalIndex, normalIndex + 3),
    ];
    chunks.push(chunk);

    featuredIndex += 1;
    normalIndex += 3;
  }

  return chunks;
}

const Home: React.FC = () => {
  const scrollRef = useHorizontalScroll();
  const blogChunks = createBlogChunks(featuredBlogs, normalBlogs);

  return (
    <main className="home flex flex-col">
      {/* HERO SECTION */}

      <section className="hero px-sect relative flex h-screen flex-col justify-center lg:gap-6 xl:gap-8 2xl:gap-8 3xl:gap-8">
        <div className="blob-1 blur-blob h-1/3 w-1/3"></div>
        <div className="blob-2 blur-blob h-3/5 w-3/5"></div>

        <h1 className="z-15 h1-md relative">
          <div className="airplane-1 absolute">
            <img src={airplane1} alt="" />
            <div className="blob-3 blur-blob z-0 h-1/3"></div>
          </div>
          <img src={airplane2} className="airplane-2 absolute" alt="" />
          <img src={airplane3} className="airplane-3 absolute" alt="" />
          <i className="ri-shining-2-fill absolute -top-5p rotate-30 transform text-yellow lg:text-5.5xl xl:text-6xl 2xl:text-6.5xl 3xl:text-7.5xl"></i>{" "}
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
          <button className="btn btn-primary">Get started</button>
          <button className="btn btn-secondary">Learn more</button>
        </div>
      </section>

      {/* BRIEF SECTION */}

      <section className="brief px-sect flex flex-col lg:gap-36 lg:py-sect-medium xl:gap-48 xl:py-sect-semi 2xl:gap-64 2xl:py-sect-long 3xl:gap-80 3xl:py-sect-long">
        <div className="flex min-h-40 flex-row items-center lg:gap-28 xl:gap-28 2xl:gap-44 3xl:gap-60">
          <img src={airplane1} alt="" className="rotate-30 transform" />
          <h1 className="h2-inter">
            A <span className="text-main-green">Comprehensive Catalog</span> of{" "}
            <br />
            Destinations with Tailored Travel Insights.
          </h1>
        </div>
        <div className="relative flex lg:h-2.25svh lg:flex-row lg:gap-20 xl:h-1.75svh xl:gap-28 2xl:h-2svh 2xl:gap-32 3xl:h-2svh 3xl:gap-40">
          <div className="sticky top-0 z-0 h-svh rounded-lg py-4">
            <video src={briefVideo} autoPlay muted loop></video>
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

      <section className="featured px-sect flex flex-col items-center lg:gap-28 xl:gap-32 2xl:gap-36 3xl:gap-40">
        <div className="w-fit">
          <h1 className="h1-md relative">
            <i className="ri-shining-2-fill absolute -left-5p -top-1/3 rotate-30 transform text-yellow lg:text-3xl xl:text-4xl 2xl:text-4xl 3xl:text-5xl"></i>{" "}
            Featured Destinations
          </h1>
        </div>
        <div
          // ref={scrollRef}
          className="scroller px-sect 2xl:auto-cols-0.4 grid w-svw grid-flow-col gap-8 overflow-x-auto lg:auto-cols-2/5"
        >
          {featuredDemo.map((item, index) => (
            <div key={index} className="card h-svg flex flex-col gap-4 pb-8">
              <div
                className="h-0.75svh w-full rounded-lg"
                style={{
                  backgroundImage: `url(${item.img})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              ></div>
              <div className="flex flex-col lg:gap-0 xl:gap-0 2xl:gap-0 3xl:gap-0">
                <span className="span-regular text-gray">{item.country}</span>
                <span className="span-medium">{item.title}</span>
                <div className="mt-4 flex gap-2">
                  {item.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="span-small rounded-2xl border-2 border-solid border-text-light px-4"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex w-full flex-row justify-between">
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
            <button title="navigate" className="btn btn-secondary z-5">
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

        <div className="z-5 sticky -top-5p left-0">
          <section className="globe relative grid items-center rounded-5xl lg:pb-sect-short lg:pt-sect-short 2xl:pb-sect-short 2xl:pt-sect-short">
            <span className="px-sect p-large absolute -top-10 right-0 uppercase font-semibold">
              And we've covered these countries in our catalog too!
            </span>
            <EarthScene />
          </section>
        </div>

        {/* FEATURED BLOGS SECTION */}

        <div className="relative">
          <span className="px-sect absolute -top-10 left-0 font-semibold uppercase text-text-dark p-large">
            Discover the lastest articles in
          </span>
          <section className="blogs px-sect relative flex flex-col items-center justify-start gap-sect-short lg:pb-sect-default lg:pt-sect-short 2xl:pb-sect-medium 2xl:pt-sect-default">
            <h1 className="h1-md">
              {new Date().toLocaleString("default", {
                month: "long",
                year: "numeric",
              })}
            </h1>
            {blogChunks.map((chunk, index) => (
              <div className="flex h-fit w-full flex-row gap-8" key={index}>
                <div className="flex h-full w-full flex-col gap-4">
                  <img
                    src={chunk[0].image}
                    alt="featuredBlogImage"
                    className="h-0.5svh w-full rounded-lg"
                  />
                  <div className="flex flex-col">
                    <span className="span-regular text-gray">
                      {chunk[0].category}
                    </span>
                    <span className="span-medium uppercase">
                      {" "}
                      {chunk[0].title}
                    </span>
                  </div>

                  <p className="overflow-hidden p-regular 2xl:w-4/5 3xl:w-3/4">
                    {chunk[0].content[0].sectionText[0]}
                  </p>
                  <span className="w-3/4 overflow-hidden span-regular">
                    <i className="ri-time-line"></i> {chunk[0].time}
                  </span>
                </div>
                <div className="grid h-0.75svh w-full grid-flow-row auto-rows-1/3 gap-4">
                  {chunk.slice(1).map((blog, index) => (
                    <div className="flex h-full flex-row gap-4" key={index}>
                      <img
                        src={blog.image}
                        alt="normalBlogImage"
                        className="h-full w-45p rounded-lg"
                      />
                      <div className="flex w-1/2 flex-col gap-4">
                        <div className="flex flex-col gap-0">
                          <span className="span-regular text-gray">
                            {blog.category}
                          </span>
                          <span className="w-full span-medium">
                            {" "}
                            {blog.title}
                          </span>
                        </div>

                        <span className="w-3/4 overflow-hidden span-regular">
                          <i className="ri-time-line"></i> {blog.time}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <div className="flex w-full justify-between">
              <button className="underline-btn">
                <i className="ri-arrow-left-line"></i> Previous
              </button>
              <button className="underline-btn">
                Next<i className="ri-arrow-right-line"></i>
              </button>
            </div>
          </section>
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
          <section className="starter relative rounded-5xl bg-main-brown py-sect-long">
            <img
              src={airplane1}
              alt=""
              className="absolute -top-5p left-5p z-0 lg:w-44 xl:w-44 2xl:w-44 3xl:w-48"
            />
            <div className="h-full w-full overflow-hidden">
              <StarterBlogs blogs={blogDemo} />
            </div>
            <button className="btn btn-secondary absolute -bottom-4 right-0 lg:mr-12 xl:mr-16 2xl:mr-20 3xl:mr-24">
              Find more <img src={planeIcon} alt="" />
            </button>
          </section>
        </div>
      </section>

      {/* QUOTE SECTION */}

      <section className="quote px-sect flex flex-col gap-4 lg:py-sect-default 2xl:py-sect-medium">
        <div className="flex h-0.5svh flex-row items-end justify-between">
          <h1 className="big-heading">
            " To <i className="ri-footprint-fill"></i>{" "}
            <span className="uppercase text-main-green">travel</span> <br />
            is to <span className="uppercase text-main-brown">live</span>{" "}
            <i className="ri-sun-line"></i> "
          </h1>
          <span className="p-medium uppercase">- Hans Christian Andersen</span>
        </div>
        <div className="flex flex-row justify-end">
          <button className="btn btn-primary">Ready to start?</button>
        </div>
      </section>
    </main>
  );
};

export default Home;
