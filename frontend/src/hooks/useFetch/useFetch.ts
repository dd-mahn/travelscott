import { useQuery } from "@tanstack/react-query";
import { ApiResponse } from "src/types/ApiResponse";
import { useDispatch } from "react-redux";
import { startRequest, finishRequest } from "src/store/slices/loadingSlice";
import { useEffect } from "react";

/**
 * Custom hook to fetch data using React Query with integrated loading state management.
 * @param queryKey - Unique key for the query
 * @param url - The URL to fetch data from
 * @param page - The page this request belongs to (e.g., 'home', 'discover')
 * @param options - Additional options for the query
 * @returns Query result object containing data, error, and loading state
 */

const useFetch = <T>(
  queryKey: string,
  url: string,
  page: string = "global",
  options: {
    enabled?: boolean;
    staleTime?: number;
    refetchOnWindowFocus?: boolean;
    refetchOnMount?: boolean;
    cacheTime?: number;
  } = {}
) => {
  const dispatch = useDispatch();
  const requestId = `${page}-${queryKey}-${url}`;
  
  // Destructure options with defaults
  const {
    enabled = true,
    staleTime = 30000,
    refetchOnWindowFocus = false,
    refetchOnMount = false,
    cacheTime = 5 * 60 * 1000, // 5 minutes default
  } = options;

  const result = useQuery<T, Error>({
    queryKey: [queryKey, url],
    queryFn: async () => {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error("Maybe something went wrong, please try again later.");
      }
      const responseData: ApiResponse<T> = await res.json();
      return responseData.data;
    },
    enabled: !!url && enabled,
    staleTime,
    refetchOnWindowFocus,
    refetchOnMount,
    gcTime: cacheTime,
  });

  // Update global loading state based on query status
  useEffect(() => {
    if (result.isLoading || result.isFetching) {
      dispatch(startRequest({ page, requestId }));
    } else {
      // Small delay to ensure smooth transitions
      const timeout = setTimeout(() => {
        dispatch(finishRequest({ page, requestId }));
      }, 200);
      
      return () => clearTimeout(timeout);
    }
  }, [result.isLoading, result.isFetching, dispatch, page, requestId]);

  return result;
};

export default useFetch;
