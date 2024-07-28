import { motion, useTransform, useScroll } from "framer-motion";
import React, { useRef } from "react";
import Destination from "src/types/Destination";

type HorizontalScrollCarouselProps = {
  data: Destination[];
};

const HorizontalScrollCarousel: React.FC<HorizontalScrollCarouselProps> = ({
  data,
}) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Calculate the total width of the scrollable content
  const calculateScrollPercent = () => {
    const cards = document.querySelectorAll(".destination-card");
    if (cards.length > 0) {
      const cardWidth = cards[0].clientWidth;
      const viewportWidth = window.innerWidth;
      const totalWidth = cardWidth * (cards.length - 1);
      const totalWidthPercent = (totalWidth / viewportWidth) * 100 - 15;
      return totalWidthPercent;
    }
    return 100;
  };

  // Adjust the transform values based on the total width
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", `-${calculateScrollPercent()}%`],
  );

  return (
    <section ref={targetRef} className="relative h-[400svh]">
      <div className="pr-sect sticky top-0 h-screen overflow-hidden">
        <motion.div
          style={{ x }}
          className="ml-sect mt-20 grid auto-cols-[35%] grid-flow-col gap-8"
        >
          {data &&
            data.length > 0 &&
            data.map((destination: Destination) => (
              <div
                key={destination._id}
                className="destination-card flex h-full flex-col gap-4 pb-8"
              >
                <div
                  className="h-[70svh] w-full rounded-lg"
                  style={{
                    backgroundImage: `url(${destination.images?.[0]})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                ></div>
                <div className="flex flex-col lg:gap-0 xl:gap-0 2xl:gap-0 3xl:gap-0">
                  <span className="span-regular text-gray">
                    {destination.country}
                  </span>
                  <span className="span-medium uppercase">
                    {destination.name}
                  </span>
                  <div className="mt-4 flex gap-2">
                    {destination.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="span-small rounded-2xl border-solid border-text-light px-4 lg:border 2xl:border-2"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HorizontalScrollCarousel;
