import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LoadingState {
  // General app loading state
  appLoading: boolean;
  
  // Page-specific loading states
  pageLoading: {
    home: boolean;
    discover: boolean;
    country: boolean;
    destination: boolean;
    article: boolean;
    inspiration: boolean; // Add inspiration page
    [key: string]: boolean;
  };
  
  // Component or request-specific loading states
  requestLoading: {
    [key: string]: boolean;
  };
  
  // Count of active requests for each page
  activeRequests: {
    [key: string]: number;
  };

  // Last updated timestamps to prevent stuck loading states
  lastUpdated: {
    [key: string]: number;
  };
}

const initialState: LoadingState = {
  appLoading: false,
  pageLoading: {
    home: true,
    discover: true,
    country: true,
    destination: true,
    article: true,
    inspiration: true,
  },
  requestLoading: {},
  activeRequests: {},
  lastUpdated: {}
};

const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    setAppLoading: (state, action: PayloadAction<boolean>) => {
      state.appLoading = action.payload;
    },
    
    setPageLoading: (state, action: PayloadAction<{page: string, isLoading: boolean}>) => {
      const { page, isLoading } = action.payload;
      state.pageLoading[page] = isLoading;
      
      // Record the timestamp when the state was changed
      state.lastUpdated[page] = Date.now();
      
      // If turning off loading, make sure active requests is reset to 0
      if (!isLoading) {
        state.activeRequests[page] = 0;
      }
    },
    
    startRequest: (state, action: PayloadAction<{page: string, requestId: string}>) => {
      const { page, requestId } = action.payload;
      
      // Set request-specific loading state
      state.requestLoading[requestId] = true;
      
      // Increment active request count for the page
      state.activeRequests[page] = (state.activeRequests[page] || 0) + 1;
      
      // Update page loading state
      state.pageLoading[page] = true;
      
      // Record the timestamp
      state.lastUpdated[page] = Date.now();
    },
    
    finishRequest: (state, action: PayloadAction<{page: string, requestId: string}>) => {
      const { page, requestId } = action.payload;
      
      // Update request-specific loading state
      state.requestLoading[requestId] = false;
      
      // Decrement active request count for the page
      if (state.activeRequests[page]) {
        state.activeRequests[page] = Math.max(0, state.activeRequests[page] - 1);
        
        // If no active requests for the page, update page loading state
        if (state.activeRequests[page] === 0) {
          state.pageLoading[page] = false;
          state.lastUpdated[page] = Date.now();
        }
      } else {
        // If somehow we have no active requests tracked, just set to not loading
        state.pageLoading[page] = false;
        state.lastUpdated[page] = Date.now();
      }
    },
    
    // New reducer to check for and reset stuck loading states
    resetStuckLoadingStates: (state) => {
      const now = Date.now();
      const TIMEOUT = 10000; // 10 seconds timeout
      
      // Check each page loading state
      Object.keys(state.pageLoading).forEach(page => {
        const lastUpdate = state.lastUpdated[page] || 0;
        
        // If a page has been loading for too long, reset it
        if (state.pageLoading[page] && (now - lastUpdate > TIMEOUT)) {
          state.pageLoading[page] = false;
          state.activeRequests[page] = 0;
          state.lastUpdated[page] = now;
          console.warn(`Reset stuck loading state for page: ${page}`);
        }
      });
    }
  }
});

export const { 
  setAppLoading,
  setPageLoading,
  startRequest,
  finishRequest,
  resetStuckLoadingStates
} = loadingSlice.actions;

export default loadingSlice.reducer; 