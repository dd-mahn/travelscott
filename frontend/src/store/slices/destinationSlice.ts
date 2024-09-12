import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Destination from 'src/types/Destination';

interface DestinationState {
  currentDestination: Destination | null;
  loading: boolean;
  error: string | null;
}

const initialState: DestinationState = {
  currentDestination: null,
  loading: false,
  error: null,
};

const destinationSlice = createSlice({
  name: 'destination',
  initialState,
  reducers: {
    setCurrentDestination: (state, action: PayloadAction<Destination | null>) => {
      state.currentDestination = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setCurrentDestination, setLoading, setError } = destinationSlice.actions;
export default destinationSlice.reducer;
