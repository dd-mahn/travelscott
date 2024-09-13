import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Destination from 'src/types/Destination';

interface DestinationsState {
  currentDestination: Destination | null;
  destinations: Destination[];
  allDestinations: Destination[];
  totalDestinations: number;
  loading: boolean;
  error: string | null;
}

const initialState: DestinationsState = {
  currentDestination: null,
  destinations: [],
  allDestinations: [],
  totalDestinations: 0,
  loading: false,
  error: null,
};

const destinationsSlice = createSlice({
  name: 'destinations',
  initialState,
  reducers: {
    setCurrentDestination: (state, action: PayloadAction<Destination | null>) => {
      state.currentDestination = action.payload;
    },
    setDestinations: (state, action: PayloadAction<Destination[]>) => {
      state.destinations = action.payload;
    },
    setAllDestinations: (state, action: PayloadAction<Destination[]>) => {
      state.allDestinations = action.payload;
    },
    setTotalDestinations: (state, action: PayloadAction<number>) => {
      state.totalDestinations = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setCurrentDestination,
  setDestinations,
  setAllDestinations,
  setTotalDestinations,
  setLoading,
  setError,
} = destinationsSlice.actions;

export default destinationsSlice.reducer;


