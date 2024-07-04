import React from "react";
import { Routes, Route } from "react-router-dom";

import About from "src/pages/About";
import Contact from "src/pages/Contact";
import Test from "src/pages/Test";
import Home from "src/pages/Home";


const Routers = () => {
  return (
    <Routes>
      <Route path="/about" element={<About />} />
      <Route path="/" element={<Home />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/test" element={<Test />} />
      
    </Routes>
  );
};

export default Routers;
