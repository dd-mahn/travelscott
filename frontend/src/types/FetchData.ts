import {Destination} from "src/types/Destination";

export interface FetchData<T> {
    result: T[];
    totalCount?: number;
    page?: string;
    totalPages?: number;
  }
  
export type FetchDestinationType = FetchData<Destination>;
export type FetchCountriesType = FetchData<string>;