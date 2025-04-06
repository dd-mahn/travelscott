import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store/store';

// Style constants
const debuggerStyles = {
  container: 'fixed bottom-4 right-4 z-50 bg-gray-800 text-white p-4 rounded-lg opacity-90 max-w-md max-h-96 overflow-auto text-xs',
  heading: 'text-lg font-bold mb-2',
  section: 'mb-4',
  sectionTitle: 'font-semibold mb-1',
  list: 'space-y-1',
  item: 'flex justify-between',
  loading: 'text-red-400',
  notLoading: 'text-green-400',
  badge: 'ml-2 px-2 py-0.5 rounded-full',
  toggleButton: 'absolute top-2 right-2 bg-gray-600 hover:bg-gray-700 px-2 py-1 rounded',
  timestamp: 'text-xs text-gray-400',
};

/**
 * A component that displays loading state debug information
 * Only visible in development environments
 */
const LoadingDebugger: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [time, setTime] = useState(new Date());
  
  // Get detailed loading state from Redux
  const loading = useSelector((state: RootState) => state.loading);
  
  // Update time to show real-time data
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Only show in development
  if (process.env.NODE_ENV !== 'development') return null;
  
  const toggleVisibility = () => setIsVisible(!isVisible);
  
  // Format timestamp
  const formatTimestamp = (timestamp: number) => {
    if (!timestamp) return 'Never';
    const diff = Date.now() - timestamp;
    return `${Math.round(diff / 1000)}s ago`;
  };

  if (!isVisible) {
    return (
      <button 
        onClick={toggleVisibility}
        className="fixed bottom-4 right-4 z-50 bg-gray-800 text-white p-2 rounded-full"
      >
        🔍
      </button>
    );
  }
  
  return (
    <div className={debuggerStyles.container}>
      <h3 className={debuggerStyles.heading}>Loading State Debugger</h3>
      <button 
        onClick={toggleVisibility}
        className={debuggerStyles.toggleButton}
      >
        ✕
      </button>
      
      <p className={debuggerStyles.timestamp}>
        Last updated: {time.toLocaleTimeString()}
      </p>
      
      {/* Page loading states */}
      <div className={debuggerStyles.section}>
        <h4 className={debuggerStyles.sectionTitle}>Page Loading States</h4>
        <div className={debuggerStyles.list}>
          {Object.entries(loading.pageLoading).map(([page, isLoading]) => (
            <div key={page} className={debuggerStyles.item}>
              <span>{page}</span>
              <span className={isLoading ? debuggerStyles.loading : debuggerStyles.notLoading}>
                {isLoading ? 'Loading' : 'Ready'}
                <span className={debuggerStyles.timestamp}>
                  {' '}({formatTimestamp(loading.lastUpdated[page])})
                </span>
              </span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Active requests */}
      <div className={debuggerStyles.section}>
        <h4 className={debuggerStyles.sectionTitle}>Active Requests</h4>
        <div className={debuggerStyles.list}>
          {Object.entries(loading.activeRequests).length > 0 ? (
            Object.entries(loading.activeRequests).map(([page, count]) => (
              <div key={page} className={debuggerStyles.item}>
                <span>{page}</span>
                <span>
                  {count > 0 
                    ? <span className={debuggerStyles.loading}>{count} active</span> 
                    : <span className={debuggerStyles.notLoading}>None</span>
                  }
                </span>
              </div>
            ))
          ) : (
            <div>No active requests</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoadingDebugger; 