import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

// Define the shape of the theme state
interface ThemeState {
  isDarkMode: boolean;
}

// Function to get the initial state from localStorage
const getInitialState = (): ThemeState => {
  const storedDarkMode = localStorage.getItem('isDarkMode');
  return {
    isDarkMode: storedDarkMode ? JSON.parse(storedDarkMode) : false,
  };
};

// Create a slice for theme with initial state and reducers
const themeSlice = createSlice({
  name: 'theme',
  initialState: getInitialState(),
  reducers: {
    // Toggle dark mode and save the new state to localStorage
    toggleDarkMode(state) {
      state.isDarkMode = !state.isDarkMode;
      localStorage.setItem('isDarkMode', JSON.stringify(state.isDarkMode));
    },
    // Set dark mode to a specific value and save it to localStorage
    setDarkMode(state, action: PayloadAction<boolean>) {
      state.isDarkMode = action.payload;
      localStorage.setItem('isDarkMode', JSON.stringify(state.isDarkMode));
    },
  },
});

// Export actions for use in components
export const { toggleDarkMode, setDarkMode } = themeSlice.actions;

// Selector to get the current dark mode state
export const selectIsDarkMode = (state: RootState) => state.theme.isDarkMode;

// Export the reducer to be used in the store
export default themeSlice.reducer;
