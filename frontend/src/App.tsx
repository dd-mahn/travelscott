import React from "react";
import "src/App.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Layout from "src/components/Layout/Layout";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import { Provider } from 'react-redux';
import { store } from './store/store';

function App() {
  return (
    <Provider store={store}>
      <ErrorBoundary>
        <Layout />
      </ErrorBoundary>
    </Provider>
  );
}

export default App;
