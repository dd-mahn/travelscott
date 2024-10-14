import React, { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "src/App";
import Layout from "src/components/Layout/Layout";
import PrivacyPolicy from "src/pages/PrivacyPolicy";

const About = lazy(() => import("src/pages/About"));
const Contact = lazy(() => import("src/pages/Contact"));
const Inspiration = lazy(() => import("src/pages/Inspiration"));
const Home = lazy(() => import("src/pages/Home"));
const Discover = lazy(() => import("src/pages/Discover"));
const Country = lazy(() => import("src/pages/Country"));
const Destination = lazy(() => import("src/pages/Destination"));
const Article = lazy(() => import("src/pages/Article"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<div className="h-screen w-screen"></div>}>
            <Home />{" "}
          </Suspense>
        ),
      },
      {
        path: "/about",
        element: (
          <Suspense fallback={<div className="h-screen w-screen"></div>}>
            <About />{" "}
          </Suspense>
        ),
      },
      {
        path: "/contact",
        element: (
          <Suspense fallback={<div className="h-screen w-screen"></div>}>
            <Contact />{" "}
          </Suspense>
        ),
      },
      {
        path: "/discover",
        element: (
          <Suspense fallback={<div className="h-screen w-screen"></div>}>
            <Discover />{" "}
          </Suspense>
        ),
      },
      {
        path: "/discover/countries/:id",
        element: (
          <Suspense fallback={<div className="h-screen w-screen"></div>}>
            <Country />{" "}
          </Suspense>
        ),
      },
      {
        path: "/discover/destinations/:id",
        element: (
          <Suspense fallback={<div className="h-screen w-screen"></div>}>
            {" "}
            <Destination />
          </Suspense>
        ),
      },
      {
        path: "/inspiration",
        element: (
          <Suspense fallback={<div className="h-screen w-screen"></div>}>
            <Inspiration />{" "}
          </Suspense>
        ),
      },
      {
        path: "/inspiration/:id",
        element: (
          <Suspense fallback={<div className="h-screen w-screen"></div>}>
            <Article />{" "}
          </Suspense>
        ),
      },
      {
        path: "/privacy",
        element: (
          <Suspense fallback={<div className="h-screen w-screen"></div>}>
            <PrivacyPolicy />{" "}
          </Suspense>
        ),
      },
    ],
  },
]);

export { router };
