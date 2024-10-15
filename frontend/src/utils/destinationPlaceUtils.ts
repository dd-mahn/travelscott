import { destinationPlace } from "src/types/Destination";

/**
 * Get the places of the selected category.
 * @param {string} placeCategory - The category of the place (to_stay, to_visit, to_eat).
 * @param {destinationPlace} places - The places object containing different categories.
 * @returns {Array} - The array of places for the selected category.
 */
export const getSelectedCategoryPlaces = (
  placeCategory: string,
  places: destinationPlace,
) => {
  switch (placeCategory) {
    case "to_stay":
      return places?.to_stay;
    case "to_visit":
      return places?.to_visit;
    default:
      return places?.to_eat;
  }
};

/**
 * Get the heading for the selected place category.
 * @param {string} placeCategory - The category of the place (to_stay, to_visit, to_eat).
 * @returns {string} - The heading for the selected category.
 */
export const getDestinationPlaceHeading = (placeCategory: string) => {
  switch (placeCategory) {
    case "to_stay":
      return "To stay";
    case "to_visit":
      return "To visit";
    default:
      return "To eat";
  }
};

/**
 * Get the next place category based on the current category.
 * @param {string} placeCategory - The current category of the place (to_stay, to_visit, to_eat).
 * @param {string} currentCategory - The current category to be changed.
 * @returns {string} - The next category.
 */
export const getPlaceCategoryChange = (
  placeCategory: string,
  currentCategory: string,
) => {
  if (placeCategory === "to_stay") {
    return currentCategory === "visit" ? "to_visit" : "to_eat";
  } else if (placeCategory === "to_visit") {
    return currentCategory === "eat" ? "to_eat" : "to_stay";
  } else {
    return currentCategory === "stay" ? "to_stay" : "to_visit";
  }
};
