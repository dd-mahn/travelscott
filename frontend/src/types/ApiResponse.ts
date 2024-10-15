/**
 * Generic interface for API responses.
 * @template T - The type of the data property.
 */
export interface ApiResponse<T> {
  /**
   * Message returned from the API.
   */
  message: string;

  /**
   * Data returned from the API.
   */
  data: T;
}
