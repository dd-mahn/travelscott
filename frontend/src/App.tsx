import React from "react";
import "src/App.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Layout from "src/components/Layout/Layout";
import ErrorBoundary from "src/components/ErrorBoundary/ErrorBoundary";
import { Provider } from 'react-redux';
import { store } from 'src/store/store';
import { NotificationProvider } from "src/context/NotificationContext/NotificationContext";

function App() {
  return (
    <Provider store={store}>
      <NotificationProvider>
        <ErrorBoundary>
          <Layout />
        </ErrorBoundary>
      </NotificationProvider>
    </Provider>
  );
}

export default App;
