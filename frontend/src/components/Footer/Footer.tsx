import React from "react";
import "src/components/Footer/footer.css";
import { NavLink } from "react-router-dom";
import planeIcon from "src/assets/svg/plane-icon.svg";
import footerVideo from "src/assets/videos/footer.mp4";

const sitemap = [
  {
    path: "/",
    display: "Home",
  },
  {
    path: "/about",
    display: "About",
  },
  {
    path: "/discover",
    display: "Discover",
  },
  {
    path: "/inspiration",
    display: "Inspiration",
  },
  {
    path: "/contact",
    display: "Contact",
  },
];

const socials = [
  {
    path: "/",
    display: "ProductHunt",
  },
  {
    path: "/",
    display: "Twitter",
  },
  {
    path: "/",
    display: "Instagram",
  },
  {
    path: "/",
    display: "Facebook",
  },
];

const otherLinks = [
  {
    path: "/privacy",
    display: "Privacy Policy",
  },
];

const Footer = () => {
  return (
    <footer className="flex flex-col self-end border-t border-solid border-gray xl:pt-20 2xl:pt-20">
      <div className="px-sect flex items-end justify-between">
        <p>
          Made and curated by people with <br />
          passion in travel, Travel, and TRAVEL.
        </p>
        <div className="border-b border-solid border-text-light">
          <label htmlFor="subscribe-email" className="uppercase">
            Email address
          </label>
          <input
            type="email"
            id="subscribe-email"
            className="border-0 bg-transparent focus:outline-none"
          />
          <button title="subscribe">
            {" "}
            <img src={planeIcon} alt="" />{" "}
          </button>
        </div>
      </div>

      <div className="px-sect flex items-end justify-between">
        <div className="flex lg:gap-8 xl:gap-10 2xl:gap-12 3xl:gap-12">
          <nav className="flex flex-col lg:gap-2 2xl:gap-4">
            <span className="font-medium text-text-light lg:text-lg 2xl:text-xl">
              Sitemap
            </span>
            <ul className="flex flex-col justify-start">
              {sitemap.map((item, index) => (
                <li key={index}>
                  <NavLink to={item.path}>{item.display}</NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="flex flex-col lg:gap-2 2xl:gap-4">
            <span className="font-medium text-text-light lg:text-lg 2xl:text-xl">
              Socials
            </span>
            <ul className="flex flex-col justify-start">
              {socials.map((item, index) => (
                <li key={index}>
                  <NavLink to={item.path}>{item.display}</NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <button className="underline-btn" onClick={() => window.scrollTo(0, 0)}>
          Back to top <i className="ri-arrow-up-line"></i>
        </button>
      </div>

      <div className="flex justify-center border-t border-solid border-gray">
        {/* <video
          autoPlay
          muted
          loop
          src={footerVideo}
          className="absolute left-0 top-0 h-full w-full object-cover"
        ></video> */}
        <h1 className="font-kaushan select-none text-text-light lg:mr-16 2xl:mr-32 lg:text-8xl xl:text-13xl 2xl:text-14xl 3xl:text-15xl">TravelScott</h1>
      </div>

      <div className="px-sect flex flex-row items-center justify-between border-t border-solid border-gray lg:h-8 2xl:h-10">
        <span className="select-none font-medium uppercase text-gray lg:text-base xl:text-sm 2xl:text-lg">
          Copyright TravelScott 2024
        </span>
        <nav>
          <ul className="flex flex-row justify-start">
            {otherLinks.map((item, index) => (
              <li key={index}>
                <NavLink to={item.path}>{item.display}</NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
