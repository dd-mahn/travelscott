import { useQuery } from "@tanstack/react-query";
import { ApiResponse } from "src/types/ApiResponse";
import { useDispatch } from "react-redux";
import { startRequest, endRequest } from "src/store/slices/loadingSlice";
import { useEffect } from "react";
import config from "src/config/config";

/**
 * Custom hook to fetch data using React Query with integrated loading state management.
 * Assumes relative URLs are endpoints for the API_BASE_URL unless the URL starts with http/https.
 * @param queryKey - Unique base key for the query (will be combined with the full URL)
 * @param url - The relative endpoint path (e.g., /api/blogs) or a full URL
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

  // Construct the full URL inside the hook
  // If url starts with http, assume it's already a full URL
  const isFullUrl = url.startsWith('http://') || url.startsWith('https://');
  const fullUrl = isFullUrl ? url : `${config.api.baseUrl}${url}`;

  // Include the full constructed URL in the requestId and queryKey for uniqueness
  const requestId = `${page}-${queryKey}-${fullUrl}`;

  // Destructure options with defaults
  const {
    enabled = true,
    staleTime = 30000,
    refetchOnWindowFocus = false,
    refetchOnMount = false,
    cacheTime = 5 * 60 * 1000, // 5 minutes default
  } = options;

  const result = useQuery<T, Error>({
    queryKey: [queryKey, fullUrl],
    queryFn: async () => {
      const res = await fetch(fullUrl);
      if (!res.ok) {
        throw new Error("Maybe something went wrong, please try again later.");
      }
      const responseData: ApiResponse<T> = await res.json();
      return responseData.data;
    },
    enabled: !!fullUrl && enabled,
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
        dispatch(endRequest({ page, requestId }));
      }, 200);
      
      return () => clearTimeout(timeout);
    }
  }, [result.isLoading, result.isFetching, dispatch, page, requestId]);

  return result;
};

export default useFetch;
