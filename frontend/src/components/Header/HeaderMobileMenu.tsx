import React, { memo, useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import ReactDOM from "react-dom";
import { HoverVariants } from "./headerVariants";
import { BlobVariants, VisibilityVariants } from "src/utils/variants";
import ThemeButton from "./ThemeButton";

const navs = [
  { path: "/", display: "Home" },
  { path: "/about", display: "About" },
  { path: "/discover", display: "Discover" },
  { path: "/inspiration", display: "Inspiration" },
  { path: "/contact", display: "Contact" },
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

const HeaderMobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.height = "100vh";
    } else {
      document.body.style.overflow = "";
      document.body.style.height = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.height = "";
    };
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="md:hidden">
      {!isOpen && (
        <motion.button
          layoutId="menu-toggle-button"
          onClick={toggleMenu}
          title="Menu"
          className="flex items-center justify-center rounded-md bg-background-light px-2 py-1"
        >
          <i
            className={`ri-menu-line text-xl text-text-light dark:text-text-light`}
          ></i>
        </motion.button>
      )}
      {ReactDOM.createPortal(
        <AnimatePresence mode="wait">
          {isOpen && (
            <motion.div
              variants={VisibilityVariants}
              key={`mobile-menu-${isOpen}`}
              initial="hidden"
              animate="visible"
              exit="hidden"
              transition={{ duration: 0.5, delayChildren: 0.25 }}
              className="px-sect fixed left-0 top-0 z-50 flex h-full w-screen flex-col gap-12 rounded-md bg-background-light py-4 dark:bg-background-dark"
            >
              <div className="flex w-full justify-between border-b border-text-light pb-4 dark:border-text-dark">
                <ThemeButton />

                <motion.button
                  layoutId="menu-toggle-button"
                  onClick={toggleMenu}
                  title="Menu"
                  className="flex h-fit w-fit items-center justify-center rounded-md bg-background-dark px-2 py-1 dark:bg-background-light"
                >
                  <i
                    className={`ri-close-line text-xl text-text-dark dark:text-text-light`}
                  ></i>
                </motion.button>
              </div>

              <div className="flex w-full justify-between">
                <ul className="flex flex-col gap-4">
                  {navs.map((nav, index) => (
                    <li key={index} className="h-fit w-fit overflow-hidden">
                      <motion.div
                        variants={VisibilityVariants}
                        initial="hiddenFullY"
                        animate="visible"
                        transition={{ duration: 0.5, delay: index * 0.2 }}
                        className=""
                      >
                        <NavLink
                          to={nav.path}
                          target="_top"
                          className="h1-md text-text-light dark:text-text-dark"
                        >
                          {nav.display}
                        </NavLink>
                      </motion.div>
                    </li>
                  ))}
                </ul>

                <ul className="flex flex-col gap-2 items-end">
                  {socials.map((social, index) => (
                    <li key={index} className="h-fit w-fit overflow-hidden">
                      <motion.div
                        variants={VisibilityVariants}
                        initial="hiddenFullY"
                        animate="visible"
                        transition={{ duration: 0.5, delay: index * 0.2 }}
                        className=""
                      >
                        <NavLink
                          to={social.path}
                          target="_top"
                          className="h3-md text-text-light dark:text-text-dark"
                        >
                          {social.display}
                        </NavLink>
                      </motion.div>
                    </li>
                  ))}
                </ul>
              </div>

              <motion.div
                variants={BlobVariants}
                initial="blob"
                animate="blob"
                className="blur-blob blob-brown left-0 top-[5%] z-0 h-1/3 w-1/3 opacity-100"
              ></motion.div>
              <motion.div
                variants={BlobVariants}
                initial="blob"
                animate="blob"
                className="blur-blob blob-green right-0 top-[20%] z-0 h-1/3 w-1/3 opacity-100"
              ></motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </div>
  );
};

export default memo(HeaderMobileMenu);
