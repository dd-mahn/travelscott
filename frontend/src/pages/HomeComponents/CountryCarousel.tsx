import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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

const shuffleArray = (array: Array<string>) => {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

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

export const RightCountryCarousel: React.FC = () => {
  const [shuffledFlags] = useState(shuffleArray(flags));
  return (
    <div className="w-[60svw]">
      <Slider {...rightSettings}>
        {shuffledFlags.map((flag, index) => (
          <div className="2xl:h-[15svh] 2xl:w-[20svw] lg:h-[12svh] lg:w-[18svh] pr-4" key={index}>
            <img
              src={flag}
              className="h-full rounded-lg object-cover"
              alt="country flag"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export const LeftCountryCarousel: React.FC = () => {
  const [shuffledFlags] = useState(shuffleArray(flags));
  return (
    <div className="w-[60svw]">
      <Slider {...leftSettings}>
        {shuffledFlags.map((flag, index) => (
          <div className="2xl:h-[15svh] 2xl:w-[20svw] lg:h-[12svh] lg:w-[18svh] pr-4" key={index}>
            <img
              src={flag}
              className="h-full rounded-lg object-cover"
              alt="country flag"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};
