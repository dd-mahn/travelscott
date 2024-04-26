import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import Discover from "../pages/Discover";
import Contact from "../pages/Contact";
import Test from "../pages/Test";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/discover" element={<Discover />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/test" element={<Test />} />
    </Routes>
  );
};

export default Routers;
