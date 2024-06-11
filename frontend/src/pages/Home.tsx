import React, { useEffect, useRef } from "react";

import "src/styles/home.css";
import airplane1 from "src/assets/svg/airplane-1.svg";
import airplane2 from "src/assets/svg/airplane-2.svg";
import airplane3 from "src/assets/svg/airplane-3.svg";
import briefVideo from "src/assets/videos/brief.mp4";
import featured1 from "src/assets/images/ui/home/featured-1.jpg";
import featured2 from "src/assets/images/ui/home/featured-2.jpg";
import featured3 from "src/assets/images/ui/home/featured-3.jpg";
import featured4 from "src/assets/images/ui/home/featured-4.jpg";
import featured5 from "src/assets/images/ui/home/featured-5.jpg";
import featured6 from "src/assets/images/ui/home/featured-6.jpg";
import featured7 from "src/assets/images/ui/home/featured-7.jpg";
import featured8 from "src/assets/images/ui/home/featured-8.jpg";
import featured9 from "src/assets/images/ui/home/featured-9.jpg";
import featured10 from "src/assets/images/ui/home/featured-10.jpg";
import planeIcon from "src/assets/svg/plane-icon.svg";
import agodaLight from "src/assets/images/ui/home/agoda-light.png";
import tripadvisorLight from "src/assets/images/ui/home/tripadvisor-light.png";
import bookingLight from "src/assets/images/ui/home/booking-light.png";
import skyscannerLight from "src/assets/images/ui/home/skyscanner-light.png";
import expediaLight from "src/assets/images/ui/home/expedia-light.png";
import airbnbLight from "src/assets/images/ui/home/airbnb-light.png";
import kayakLight from "src/assets/images/ui/home/kayak-light.png";
import uberLight from "src/assets/images/ui/home/uber-light.png";

import { useHorizontalScroll } from "src/utils/useHorizontalScroll";
import EarthScene from "src/pages/HomeComponents/EarthScene";

const featuredDemo = [
  {
    img: featured1,
    title: "A destination with culture",
    location: "Africa",
  },
  {
    img: featured2,
    title: "A destination with nature",
    location: "Europe",
  },
  {
    img: featured3,
    title: "A destination with nature",
    location: "Europe",
  },
  {
    img: featured4,
    title: "A destination with nature",
    location: "Europe",
  },
  {
    img: featured5,
    title: "A destination with nature",
    location: "Europe",
  },
  {
    img: featured6,
    title: "A destination with nature",
    location: "Europe",
  },
  {
    img: featured7,
    title: "A destination with nature",
    location: "Europe",
  },
  {
    img: featured8,
    title: "A destination with nature",
    location: "Europe",
  },
  {
    img: featured9,
    title: "A destination with nature",
    location: "Europe",
  },
  {
    img: featured10,
    title: "A destination with nature",
    location: "Europe",
  },
];
const friendsDemo = [
  {
    name: "Agoda",
    imgLight: agodaLight,
    imgDark: "",
    link: "agoda.com",
  },
  {
    name: "Trip Advisor",
    imgLight: tripadvisorLight,
    imgDark: "",
    link: "tripadvisor.com",
  },
  {
    name: "SkyScanner",
    imgLight: skyscannerLight,
    imgDark: "",
    link: "skyscanner.com",
  },
  {
    name: "Booking",
    imgLight: bookingLight,
    imgDark: "",
    link: "booking.com",
  },
  {
    name: "AirBnb",
    imgLight: airbnbLight,
    imgDark: "",
    link: "airbnb.com",
  },
  {
    name: "Expedia",
    imgLight: expediaLight,
    imgDark: "",
    link: "expedia.com",
  },
  {
    name: "Kayak",
    imgLight: kayakLight,
    imgDark: "",
    link: "kayak.com",
  },
  {
    name: "Uber",
    imgLight: uberLight,
    imgDark: "",
    link: "uber.com",
  },
];

