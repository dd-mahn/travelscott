import React, { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "src/App";
import Loading from "src/common/Loading/Loading";

// Lazy load pages
const About = lazy(() => import("src/pages/About/About"));
const Contact = lazy(() => import("src/pages/Contact/Contact"));
const Inspiration = lazy(() => import("src/pages/Inspiration/Inspiration"));
const Home = lazy(() => import("src/pages/Home/Home"));
const Discover = lazy(() => import("src/pages/Discover/Discover"));
const Country = lazy(() => import("src/pages/Country/Country"));
const Destination = lazy(() => import("src/pages/Destination/Destination"));
const Article = lazy(() => import("src/pages/Article/Article"));
const PrivacyPolicy = lazy(
  () => import("src/pages/PrivacyPolicy/PrivacyPolicy"),
);

// Define routes
const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/discover",
        element: <Discover />,
      },
      {
        path: "/discover/countries/:id",
        element: <Country />,
      },
      {
        path: "/discover/destinations/:id",
        element: <Destination />,
      },
      {
        path: "/inspiration",
        element: <Inspiration />,
      },
      {
        path: "/inspiration/:id",
        element: <Article />,
      },
      {
        path: "/privacy",
        element: <PrivacyPolicy />,
      },
    ],
  },
];

// Create router
const router = createBrowserRouter(routes);

export { router };
