import { configureStore } from '@reduxjs/toolkit';
import inspirationReducer from 'src/store/slices/inspirationSlice';
import blogReducer from 'src/store/slices/blogSlice';
import homeReducer from 'src/store/slices/homeSlice';

export const store = configureStore({
  reducer: {
    inspiration: inspirationReducer,
    blog: blogReducer,
    home: homeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
