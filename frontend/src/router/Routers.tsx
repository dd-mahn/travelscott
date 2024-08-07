import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Loading from "src/pages/Loading";

const About = lazy(() => import("src/pages/About"));
const Contact = lazy(() => import("src/pages/Contact"));
const Inspiration = lazy(() => import("src/pages/Inspiration"));
const Home = lazy(() => import("src/pages/Home"));
const Discover = lazy(() => import("src/pages/Discover"));
const Country = lazy(() => import("src/pages/Country"));
const Destination = lazy(() => import("src/pages/Destination"));
const Article = lazy(() => import("src/pages/Article"));

const Routers = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/discover/countries/:id" element={<Country />} />
        <Route path="/discover/destinations/:id" element={<Destination />} />
        <Route path="/inspiration" element={<Inspiration />} />
        <Route path="/inspiration/:id" element={<Article />} />
      </Routes>
    </Suspense>
  );
};

export default Routers;
