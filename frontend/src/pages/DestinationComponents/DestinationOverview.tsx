import React, { memo, useState, useRef, useEffect } from "react";
import Destination from "src/types/Destination";

const DestinationOverview = ({ destination }: { destination: Destination }) => {
  // Handle menu board
  const [menuBoardOpen, setMenuBoardOpen] = useState(false);
  const menuBoardRef = useRef<HTMLDivElement | null>(null);

  const toggleMenuBoard = () => {
    setMenuBoardOpen(!menuBoardOpen);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        menuBoardRef.current &&
        menuBoardRef.current.classList.contains("flex") &&
        !menuBoardRef.current.contains(e.target as Node)
      ) {
        setMenuBoardOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <section
      id="overview"
      className="overview px-sect py-sect-short"
    >
      <div className="flex justify-between">
        <div className="flex w-1/2 flex-col gap-4">
          <h2 className="h2-md">{destination.location}</h2>
          <div className="flex flex-row items-start justify-start gap-2">
            {destination.tags.map((tag) => (
              <span
                key={tag}
                className="span-small rounded-2xl border-solid border-text-light px-4 lg:border 2xl:border-2"
              >
                {tag}
              </span>
            ))}
          </div>
          <p className="p-regular mt-2 w-3/4">{destination.description}</p>
        </div>
        <div className="relative flex w-1/2 justify-end">
          <button
            title="open-menu"
            onClick={() => toggleMenuBoard()}
            className="rounded-full bg-background-dark shadow-component lg:h-12 lg:w-12 xl:h-12 xl:w-12 2xl:h-16 2xl:w-16 3xl:h-16 3xl:w-16"
          >
            <i className="ri-menu-5-line p-large m-auto text-text-dark"></i>
          </button>
          <div
            ref={menuBoardRef}
            className={`${menuBoardOpen ? "flex" : "hidden"} menu-board absolute right-0 top-[20%] z-10 w-2/5 flex-col items-center gap-2 rounded-xl bg-background-light px-8 pb-12 pt-4 shadow-section`}
          >
            <p className="p-large font-prima uppercase">Table of content</p>
            <span className="span-small">
              If this is your first time, don't use this!
            </span>
            <div className="mt-6 flex w-full flex-col gap-4">
              <a href="#overview" className="p-medium">
                1. Overview
              </a>
              <a href="#additional" className="p-medium">
                2. Needy information
              </a>
              <a href="#transportation" className="p-medium">
                3. Transportation
              </a>
              <a href="#places" className="p-medium">
                4. Places
              </a>
              <a href="#insight" className="p-medium">
                5. Insight
              </a>
              <a href="#summary" className="p-medium">
                6. Summary
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(DestinationOverview);
