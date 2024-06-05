import React from "react";
import { Routes, Route } from "react-router-dom";

// Old Design Components
import OldHome from "src/pages/OldDesign/components/Home";
import OldAbout from "src/pages/OldDesign/components/About";
import OldDiscover from "src/pages/OldDesign/components/Discover";
import OldDestination from "src/pages/OldDesign/components/Destination";

// New Design Components
import Contact from "src/pages/Contact";
import Test from "src/pages/Test";
import Home from "src/pages/Home";


const Routers = () => {
  return (
    <Routes>
      {/* Old routes */}
      {/* <Route path="/old/" element={<OldHome />} />
      <Route path="/old/about" element={<OldAbout />} />
      <Route path="/old/destinations" element={<OldDiscover />} />
      <Route path="/old/destinations/:id" element={<OldDestination />} /> */}

      {/* New routes */}
      <Route path="/" element={<Home />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/test" element={<Test />} />
      
    </Routes>
  );
};

export default Routers;
