import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HoverVariants,
  TapVariants,
  VisibilityVariants,
} from "src/utils/variants";

const variants = {
  hiddenY: VisibilityVariants.hiddenY,
  hiddenFullY: VisibilityVariants.hiddenFullY,
  visible: VisibilityVariants.visible,
  hoverScale: HoverVariants.hoverScale,
  hoverX: HoverVariants.hoverX,
  tapScale: TapVariants.tapScale,
};

const DestinationMenu = () => {
  const [menuBoardOpen, setMenuBoardOpen] = useState<boolean>(false);
  const menuBoardRef = useRef<HTMLDivElement>(null);

  const toggleMenuBoard = useCallback(() => {
    setMenuBoardOpen((prev) => !prev);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        menuBoardRef.current &&
        !menuBoardRef.current.contains(e.target as Node)
      ) {
        setMenuBoardOpen(false);
      }
    };

    if (menuBoardOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuBoardOpen]);

  return (
    <div className="relative flex w-1/2 justify-end">
      <motion.button
        variants={variants}
        whileHover="hoverScale"
        whileTap="tapScale"
        initial="hiddenY"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{
          duration: 0.5,
        }}
        title="open-menu"
        onClick={toggleMenuBoard}
        className="dark:bg-background-dark-transparent rounded-full bg-background-dark shadow-component dark:shadow-component-dark lg:h-12 lg:w-12 xl:h-12 xl:w-12 2xl:h-16 2xl:w-16 3xl:h-16 3xl:w-16"
      >
        <i className="cursor-hover-small ri-menu-5-line p-large m-auto text-text-dark"></i>
      </motion.button>

      <AnimatePresence mode="wait">
        {menuBoardOpen && (
          <motion.div
            key="menu-board"
            ref={menuBoardRef}
            initial="hiddenY"
            animate="visible"
            exit="hiddenY"
            variants={variants}
            transition={{ duration: 0.5 }}
            className={`menu-board absolute right-0 top-[10%] z-10 flex w-2/5 flex-col items-center gap-2 rounded-xl bg-background-light px-8 pb-12 pt-4 shadow-component dark:bg-background-dark dark:shadow-component-dark`}
          >
            <p className="p-large font-prima uppercase">Table of content</p>
            <span className="span-small">
              If this is your first time, don't use this!
            </span>
            <div className="mt-6 flex w-full flex-col gap-4">
              <motion.a
                variants={variants}
                whileHover="hoverX"
                transition={{ duration: 0.3 }}
                href="#overview"
                className="p-medium cursor-hover-small"
              >
                1. Overview
              </motion.a>
              <motion.a
                variants={variants}
                whileHover="hoverX"
                transition={{ duration: 0.3 }}
                href="#additional"
                className="p-medium cursor-hover-small"
              >
                2. Needy information
              </motion.a>
              <motion.a
                variants={variants}
                whileHover="hoverX"
                transition={{ duration: 0.3 }}
                href="#transportation"
                className="p-medium cursor-hover-small"
              >
                3. Transportation
              </motion.a>
              <motion.a
                variants={variants}
                whileHover="hoverX"
                transition={{ duration: 0.3 }}
                href="#places"
                className="p-medium cursor-hover-small"
              >
                4. Places
              </motion.a>
              <motion.a
                variants={variants}
                whileHover="hoverX"
                transition={{ duration: 0.3 }}
                href="#insight"
                className="p-medium cursor-hover-small"
              >
                5. Insight
              </motion.a>
              <motion.a
                variants={variants}
                whileHover="hoverX"
                transition={{ duration: 0.3 }}
                href="#summary"
                className="p-medium cursor-hover-small"
              >
                6. Summary
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default memo(DestinationMenu);
