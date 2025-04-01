import { useQuery } from '@tanstack/react-query';
import { ApiResponse } from "src/types/ApiResponse";

/**
 * Custom hook to fetch data using React Query.
 * @param queryKey - Unique key for the query
 * @param url - The URL to fetch data from
 * @returns Query result object containing data, error, and loading state
 */
const useFetch = <T>(queryKey: string, url: string) => {
  return useQuery<T, Error>({
    queryKey: [queryKey, url],
    queryFn: async () => {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error("Maybe something went wrong, please try again later.");
      }
      const responseData: ApiResponse<T> = await res.json();
      return responseData.data;
    },
    enabled: !!url,
    staleTime: 0,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};

export default useFetch;
