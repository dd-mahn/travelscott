import React from 'react';

// Define the props for the Notification component
interface NotificationProps {
  message: string;
  visible: boolean;
}

// Notification component to display a message
const Notification: React.FC<NotificationProps> = ({ message, visible }) => {
  // CSS classes for the notification container
  const containerClasses = `
    fixed top-20 left-1/2 -translate-x-1/2 transition-opacity duration-300 
    rounded-md bg-light-brown dark:bg-background-dark-brown text-text-light 
    dark:text-text-dark shadow-component dark:shadow-component-dark z-[1000] 
    px-4 py-2 md:px-8 md:py-4 ${visible ? 'opacity-100' : 'opacity-0'}
  `;

  return (
    <div className={containerClasses}>
      {message}
    </div>
  );
};

export default Notification;
