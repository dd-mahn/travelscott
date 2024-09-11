import { useState, useEffect, useCallback } from "react";
import { ApiResponse } from "src/types/ApiResponse";

const useFetch = <T>(url: string, deps: any[] = []) => {
  const [data, setData] = useState<T>();
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  // Function to fetch data from the provided URL
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
      setLoading((prevLoading) =>
        prevLoading !== false ? false : prevLoading,
      );
    }
  }, [url, ...deps]);

  // Fetch data when the component mounts or when the URL changes
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
