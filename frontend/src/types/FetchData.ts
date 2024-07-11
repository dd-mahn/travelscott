import Destination from "src/types/Destination";
import Country from "./Country";
import Blog from "./Blog";

export interface FetchData<T> {
    result: T[];
    count?: number;
    page?: string;
    totalPages?: number;
  }
  
export type FetchDestinationType = FetchData<Destination>;
export type FetchCountriesType = FetchData<Country>;
export type FetchBlogsType = FetchData<Blog>;