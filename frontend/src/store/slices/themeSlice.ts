import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface ThemeState {
  isDarkMode: boolean;
}

const getInitialState = (): ThemeState => {
  const storedDarkMode = localStorage.getItem('isDarkMode');
  return {
    isDarkMode: storedDarkMode ? JSON.parse(storedDarkMode) : false,
  };
};

const themeSlice = createSlice({
  name: 'theme',
  initialState: getInitialState(),
  reducers: {
    toggleDarkMode(state) {
      state.isDarkMode = !state.isDarkMode;
      localStorage.setItem('isDarkMode', JSON.stringify(state.isDarkMode));
    },
    setDarkMode(state, action: PayloadAction<boolean>) {
      state.isDarkMode = action.payload;
      localStorage.setItem('isDarkMode', JSON.stringify(state.isDarkMode));
    },
  },
});

export const { toggleDarkMode, setDarkMode } = themeSlice.actions;

export const selectIsDarkMode = (state: RootState) => state.theme.isDarkMode;

export default themeSlice.reducer;
