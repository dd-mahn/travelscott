import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HoverVariants,
  TapVariants,
  VisibilityVariants,
} from "src/utils/variants";

// Define animation variants
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

  // Toggle menu board visibility
  const toggleMenuBoard = useCallback(() => {
    setMenuBoardOpen((prev) => !prev);
  }, []);

  // Close menu board if clicked outside
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
        transition={{ duration: 0.5 }}
        title="open-menu"
        onClick={toggleMenuBoard}
        className="dark:bg-background-dark-transparent rounded-full bg-background-dark shadow-component dark:shadow-component-dark h-12 w-12 md:h-10 md:w-10 lg:h-12 lg:w-12 xl:h-12 xl:w-12 2xl:h-16 2xl:w-16 3xl:h-16 3xl:w-16"
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
            className="menu-board absolute right-0 top-[10%] z-10 flex w-[50svw] md:w-2/5 flex-col items-center gap-1 rounded-xl bg-background-light px-6 py-4 md:px-8 md:pb-12 md:pt-4 shadow-component dark:bg-background-dark dark:shadow-component-dark"
          >
            <p className="h3-md uppercase">Table of content</p>
            <span className="span-small">
              If this is your first time, don't use this!
            </span>
            <div className="mt-6 flex w-full flex-col gap-2 md:gap-4">
              {[
                { href: "#overview", text: "1. Overview" },
                { href: "#additional", text: "2. Needy information" },
                { href: "#transportation", text: "3. Transportation" },
                { href: "#places", text: "4. Places" },
                { href: "#insight", text: "5. Insight" },
                { href: "#summary", text: "6. Summary" },
              ].map((item, index) => (
                <motion.a
                  key={index}
                  variants={variants}
                  whileHover="hoverX"
                  transition={{ duration: 0.3 }}
                  href={item.href}
                  className="p-medium cursor-hover-small"
                >
                  {item.text}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default memo(DestinationMenu);
