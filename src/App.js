import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Map from './pages/Map';
import { useJsApiLoader } from '@react-google-maps/api';
import { mapOptions } from './components/MapConfiguration';
import Register from './pages/Register';
import Login from './pages/Register';
import { Hostpage } from './pages/Hostpage';
import { Addevent } from './pages/Addevent';
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
            <Route path="/register" element={<Register />} />
            <Route path="/hostpage" element={<Hostpage/>} />
            <Route path="/addevent" element={<Addevent/>} />
          


          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
