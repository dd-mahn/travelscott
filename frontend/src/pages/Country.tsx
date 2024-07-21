import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DestinationCard from "src/components/ui/DestinationCard";
import Pagination from "src/components/ui/Pagination";
import RelatedSections from "src/components/ui/RelatedSections";
import useFetch from "src/hooks/useFetch";
import type Country from "src/types/Country";
import Destination from "src/types/Destination";
import { FetchBlogsType, FetchDestinationType } from "src/types/FetchData";
import { BASE_URL } from "src/utils/config";

const blogDemo = [
  {
    title: "The 10 Best Destinations for Solo Travelers",
    author: "Someone",
    category: "Starter",
    image:
      "https://images.pexels.com/photos/20638882/pexels-photo-20638882/free-photo-of-bi-n-b-bi-n-m-c-toa-nha.jpeg",
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
          "If you're an adrenaline junkie, adventure travel is the perfect way to get your fix. From hiking and biking to surfing and skydiving, there are endless opportunities for adve  const [destinations, setDestinations] = useState<Destination[]>([]);ture travel.",
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

const CountryPage: React.FC = () => {
  // Define states
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [currentBlogIndex, setCurrentBlogIndex] = useState(0);

  // Handle fetching country data
  const { id } = useParams();
  const {
    data: countryData,
    loading: countryLoading,
    error: countryError,
  } = useFetch<Country>(`${BASE_URL}/countries/${id}`);

  const country = countryData;

  // Handle blog data
  const {
    data: blogData,
    loading: blogLoading,
    error: blogError,
  } = useFetch<FetchBlogsType>(`${BASE_URL}/blogs?limit=20`);

  const blogs = blogData?.result !== undefined ? blogData.result.filter((blog) => blog.tags.includes(country?.name as string) ) : blogDemo;

  // Handle blog display
  const [currentBlog, setCurrentBlog] = useState(blogs[currentBlogIndex]);

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

  // Handle destination data
  const {
    data: destinationData,
    loading: destinationLoading,
    error: destinationError,
  } = useFetch<FetchDestinationType>(
    `${BASE_URL}/destinations?page=${currentPage}&countries=${country?.name}`,
    [currentPage],
  );

  // Handle pagination
  const totalDestinations = destinationData?.count as number;
  useEffect(() => {
    if (destinationData?.result) {
      setDestinations(destinationData.result);
    }
  }, [destinationData]);

  // Handle filter
  const filterTags = [
    "Wilderness",
    "Culture&Heritage",
    "Food&Drink",
    "SoloJourneys",
    "CityScape",
    "Season&Festival",
    "Relaxation",
  ];

  const openFilterBoard = () => {
    const filterBoard = document.querySelector(".filter-board");
    if (filterBoard) {
      return () => {
        filterBoard.classList.toggle("hidden");
        filterBoard.classList.toggle("flex");
      };
    }
  };

  // Handle additional info
  const [visibleSection, setVisibleSection] = useState("");

  const toggleInfo = (sectionId: string) => {
    setVisibleSection((prevSection) =>
      prevSection === sectionId ? "" : sectionId,
    );
  };

  // Handle stacked section top value
  const stackedSection: NodeListOf<HTMLElement> =
    document.querySelectorAll(".stacked-section");
  stackedSection.forEach((section) => {
    section.style.top = window.innerHeight - section.offsetHeight + "px";
  });

  if (country !== undefined)
    return (
      <main className="country">
        {/* HERO SECTION */}
        <section className="hero flex h-screen flex-col gap-8">
          <div
            className="h-5/6"
            style={{
              backgroundImage: `url(${country.images.otherImages?.[0]})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          ></div>

          <div className="px-sect flex items-center gap-8">
            <img
              src={country.images.flagImages?.[0]}
              className="w-1/6 rounded-xl"
              alt={country.name + " flag"}
            />
            <h1 className="big-heading">{country.name}</h1>
          </div>
        </section>

        {/* BRIEF INFORMATION SECTION */}
        <section className="brief px-sect flex justify-between pb-sect-default pt-sect-short">
          <div className="flex w-1/2 flex-col lg:gap-4 2xl:gap-8">
            {country.description.map((desc, index) => (
              <p key={index} className="p-regular">
                {desc}
              </p>
            ))}
          </div>

          <div className="grid w-2/5 grid-cols-2 grid-rows-3 gap-y-4">
            <div className="flex flex-col gap-2">
              <span className="span-medium uppercase">
                <i className="ri-global-line"></i> Language
              </span>
              <p className="p-regular">{country.language}</p>
            </div>

            <div className="flex flex-col gap-2">
              <span className="span-medium uppercase">
                <i className="ri-money-dollar-circle-line"></i> Currency
              </span>
              <p className="p-regular">{country.currency}</p>
            </div>

            <div className="flex flex-col gap-2">
              <span className="span-medium uppercase">
                <i className="ri-government-line"></i> Capital
              </span>
              <p className="p-regular">{country.capital}</p>
            </div>

            <div className="flex flex-col gap-2">
              <span className="span-medium uppercase">
                <i className="ri-visa-fill"></i> Visa requirement
              </span>
              <p className="p-regular">{country.visaRequirement}</p>
            </div>

            <div className="flex flex-col gap-2">
              <span className="span-medium uppercase">
                <i className="ri-phone-line"></i> Dial-in code
              </span>
              <p className="p-regular">{country.dialInCode}</p>
            </div>

            <div className="flex flex-col gap-2">
              <span className="span-medium uppercase">
                <i className="ri-time-line"></i> Time zone
              </span>
              <p className="p-regular">{country.timeZone}</p>
            </div>
          </div>
        </section>

        {/* STACKED: MAP AND ADDITIONAL INFO SECTION / BLOG SECTION / DESTINATION SECTION */}
        <section className="map relative pt-sect-default">
          <div
            className="sticky right-0 top-0 z-0 ml-auto h-screen w-2/3"
            style={{
              backgroundImage: `url(${country.images.mapImages?.[0]})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          ></div>
          <div className="px-sect -gap-8 sticky top-20 z-10 flex h-screen w-full flex-col pb-sect-long">
            <div className="z-10 w-1/2 rounded-3xl bg-background-light px-12 py-8 shadow-section">
              <div className="flex flex-row items-center justify-between border-b pb-8">
                <h2 className="h2-md">When to visit?</h2>
                <button
                  className={`${visibleSection === "whenToVisit" ? "rotate-180" : ""} rounded-full border lg:h-20 lg:w-20 xl:h-24 xl:w-24 2xl:h-28 2xl:w-28 3xl:h-28 3xl:w-28`}
                  title="open btn"
                  onClick={() => toggleInfo("whenToVisit")}
                >
                  <i className="ri-arrow-up-line p-large"></i>
                </button>
              </div>
              <div
                className={`additional ${visibleSection === "whenToVisit" ? "flex" : "hidden"} flex-col gap-2 py-8`}
              >
                <p className="p-regular">
                  {country.additionalInfo.whenToVisit?.[0]}
                </p>
              </div>
            </div>

            <div className="z-10 w-1/2 rounded-3xl bg-background-light px-12 py-8 shadow-section">
              <div className="flex flex-row items-center justify-between border-b pb-8">
                <h2 className="h2-md">Transportation</h2>
                <button
                  className={`${visibleSection === "transportation" ? "rotate-180" : ""} rounded-full border lg:h-20 lg:w-20 xl:h-24 xl:w-24 2xl:h-28 2xl:w-28 3xl:h-28 3xl:w-28`}
                  title="open btn"
                  onClick={() => toggleInfo("transportation")}
                >
                  <i className="ri-arrow-up-line p-large"></i>
                </button>
              </div>
              <div
                className={`additional ${visibleSection === "transportation" ? "flex" : "hidden"} flex-col gap-2 py-8`}
              >
                <p className="p-regular">
                  {country.additionalInfo.transportation?.[0]}
                </p>
              </div>
            </div>

            <div className="z-10 w-1/2 rounded-3xl bg-background-light px-12 py-8 shadow-section">
              <div className="flex flex-row items-center justify-between border-b pb-8">
                <h2 className="h2-md">Health & Safety</h2>
                <button
                  className={`${visibleSection === "healthAndSafety" ? "rotate-180" : ""} rounded-full border lg:h-20 lg:w-20 xl:h-24 xl:w-24 2xl:h-28 2xl:w-28 3xl:h-28 3xl:w-28`}
                  title="open btn"
                  onClick={() => toggleInfo("healthAndSafety")}
                >
                  <i className="ri-arrow-up-line p-large"></i>
                </button>
              </div>
              <div
                className={`additional ${visibleSection === "healthAndSafety" ? "flex" : "hidden"} flex-col gap-2 py-8`}
              >
                <p className="p-regular">
                  {country.additionalInfo.healthAndSafety?.[0]}
                </p>
              </div>
            </div>
          </div>
          {/*BLOG SECTION  */}
          <section className="stacked-section blogs sticky -top-sect-semi z-20 flex flex-col items-start gap-16 rounded-3xl bg-light-brown pt-sect-short shadow-section">
            <h1 className="h1-md mt-sect-short w-full text-center">
              Latest article
            </h1>
            <div className="px-sect flex w-svw flex-col items-center gap-8">
              <div
                className="h-0.75svh w-full rounded-xl"
                style={{
                  backgroundImage: `url(${currentBlog.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              ></div>
              <div className="flex flex-col items-center gap-2">
                <span className="span-regular text-gray">
                  {currentBlog.category}
                </span>
                <h3 className="h3-inter"> {currentBlog.title}</h3>
              </div>
              <p className="p-regular w-1/2 text-center">
                {" "}
                {currentBlog.content?.[0]?.sectionText?.[0]}
              </p>
              <span className="span-regular">
                <i className="ri-time-line"></i> {currentBlog.time}
              </span>
            </div>
            <div
              className="px-sect flex w-full items-center pb-sect-default"
              style={
                currentBlogIndex > 0
                  ? { justifyContent: "space-between" }
                  : { justifyContent: "flex-end" }
              }
            >
              {blogs.length > 1 && currentBlogIndex > 0 && (
                <button
                  className="underline-btn uppercase"
                  onClick={handlePrevBlog}
                >
                  <i className="ri-arrow-left-line"></i>
                  Previous
                </button>
              )}

              {blogs.length > 1 && currentBlogIndex < blogs.length - 1 && (
                <button
                  className="underline-btn uppercase"
                  onClick={handleNextBlog}
                >
                  Next
                  <i className="ri-arrow-right-line"></i>
                </button>
              )}
            </div>
          </section>
          {/* DESTINATION SECTION */}
          <section className="stacked-section destinations px-sect sticky -top-4 z-30 flex flex-col items-center gap-8 rounded-3xl bg-light-green py-sect-short shadow-section">
            <h1 className="h1-md m-sect-short uppercase">
              Country's destinations
            </h1>

            <div className="flex w-full flex-row justify-between py-sect-short">
              <p className="p-medium">
                Each destination we’ve covered here is fully filled <br />
                with significant information you will need
              </p>
              <div className="relative">
                <button
                  title="filter"
                  className="rounded-full bg-background-dark shadow-component lg:h-12 lg:w-12 xl:h-12 xl:w-12 2xl:h-16 2xl:w-16 3xl:h-16 3xl:w-16"
                  onClick={openFilterBoard()}
                >
                  <i className="ri-filter-3-line p-large m-auto text-text-dark"></i>
                </button>
                <div className="filter-board absolute right-5p top-2/3 z-10 hidden w-0.3svw flex-col items-center gap-8 rounded-xl bg-background-light px-4 pb-20 pt-4 shadow-section">
                  <div className="flex w-full flex-row items-end gap-4">
                    <div className="flex h-fit items-center justify-between rounded-md px-2 py-1 lg:border 2xl:border-2">
                      <input
                        type="text"
                        placeholder="Search..."
                        className="p-regular w-4/5 bg-transparent outline-none"
                      />
                      <button title="search" className="outline-none">
                        <i className="ri-search-line span-regular"></i>
                      </button>
                    </div>
                  </div>

                  <div className="flex w-full flex-col items-start gap-2">
                    <span className="span-regular uppercase">Tags</span>
                    <div className="flex flex-wrap gap-2">
                      {filterTags.map((tag) => (
                        <span
                          key={tag}
                          className="span-small rounded-2xl border-solid border-text-light px-4 lg:border 2xl:border-2"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid w-full auto-cols-1/3 grid-flow-col gap-8">
              {destinations !== undefined &&
                destinations?.map((destination: Destination) => (
                  <DestinationCard destination={destination} />
                ))}
            </div>

            <Pagination
              count={totalDestinations}
              page={currentPage}
              limit={18}
              handlePreviousClick={() =>
                setCurrentPage(Math.max(1, currentPage - 1))
              }
              handlePageClick={(page) => {
                console.log(page);
                setCurrentPage(page);
              }}
              handleNextClick={() => setCurrentPage(currentPage + 1)}
            />
          </section>
        </section>

        {/* MORE COUNTRIES SECTION */}
        <section className="more py-sect-default">
          <h2 className="h2-md px-sect">More countries</h2>
          <RelatedSections type="country" data={country} />
        </section>
      </main>
    );
};

export default CountryPage;
