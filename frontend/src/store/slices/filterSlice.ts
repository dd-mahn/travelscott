import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the state structure for destination filters
interface DestinationFilterState {
  continents: string[];
  countries: string[];
  tags: string[];
  searchQuery: string;
}

// Define the state structure for blog filters
interface InspirationFilterState {
  tags: string[];
  searchQuery: string;
}

// Define the overall filter state structure
interface FilterState {
  destination: DestinationFilterState;
  blog: InspirationFilterState;
}

// Initialize the filter state with default values
const initialState: FilterState = {
  destination: {
    continents: [],
    countries: [],
    tags: [],
    searchQuery: '',
  },
  blog: {
    tags: [],
    searchQuery: '',
  },
};

// Create a slice for filter state management
const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    // Set the continents for destination filter
    setDestinationContinents: (state, action: PayloadAction<string[]>) => {
      state.destination.continents = action.payload;
    },
    // Set the countries for destination filter
    setDestinationCountries: (state, action: PayloadAction<string[]>) => {
      state.destination.countries = action.payload;
    },
    // Set the tags for destination filter
    setDestinationTags: (state, action: PayloadAction<string[]>) => {
      state.destination.tags = action.payload;
    },
    // Set the search query for destination filter
    setDestinationSearchQuery: (state, action: PayloadAction<string>) => {
      state.destination.searchQuery = action.payload;
    },
    // Set the tags for blog filter
    setBlogTags: (state, action: PayloadAction<string[]>) => {
      state.blog.tags = action.payload;
    },
    // Set the search query for blog filter
    setBlogSearchQuery: (state, action: PayloadAction<string>) => {
      state.blog.searchQuery = action.payload;
    },
  },
});

// Export the actions for use in components
export const {
  setDestinationContinents,
  setDestinationCountries,
  setDestinationTags,
  setDestinationSearchQuery,
  setBlogTags,
  setBlogSearchQuery,
} = filterSlice.actions;

// Export the reducer to be included in the store
export default filterSlice.reducer;
