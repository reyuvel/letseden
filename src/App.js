import React, { useEffect } from 'react';
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
import { supabase } from '@supabase/auth-ui-shared';
import ProtectedRoute from './components/ProtectedRoutes';
function App() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: mapOptions.googleMapApiKey
  });

  useEffect(()=>{

    const fetchUser = async()=>{
      const {data:{user}}=await supabase.auth.getUser()
    }
  })


  return (
    <>
      <div>
        <BrowserRouter>
          <Routes>
            <Route index element={<HomePage />} />
            <Route path="/map" element={<ProtectedRoute><Map isLoaded={isLoaded} /></ProtectedRoute>} />
            


            <Route path="/login" element={<Login />} />
            <Route path="/hostpage" element={<ProtectedRoute><Hostpage/></ProtectedRoute>}/>
            <Route path="/addevent" element={<ProtectedRoute><Addevent/></ProtectedRoute>} />
            <Route path="/hosthome" element={<ProtectedRoute><Hosthomepage/></ProtectedRoute>} />
            <Route path="/hostschedule" element={<ProtectedRoute><Hostschedule/></ProtectedRoute>} />
            <Route path="/hostfirstpage" element={<ProtectedRoute><Hostpage/></ProtectedRoute>} />
            
           
          


          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
