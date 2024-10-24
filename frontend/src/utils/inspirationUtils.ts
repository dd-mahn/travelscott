import { getSeason } from "src/utils/getSeason";

// Function to get the heading based on the category
export const getInspirationHeading = (category: string): string => {
  const headings: { [key: string]: string } = {
    Wilderness: "Wilderness",
    "Culture&Heritage": "Culture & Heritage",
    "FoodLovers": "Food Lovers",
    SoloJourneys: "Solo Journeys",
    CityScape: "City Scape",
    "Season&Festival": "Season & Festival",
    Relaxation: "Relaxation",
    FirstTimeAbroad: "First Time Abroad",
  };

  // Return the heading if it exists, otherwise return the current season and year
  return headings[category] || `${getSeason()} ${new Date().getFullYear()}`;
};

// Function to get the background key based on the category
export const getBackgroundKey = (category: string): string => {
  const backgroundKeys: { [key: string]: string } = {
    All: "background-dark",
    Wilderness: "wilderness",
    "Culture&Heritage": "cultureheritage",
    "FoodLovers": "foodlovers",
    SoloJourneys: "solojourneys",
    CityScape: "cityscape",
    "Season&Festival": "seasonfestival",
    Relaxation: "relaxation",
    FirstTimeAbroad: "firsttimeabroad",
  };

  // Return the background key if it exists, otherwise return the default background key
  return backgroundKeys[category] || "background-dark";
};
