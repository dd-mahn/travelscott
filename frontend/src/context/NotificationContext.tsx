import React, { createContext, useContext, useState, useCallback } from 'react';
import Notification from 'src/components/Notification/Notification';

// Define the shape of the context value
interface NotificationContextProps {
  showNotification: (message: string) => void;
}

// Create the Notification context
const NotificationContext = createContext<NotificationContextProps | undefined>(undefined);

// Define the props for the NotificationProvider component
interface NotificationProviderProps {
  children: React.ReactNode;
}

// NotificationProvider component to provide notification context to its children
export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
  const [message, setMessage] = useState('');
  const [visible, setVisible] = useState(false);

  // Function to show notification with a given message
  const showNotification = useCallback((msg: string) => {
    setMessage(msg);
    setVisible(true);
    setTimeout(() => setVisible(false), 3000); // Hide after 3 seconds
  }, []);

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      <Notification message={message} visible={visible} />
    </NotificationContext.Provider>
  );
};

// Custom hook to use the Notification context
export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};