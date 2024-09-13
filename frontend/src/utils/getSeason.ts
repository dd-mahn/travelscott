export const getSeason = () => {
  const month = new Date().getMonth();
  if (month >= 2 && month <= 4) return "Spring";
  if (month >= 5 && month <= 7) return "Summer";
  if (month >= 8 && month <= 10) return "Fall";
  if (month === 11 || month === 0 || month === 1) return "Winter";
  if (month === 1) return "Winter-Spring";
  if (month === 4) return "Spring-Summer";
  if (month === 7) return "Summer-Fall";
  if (month === 10) return "Fall-Winter";
  return "Unknown Season";
};
