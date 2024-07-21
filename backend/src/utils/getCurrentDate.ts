export const getCurrentDate = () => {
  const currentDate = new Date();
  const day = String(currentDate.getDate()).padStart(2, "0"); // Adds leading zero if necessary
  const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Adds 1 because getMonth() is 0-indexed and adds leading zero
  const year = String(currentDate.getFullYear());

  const dateString = `${year}-${month}-${day}`;

  return dateString;
};
