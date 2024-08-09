import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Map from './pages/Map';
import { useJsApiLoader } from '@react-google-maps/api';
import { mapOptions } from './components/MapConfiguration';
import Register from './pages/Login';
import Login from './pages/Login';
import { Hostpage } from './pages/Hostpage';
import { Addevent } from './pages/Addevent';
import Navbar from './components/Navbar';
import { Hosthomepage } from './pages/Hosthomepage';
import { Hostschedule } from './pages/Hostschedule';
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
            <Route path="/login" element={<Login />} />
            <Route path="/hostpage" element={<Hostpage/>} />
            <Route path="/addevent" element={<Addevent/>} />
            <Route path="/hosthome" element={<Hosthomepage/>} />
            <Route path="/hostschedule" element={<Hostschedule/>} />
            <Route path="/hostfirstpage" element={<Hostpage/>} />
            
           
          


          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
