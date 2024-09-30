import React, { useMemo, memo } from "react";
import { NavLink } from "react-router-dom";
import "remixicon/fonts/remixicon.css";
import { motion } from "framer-motion";

// Styles and components
import "src/components/Header/header.css";
import { HeaderVariants, HoverVariants } from "./headerVariants";
import HeaderSearch from "./HeaderSearch";
import ThemeButton from "./ThemeButton";
import HeaderMobileMenu from "./HeaderMobileMenu";

// Navigation items
const navs = [
  { path: "/about", display: "About" },
  { path: "/discover", display: "Discover" },
  { path: "/inspiration", display: "Inspiration" },
  { path: "/contact", display: "Contact" },
];

// Header component
const Header: React.FC = () => {
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
      <div className="sm:flex sm:items-center sm:justify-between">
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
          className="sm:hidden md:flex md:gap-2 lg:flex lg:flex-row lg:justify-between lg:gap-4 xl:gap-6 2xl:gap-8 3xl:gap-8"
        >
          {renderNavItems}
        </motion.ul>

        {/* Search and contrast toggle */}
        <div className="sm:hidden md:flex md:gap-2 lg:flex lg:gap-2 xl:gap-3 2xl:gap-3 3xl:gap-4">
          <HeaderSearch />

          <ThemeButton />
        </div>

        {/* Menu button */}
        <HeaderMobileMenu />
      </div>
    </motion.header>
  );
};

export default memo(Header);
