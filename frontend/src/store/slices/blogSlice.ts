import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import BlogType from 'src/types/Blog';

interface BlogState {
  allBlogs: BlogType[];
  featuredBlogs: BlogType[];
  starterBlogs: BlogType[];
  homeBlogs: BlogType[];
  blogChunks: BlogType[][];
}

const initialState: BlogState = {
  allBlogs: [],
  featuredBlogs: [],
  starterBlogs: [],
  homeBlogs: [],
  blogChunks: [],
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
    setHomeBlogs: (state, action: PayloadAction<BlogType[]>) => {
      state.homeBlogs = action.payload;
    },
    setBlogChunks: (state, action: PayloadAction<BlogType[][]>) => {
      state.blogChunks = action.payload;
    },
  },
});

export const {
  setAllBlogs,
  setFeaturedBlogs,
  setStarterBlogs,
  setHomeBlogs,
  setBlogChunks
} = blogSlice.actions;
export default blogSlice.reducer;
