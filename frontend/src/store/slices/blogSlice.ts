import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import BlogType from 'src/types/Blog';

interface BlogState {
  allBlogs: BlogType[];
  featuredBlogs: BlogType[];
  starterBlogs: BlogType[];
}

const initialState: BlogState = {
  allBlogs: [],
  featuredBlogs: [],
  starterBlogs: [],
};

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    setAllBlogs: (state, action: PayloadAction<BlogType[]>) => {
      state.allBlogs = action.payload;
    },
    setFeaturedBlogs: (state, action: PayloadAction<BlogType[]>) => {
      state.featuredBlogs = action.payload;
    },
    setStarterBlogs: (state, action: PayloadAction<BlogType[]>) => {
      state.starterBlogs = action.payload;
    },
  },
});

export const { setAllBlogs, setFeaturedBlogs, setStarterBlogs } = blogSlice.actions;
export default blogSlice.reducer;
