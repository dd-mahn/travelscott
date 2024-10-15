import { useState, useEffect } from 'react';

/**
 * Custom hook that debounces a value.
 * 
 * @param value - The value to debounce.
 * @param delay - The delay in milliseconds for debouncing.
 * @returns The debounced value.
 */
function useDebounce<T>(value: T, delay: number): T {
  // State to store the debounced value
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Set a timeout to update the debounced value after the specified delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup function to clear the timeout if the value or delay changes
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]); // Re-run the effect if value or delay changes

  return debouncedValue;
}

export default useDebounce;
