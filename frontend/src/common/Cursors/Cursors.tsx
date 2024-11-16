import React, { memo, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { debounce } from "lodash";
import { useViewportWidth } from "src/hooks/useViewportWidth/useViewportWidth";

// Define cursor states
type CursorState =
  | "default"
  | "hover"
  | "hoverLink"
  | "hoverSmall"
  | "tap"
  | "hoverTap"
  | "disabled";

const Cursor = () => {
  const viewportWidth = useViewportWidth();
  const cursorRef = useRef<HTMLDivElement>(null);
  const [cursorPosition, setCursorPosition] = useState({ x: -100, y: -100 });
  const [cursorState, setCursorState] = useState<CursorState>("default");

  // Handle mouse movement
  useEffect(() => {
    const handleMouseMove = debounce((e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    }, 10);

    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Handle iframe mouse events
  useEffect(() => {
    const handleIframeMouseEnter = async () => {
      await Promise.resolve(setCursorState("disabled"));
    };
    const handleIframeMouseLeave = async () => {
      await Promise.resolve(setCursorState("default"));
    };

    const addIframeListeners = () => {
      const iframes = document.querySelectorAll("iframe");
      iframes.forEach((iframe) => {
        iframe.addEventListener("mouseenter", handleIframeMouseEnter);
        iframe.addEventListener("mouseleave", handleIframeMouseLeave);
      });
    };

    const removeIframeListeners = () => {
      const iframes = document.querySelectorAll("iframe");
      iframes.forEach((iframe) => {
        iframe.removeEventListener("mouseenter", handleIframeMouseEnter);
        iframe.removeEventListener("mouseleave", handleIframeMouseLeave);
      });
    };

    addIframeListeners();

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "childList") {
          removeIframeListeners();
          addIframeListeners();
        }
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      removeIframeListeners();
      observer.disconnect();
    };
  }, []);

  // Handle cursor state changes based on mouse events
  useEffect(() => {
    const handleMouseEvents = async (e: MouseEvent) => {
      if (e.target instanceof HTMLElement) {
        const target = e.target;
        switch (e.type) {
          case "mouseover":
            if (target.classList.contains("cursor-disabled")) {
              await Promise.resolve(setCursorState("disabled"));
            } else if (target.classList.contains("cursor-hover")) {
              await Promise.resolve(setCursorState("hover"));
            } else if (target.classList.contains("cursor-hover-link")) {
              await Promise.resolve(setCursorState("hoverLink"));
            } else if (
              target instanceof HTMLAnchorElement ||
              target instanceof HTMLButtonElement ||
              target.classList.contains("cursor-hover-small") ||
              target instanceof HTMLInputElement ||
              target instanceof HTMLTextAreaElement ||
              target instanceof HTMLSelectElement
            ) {
              await Promise.resolve(setCursorState("hoverSmall"));
            }
            break;
          case "mouseout":
            await Promise.resolve(setCursorState("default"));
            break;
          case "mousedown":
            await Promise.resolve(
              setCursorState((prevState) =>
                prevState === "hover" ? "hoverTap" : "tap",
              ),
            );
            break;
          case "mouseup":
            await Promise.resolve(setCursorState("default"));
            break;
        }
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
  }, []);

  // Define animation variants for different cursor states
  const variants = {
    default: {
      x: cursorPosition.x - 16,
      y: cursorPosition.y - 16,
      width: "2svw",
      height: "2svw",
    },
    hover: {
      width: "5svw",
      height: "5svw",
      x: cursorPosition.x - 16,
      y: cursorPosition.y - 16,
    },
    hoverLink: {
      width: "5svw",
      height: "5svw",
      x: cursorPosition.x - 16,
      y: cursorPosition.y - 16,
    },
    hoverSmall: {
      width: "1svw",
      height: "1svw",
      x: cursorPosition.x - 16,
      y: cursorPosition.y - 16,
    },
    tap: {
      width: "0.75svw",
      height: "0.75svw",
      x: cursorPosition.x - 16,
      y: cursorPosition.y - 16,
    },
    hoverTap: {
      width: "3svw",
      height: "3svw",
      x: cursorPosition.x - 16,
      y: cursorPosition.y - 16,
    },
    disabled: {
      width: "0",
      height: "0",
      x: cursorPosition.x - 16,
      y: cursorPosition.y - 16,
      opacity: 0,
    },
  };

  return (
    <>
      {viewportWidth > 768 && (
        <motion.div
          data-testid="cursor"
          variants={variants}
          animate={cursorState}
          data-animate={cursorState}
          ref={cursorRef}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 28,
          }}
          className={`pointer-events-none fixed z-[1000] grid place-items-center rounded-full ${
            cursorState === "hover"
              ? "bg-aurora-brown dark:bg-dark-brown"
              : "bg-white mix-blend-difference"
          }`}
        >
          {cursorState === "hover" && (
            <i
              data-testid="ri-arrow-right-line"
              className="span-medium ri-arrow-right-line text-text-light dark:text-text-dark"
            ></i>
          )}
          {cursorState === "hoverLink" && (
            <i
              data-testid="ri-arrow-right-up-line"
              className="span-medium ri-arrow-right-up-line text-text-light dark:text-text-dark"
            ></i>
          )}
        </motion.div>
      )}
    </>
  );
};

export default memo(Cursor);
