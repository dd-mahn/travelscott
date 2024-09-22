import { destinationPlace } from "src/types/Destination";

export const getSelectedCategoryPlaces = (
  placeCategory: string,
  places: destinationPlace,
) => {
  return placeCategory === "to_stay"
    ? places?.to_stay
    : placeCategory === "to_visit"
      ? places?.to_visit
      : places?.to_eat;
};

export const getDestinationPlaceHeading = (placeCategory: string) => {
  return placeCategory === "to_stay"
    ? "To stay"
    : placeCategory === "to_visit"
      ? "To visit"
      : "To eat";
};

export const getPlaceCategoryChange = (
  placeCategory: string,
  currentCategory: string,
) => {
  const result =
    placeCategory === "to_stay"
      ? currentCategory === "visit"
        ? "to_visit"
        : "to_eat"
      : placeCategory === "to_visit"
        ? currentCategory === "eat"
          ? "to_eat"
          : "to_stay"
        : currentCategory === "stay"
          ? "to_stay"
          : "to_visit";

  return result;
};
