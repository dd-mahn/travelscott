import { useState, useEffect, useCallback } from "react";
import { FetchCountriesType, FetchDestinationType, FetchBlogsType } from "src/types/FetchData";

type DataType = FetchCountriesType | FetchDestinationType | FetchBlogsType;

const useFetch = (url: string) => {
  const [data, setData] = useState<DataType>();
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
      const result: DataType = await res.json();
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
  }, [url]);

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
