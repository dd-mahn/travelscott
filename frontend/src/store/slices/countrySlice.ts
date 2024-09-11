import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Country from "src/types/Country";
import Destination from "src/types/Destination";
import Blog from "src/types/Blog";

interface CountryState {
  currentCountry: Country | null;
  countryDestinations: Destination[];
  countryBlogs: Blog[];
  loading: boolean;
  error: string | null;
}

const initialState: CountryState = {
  currentCountry: null,
  countryDestinations: [],
  countryBlogs: [],
  loading: false,
  error: null,
};

const countrySlice = createSlice({
  name: "country",
  initialState,
  reducers: {
    setCurrentCountry: (state, action: PayloadAction<Country | null>) => {
      state.currentCountry = action.payload;
    },
    setCountryDestinations: (state, action: PayloadAction<Destination[]>) => {
      state.countryDestinations = action.payload;
    },
    setCountryBlogs: (state, action: PayloadAction<Blog[]>) => {
      state.countryBlogs = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setCurrentCountry,
  setCountryDestinations,
  setCountryBlogs,
  setLoading,
  setError,
} = countrySlice.actions;

export default countrySlice.reducer;
