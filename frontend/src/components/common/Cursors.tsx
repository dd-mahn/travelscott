import React, { memo, useEffect } from "react";
import { motion } from "framer-motion";
import { debounce } from "lodash";

const Cursor = () => {
  const cursorRef = React.useRef<HTMLDivElement>(null);
  const [cursorPosition, setCursorPosition] = React.useState({
    x: 0,
    y: 0,
  });
  const [cursorState, setCursorState] = React.useState("default");

  useEffect(() => {
    const handleMouseMove = debounce((e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    }, 10);

    if (cursorRef.current) {
      document.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      if (cursorRef.current) {
        document.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, []);

  useEffect(() => {
    const handleMouseEvents = (e: MouseEvent) => {
      if (e.type === "mouseover") {
        if (
          e.target instanceof HTMLElement &&
          e.target.classList.contains("cursor-hover")
        ) {
          setCursorState("hover");
        } else if (
          e.target instanceof HTMLElement &&
          e.target.classList.contains("cursor-hover-link")
        ) {
          setCursorState("hoverLink");
        } else if (
          e.target instanceof HTMLAnchorElement ||
          e.target instanceof HTMLButtonElement ||
          (e.target instanceof HTMLElement &&
            e.target.classList.contains("cursor-hover-small")) ||
          e.target instanceof HTMLInputElement ||
          e.target instanceof HTMLTextAreaElement ||
          e.target instanceof HTMLSelectElement
        ) {
          setCursorState("hoverSmall");
        }
      } else if (e.type === "mouseout") {
        setCursorState("default");
      } else if (e.type === "mousedown") {
        if (cursorState === "hover") {
          setCursorState("hoverTap");
        } else {
          setCursorState("tap");
        }
      } else if (e.type === "mouseup") {
        setCursorState("default");
      }
    };

    document.addEventListener("mouseover", handleMouseEvents);
    document.addEventListener("mouseout", handleMouseEvents);
    document.addEventListener("mousedown", handleMouseEvents);
    document.addEventListener("mouseup", handleMouseEvents);

    return () => {
      document.removeEventListener("mouseover", handleMouseEvents);
      document.removeEventListener("mouseout", handleMouseEvents);
      document.removeEventListener("mousedown", handleMouseEvents);
      document.removeEventListener("mouseup", handleMouseEvents);
    };
  }, [cursorState]);

  const variants = {
    default: {
      x: cursorPosition.x - 16,
      y: cursorPosition.y - 16,
      width: 30,
      height: 30,
    },

    hover: {
      width: 80,
      height: 80,
      x: cursorPosition.x - 16,
      y: cursorPosition.y - 16,
    },

    hoverLink: {
      width: 80,
      height: 80,
      x: cursorPosition.x - 16,
      y: cursorPosition.y - 16,
    },

    hoverSmall: {
      width: 16,
      height: 16,
      x: cursorPosition.x - 16,
      y: cursorPosition.y - 16,
    },

    tap: {
      width: 12,
      height: 12,
      x: cursorPosition.x - 16,
      y: cursorPosition.y - 16,
    },

    hoverTap: {
      width: 60,
      height: 60,
      x: cursorPosition.x - 16,
      y: cursorPosition.y - 16,
    },
  };

  return (
    <motion.div
      variants={variants}
      animate={cursorState}
      ref={cursorRef}
      transition={{
        type: "spring",
        stiffness: 500,
        damping: 28,
      }}
      className={`pointer-events-none fixed z-50 grid place-items-center rounded-full ${cursorState === "hover" ? "bg-aurora-brown" : "bg-white mix-blend-difference dark:bg-black"}`}
    >
      {cursorState === "hover" && (
        <i className="span-medium ri-arrow-right-line text-text-light dark:text-text-dark"></i>
      )}
      {cursorState === "hoverLink" && (
        <i className="span-medium ri-arrow-right-up-line text-text-light dark:text-text-dark"></i>
      )}
    </motion.div>
  );
};

export default memo(Cursor);
