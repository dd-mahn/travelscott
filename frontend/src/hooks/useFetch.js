import { useState, useEffect } from "react";

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const res = await fetch(url);
        if (!res.ok) {
          setError("Maybe something went wrong, please try again later.");
        }
        // console.log(res)
        const result = await res.json();
        // console.log(result)
        setData(result);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchData();
  }, [url]);
  return {
    data,
    error,
    loading,
  };
};

export default useFetch;
