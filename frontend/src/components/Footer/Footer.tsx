import React from "react";
import "src/components/Footer/footer.css";
import { NavLink } from "react-router-dom";

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
    path: "/destinations",
    display: "Discover",
  },
  {
    path: "/insight",
    display: "Insight",
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

const Footer = () => {
  return (
    <footer className="px-sect flex flex-col self-end border-t-2 border-solid border-text-light pb-8 lg:pt-20 xl:pt-20 2xl:pt-sect-default 3xl:pt-sect-default">
      <div className="flex justify-center">
        <h1 className="font-kaushan text-main-green">TravelScott</h1>
      </div>

      <div className="flex justify-between">
        <div className="flex flex-col justify-end lg:gap-2 xl:gap-2 2xl:gap-3 3xl:gap-4">
          <button
            className="underline__btn"
            onClick={() => window.scrollTo(0, 0)}
          >
            Back to top <i className="ri-arrow-up-line"></i>
          </button>
          <p>
            An application made by people <br></br> with travel and creative
            passion.
          </p>
        </div>

        <div className="flex lg:gap-8 xl:gap-10 2xl:gap-12 3xl:gap-12">
          <nav>
            <ul className="flex flex-col justify-start">
              {sitemap.map((item, index) => (
                <li key={index}>
                  <NavLink to={item.path}>{item.display}</NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <nav>
            <ul className="flex flex-col justify-start">
              {socials.map((item, index) => (
                <li key={index}>
                  <NavLink to={item.path}>{item.display}</NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
