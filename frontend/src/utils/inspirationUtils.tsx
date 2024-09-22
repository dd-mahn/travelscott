import { getSeason } from "./getSeason";

export const getInspirationHeading = (category: string) => {
  const headings: { [key: string]: string } = {
    Wilderness: "Wilderness",
    "Culture&Heritage": "Culture & Heritage",
    "Food&Drink": "Food & Drink",
    SoloJourneys: "Solo Journeys",
    CityScape: "City Scape",
    "Season&Festival": "Season & Festival",
    Relaxation: "Relaxation",
    FirstTimeAbroad: "First Time Abroad",
  };
  return headings[category] || `${getSeason()} ${new Date().getFullYear()}`;
};

export const getBackgroundKey = (category: string) => {
  switch (category) {
    case "All":
      return "background-dark";
    case "Wilderness":
      return "wilderness";
    case "Culture&Heritage":
      return "cultureheritage";
    case "Food&Drink":
      return "fooddrink";
    case "SoloJourneys":
      return "solojourneys";
    case "CityScape":
      return "bg-cityscape";
    case "Season&Festival":
      return "seasonfestival";
    case "Relaxation":
      return "relaxation";
    case "FirstTimeAbroad":
      return "firsttimeabroad";
    default:
      return "background-dark";
  }
};
