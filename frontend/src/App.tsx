import React from "react";
import "src/App.css";
/* Base Styles */
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Layout from "src/components/Layout/Layout";
import ErrorBoundary from "src/components/ErrorBoundary/ErrorBoundary";
import { Provider } from 'react-redux';
import { store } from 'src/store/store';
import { NotificationProvider } from "src/context/NotificationContext/NotificationContext";
import "src/styles/base/variables.css";
import "src/styles/base/buttons.css";
import "src/styles/base/layout.css";
import "src/styles/base/scrollbar.css";
import "src/styles/base/typography.css";

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
