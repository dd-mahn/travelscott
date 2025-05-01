export const getSeason = (): string => {
  const month: number = new Date().getMonth();

  // Define the main seasons
  const seasons: { [key: number]: string } = {
    0: "Winter",
    1: "Winter",
    2: "Spring",
    3: "Spring",
    4: "Spring",
    5: "Summer",
    6: "Summer",
    7: "Summer",
    8: "Fall",
    9: "Fall",
    10: "Fall",
    11: "Winter"
  };

  // Define the transitional seasons
  const transitionalSeasons: { [key: number]: string } = {
    1: "Spring",
    4: "Summer",
    7: "Fall",
    10: "Winter"
  };

  // Check for transitional seasons first
  if (transitionalSeasons.hasOwnProperty(month)) {
    return transitionalSeasons[month];
  }

  // Return the main season
  return seasons.hasOwnProperty(month) ? seasons[month] : "Unknown Season";
};
