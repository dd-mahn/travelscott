import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InspirationState {
  currentCategory: string;
  currentCategoryImage: string;
}

const initialState: InspirationState = {
  currentCategory: 'All',
  currentCategoryImage: '',
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
  },
});

export const { setCategory, setCategoryImage } = inspirationSlice.actions;
export default inspirationSlice.reducer;
