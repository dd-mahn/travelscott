import React from 'react';

interface NotificationProps {
  message: string;
  visible: boolean;
}

const Notification: React.FC<NotificationProps> = ({ message, visible }) => {
  return (
    <div className={`fixed top-20 left-1/2 -translate-x-1/2 transition-opacity duration-300 rounded-md bg-light-brown dark:bg-background-dark-brown text-text-light dark:text-text-dark shadow-component dark:shadow-component-dark z-[1000] px-4 py-2 md:px-8 md:py-4 ${visible ? 'opacity-100' : 'opacity-0'}`}>
      {message}
    </div>
  );
};

export default Notification;
