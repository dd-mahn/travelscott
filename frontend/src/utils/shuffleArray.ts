/**
 * Shuffles an array of strings using the Fisher-Yates algorithm.
 * @param {Array<string>} array - The array to shuffle.
 * @returns {Array<string>} - The shuffled array.
 */
export const shuffleArray = (array: Array<string>): Array<string> => {
  // Create a copy of the array to avoid mutating the original array
  const shuffledArray = [...array];

  // Iterate over the array from the last element to the second element
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    // Generate a random index from 0 to i
    const j = Math.floor(Math.random() * (i + 1));

    // Swap the elements at indices i and j
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }

  // Return the shuffled array
  return shuffledArray;
};
