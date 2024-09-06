import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DestinationFilterState {
  continents: string[];
  countries: string[];
  tags: string[];
  searchQuery: string;
}

interface BlogFilterState {
  tags: string[];
  searchQuery: string;
}

interface FilterState {
  destination: DestinationFilterState;
  blog: BlogFilterState;
}

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

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setDestinationContinents: (state, action: PayloadAction<string[]>) => {
      state.destination.continents = action.payload;
    },
    setDestinationCountries: (state, action: PayloadAction<string[]>) => {
      state.destination.countries = action.payload;
    },
    setDestinationTags: (state, action: PayloadAction<string[]>) => {
      state.destination.tags = action.payload;
    },
    setDestinationSearchQuery: (state, action: PayloadAction<string>) => {
      state.destination.searchQuery = action.payload;
    },
    setBlogTags: (state, action: PayloadAction<string[]>) => {
      state.blog.tags = action.payload;
    },
    setBlogSearchQuery: (state, action: PayloadAction<string>) => {
      state.blog.searchQuery = action.payload;
    },
  },
});

export const {
  setDestinationContinents,
  setDestinationCountries,
  setDestinationTags,
  setDestinationSearchQuery,
  setBlogTags,
  setBlogSearchQuery,
} = filterSlice.actions;

export default filterSlice.reducer;
