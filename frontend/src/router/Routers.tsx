import React from "react";
import { Routes, Route } from "react-router-dom";

import About from "src/pages/About";
import Contact from "src/pages/Contact";
import Test from "src/pages/Test";
import Home from "src/pages/Home";
import Discover from "src/pages/Discover";
import Country from "src/pages/Country";


const Routers = () => {
  return (
    <Routes>
      <Route path="/about" element={<About />} />
      <Route path="/" element={<Home />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/discover" element={<Discover />} />
      <Route path="/discover/countries/:id" element={<Country />} />
      
    </Routes>
  );
};

export default Routers;
