import { useState, useEffect, useCallback } from "react";
import { ApiResponse } from "src/types/ApiResponse";

/**
 * Custom hook to fetch data from a given URL.
 * @param url - The URL to fetch data from.
 * @param deps - Optional dependencies array to control when to refetch data.
 * @returns An object containing the fetched data, any error that occurred, and a loading flag.
 */
const useFetch = <T>(url: string, deps: any[] = []) => {
  const [data, setData] = useState<T>();
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  /**
   * Function to fetch data from the provided URL.
   * Uses useCallback to memoize the function and avoid unnecessary re-renders.
   */
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error("Maybe something went wrong, please try again later.");
      }
      const responseData: ApiResponse<T> = await res.json();
      setData((prevData) =>
        prevData !== responseData.data ? responseData.data : prevData,
      );
    } catch (err) {
      if (err instanceof Error) {
        setError((prevError) =>
          prevError !== err.message ? err.message : prevError,
        );
      } else {
        setError((prevError) =>
          prevError !== "An error occurred while fetching data."
            ? "An error occurred while fetching data."
            : prevError,
        );
      }
    } finally {
      setLoading(false);
    }
  }, [url, ...deps]);

  /**
   * useEffect to fetch data when the component mounts or when the URL or dependencies change.
   */
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data, // The fetched data
    error, // Any error that occurred during fetching
    loading, // A flag indicating if the data is currently being fetched
  };
};

export default useFetch;
