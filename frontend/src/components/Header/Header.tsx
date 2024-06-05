import React from "react";
import "remixicon/fonts/remixicon.css";
import "src/components/Header/header.css";
import { NavLink } from "react-router-dom";

const navs = [
  {
    path: "/about",
    display: "About",
  },
  {
    path: "/discover",
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

const Header = () => {
  return (
    <header className="px-sect fixed top-0 z-50 min-h-16 w-svw bg-transparent py-4 mix-blend-difference">
      <div className="lg:flex lg:items-center lg:justify-between">
        <NavLink to={"/"}>
          <h1 className="font-kaushan">TravelScott</h1>
        </NavLink>
        <nav>
          <ul className="lg:flex lg:flex-row lg:justify-between">
            {navs.map((item, index) => (
              <li className="nav__item" key={index}>
                <NavLink to={item.path}>{item.display}</NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className="lg:flex lg:gap-2 xl:gap-3 2xl:gap-3 3xl:gap-4">
          <button title="Search">
            <i className="ri-search-2-line"></i>
          </button>
          <button title="Toggle Contrast">
            <i className="ri-contrast-2-fill"></i>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
