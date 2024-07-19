import { divide } from "lodash";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useFetch from "src/hooks/useFetch";
import type Destination from "src/types/Destination";
import { BASE_URL } from "src/utils/config";

const DestinationPage: React.FC = () => {
  // Handle destination data
  const { id } = useParams();
  const {
    data: destination,
    loading: destinationLoading,
    error: destinationError,
  } = useFetch<Destination>(`${BASE_URL}/destinations/${id}`);

  // Handle hero image
  const [imageIndex, setImageIndex] = useState(0);
  const handleImageChange = () => {
    const maxIndex =
      destination !== undefined ? destination.images?.length - 1 : 0;
    setImageIndex(imageIndex === maxIndex ? 0 : imageIndex + 1);
  };

  // Handle menu board
  const openMenuBoard = () => {
    const filterBoard = document.querySelector(".menu-board");
    if (filterBoard) {
      return () => {
        filterBoard.classList.toggle("hidden");
        filterBoard.classList.toggle("flex");
      };
    }
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

  if (destination !== undefined) {
    return (
      <main className="destination">
        <section className="hero h-screen">
          <div
            className="grid h-9/10 w-full place-items-center"
            style={{
              backgroundImage: `url(${destination.images?.[imageIndex]})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            onClick={handleImageChange}
          >
            <div className="flex flex-col items-start gap-0">
              <span className="span-medium text-text-dark">
                {destination.country}
              </span>
              <h1 className="big-heading leading-normal text-text-dark">
                {destination.name}
              </h1>
            </div>
          </div>
        </section>

        <section className="brief px-sect py-sect-short">
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
                onClick={openMenuBoard()}
                className="rounded-full bg-background-dark shadow-component lg:h-12 lg:w-12 xl:h-12 xl:w-12 2xl:h-16 2xl:w-16 3xl:h-16 3xl:w-16"
              >
                <i className="ri-menu-5-line p-large m-auto text-text-dark"></i>
              </button>
              <div className="menu-board absolute right-0 top-1/5 z-10 hidden w-1/2 flex-col items-center gap-8 rounded-xl bg-background-light px-4 pb-20 pt-4 shadow-section">
                <p className="p-large font-prima uppercase">Table of content</p>
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

        <section className="stacked relative">
          <section className="additional px-sect sticky top-0 grid grid-cols-2 grid-rows-2 gap-x-4 gap-y-16 py-sect-default">
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

          <section className="transportation px-sect sticky -top-sect-default rounded-3xl bg-light-brown pb-sect-default pt-sect-short shadow-section">
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
              <div className="absolute right-0 top-1/5 w-1/2">
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
                          <p className="p-medium">{type.description}</p>
                          <ul className="mt-2">
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
                        <p className="p-medium">
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
                          <p className="p-medium">{type.quick_review}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="places px-sect sticky -top-sect-default rounded-3xl bg-light-green pb-sect-default pt-sect-short shadow-section">
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
                    These places was chosen after carefully considering a
                    balance of several important factors: price, distance,
                    quality, and ratings. By evaluating these elements, we
                    ensured that the selection offers the best overall value and
                    convenience.
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
                    culinary experiences that are sure to satisfy your taste
                    buds.
                  </p>
                </div>
              )}
            </div>

            <div className="mt-20 grid grid-cols-4 gap-x-4 gap-y-8">
              {placeCategory === "to_stay"
                ? destination.places?.to_stay?.map((place, index) => (
                    <div className="flex flex-col gap-4">
                      <img
                        className="h-0.35svh w-full rounded-xl"
                        src={place?.image_url}
                        alt="place image"
                      />
                      <span className="span-medium">{place?.name}</span>
                    </div>
                  ))
                : placeCategory === "to_visit"
                  ? destination.places?.to_visit?.map((place, index) => (
                      <div className="flex flex-col gap-4">
                        <img
                          className="h-0.35svh w-full rounded-xl"
                          src={place?.image_url}
                          alt="place image"
                        />
                        <span className="span-medium">{place?.name}</span>
                      </div>
                    ))
                  : destination.places?.to_eat?.map((place, index) => (
                      <div className="flex flex-col gap-4">
                        <img
                          className="h-0.35svh w-full rounded-xl"
                          src={place?.image_url}
                          alt="place image"
                        />
                        <span className="span-medium">{place?.name}</span>
                      </div>
                    ))}
            </div>
          </section>

          <section className="insight px-sect sticky -top-sect-default flex flex-col gap-20 rounded-3xl bg-background-light pb-sect-default pt-sect-short shadow-section">
            <h1 className="h1-md">
              <i className="ri-eye-fill"></i>Insight
            </h1>

            <div className="flex flex-col items-center gap-8">
              <h2 className="h2-md">From us</h2>
              <div className="grid grid-cols-3 gap-x-4 gap-y-8">
                {destination.insight?.from_us?.tips.map((tip, index) => (
                  <div
                    className="rounded-xl px-6 py-4 shadow-component"
                    key={index}
                  >
                    <p className="p-medium text-text-light">{tip}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-20 flex flex-col gap-8">
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
                    className="rounded-xl px-6 py-2 shadow-component"
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

        <section className="summary px-sect flex flex-col gap-sect-default rounded-3xl bg-background-light py-sect-medium">
          <h1 className="h1-md">
            <i className="ri-shining-2-fill"></i> Summary
          </h1>
          <div className="grid place-items-center">
            <p className="p-medium w-2/5">{destination.summary} <br /> <br /> Have a good trip!</p>

          </div>
        </section>

        <section className="related px-sect py-sect-short">
            <h2 className="h2-md">Related destination</h2>
        </section>
      </main>
    );
  }
};

export default DestinationPage;
