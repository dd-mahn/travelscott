import React from "react";
import "src/styles/home.css";
import airplane1 from "src/assets/svg/airplane-1.svg";
import airplane2 from "src/assets/svg/airplane-2.svg";
import airplane3 from "src/assets/svg/airplane-3.svg";

const Home: React.FC = () => {
  return (
    <main className="home flex flex-col">
      <section className="hero px-sect relative flex h-screen flex-col justify-center lg:gap-6 xl:gap-8 2xl:gap-8 3xl:gap-8">
        <div className="blob-1 blur-blob h-1/3 w-1/3"></div>
        <div className="blob-2 blur-blob h-3/5 w-3/5"></div>

        <div className="airplane-1 absolute">
          <img src={airplane1}  alt="" />
          <div className="blob-3 blur-blob h-1/3"></div>
        </div>
        <img src={airplane2} className="airplane-2 absolute" alt="" />
        <img src={airplane3} className="airplane-3 absolute" alt="" />

        <h1 className="uppercase z-15 lg:text-4.5xl lg:leading-tight xl:text-5.5xl lg:font-bold xl:leading-tight 2xl:leading-snug 3xl:leading-snug 2xl:text-6.5xl 3xl:text-7.5xl">
          <i className="ri-shining-2-fill text-yellow lg:text-5.5xl xl:text-6xl 2xl:text-6.5xl 3xl:text-7xl"></i>{" "}
          From your new <br></br>
          favorite{" "}
          <span className="uppercase text-main-green">travel guide</span>{" "}
          <br></br>
          to{" "}
          <span className="border-b-4 border-solid border-text-light dark:border-text-dark">
            unforgettable
          </span>{" "}
          <span className="uppercase text-main-brown">experience</span>.
        </h1>

        <p className="font-medium lg:w-2/5 x:w-2/5 2xl:w-1/3 3xl:w-1/3 lg:text-base xl:text-lg 2xl:text-xl 3xl:text-xl">
          From the smallest idea to the most memorable journeys. Join us to
          awaken your traveling spirit and discover the adventurer within you.
        </p>

        <div className="flex flex-row lg:gap-4 xl:gap-4 2xl:gap-6 3xl:gap-8">
          <button className="btn btn-primary">Get started</button>
          <button className="btn btn-secondary">Learn more</button>
        </div>
      </section>
    </main>
  );
};

export default Home;
