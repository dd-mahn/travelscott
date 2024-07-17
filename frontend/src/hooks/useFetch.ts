import { useState, useEffect, useCallback } from "react";
import Blog from "src/types/Blog";
import Country from "src/types/Country";
import Destination from "src/types/Destination";
import { FetchCountriesType, FetchDestinationType, FetchBlogsType } from "src/types/FetchData";

type DataType = FetchCountriesType | FetchDestinationType | FetchBlogsType | Destination | Country | Blog;

const useFetch = <T,>(url: string, deps: any[] = []) => {
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
      const result: T = await res.json();
      setData(result);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An error occurred while fetching data.");
      }
    } finally {
      setLoading(false);
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
