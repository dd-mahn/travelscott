import React from "react";
import { Routes, Route } from "react-router-dom";

import About from "src/pages/About";
import Contact from "src/pages/Contact";
import Inspiration from "src/pages/Inspiration";
import Home from "src/pages/Home";
import Discover from "src/pages/Discover";
import Country from "src/pages/Country";
import DestinationPage from "src/pages/Destination";
import Article from "src/pages/Article";


const Routers = () => {
  return (
    <Routes>
      <Route path="/about" element={<About />} />
      <Route path="/" element={<Home />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/discover" element={<Discover />} />
      <Route path="/discover/countries/:id" element={<Country />} />
      <Route path="/discover/destinations/:id" element={<DestinationPage/>}/>
      <Route path="/inspiration" element={<Inspiration />} />
      <Route path="/inspiration/:id" element={<Article />} />
    </Routes>
  );
};

export default Routers;
