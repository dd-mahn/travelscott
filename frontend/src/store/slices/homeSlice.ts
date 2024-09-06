import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Blog from 'src/types/Blog';

interface HomeState {
  blogs: Blog[];
  blogChunks: Blog[][];
}

const initialState: HomeState = {
  blogs: [],
  blogChunks: [],
};

const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    setHomeBlogs: (state, action: PayloadAction<Blog[]>) => {
      state.blogs = action.payload;
    },
    setBlogChunks: (state, action: PayloadAction<Blog[][]>) => {
      state.blogChunks = action.payload;
    },
  },
});

export const { setHomeBlogs, setBlogChunks } = homeSlice.actions;
export default homeSlice.reducer;
