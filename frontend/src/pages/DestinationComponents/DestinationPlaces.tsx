import React, { memo, useState, useEffect, useCallback } from "react";
import DestinationType from "src/types/Destination";
import PlaceDialog from "./placeDialog";

type DestinationPlacesProps = {
  destination: DestinationType;
};

const DestinationPlaces: React.FC<DestinationPlacesProps> = ({
  destination,
}) => {
  // Handle places display
  const [placeCategory, setPlaceCategory] = useState("to_stay");
  const handlePlaceCategoryChange = useCallback((category: string) => {
    setPlaceCategory(category);
  }, []);

  // Handle place catalog
  useEffect(() => {
    const dialogs: NodeListOf<HTMLDialogElement> =
      document.querySelectorAll("dialog");
    dialogs.forEach((dialog) => {
      const handleClick = (e: MouseEvent) => {
        const dialogContent = dialog.querySelector(".dialog-content");
        if (dialogContent && !dialogContent.contains(e.target as Node)) {
          dialog.close();
        }
      };
      dialog.addEventListener("click", handleClick);
      return () => dialog.removeEventListener("click", handleClick);
    });
  }, []);

  const openPlaceDialog = useCallback((name: string) => {
    const placeDialog = document.querySelector(`dialog[data-name="${name}"]`);
    if (placeDialog instanceof HTMLDialogElement) {
      placeDialog.removeAttribute("hidden");
      placeDialog.showModal();
    }
  }, []);

  const selectedCategoryPlaces =
    placeCategory === "to_stay"
      ? destination.places?.to_stay
      : placeCategory === "to_visit"
        ? destination.places?.to_visit
        : destination.places?.to_eat;

  return (
    <section
      id="places"
      className="places px-sect rounded-3xl bg-light-green pb-sect-short pt-sect-short shadow-section"
    >
      <div className="mt-sect-short flex flex-col gap-20">
        <h1 className="h1-md">
          <i className="ri-map-pin-fill"></i> Places
        </h1>

        <div className="flex flex-col gap-6">
          <h2 className="h2-inter">
            <span>
              {placeCategory === "to_stay"
                ? "To stay"
                : placeCategory === "to_visit"
                  ? "To visit"
                  : "To eat"}
            </span>
            <span
              className="cursor-pointer text-gray"
              onClick={() =>
                handlePlaceCategoryChange(
                  placeCategory === "to_stay"
                    ? "to_visit"
                    : placeCategory === "to_visit"
                      ? "to_eat"
                      : "to_stay",
                )
              }
            >
              /
              {placeCategory === "to_stay"
                ? "visit"
                : placeCategory === "to_visit"
                  ? "eat"
                  : "stay"}
            </span>
            <span
              className="cursor-pointer text-gray"
              onClick={() =>
                handlePlaceCategoryChange(
                  placeCategory === "to_stay"
                    ? "to_eat"
                    : placeCategory === "to_visit"
                      ? "to_stay"
                      : "to_visit",
                )
              }
            >
              /
              {placeCategory === "to_stay"
                ? "eat"
                : placeCategory === "to_visit"
                  ? "stay"
                  : "visit"}
            </span>
          </h2>
          <p className="p-regular w-2/5">
            {placeCategory === "to_stay"
              ? "These places were chosen after carefully considering a balance of several important factors: price, distance, quality, and ratings. By evaluating these elements, we ensured that the selection offers the best overall value and convenience."
              : placeCategory === "to_visit"
                ? "These are the most popular places that are truly worth visiting. Each destination offers unique experiences and attractions that make them stand out as must-see locations."
                : "Don’t miss out on enjoying delicious local dishes at these excellent restaurants. They offer a variety of flavors and culinary experiences that are sure to satisfy your taste buds."}
          </p>
        </div>
      </div>

      <div className="mt-20 grid grid-cols-3 gap-x-8 gap-y-16">
        {selectedCategoryPlaces?.map((place, index) => (
          <div key={index}>
            <div
              className="flex cursor-pointer flex-col gap-4"
              onClick={() => openPlaceDialog(place.name)}
            >
              <img
                className="h-[50svh] rounded-xl"
                src={place?.image_url}
                alt="place image"
              />
              <span className="span-medium">{place?.name}</span>
            </div>
            <PlaceDialog place={place} category={placeCategory} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default memo(DestinationPlaces);
