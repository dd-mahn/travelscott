import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";
import "src/styles/home.css";

// Components
import Hero from "./HomeComponents/Hero";
import Brief from "./HomeComponents/Brief";
import Featured from "./HomeComponents/Featured";
import Starter from "./HomeComponents/Starter";
import Articles from "./HomeComponents/Articles";
import Inspired from "./HomeComponents/Inspired";
import Globe from "./HomeComponents/Globe";

const Home: React.FC = () => {
  const navigate = useNavigate();

  // Handle featured section horizontal scroll
  return (
    <main className="home flex flex-col">
      {/* HERO SECTION */}
      <Hero />

      {/* BRIEF SECTION */}
      <Brief />

      {/* FEATURED DESTINATION SECTION */}
      <Featured />

      {/* STACKED SECTIONS CONTAINER, CONTAINING: INSPIRED, GLOBE, BLOGS, STARTER BLOGS */}
      <section className="stacked relative lg:pt-sect-default 2xl:pt-sect-semi">
        {/* INSPIRED SECTION */}

        <div className="sticky top-0 z-0">
          <Inspired />
        </div>

        {/* GLOBE SECTION */}

        <div className="z-5 sticky -top-[5%] left-0">
          <Globe />
        </div>

        {/* FEATURED BLOGS SECTION */}

        <Articles />

        {/* STARTER HOOK SECTION */}

        <div className="sticky left-0 top-0 z-20 bg-background-light">
          <section className="hook px-sect pb-sect-semi pt-sect-default">
            <p className="h2-inter">
              If you are still hesitant, <br />
              perhaps some of the articles below can help.
            </p>
          </section>
        </div>

        {/* STARTER SECTION */}

        <div className="sticky left-0 top-0 z-30">
          <Starter />
        </div>
      </section>

      {/* QUOTE SECTION */}

      <section className="quote px-sect flex flex-col gap-4 lg:py-sect-default 2xl:py-sect-medium">
        <div className="flex h-fit flex-row items-end justify-between">
          <h1 className="big-heading">
            " To <i className="ri-footprint-fill"></i>{" "}
            <span className="uppercase text-main-green">travel</span> <br />
            is to <span className="uppercase text-main-brown">live</span>{" "}
            <i className="ri-sun-line"></i> "
          </h1>
          <span className="p-medium uppercase">- Hans Christian Andersen</span>
        </div>
        <div className="flex flex-row justify-end">
          <button
            className="btn btn-primary"
            onClick={() => navigate("/contact")}
          >
            Have any questions?
          </button>
        </div>
      </section>
    </main>
  );
};

export default Home;
