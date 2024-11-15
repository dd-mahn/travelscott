import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'src/store/store';

// Define the shape of the theme state
interface ThemeState {
  isDarkMode: boolean;
}

// Modify the getInitialState function to be more explicit
const getInitialState = (): ThemeState => {
  try {
    const storedDarkMode = localStorage.getItem('isDarkMode');
    const isDarkMode = storedDarkMode !== null ? JSON.parse(storedDarkMode) : false;
    return {
      isDarkMode: isDarkMode
    };
  } catch (error) {
    console.error('Error parsing isDarkMode from localStorage:', error);
    return {
      isDarkMode: false
    };
  }
};

// Modify the slice creation to use a function for initialState
const themeSlice = createSlice({
  name: 'theme',
  initialState: getInitialState,  // Pass the function reference instead of calling it
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
