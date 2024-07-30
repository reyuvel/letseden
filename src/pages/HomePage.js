// src/components/HomePage.js
import React from 'react';
import Navbar from '../components/Navbar.jsx';
import About from '../components/About.jsx';
import Home from '../components/Home.jsx';
import '../css/Home.css';

const HomePage = () => {
  return (
    <>
      <Navbar />
      <Home />
      <About />
    </>
  );
};

export default HomePage;
