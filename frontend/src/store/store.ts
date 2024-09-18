import { configureStore } from "@reduxjs/toolkit";
import inspirationReducer from "src/store/slices/inspirationSlice";
import blogReducer from "src/store/slices/blogSlice";
import filterReducer from "src/store/slices/filterSlice";
import countryReducer from "src/store/slices/countrySlice";
import destinationReducer from "src/store/slices/destinationSlice";
import continentReducer from "src/store/slices/continentSlice";

export const store = configureStore({
  reducer: {
    inspiration: inspirationReducer,
    blog: blogReducer,
    filter: filterReducer,
    country: countryReducer,
    destination: destinationReducer,
    continent: continentReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
