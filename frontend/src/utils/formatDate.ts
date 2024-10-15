/**
 * Formats a date string into a more readable format.
 * 
 * @param {string} dateString - The date string to format.
 * @returns {string} - The formatted date string.
 */
export const formatDate = (dateString: string): string => {
  // Create a new Date object from the input date string
  const date = new Date(dateString);

  // Format the date to 'Month Day, Year' format (e.g., January 1, 2020)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};