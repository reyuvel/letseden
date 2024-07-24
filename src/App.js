import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Map from './pages/Map';
import { useJsApiLoader } from '@react-google-maps/api';
import { mapOptions } from './components/MapConfiguration';
import RegNavbar from './components/RegNavbar';


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
            <Route path="/register" element={<RegNavbar />} />

          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
