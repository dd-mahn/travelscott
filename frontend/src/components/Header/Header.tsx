import React, { useMemo, memo } from "react";
import { NavLink } from "react-router-dom";
import "remixicon/fonts/remixicon.css";
import { motion } from "framer-motion";

// Styles and components
import "src/styles/header.css";
import {
  HeaderVariants,
  HoverVariants,
} from "../../utils/constants/headerVariants";
import HeaderSearch from "./Components/HeaderSearch";
import ThemeButton from "./Components/ThemeButton";
import HeaderMobileMenu from "./Components/HeaderMobileMenu";

// Navigation items
const navs = [
  { path: "/about", display: "About" },
  { path: "/discover", display: "Discover" },
  { path: "/inspiration", display: "Inspiration" },
  { path: "/contact", display: "Contact" },
];

// Header component
const Header: React.FC = () => {
  // Memoize the navigation items to avoid unnecessary re-renders
  const renderNavItems = useMemo(
    () =>
      navs.map((item, index) => (
        <motion.li
          key={index}
          variants={HoverVariants}
          whileHover="hoverScale"
          transition={{ duration: 0.2 }}
          whileTap={{ scale: 1 }}
          className="nav__item h-fit w-fit"
        >
          <NavLink
            to={item.path}
            target="_top"
            className={({ isActive, isPending }) =>
              isPending
                ? "p-regular opacity-40"
                : isActive
                  ? "p-regular"
                  : "p-regular opacity-40 transition-opacity duration-300 hover:opacity-100"
            }
          >
            {item.display}
          </NavLink>
        </motion.li>
      )),
    [],
  );

  return (
    <motion.header
      variants={HeaderVariants}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.3 }}
      className="px-sect fixed top-0 z-50 min-h-16 w-svw bg-transparent py-4 mix-blend-difference"
    >
      <div className="flex items-center justify-between">
        {/* Logo */}
        <NavLink to="/" target="_top">
          <motion.h1
            layoutId="main-logo"
            variants={HoverVariants}
            whileHover="hoverScale"
            transition={{ duration: 0.2 }}
            whileTap={{ scale: 1 }}
            className="cursor-hover-small p-large font-logo"
          >
            TravelScott
          </motion.h1>
        </NavLink>

        {/* Navigation menu */}
        <motion.ul
          layout
          className="hidden md:flex md:justify-between md:gap-4 lg:gap-4 xl:gap-6 2xl:gap-8 3xl:gap-8"
        >
          {renderNavItems}
        </motion.ul>

        {/* Search and contrast toggle */}
        <div className="hidden md:flex md:gap-2 lg:gap-2 xl:gap-3 2xl:gap-3 3xl:gap-4">
          <HeaderSearch />
          <ThemeButton />
        </div>

        {/* Menu button for mobile view */}
        <div className="flex gap-4 md:hidden">
          <HeaderSearch />
          <HeaderMobileMenu />
        </div>
      </div>
    </motion.header>
  );
};

export default memo(Header);
