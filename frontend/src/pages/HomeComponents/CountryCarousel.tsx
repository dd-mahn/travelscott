import React, { useState } from "react";
import Slider from "react-slick";

// Flags
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
import { shuffleArray } from "src/utils/shuffleArray";
import { optimizeImage } from "src/utils/optimizeImage";

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

const leftSettings = {
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
  rtl: true,
};

const CountryCarousel = ({ settings }: { settings: any }) => {
  const [shuffledFlags] = useState(() => shuffleArray(flags));

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
};

export const RightCountryCarousel = React.memo(() => (
  <CountryCarousel settings={rightSettings} />
));
export const LeftCountryCarousel = React.memo(() => (
  <CountryCarousel settings={leftSettings} />
));
