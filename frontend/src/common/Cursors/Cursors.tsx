import React, { useEffect, useRef, useState } from "react";
import { debounce } from "lodash";
import { useViewportWidth } from "src/hooks/useViewportWidth/useViewportWidth";
import { selectIsDarkMode } from "src/store/slices/themeSlice";
import { useSelector } from "react-redux";

// Define cursor states
type CursorState =
  | "default"
  | "hover"
  | "hoverLink"
  | "hoverSmall"
  | "tap"
  | "hoverTap"
  | "disabled";

interface CursorPosition {
  x: number;
  y: number;
}

class CursorRenderer {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private currentPosition: CursorPosition;
  private targetPosition: CursorPosition;
  private currentSize: number;
  private targetSize: number;
  public state: CursorState;
  private isDark: boolean;
  private animationFrame: number = 0;

  constructor(isDark: boolean) {
    this.canvas = document.createElement("canvas");
    this.context = this.canvas.getContext("2d")!;
    this.currentPosition = { x: -100, y: -100 };
    this.targetPosition = { x: -100, y: -100 };
    this.currentSize = 16;
    this.targetSize = 16;
    this.state = "default";
    this.isDark = isDark;
    this.setupCanvas();
  }

  private setupCanvas() {
    this.canvas.style.position = "fixed";
    this.canvas.style.top = "0";
    this.canvas.style.left = "0";
    this.canvas.style.pointerEvents = "none";
    this.canvas.style.zIndex = "1000";
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    document.body.appendChild(this.canvas);
  }

  public updatePosition(x: number, y: number) {
    this.targetPosition = { x, y };
  }

  public updateState(state: CursorState) {
    this.state = state;
    const vw = window.innerWidth / 100;

    switch (state) {
      case "default":
        this.targetSize = 0.75 * vw; // 2svw
        break;
      case "hover":
      case "hoverLink":
        this.targetSize = 2 * vw; // 5svw
        break;
      case "hoverSmall":
        this.targetSize = 0.4 * vw; // 1svw
        break;
      case "tap":
        this.targetSize = 0.3 * vw; // 0.75svw
        break;
      case "hoverTap":
        this.targetSize = 0.3 * vw; // 3svw
        break;
      case "disabled":
        this.targetSize = 0;
        break;
    }
  }

  public setDarkMode(isDark: boolean) {
    this.isDark = isDark;
  }

  private drawCursor() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Smooth position and size interpolation
    this.currentPosition.x +=
      (this.targetPosition.x - this.currentPosition.x) * 0.2;
    this.currentPosition.y +=
      (this.targetPosition.y - this.currentPosition.y) * 0.2;
    this.currentSize += (this.targetSize - this.currentSize) * 0.2;

    if (this.state === "disabled") return;

    this.context.beginPath();
    this.context.arc(
      this.currentPosition.x,
      this.currentPosition.y,
      this.currentSize,
      0,
      Math.PI * 2,
    );

    if (this.state === "hover" || this.state === "hoverLink") {
      // Match the original aurora-brown/dark-brown colors
      this.context.fillStyle = this.isDark ? "#b56f49" : "#e7aa75";
      this.context.fill();

      // Draw icon when cursor is expanded
      if (this.currentSize > this.targetSize * 0.8) {
        this.context.textAlign = "center";
        this.context.textBaseline = "middle";
        this.context.font = `${this.targetSize * 0.6}px 'remixicon'`;
        this.context.fillStyle = this.isDark ? "#FFFFFF" : "#1A1A1A";

        // Use the correct Remix icon codes
        const icon =
          this.state === "hover"
            ? "\uEA6E" // ri-arrow-right-line
            : "\uEA83"; // ri-arrow-right-up-line

        this.context.fillText(
          icon,
          this.currentPosition.x,
          this.currentPosition.y,
        );
      }
    } else {
      // Use a semi-transparent black/white based on dark mode
      this.context.fillStyle = this.isDark
        ? "rgba(255, 255, 255, 0.8)"
        : "rgba(0, 0, 0, 0.8)";
      this.context.fill();
    }
  }

  public animate = () => {
    this.drawCursor();
    this.animationFrame = requestAnimationFrame(this.animate);
  };

  public destroy() {
    this.canvas.remove();
    cancelAnimationFrame(this.animationFrame);
  }

  public handleResize = () => {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    // Update cursor size on resize to maintain svw units
    this.updateState(this.state);
  };
}

const Cursor = () => {
  const viewportWidth = useViewportWidth();
  const cursorRendererRef = useRef<CursorRenderer | null>(null);
  const isDarkMode = useSelector(selectIsDarkMode);

  useEffect(() => {
    if (viewportWidth <= 768) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    if (prefersReducedMotion.matches) return;

    // Initialize cursor renderer
    cursorRendererRef.current = new CursorRenderer(isDarkMode);
    cursorRendererRef.current.animate();

    const handleMouseMove = (e: MouseEvent) => {
      if (cursorRendererRef.current) {
        cursorRendererRef.current.updatePosition(e.clientX, e.clientY);
      }
    };

    const handleResize = debounce(() => {
      if (cursorRendererRef.current) {
        cursorRendererRef.current.handleResize();
      }
    }, 100);

    const handleMouseEvents = (e: MouseEvent) => {
      if (!cursorRendererRef.current || !(e.target instanceof HTMLElement))
        return;

      const target = e.target;
      let newState: CursorState = "default";

      switch (e.type) {
        case "mouseover":
          if (target.classList.contains("cursor-disabled")) {
            newState = "disabled";
          } else if (target.classList.contains("cursor-hover")) {
            newState = "hover";
          } else if (target.classList.contains("cursor-hover-link")) {
            newState = "hoverLink";
          } else if (
            target instanceof HTMLAnchorElement ||
            target instanceof HTMLButtonElement ||
            target.classList.contains("cursor-hover-small") ||
            target instanceof HTMLInputElement ||
            target instanceof HTMLTextAreaElement ||
            target instanceof HTMLSelectElement
          ) {
            newState = "hoverSmall";
          }
          break;
        case "mousedown":
          newState =
            cursorRendererRef.current.state === "hover" ? "hoverTap" : "tap";
          break;
      }

      cursorRendererRef.current.updateState(newState);
    };

    // Add event listeners
    document.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);
    document.addEventListener("mouseover", handleMouseEvents);
    document.addEventListener("mouseout", handleMouseEvents);
    document.addEventListener("mousedown", handleMouseEvents);
    document.addEventListener("mouseup", handleMouseEvents);

    // Cleanup
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("mouseover", handleMouseEvents);
      document.removeEventListener("mouseout", handleMouseEvents);
      document.removeEventListener("mousedown", handleMouseEvents);
      document.removeEventListener("mouseup", handleMouseEvents);
      if (cursorRendererRef.current) {
        cursorRendererRef.current.destroy();
      }
    };
  }, [viewportWidth, isDarkMode]);

  // Update dark mode
  useEffect(() => {
    if (cursorRendererRef.current) {
      cursorRendererRef.current.setDarkMode(isDarkMode);
    }
  }, [isDarkMode]);

  return null;
};

export default Cursor;
