import {Destination} from "src/types/Destination";

export interface FetchData<T> {
    result?: T[];
    totalCount?: number;
    page?: string;
    totalPages?: number;
  }
  
export type FetchDestinationData = FetchData<Destination>;
export type FetchCountriesData = FetchData<string>;