const Home: React.FC = () => {
  const scrollRef = useHorizontalScroll();

  return (
    <main className="home flex flex-col">
      <section className="hero px-sect relative flex h-screen flex-col justify-center lg:gap-6 xl:gap-8 2xl:gap-8 3xl:gap-8">
        <div className="blob-1 blur-blob h-1/3 w-1/3"></div>
        <div className="blob-2 blur-blob h-3/5 w-3/5"></div>

        <div className="airplane-1 absolute">
          <img src={airplane1} alt="" />
          <div className="blob-3 blur-blob z-0 h-1/3"></div>
        </div>
        <img src={airplane2} className="airplane-2 absolute" alt="" />
        <img src={airplane3} className="airplane-3 absolute" alt="" />

        <h1 className="z-15 relative uppercase lg:text-4.5xl lg:font-bold lg:leading-tight xl:text-5.5xl xl:leading-tight 2xl:text-6.5xl 2xl:leading-snug 3xl:text-7.5xl 3xl:leading-snug">
          <i className="ri-shining-2-fill absolute -top-5p rotate-30 transform text-yellow lg:text-5.5xl xl:text-6xl 2xl:text-6.5xl 3xl:text-7.5xl"></i>{" "}
          <span className="opacity-0">--</span> From your new <br></br>
          favorite{" "}
          <span className="uppercase text-main-green">travel guide</span>{" "}
          <br></br>
          to{" "}
          <span className="border-b-4 border-solid border-text-light dark:border-text-dark">
            unforgettable
          </span>{" "}
          <span className="uppercase text-main-brown">experience</span>.
        </h1>

        <p className="x:w-2/5 font-medium lg:w-2/5 lg:text-base xl:text-lg 2xl:w-1/3 2xl:text-xl 3xl:w-1/3 3xl:text-xl">
          From the smallest idea to the most memorable journeys. Join us to
          awaken your traveling spirit and discover the adventurer within you.
        </p>

        <div className="flex flex-row lg:gap-4 xl:gap-4 2xl:gap-6 3xl:gap-8">
          <button className="btn btn-primary">Get started</button>
          <button className="btn btn-secondary">Learn more</button>
        </div>
      </section>
      <section className="brief px-sect flex flex-col lg:gap-36 lg:py-sect-medium xl:gap-48 xl:py-sect-semi 2xl:gap-64 2xl:py-sect-long 3xl:gap-80 3xl:py-sect-long">
        <div className="flex min-h-40 flex-row items-center lg:gap-28 xl:gap-28 2xl:gap-44 3xl:gap-60">
          <img src={airplane1} alt="" className="rotate-30 transform" />
          <h1 className="font-medium text-text-light lg:text-4xl xl:text-4.5xl 2xl:text-5xl 3xl:text-6xl">
            A <span className="text-main-green">Comprehensive Catalogue</span>{" "}
            of <br />
            Destinations with Tailored Travel Insights.
          </h1>
        </div>
        <div className="relative flex lg:h-2.25svh lg:flex-row lg:gap-20 xl:h-1.75svh xl:gap-28 2xl:h-2svh 2xl:gap-32 3xl:h-2svh 3xl:gap-40">
          <div className="sticky top-0 z-0 h-svh rounded-lg py-4">
            <video src={briefVideo} autoPlay muted loop></video>
          </div>
          <div className="relative flex flex-col items-center justify-center lg:w-2/5 lg:gap-16 xl:gap-20 2xl:gap-20 3xl:gap-24 3xl:pt-40">
            <div className="blob-1 blur-blob absolute h-1/3 w-1/3"></div>
            <div className="blob-2 blur-blob absolute h-1/3 w-1/3"></div>
            <p className="active font-medium opacity-20 lg:w-4/5 lg:text-base xl:text-lg 2xl:text-xl 3xl:w-2/3 3xl:text-xl">
              Pause the hustle of everyday life and breathe in a moment of
              tranquility. Embark on a journey guided by your emotions with our
              unique, mood-based travel analysis. Our website invites you to
              partake in adventures that harmonize with your spirit, awaiting
              your personal touch.
            </p>

            <p className="font-medium opacity-20 lg:w-4/5 lg:text-base xl:text-lg 2xl:text-xl 3xl:w-2/3 3xl:text-xl">
              Then explore our virtual gallery for a curated selection of global
              destinations, complete with beautiful visuals and key information
              to simplify your travel planning. It’s the ideal resource for
              inspiration or booking your next journey, offering a gateway to
              the world’s most rewarding experiences.
            </p>

            <p className="font-medium opacity-20 lg:w-4/5 lg:text-base xl:text-lg 2xl:text-xl 3xl:w-2/3 3xl:text-xl">
              If you find yourself captivated by the myriad ways in which people
              explore the world, then our blog is a must-visit for you. It’s
              packed with engaging travel tales and tips that ignite your desire
              to explore and help navigate your upcoming escapades.
            </p>
          </div>
        </div>
      </section>
      <section className="featured px-sect flex flex-col items-center lg:gap-28 xl:gap-32 2xl:gap-36 3xl:gap-40">
        <div className="flex w-fit flex-col gap-2">
          <h1 className="relative font-medium text-text-light lg:text-4xl xl:text-4.5xl 2xl:text-5xl 3xl:text-6xl">
            <span className="opacity-0">--</span>
            <i className="ri-shining-2-fill absolute -top-5p left-0 rotate-30 transform text-yellow lg:text-4.5xl xl:text-5xl 2xl:text-5.5xl 3xl:text-6.5xl"></i>{" "}
            Featured Destinations
          </h1>
          <span className="self-end font-medium lg:text-base xl:text-base 2xl:text-lg 3xl:text-lg">
            (Scroll)
          </span>
        </div>
        <div
          // ref={scrollRef}
          className="scroller pl-sect grid w-svw grid-flow-col gap-8 overflow-x-auto lg:auto-cols-2/5 2xl:auto-cols-0.35"
        >
          {featuredDemo.map((item, index) => (
            <div key={index} className="card h-svg flex flex-col gap-4 pb-8">
              <div
                className="h-0.75svh w-full rounded-lg"
                style={{
                  backgroundImage: `url(${item.img})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              ></div>
              <div className="flex flex-col lg:gap-1 xl:gap-1 2xl:gap-1 3xl:gap-1">
                <h2>{item.title}</h2>
                <span>({item.location})</span>
              </div>
            </div>
          ))}
        </div>
        <div className="flex w-full flex-row justify-between">
          <p className="font-medium lg:text-xl xl:text-xl 2xl:text-2xl 3xl:text-3xl">
            They are just so few among the{" "}
            <span className="font-semibold text-main-brown lg:text-xl xl:text-2xl 2xl:text-3xl 3xl:text-4xl">
              100
            </span>
            + <br />
            destinations that we have covered in our Catalogue.
          </p>

          <div className="relative flex items-end">
            <div className="blob blur-blob absolute z-0 h-full w-1/3"></div>
            <button title="navigate" className="btn btn-secondary z-5">
              discover them <img src={planeIcon} alt="" />
            </button>
          </div>
        </div>
      </section>
      <section className="px-sect inspired flex items-center justify-center lg:py-sect-semi 2xl:py-sect-semi">
        <div className="relative flex w-fit flex-col lg:gap-4 xl:gap-4 2xl:gap-5 3xl:gap-6">
          <div className="blob blur-blob absolute z-0 h-full w-1/2"></div>
          <h1 className="text-center font-medium leading-normal lg:text-4xl xl:text-4.5xl 2xl:text-5xl 3xl:text-6xl">
            We got inspired by travelers of <br />
            <span className="text-main-green">20</span>+ countries around the
            world
          </h1>
          <span className="self-end font-medium lg:text-base xl:text-base 2xl:text-lg 3xl:text-lg">
            (Maybe you are one)
          </span>
        </div>
      </section>
      <section className="globe grid items-center rounded-3xl lg:py-sect-medium 2xl:py-sect-medium">
        <EarthScene />
      </section>
      <section className="friends px-sect flex flex-col gap-16 py-sect-medium">
        <div className="flex flex-row items-end justify-between">
          <span className="font-medium leading-normal lg:text-4xl xl:text-4.5xl 2xl:text-5xl 3xl:text-6xl">
            and our friends.
          </span>
          <p className="font-medium lg:text-base xl:text-base 2xl:text-lg 3xl:text-lg">
            (Don't forget to visit them)
          </p>
        </div>
        <div className="flex flex-wrap justify-between gap-8">
          {friendsDemo?.map((item, index) => (
            <div
              key={index}
              className="min-w-1/5 max-w-0.23 flex flex-col items-center justify-center rounded-lg border-2 border-solid border-gray p-12"
            >
              <img src={item.imgLight} alt="" className="w-full" />
              {/* <span>{item.name}</span> */}
            </div>
          ))}
        </div>
      </section>
      <section className="hook px-sect py-sect-default">
        <p className="font-medium leading-normal lg:text-4xl xl:text-4.5xl 2xl:text-5xl 3xl:text-6xl">
          If you are still hesitant, <br />
          perhaps some of the articles below can help.
        </p>
      </section>
      <section className="blog rounded-3xl bg-main-brown py-sect-semi"></section>
      <section className="quote px-sect flex flex-col gap-4 py-sect-medium">
        <div className="h-0.5svh flex flex-row items-end justify-between">
          <h1 className="uppercase lg:text-5.5xl lg:font-bold lg:leading-tight xl:text-7.5xl xl:leading-tight 2xl:text-8xl 2xl:leading-snug 3xl:text-9xl 3xl:leading-snug">
            " To <i className="ri-footprint-fill"></i> <span className="uppercase text-main-green">travel</span> <br />
            is to <span className="uppercase text-main-brown">live</span> <i className="ri-sun-line"></i> "
          </h1>
          <span className="font-medium uppercase lg:text-xl xl:text-xl 2xl:text-2xl 3xl:text-3xl">
            - Hans Christian Andersen
          </span>
        </div>
        <div className="flex flex-row justify-end">
          <button className="btn btn-primary">Ready to start?</button>
        </div>
      </section>
    </main>
  );
};

export default Home;
