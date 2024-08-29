import React, { useState, useMemo } from "react";
import Slider from "react-slick";
import Marquee from "react-marquee-slider";
import { Motion } from "react-marquee-slider";

// Import flag images
import vietnamFlag from "src/assets/images/ui/countryFlags/vietnam-flag-medium.webp";
import japanFlag from "src/assets/images/ui/countryFlags/japan-flag-medium.webp";
import brazilFlag from "src/assets/images/ui/countryFlags/brazil-flag-medium.webp";
import franceFlag from "src/assets/images/ui/countryFlags/france-flag-medium.webp";
import germanyFlag from "src/assets/images/ui/countryFlags/germany-flag-medium.webp";
import indiaFlag from "src/assets/images/ui/countryFlags/india-flag-medium.webp";
import southKoreaFlag from "src/assets/images/ui/countryFlags/south-korea-flag-medium.webp";
import spainFlag from "src/assets/images/ui/countryFlags/spain-flag-medium.webp";
import ukFlag from "src/assets/images/ui/countryFlags/united-kingdom-flag-medium.webp";
import usaFlag from "src/assets/images/ui/countryFlags/united-states-of-america-flag-medium.webp";
import thailandFlag from "src/assets/images/ui/countryFlags/thailand-flag.webp";
import icelandFlag from "src/assets/images/ui/countryFlags/iceland-flag-medium.webp";
import canadaFlag from "src/assets/images/ui/countryFlags/canada-flag-medium.webp";
import australiaFlag from "src/assets/images/ui/countryFlags/australia-flag-medium.webp";
import argentinaFlag from "src/assets/images/ui/countryFlags/argentina-flag-medium.webp";

// Import utility functions
import { shuffleArray } from "src/utils/shuffleArray";
import { optimizeImage } from "src/utils/optimizeImage";

// Array of flag images
const flags = [
  vietnamFlag,
  japanFlag,
  brazilFlag,
  franceFlag,
  germanyFlag,
  indiaFlag,
  southKoreaFlag,
  spainFlag,
  ukFlag,
  usaFlag,
  thailandFlag,
  icelandFlag,
  canadaFlag,
  australiaFlag,
  argentinaFlag,
];

// Settings for right-to-left carousel
const rightSettings = {
  dots: false,
  infinite: true,
  autoplay: true,
  speed: 4000,
  autoplaySpeed: 4000,
  slidesToShow: 6,
  slidesToScroll: 1,
  cssEase: "linear",
  pauseOnHover: false,
  arrows: false,
};

// Settings for left-to-right carousel
const leftSettings = {
  ...rightSettings,
  rtl: true,
};

// CountryCarousel component
const CountryCarousel = React.memo(({ settings }: { settings: any }) => {
  // Shuffle flags once on component mount
  const shuffledFlags = useMemo(() => shuffleArray(flags), []);

  return (
    <div className="w-[60svw]">
      <Slider {...settings}>
        {shuffledFlags.map((flag, index) => {
          const { src, srcSet } = optimizeImage(flag);
          return (
            <div
              className="pr-4 lg:h-[12svh] lg:w-[18svh] 2xl:h-[15svh] 2xl:w-[20svw]"
              key={index}
            >
              <img
                loading="lazy"
                src={src}
                srcSet={srcSet}
                className="h-full rounded-lg object-cover"
                alt="country flag"
              />
            </div>
          );
        })}
      </Slider>
    </div>
  );
});

// Export right-to-left carousel
export const RightCountryCarousel = React.memo(() => (
  <CountryCarousel settings={rightSettings} />
));

// Export left-to-right carousel
export const LeftCountryCarousel = React.memo(() => (
  <CountryCarousel settings={leftSettings} />
));

// MarqueeCountryCarousel component
export const MarqueeCountryCarousel = React.memo(() => {
  // Shuffle flags once on component mount
  const shuffledFlags = useMemo(() => shuffleArray(flags), []);
  const scale = 1.5;

  return (
    <div className="h-svh w-[100svw]">
      <Marquee
        velocity={20}
        resetAfterTries={200}
        direction={"rtl"}
        scatterRandomly={false}
        onInit={() => {}}
        onFinish={() => {}}
      >
        {shuffledFlags.map((flag, index) => {
          const { src, srcSet } = optimizeImage(flag);
          return (
            <Motion
              initDeg={Math.random() * 360}
              key={index}
              backgroundColors={{
                earth: "",
                solarSystem: "",
                buffer: "",
              }}
              direction={Math.random() > 0.5 ? "clockwise" : "counterclockwise"}
              velocity={20}
              radius={scale * 80}
            >
              <div className="mt-[70svh] lg:h-[4svh] lg:w-[5svw] 2xl:h-[5svh] 2xl:w-[7.5svw]">
                <img
                  loading="lazy"
                  src={src}
                  srcSet={srcSet}
                  className="h-full rounded-lg object-cover shadow-component"
                  alt="country flag"
                />
              </div>
            </Motion>
          );
        })}
      </Marquee>
    </div>
  );
});
