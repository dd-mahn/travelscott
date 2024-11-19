import React, { useMemo, memo } from "react";
import { NavLink } from "react-router-dom";
import "remixicon/fonts/remixicon.css";
import { motion } from "framer-motion";
import { useViewportWidth } from "src/hooks/useViewportWidth/useViewportWidth";

// Styles and components
import "src/styles/components/header.css";
import {
  HeaderVariants,
  HoverVariants,
} from "src/utils/constants/headerVariants";
import HeaderSearch from "src/components/Header/Components/HeaderSearch";
import ThemeButton from "src/components/Header/Components/ThemeButton";
import HeaderMobileMenu from "src/components/Header/Components/HeaderMobileMenu";

// Navigation items
const navs = [
  { path: "/about", display: "About" },
  { path: "/discover", display: "Discover" },
  { path: "/inspiration", display: "Inspiration" },
  { path: "/contact", display: "Contact" },
];

// Header component
const Header: React.FC = () => {
  const viewportWidth = useViewportWidth();
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
        <NavLink to="/" 
        >
          <motion.h1
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
        {viewportWidth >= 768 && (
          <motion.ul
            className="flex justify-between gap-4 lg:gap-4 xl:gap-6 2xl:gap-8 3xl:gap-8"
          >
            {renderNavItems}
          </motion.ul>
        )}

        {/* Search and contrast toggle */}
        {viewportWidth >= 768 && (
          <div className="flex gap-2 lg:gap-2 xl:gap-3 2xl:gap-3 3xl:gap-4">
            <HeaderSearch />
            <ThemeButton />
          </div>
        )}

        {/* Menu button for mobile view */}
        {viewportWidth < 768 && (
          <div className="flex gap-4">
            <HeaderSearch />
            <HeaderMobileMenu />
          </div>
        )}
      </div>
    </motion.header>
  );
};

export default memo(Header);
