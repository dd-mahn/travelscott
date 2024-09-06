import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InspirationState {
  currentCategory: string;
  currentCategoryImage: string;
  heading: string;
}

const initialState: InspirationState = {
  currentCategory: 'All',
  currentCategoryImage: '',
  heading: '',
};

const inspirationSlice = createSlice({
  name: 'inspiration',
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<string>) => {
      state.currentCategory = action.payload;
    },
    setCategoryImage: (state, action: PayloadAction<string>) => {
      state.currentCategoryImage = action.payload;
    },
    setHeading: (state, action: PayloadAction<string>) => {
      state.heading = action.payload;
    },
  },
});

export const { setCategory, setCategoryImage, setHeading } = inspirationSlice.actions;
export default inspirationSlice.reducer;
