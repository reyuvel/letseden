// src/components/HomePage.js
import React from 'react';
import Navbar from '../components/Navbar.jsx';
import About from '../components/About.jsx';
import Home from '../components/Home.jsx';
import Testimony from '../components/Testimony.jsx';
import '../css/Home.css';
import { Services } from '../components/Services.jsx';
import { Contact } from '../components/Contact.jsx';
import { Footer } from '../components/Footer.jsx';

const HomePage = () => {
  return (
    <>
      <Navbar />
      <Home />
      <About />
      <Services/>
      <Testimony/>
      <Contact/>
      <Footer/>
    </>
  );
};

export default HomePage;
