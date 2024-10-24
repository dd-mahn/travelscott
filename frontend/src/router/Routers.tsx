import React, { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "src/App";
import Layout from "src/components/Layout/Layout";
import PrivacyPolicy from "src/pages/PrivacyPolicy/PrivacyPolicy";

// Lazy load pages
const About = lazy(() => import("src/pages/About"));
const Contact = lazy(() => import("src/pages/Contact/Contact"));
const Inspiration = lazy(() => import("src/pages/Inspiration"));
const Home = lazy(() => import("src/pages/Home/Home"));
const Discover = lazy(() => import("src/pages/Discover/Discover"));
const Country = lazy(() => import("src/pages/Country"));
const Destination = lazy(() => import("src/pages/Destination"));
const Article = lazy(() => import("src/pages/Article/Article"));

// Fallback component for Suspense
const SuspenseFallback = () => <div className="h-screen w-screen"></div>;

// Define routes
const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<SuspenseFallback />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "/about",
        element: (
          <Suspense fallback={<SuspenseFallback />}>
            <About />
          </Suspense>
        ),
      },
      {
        path: "/contact",
        element: (
          <Suspense fallback={<SuspenseFallback />}>
            <Contact />
          </Suspense>
        ),
      },
      {
        path: "/discover",
        element: (
          <Suspense fallback={<SuspenseFallback />}>
            <Discover />
          </Suspense>
        ),
      },
      {
        path: "/discover/countries/:id",
        element: (
          <Suspense fallback={<SuspenseFallback />}>
            <Country />
          </Suspense>
        ),
      },
      {
        path: "/discover/destinations/:id",
        element: (
          <Suspense fallback={<SuspenseFallback />}>
            <Destination />
          </Suspense>
        ),
      },
      {
        path: "/inspiration",
        element: (
          <Suspense fallback={<SuspenseFallback />}>
            <Inspiration />
          </Suspense>
        ),
      },
      {
        path: "/inspiration/:id",
        element: (
          <Suspense fallback={<SuspenseFallback />}>
            <Article />
          </Suspense>
        ),
      },
      {
        path: "/privacy",
        element: (
          <Suspense fallback={<SuspenseFallback />}>
            <PrivacyPolicy />
          </Suspense>
        ),
      },
    ],
  },
];

// Create router
const router = createBrowserRouter(routes);

export { router };
