import React from "react";

import "src/styles/home.css";
import airplane1 from "src/assets/svg/airplane-1.svg";
import airplane2 from "src/assets/svg/airplane-2.svg";
import airplane3 from "src/assets/svg/airplane-3.svg";
import briefVideo from "src/assets/videos/brief.mp4";

const Home: React.FC = () => {
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
      <section className="brief px-sect xl:py-sect-semi flex flex-col lg:gap-36 lg:py-sect-medium xl:gap-48 2xl:gap-64 2xl:py-sect-long 3xl:gap-80 3xl:py-sect-long">
        <div className="flex min-h-40 flex-row items-center lg:gap-28 xl:gap-28 2xl:gap-44 3xl:gap-60">
          <img src={airplane1} alt="" className="rotate-30 transform" />
          <p className="font-medium text-text-light lg:text-4xl xl:text-4.5xl 2xl:text-5xl 3xl:text-6xl">
            A <span className="text-main-green">Comprehensive Catalogue</span>{" "}
            of <br></br>
            Destinations with Tailored Travel Insights.
          </p>
        </div>
        <div className="3xl:h-2svh 2xl:h-2svh xl:h-1.75svh lg:h-2.25svh relative flex lg:flex-row lg:gap-20 xl:gap-28 2xl:gap-32 3xl:gap-40">
          <div className="sticky top-0 z-0 h-svh rounded-lg">
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
    </main>
  );
};

export default Home;
