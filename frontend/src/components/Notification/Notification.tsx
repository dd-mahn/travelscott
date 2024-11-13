import React from "react";

// Define the props for the Notification component
interface NotificationProps {
  message: string;
  visible: boolean;
}

// Notification component to display a message
const Notification: React.FC<NotificationProps> = ({ message, visible }) => {
  return (
    <div
      className={`fixed left-1/2 top-20 z-[1000] -translate-x-1/2 rounded-md bg-light-brown px-4 py-2 text-text-light shadow-component transition-opacity duration-300 dark:bg-background-dark-brown dark:text-text-dark dark:shadow-component-dark md:px-8 md:py-4 ${visible ? "opacity-100" : "opacity-0"} `}
    >
      {message}
    </div>
  );
};

export default Notification;
