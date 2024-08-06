import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useFetch from "src/hooks/useFetch";
import type Destination from "src/types/Destination";
import { BASE_URL } from "src/utils/config";
import "src/styles/destination.css";

// Material Tailwind
import { Carousel } from "@material-tailwind/react";
import PlaceDialog from "./DestinationComponents/placeDialog";
import RelatedSections from "src/components/ui/RelatedSections";
import NotFoundPage from "./404";

const DestinationPage: React.FC = () => {
  // Handle destination data
  const { id } = useParams();
  const {
    data: destination,
    loading: destinationLoading,
    error: destinationError,
  } = useFetch<Destination>(`${BASE_URL}/destinations/${id}`);

  // Handle menu board
  const [menuBoardOpen, setMenuBoardOpen] = useState(false);
  const toggleMenuBoard = () => {
    setMenuBoardOpen(!menuBoardOpen);
  };

  // Handle transportation display
  const [transportationIndex, setTransportationIndex] = useState(0);
  const handleTransportationChange = (index: number) => {
    setTransportationIndex((prev) => (prev === index ? 0 : index));
  };

  // Handle places display
  const [placeCategory, setPlaceCategory] = useState("to_stay");
  const handlePlaceCategoryChange = (category: string) => {
    setPlaceCategory(category);
  };

  // Handle sticky sections top value
  const stackedSection: NodeListOf<HTMLElement> =
    document.querySelectorAll(".stacked-section");
  useEffect(() => {
    if (stackedSection.length > 0) {
      stackedSection.forEach((section) => {
        section.style.top = window.innerHeight - section.offsetHeight + "px";
      });
    }
  }, [stackedSection]);

  // Handle place catalog
  const dialogs: NodeListOf<HTMLDialogElement> =
    document.querySelectorAll("dialog");
  dialogs.forEach((dialog) => {
    dialog.addEventListener("click", (e) => {
      const dialogContent = dialog.querySelector(".dialog-content");
      if (dialogContent && !dialogContent.contains(e.target as Node)) {
        dialog.close();
      }
    });
  });

  const openPlaceDialog = (name: string) => {
    const placeDialog = document.querySelector(`dialog[data-name="${name}"]`);

    console.log(placeDialog);

    if (placeDialog instanceof HTMLDialogElement) {
      placeDialog.removeAttribute("hidden");
      placeDialog.showModal();
    }
  };

  // Render logic
  if (destinationLoading) {
    return (
      <div className="grid h-screen w-full place-items-center">
        <h3 className="h3-md">Loading...</h3>
      </div>
    );
  }
  if (destinationError) {
    return (
      <div className="grid h-screen w-full place-items-center">
        <h3 className="h3-md">Error: {destinationError}</h3>
      </div>
    );
  }
  if (!destination) {
    return <NotFoundPage />;
  }

  const selectedCategoryPlaces =
    placeCategory === "to_stay"
      ? destination.places?.to_stay
      : placeCategory === "to_visit"
        ? destination.places?.to_visit
        : destination.places?.to_eat;

  return (
    <main className="destination">
      <section className="hero relative h-screen">
        <div className="absolute top-0 z-10 grid h-[90%] w-full place-items-center bg-background-dark bg-opacity-20">
          <div className="flex flex-col items-start gap-0 px-8 py-4">
            <span className="span-medium ml-2 text-text-dark">
              {destination.country}
            </span>
            <h1 className="big-heading text-text-dark">{destination.name}</h1>
          </div>
        </div>
        <Carousel
          className=""
          autoplay
          autoplayDelay={4000}
          transition={{ duration: 2 }}
          loop
        >
          {destination.images?.map((image, index) => (
            <div
              className="grid h-[90%] w-svw place-items-center"
              style={{
                backgroundImage: `url(${image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              key={index}
            ></div>
          ))}
        </Carousel>
      </section>

      <section
        id="overview"
        className="overview px-sect py-sect-short"
        onClick={(e) => {
          const menuBoard = document.querySelector(".menu-board");
          if (
            menuBoard?.classList.contains("flex") &&
            !menuBoard?.contains(e.target as Node)
          ) {
            setMenuBoardOpen(false);
          }
        }}
      >
        <div className="flex justify-between">
          <div className="flex w-1/2 flex-col gap-4">
            <h2 className="h2-md">{destination.location}</h2>
            <div className="flex flex-row items-start justify-start gap-2">
              {destination.tags.map((tag) => (
                <span
                  key={tag}
                  className="span-small rounded-2xl border-solid border-text-light px-4 lg:border 2xl:border-2"
                >
                  {tag}
                </span>
              ))}
            </div>
            <p className="p-regular mt-2 w-3/4">{destination.description}</p>
          </div>
          <div className="relative flex w-1/2 justify-end">
            <button
              title="open-menu"
              onClick={() => toggleMenuBoard()}
              className="rounded-full bg-background-dark shadow-component lg:h-12 lg:w-12 xl:h-12 xl:w-12 2xl:h-16 2xl:w-16 3xl:h-16 3xl:w-16"
            >
              <i className="ri-menu-5-line p-large m-auto text-text-dark"></i>
            </button>
            <div
              className={`${menuBoardOpen ? "flex" : "hidden"} menu-board absolute right-0 top-[20%] z-10 w-2/5 flex-col items-center gap-2 rounded-xl bg-background-light px-8 pb-12 pt-4 shadow-section`}
            >
              <p className="p-large font-prima uppercase">Table of content</p>
              <span className="span-small">
                If this is your first time, don't use this!
              </span>
              <div className="mt-6 flex w-full flex-col gap-4">
                <a href="#overview" className="p-medium">
                  1. Overview
                </a>
                <a href="#additional" className="p-medium">
                  2. Needy information
                </a>
                <a href="#transportation" className="p-medium">
                  3. Transportation
                </a>
                <a href="#places" className="p-medium">
                  4. Places
                </a>
                <a href="#insight" className="p-medium">
                  5. Insight
                </a>
                <a href="#summary" className="p-medium">
                  6. Summary
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="video py-sect-short">
        <div className="grid h-screen place-items-center">
          <iframe
            title="destination-video"
            src={`https://www.youtube.com/embed/${destination.video}?controls=0`}
            className="h-full w-full"
          ></iframe>
        </div>
      </section>

      <section className="relative">
        <section
          id="additional"
          className="additional px-sect sticky top-0 grid grid-cols-2 grid-rows-2 gap-x-4 gap-y-16 lg:py-40 2xl:py-sect-default"
        >
          {Object.entries(destination.additionalInfo).map(([key, value]) => (
            <div key={key} className="flex flex-col gap-4">
              <h2 className="h2-md">
                {key === "whenToVisit"
                  ? "When to visit?"
                  : key === "whoToGoWith"
                    ? "Who to go with?"
                    : key === "whatToExpect"
                      ? "What to expect?"
                      : key === "healthAndSafety"
                        ? "Health and safety"
                        : ""}
              </h2>
              <p className="p-regular w-3/4">{value}</p>
            </div>
          ))}
        </section>

        <section
          id="transportation"
          className="stacked-section transportation px-sect sticky rounded-3xl bg-light-brown pt-sect-short shadow-section lg:pb-40 2xl:pb-sect-short"
        >
          <div className="mt-sect-short flex flex-col gap-8">
            <h1 className="h1-md">
              <i className="ri-car-fill"></i> Transportation
            </h1>
            <p className="p-regular w-2/5">
              {destination.transportation.overview}
            </p>
          </div>

          <div className="relative flex w-full items-center justify-start pt-sect-short">
            <img
              className="w-2/3 rounded-xl"
              src={
                destination.transportation.types?.[transportationIndex]?.image
              }
              alt=""
            />
            \
            <div className="absolute right-0 top-[20%] w-1/2">
              {destination.transportation.types?.map((type, index) => (
                <div
                  key={index}
                  className="flex w-full flex-col gap-8 rounded-xl bg-light-brown px-8 py-4 shadow-component"
                >
                  <button
                    className={`p-large w-fit cursor-pointer font-prima uppercase ${transportationIndex === index ? "underline" : ""}`}
                    onClick={() => {
                      handleTransportationChange(index);
                    }}
                  >
                    {type.name}
                  </button>
                  <div
                    className={`flex-col gap-4 ${transportationIndex === index ? "flex" : "hidden"}`}
                  >
                    <div className="flex flex-row gap-8">
                      <i className="ri-information-2-line p-large mt-4"></i>
                      <div className="flex flex-col">
                        <p className="p-regular">{type.description}</p>
                        <ul className="">
                          {type.options?.map((option, index) => (
                            <li
                              key={index}
                              className="flex list-disc flex-row gap-2"
                            >
                              <p className="p-regular">- {option.name}</p>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className="flex flex-row items-center gap-8">
                      <i className="ri-price-tag-3-line p-large"></i>
                      <p className="p-regular">
                        {type.price_range?.currency &&
                        type.price_range?.min_price &&
                        type.price_range?.max_price
                          ? type.price_range?.currency +
                            " " +
                            type.price_range?.min_price +
                            " - " +
                            type.price_range?.max_price
                          : "Price based on your need"}
                      </p>
                    </div>
                    {type.quick_review && (
                      <div className="flex items-start gap-8">
                        <i className="ri-arrow-right-line p-large"></i>
                        <p className="p-regular">{type.quick_review}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="places"
          className="stacked-section places px-sect sticky rounded-3xl bg-light-green pb-sect-short pt-sect-short shadow-section"
        >
          <div className="mt-sect-short flex flex-col gap-20">
            <h1 className="h1-md">
              <i className="ri-map-pin-fill"></i> Places
            </h1>

            {placeCategory === "to_stay" ? (
              <div className="flex flex-col gap-6">
                <h2 className="h2-inter">
                  {" "}
                  <span>To stay</span>{" "}
                  <span
                    className="cursor-pointer text-gray"
                    onClick={() => handlePlaceCategoryChange("to_visit")}
                  >
                    /visit
                  </span>{" "}
                  <span
                    className="cursor-pointer text-gray"
                    onClick={() => handlePlaceCategoryChange("to_eat")}
                  >
                    /eat
                  </span>
                </h2>
                <p className="p-regular w-2/5">
                  These places was chosen after carefully considering a balance
                  of several important factors: price, distance, quality, and
                  ratings. By evaluating these elements, we ensured that the
                  selection offers the best overall value and convenience.
                </p>
              </div>
            ) : placeCategory === "to_visit" ? (
              <div className="flex flex-col gap-6">
                <h2 className="h2-inter">
                  {" "}
                  <span>To visit</span>{" "}
                  <span
                    className="cursor-pointer text-gray"
                    onClick={() => handlePlaceCategoryChange("to_eat")}
                  >
                    /eat
                  </span>{" "}
                  <span
                    className="cursor-pointer text-gray"
                    onClick={() => handlePlaceCategoryChange("to_stay")}
                  >
                    /stay
                  </span>
                </h2>
                <p className="p-regular w-2/5">
                  These are the most popular places that are truly worth
                  visiting. Each destination offers unique experiences and
                  attractions that make them stand out as must-see locations.
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-6">
                <h2 className="h2-inter">
                  {" "}
                  <span>To eat</span>{" "}
                  <span
                    className="cursor-pointer text-gray"
                    onClick={() => handlePlaceCategoryChange("to_stay")}
                  >
                    /stay
                  </span>{" "}
                  <span
                    className="cursor-pointer text-gray"
                    onClick={() => handlePlaceCategoryChange("to_visit")}
                  >
                    /visit
                  </span>
                </h2>
                <p className="p-regular w-2/5">
                  Don’t miss out on enjoying delicious local dishes at these
                  excellent restaurants. They offer a variety of flavors and
                  culinary experiences that are sure to satisfy your taste buds.
                </p>
              </div>
            )}
          </div>

          <div className="mt-20 grid grid-cols-3 gap-x-8 gap-y-16">
            {selectedCategoryPlaces?.map((place, index) => (
              <div key={index}>
                <div
                  className="flex cursor-pointer flex-col gap-4"
                  onClick={() => {
                    openPlaceDialog(place.name);
                  }}
                >
                  <img
                    className="h-[50svh] rounded-xl"
                    src={place?.image_url}
                    alt="place image"
                  />
                  <span className="span-medium">{place?.name}</span>
                </div>
                <PlaceDialog place={place} category={placeCategory} />
              </div>
            ))}
          </div>
        </section>

        <section
          id="insight"
          className="stacked-section insight px-sect sticky flex flex-col gap-20 rounded-3xl bg-light-brown pb-sect-default pt-sect-short shadow-section"
        >
          <h1 className="h1-md">
            <i className="ri-eye-fill"></i>Insight
          </h1>

          <div className="flex flex-col items-center gap-8">
            <h2 className="h2-md">From us</h2>
            <div className="grid grid-cols-3 gap-x-4 gap-y-8">
              {destination.insight?.from_us?.tips.map((tip, index) => (
                <div
                  className="rounded-xl bg-background-light bg-opacity-70 px-6 py-4 shadow-component"
                  key={index}
                >
                  <p className="p-medium text-text-light">{tip}</p>
                </div>
              ))}
            </div>
            <RelatedSections type={"blog"} data={destination} />
          </div>

          <div className="flex flex-col gap-8">
            <h2 className="h2-md">From others</h2>
            <p className="p-regular w-2/5">
              Leveraging others’ travel experiences and insights can save you
              time and money by helping you avoid common mistakes. It also
              provides practical tips and recommendations that enhance your
              trip, making it more enjoyable and stress-free. Additionally,
              learning from others’ experiences can inspire you and give you a
              clearer idea of what to expect.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              {destination.insight?.from_others?.map((article, index) => (
                <div
                  className="rounded-xl bg-background-light bg-opacity-70 px-6 py-2 shadow-component"
                  key={index}
                >
                  <a
                    href={article.link}
                    className="p-medium text-center"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {article.title}{" "}
                    <i className="ri-arrow-right-up-line p-large"></i>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>
      </section>

      <section
        id="summary"
        className="summary px-sect flex flex-col gap-sect-short rounded-3xl bg-background-light lg:py-60 2xl:py-sect-medium"
      >
        <h1 className="h1-md">
          <i className="ri-shining-2-fill"></i> Summary
        </h1>
        <div className="mt-sect-short grid place-items-center">
          <p className="p-medium w-2/5">
            {destination.summary} <br /> <br />{" "}
            <p className="p-medium">Have a good trip!</p>
          </p>
        </div>
      </section>

      <section className="related lg:py-sect-short 2xl:py-40">
        <h2 className="h2-md px-sect w-full text-center">
          Related destination
        </h2>
        <RelatedSections type={"destination"} data={destination} />
      </section>
    </main>
  );
};

export default DestinationPage;
