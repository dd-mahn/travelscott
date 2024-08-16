import React, { useState } from "react";
import Slider from "react-slick";

// Flags
import vietnamFlag from "src/assets/images/ui/countryFlags/vietnam-flag-medium.png";
import japanFlag from "src/assets/images/ui/countryFlags/japan-flag-medium.jpg";
import brazilFlag from "src/assets/images/ui/countryFlags/brazil-flag-medium.jpg";
import franceFlag from "src/assets/images/ui/countryFlags/france-flag-medium.jpg";
import germanyFlag from "src/assets/images/ui/countryFlags/germany-flag-medium.jpg";
import indiaFlag from "src/assets/images/ui/countryFlags/india-flag-medium.jpg";
import southKoreaFlag from "src/assets/images/ui/countryFlags/south-korea-flag-medium.jpg";
import spainFlag from "src/assets/images/ui/countryFlags/spain-flag-medium.jpg";
import ukFlag from "src/assets/images/ui/countryFlags/united-kingdom-flag-medium.jpg";
import usaFlag from "src/assets/images/ui/countryFlags/united-states-of-america-flag-medium.jpg";
import thailandFlag from "src/assets/images/ui/countryFlags/thailand-flag.jpg";
import icelandFlag from "src/assets/images/ui/countryFlags/iceland-flag-medium.jpg";
import canadaFlag from "src/assets/images/ui/countryFlags/canada-flag-medium.jpg";
import australiaFlag from "src/assets/images/ui/countryFlags/australia-flag-medium.jpg";
import argentinaFlag from "src/assets/images/ui/countryFlags/argentina-flag-medium.jpg";
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
