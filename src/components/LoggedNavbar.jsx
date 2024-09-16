import React from 'react';
import { useNavigate } from "react-router-dom";
import supabase from '../config/supabaseClient';

const LoggedNavbar = () => {
  let navigate = useNavigate();

  const handleLogoutClick = async (event) => {
    // Prevent form submission
    event.preventDefault();
    
    // Call Supabase signOut method to properly log the user out
    const { error } = await supabase.auth.signOut();
  
    if (error) {
      console.error('Error logging out:', error.message);
    } else {
      // Clear sessionStorage first
      sessionStorage.clear();

      // Then redirect to login or home page after logout
      navigate('/');
    }
  };

  const handleclick = () => {
    navigate('/');
  };

  return (
    <div>
      <nav class="navbar navbar-expand-lg shadow">
        <div class="container-fluid" style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
          {/* Logo centered */}
          <a onClick={handleclick} class="navbar-brand fs-4 fw-bold" style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }} href="#">
            LET'S EDEN
          </a>

          {/* Search and Register form on the right */}
          <div class="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
            <form class="d-flex" role="search">
              <button class="btn btn-outline-success fa fa-search mr-1" type="submit"></button>
              <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
              <button onClick={handleLogoutClick} class="btn btn-outline-primary ms-auto px-4 rounded-pill">
                <i class="fa fa-sign-out" aria-hidden="true">Logout</i>
              </button>
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default LoggedNavbar;
