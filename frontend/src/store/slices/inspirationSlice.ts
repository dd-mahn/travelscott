import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the shape of the state for the inspiration slice
interface InspirationState {
  currentCategory: string;
  currentCategoryImage: string;
}

// Set the initial state for the inspiration slice
const initialState: InspirationState = {
  currentCategory: 'All',
  currentCategoryImage: '',
};

// Create the inspiration slice with reducers to handle state changes
const inspirationSlice = createSlice({
  name: 'inspiration',
  initialState,
  reducers: {
    // Reducer to set the current category
    setCategory: (state, action: PayloadAction<string>) => {
      state.currentCategory = action.payload;
    },
    // Reducer to set the current category image
    setCategoryImage: (state, action: PayloadAction<string>) => {
      state.currentCategoryImage = action.payload;
    },
  },
});

// Export the actions generated by createSlice
export const { setCategory, setCategoryImage } = inspirationSlice.actions;

// Export the reducer to be used in the store
export default inspirationSlice.reducer;
