import React, { memo, useState } from "react";
import DestinationType from "src/types/Destination";

type DestinationTransportationProps = {
  destination: DestinationType;
};

const DestinationTransportation = ({
  destination,
}: DestinationTransportationProps) => {
  const [transportationIndex, setTransportationIndex] = useState(0);

  const handleTransportationChange = (index: number) => {
    setTransportationIndex((prev) => (prev === index ? 0 : index));
  };

  return (
    <section
      id="transportation"
      className="transportation px-sect sticky rounded-3xl bg-light-brown pt-sect-short shadow-section lg:pb-40 2xl:pb-sect-short"
    >
      <div className="mt-sect-short flex flex-col gap-8">
        <h1 className="h1-md">
          <i className="ri-car-fill"></i> Transportation
        </h1>
        <p className="p-regular w-2/5">{destination.transportation.overview}</p>
      </div>

      <div className="relative flex w-full items-center justify-start pt-sect-short">
        <img
          className="w-2/3 rounded-xl"
          src={destination.transportation.types?.[transportationIndex]?.image}
          alt=""
        />
        <div className="absolute right-0 top-[20%] w-1/2">
          {destination.transportation.types?.map((type, index) => (
            <div
              key={index}
              className="flex w-full flex-col gap-8 rounded-xl bg-light-brown px-8 py-4 shadow-component"
            >
              <button
                className={`p-large w-fit cursor-pointer font-prima uppercase ${transportationIndex === index ? "underline" : ""}`}
                onClick={() => handleTransportationChange(index)}
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
                    <ul>
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
                      ? `${type.price_range.currency} ${type.price_range.min_price} - ${type.price_range.max_price}`
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
  );
};

export default memo(DestinationTransportation);
