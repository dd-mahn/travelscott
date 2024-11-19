import React, { memo, useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link, NavLink } from "react-router-dom";
import { BlobVariants, VisibilityVariants } from "src/utils/constants/variants";
import ThemeButton from "src/components/Header/Components/ThemeButton";
import { useViewportWidth } from "src/hooks/useViewportWidth/useViewportWidth";
import { useScrollLock } from "src/hooks/useScrollLock/useScrollLock";
import ReactDOM from "react-dom";

// Navigation links
const navs = [
  { path: "/", display: "Home" },
  { path: "/about", display: "About" },
  { path: "/discover", display: "Discover" },
  { path: "/inspiration", display: "Inspiration" },
  { path: "/contact", display: "Contact" },
];

// Social media links
const socials = [
  { path: "/", display: "ProductHunt" },
  { path: "/", display: "Twitter" },
  { path: "/", display: "Instagram" },
  { path: "/", display: "Facebook" },
];

const HeaderMobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const viewportWidth = useViewportWidth();
  const menuRef = useRef<HTMLDivElement>(null);
  
  useScrollLock(isOpen);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  if (viewportWidth >= 768) return null;

  return (
    <>
      <motion.button
        onClick={toggleMenu}
        title="Open Menu"
        data-testid="open-menu-button"
        className="flex items-center justify-center rounded-md bg-background-light px-2 py-1"
      >
        <i className="ri-menu-line text-xl text-text-light dark:text-text-light"></i>
      </motion.button>

      {isOpen && (
        <Portal>
          <AnimatePresence mode="wait">
            <motion.div
              ref={menuRef}
              variants={VisibilityVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              transition={{ duration: 0.3 }}
              className="fixed left-0 top-0 z-[100] h-[100dvh] px-8 w-screen bg-background-light dark:bg-background-dark"
              style={{ isolation: 'isolate' }}
            >
              <div className="flex w-full justify-between border-b pt-4 border-text-light pb-4 dark:border-text-dark">
                <ThemeButton />
                <motion.button
                  onClick={toggleMenu}
                  title="Close Menu"
                  data-testid="close-menu-button"
                  className="flex h-fit w-fit items-center justify-center rounded-md bg-background-dark px-2 py-1 dark:bg-background-light"
                >
                  <i className="ri-close-line text-xl text-text-dark dark:text-text-light"></i>
                </motion.button>
              </div>

              <div className="flex w-full justify-between pt-8">
                <ul className="z-10 flex flex-col gap-4">
                  {navs.map((nav, index) => (
                    <li key={index} className="h-fit w-fit overflow-hidden">
                      <motion.div
                        variants={VisibilityVariants}
                        initial="hiddenFullY"
                        animate="visible"
                        onClick={toggleMenu}
                        transition={{ duration: 0.5, delay: index * 0.2 }}
                      >
                        <NavLink
                          to={nav.path}
                          className="h1-md leading-[0.8] text-text-light dark:text-text-dark"
                        >
                          {nav.display}
                        </NavLink>
                      </motion.div>
                    </li>
                  ))}
                </ul>

                <ul className="z-10 flex flex-col items-end gap-2">
                  {socials.map((social, index) => (
                    <li key={index} className="h-fit w-fit overflow-hidden">
                      <motion.div
                        variants={VisibilityVariants}
                        initial="hiddenFullY"
                        animate="visible"
                        transition={{ duration: 0.5, delay: index * 0.2 }}
                      >
                        <Link
                          target="_blank"
                          to={social.path}
                          className="h3-md text-text-light dark:text-text-dark"
                        >
                          {social.display}
                        </Link>
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
          </AnimatePresence>
        </Portal>
      )}
    </>
  );
};

// Create a Portal component to handle the ReactDOM.createPortal
const Portal: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mounted, setMounted] = useState(false);
  const el = useRef(document.createElement('div'));

  useEffect(() => {
    setMounted(true);
    document.body.appendChild(el.current);
    return () => {
      document.body.removeChild(el.current);
    };
  }, []);

  if (!mounted) return null;
  return ReactDOM.createPortal(children, el.current);
};

export default memo(HeaderMobileMenu);
