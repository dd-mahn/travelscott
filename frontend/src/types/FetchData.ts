// Importing necessary types
import Destination from "src/types/Destination";
import Country from "src/types/Country";
import Blog from "src/types/Blog";

// Generic interface to handle fetch data responses
interface FetchData<T> {
    result: T[]; // Array of results of type T
    count?: number; // Optional count of total results
    page?: string; // Optional current page
    totalPages?: number; // Optional total number of pages
}

// Type definitions for specific fetch data responses
export type FetchDestinationType = FetchData<Destination>;
export type FetchCountriesType = FetchData<Country>;
export type FetchBlogsType = FetchData<Blog>;