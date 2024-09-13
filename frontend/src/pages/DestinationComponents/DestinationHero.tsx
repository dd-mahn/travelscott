import React, { memo } from "react";
import { Carousel } from "@material-tailwind/react";
import Destination from "src/types/Destination";

interface DestinationHeroProps {
  destination: Destination;
}

const DestinationHero: React.FC<DestinationHeroProps> = ({ destination }) => {
  return (
    <section className="hero relative h-screen">
      <div className="absolute top-0 z-10 grid h-[90%] w-full place-items-center bg-background-dark bg-opacity-20">
        <div className="flex flex-col items-start gap-0 px-8 py-4">
          <span className="span-medium ml-2 text-text-dark">
            {destination.country}
          </span>
          <h1 className="big-heading text-text-dark">{destination.name}</h1>
        </div>
      </div>
      <div className="h-[90%]">
        {/* @ts-ignore */}
        <Carousel
          className=""
          autoplay
          autoplayDelay={4000}
          transition={{ duration: 2 }}
          loop
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          {destination.images?.map((image, index) => (
            <div
              className="grid h-full w-full place-items-center bg-gradient-to-t from-background-dark to-transparent"
              key={index}
            >
              <img
                src={image}
                alt={destination.name}
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </Carousel>
      </div>
    </section>
  );
};

export default memo(DestinationHero);
