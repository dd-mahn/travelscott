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
