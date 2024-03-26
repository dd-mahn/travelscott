import React from 'react';
import {Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import About from '../pages/About';
import Discover from '../pages/Discover';
import Contact from '../pages/Contact';

const Routers = () => {
    return (
        <Routes>
             <Route path='/' element={<Home/>}/>
             <Route path='/about' element={<About/>}/>
             <Route path='/discover' element={<Discover/>}/>
             <Route path='/contact' element={<Contact/>}/>
        </Routes>
    );
};

export default Routers;