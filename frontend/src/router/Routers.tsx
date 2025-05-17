import React, { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "src/App";
import Loading from "src/common/Loading/Loading";
import Home from "src/pages/Home/Home";
import About from "src/pages/About/About";
import Contact from "src/pages/Contact/Contact";
import Inspiration from "src/pages/Inspiration/Inspiration";
import Discover from "src/pages/Discover/Discover";
import Country from "src/pages/Country/Country";
import Destination from "src/pages/Destination/Destination";
import Article from "src/pages/Article/Article";
import PrivacyPolicy from "src/pages/PrivacyPolicy/PrivacyPolicy";
// Lazy load pages
// const About = lazy(() => import("src/pages/About/About"));
// const Contact = lazy(() => import("src/pages/Contact/Contact"));
// const Inspiration = lazy(() => import("src/pages/Inspiration/Inspiration"));
// const Home = lazy(() => import("src/pages/Home/Home"));
// const Discover = lazy(() => import("src/pages/Discover/Discover"));
// const Country = lazy(() => import("src/pages/Country/Country"));
// const Destination = lazy(() => import("src/pages/Destination/Destination"));
// const Article = lazy(() => import("src/pages/Article/Article"));
// const PrivacyPolicy = lazy(() => import("src/pages/PrivacyPolicy/PrivacyPolicy"));

// Define routes
const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<Loading />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "/about",
        element: (
          <Suspense fallback={<Loading />}>
            <About />
          </Suspense>
        ),
      },
      {
        path: "/contact",
        element: (
          <Suspense fallback={<Loading />}>
            <Contact />
          </Suspense>
        ),
      },
      {
        path: "/discover",
        element: (
          <Suspense fallback={<Loading />}>
            <Discover />
          </Suspense>
        ),
      },
      {
        path: "/discover/countries/:id",
        element: (
          <Suspense fallback={<Loading />}>
            <Country />
          </Suspense>
        ),
      },
      {
        path: "/discover/destinations/:id",
        element: (
          <Suspense fallback={<Loading />}>
            <Destination />
          </Suspense>
        ),
      },
      {
        path: "/inspiration",
        element: (
          <Suspense fallback={<Loading />}>
            <Inspiration />
          </Suspense>
        ),
      },
      {
        path: "/inspiration/:id",
        element: (
          <Suspense fallback={<Loading />}>
            <Article />
          </Suspense>
        ),
      },
      {
        path: "/privacy",
        element: (
          <Suspense fallback={<Loading />}>
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
