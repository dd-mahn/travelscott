import { configureStore } from "@reduxjs/toolkit";

// Import reducers
import inspirationReducer from "src/store/slices/inspirationSlice";
import blogReducer from "src/store/slices/blogSlice";
import filterReducer from "src/store/slices/filterSlice";
import countryReducer from "src/store/slices/countrySlice";
import destinationReducer from "src/store/slices/destinationSlice";
import continentReducer from "src/store/slices/continentSlice";
import themeReducer from "src/store/slices/themeSlice";
import loadingReducer from "src/store/slices/loadingSlice";

// Configure the store with all the reducers
export const store = configureStore({
  reducer: {
    inspiration: inspirationReducer,
    blog: blogReducer,
    filter: filterReducer,
    country: countryReducer,
    destination: destinationReducer,
    continent: continentReducer,
    theme: themeReducer,
    loading: loadingReducer,
  },
});

// Define RootState type based on the store's state
export type RootState = ReturnType<typeof store.getState>;

// Define AppDispatch type based on the store's dispatch function
export type AppDispatch = typeof store.dispatch;
