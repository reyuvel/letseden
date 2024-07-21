import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Map from './pages/Map';
import { useJsApiLoader } from '@react-google-maps/api';
import { mapOptions } from './components/MapConfiguration';
import Navbar from './components/Navbar';


function App() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: mapOptions.googleMapApiKey
  });


  return (
    <>
      <div>
        <BrowserRouter>
          <Routes>
            <Route index element={<HomePage />} />
            <Route path="/map" element={<Map isLoaded={isLoaded} />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
