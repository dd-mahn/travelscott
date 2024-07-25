import { set } from "lodash";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DestinationCard from "src/components/ui/DestinationCard";
import FeaturedBlogs from "src/components/ui/featuredBlogs";
import { CatalogPagination } from "src/components/ui/Pagination";
import RelatedSections from "src/components/ui/RelatedSections";
import useFetch from "src/hooks/useFetch";
import Blog from "src/types/Blog";
import type Country from "src/types/Country";
import Destination from "src/types/Destination";
import { FetchBlogsType, FetchDestinationType } from "src/types/FetchData";
import { BASE_URL } from "src/utils/config";
import NotFoundPage from "./404";
import { Carousel } from "@material-tailwind/react";

const CountryPage: React.FC = () => {
  // Define states
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [tags, setTags] = useState<string[]>([]);

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

  const blogs: Blog[] =
    blogData?.result !== undefined
      ? blogData.result.filter((blog) =>
          blog.tags.includes(country?.name as string),
        )
      : [];

  // Handle destination data
  let url = `${BASE_URL}/destinations?page=${currentPage}`;
  if (country !== undefined) {
    url += `&countries=${country.name}`;
  }
  if (tags.length > 0) {
    url += `&tags=${tags.join(",")}`;
  }

  const {
    data: destinationData,
    loading: destinationLoading,
    error: destinationError,
  } = useFetch<FetchDestinationType>(url, [currentPage]);

  // Handle pagination
  const totalDestinations = destinationData?.count as number;
  useEffect(() => {
    if (destinationData?.result) {
      setDestinations(destinationData.result);
    }
  }, [destinationData]);

  // Handle filter
  const [isFilterBoardOpen, setIsFilterBoardOpen] = useState<boolean>(false);
  const filterTags = [
    "Wilderness",
    "Culture&Heritage",
    "Food&Drink",
    "SoloJourneys",
    "CityScape",
    "Season&Festival",
    "Relaxation",
  ];

  const toggleFilterBoard = () => {
    setIsFilterBoardOpen(!isFilterBoardOpen);
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

  // Render logic
  if (countryLoading) {
    return (
      <div className="grid h-screen w-full place-items-center">
        <h3 className="h3-md">Loading...</h3>
      </div>
    );
  }
  if (countryError) {
    return (
      <div className="grid h-screen w-full place-items-center">
        <h3 className="h3-md">
          Error... Please reload the page or try again later.
        </h3>
      </div>
    );
  }
  if (!country) {
    return <NotFoundPage />;
  }
  return (
    <main className="country">
      {/* HERO SECTION */}
      <section className="hero flex h-screen flex-col gap-8">
        <Carousel
          className=""
          autoplay
          autoplayDelay={4000}
          transition={{ duration: 2 }}
          loop
        >
          {country.images.otherImages?.map((image, index) => (
            <div
              className="h-full w-svw"
              style={{
                backgroundImage: `url(${image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              key={index}
            ></div>
          ))}
        </Carousel>

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
            Latest articles about {country.name}
          </h1>
          {blogLoading && (
            <div className="grid w-full place-items-center py-sect-short">
              <h3 className="h3-md">Loading...</h3>
            </div>
          )}
          {blogError && (
            <div className="grid w-full place-items-center py-sect-short">
              <h3 className="h3-md">
                Error... Please reload the page or try again later.
              </h3>
            </div>
          )}
          {!blogLoading && !blogError && blogs && blogs.length > 0 && (
            <FeaturedBlogs blogs={blogs} />
          )}
        </section>
        {/* DESTINATION SECTION */}
        <section
          className="stacked-section destinations px-sect sticky -top-4 z-30 flex flex-col items-center gap-8 rounded-3xl bg-light-green py-sect-short shadow-section"
          onClick={(e) => {
            const filterBoard = document.querySelector(".filter-board");

            if (
              filterBoard &&
              filterBoard.classList.contains("flex") &&
              !filterBoard.contains(e.target as Node)
            ) {
              setIsFilterBoardOpen(false);
            }
          }}
        >
          <h1 className="h1-md mt-sect-short uppercase">
            {country.name}'s destinations
          </h1>

          <div className="flex w-full flex-row justify-between pb-8 pt-sect-short">
            <p className="p-medium">
              Each destination we’ve covered here is fully filled <br />
              with significant information you will need
            </p>
            <div className="relative">
              <button
                title="filter"
                className={`${isFilterBoardOpen ? "rotate-180" : ""} rounded-full bg-background-dark shadow-component lg:h-12 lg:w-12 xl:h-12 xl:w-12 2xl:h-16 2xl:w-16 3xl:h-16 3xl:w-16`}
                onClick={() => toggleFilterBoard()}
              >
                <i className="ri-filter-3-line p-large m-auto text-text-dark"></i>
              </button>
              <div
                className={`${isFilterBoardOpen ? "flex" : "hidden"} filter-board absolute right-5p top-2/3 z-10 w-0.3svw flex-col items-center gap-8 rounded-xl bg-background-light px-4 pb-20 pt-4 shadow-section`}
              >
                <div className="flex w-full flex-row items-end gap-4">
                  <div className="flex h-fit items-center justify-between rounded-md border border-gray px-2 py-1">
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
                        className={`span-small cursor-pointer rounded-2xl border border-solid border-gray px-4 ${tags.includes(tag) ? "bg-background-dark text-text-dark" : "bg-transparent text-text-light"}`}
                        onClick={() => {
                          if (tags.includes(tag)) {
                            setTags(tags.filter((t) => t !== tag));
                          } else {
                            setTags([...tags, tag]);
                          }
                        }}
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
            {destinationLoading && (
              <div className="grid w-full place-items-center py-sect-short">
                <h3 className="h3-md">Loading...</h3>
              </div>
            )}
            {destinationError && (
              <div className="grid w-full place-items-center py-sect-short">
                <h3 className="h3-md">Error: {destinationError}</h3>
              </div>
            )}
            {!destinationLoading &&
              !destinationError &&
              destinations &&
              destinations.length > 0 &&
              destinations?.map((destination: Destination) => (
                <DestinationCard destination={destination} />
              ))}
          </div>

          {destinations && destinations.length > 0 && (
            <CatalogPagination
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
          )}
        </section>
      </section>

      {/* MORE COUNTRIES SECTION */}
      <section className="more px-sect lg:py-40 2xl:py-60">
        <h2 className="h2-md">More countries</h2>
        <RelatedSections type="country" data={country} />
      </section>
    </main>
  );
};

export default CountryPage;
