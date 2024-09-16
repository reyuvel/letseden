import React from 'react';
import { useNavigate } from "react-router-dom";
import supabase from '../config/supabaseClient';

const RegNavbar = () => {
  let navigate = useNavigate();


  

  const handleRegister = async() =>{

    const {data:{user},error:authError}=await supabase.auth.getUser();

    if(authError)
    {
      console.error('Error fetching user:',authError);
      return;
    }

    if(user)
    {
      const userId=user.id;

      const {data,error}=await supabase
        .from('Churchdetailgiven')
        .select('*')
        .eq('id',userId);
    

    if(error)
    {
      console.error("error querring the churchdetail table:",error.message);
    }

    if(data && data.length>0)
    {
      navigate('/hosthome')
    }

    else{
      navigate('/hostpage')
    }
  }

  else{
    navigate('/hostpage')
  }

    

  }



  //to handle the logout 

  const handleLogoutClick = async (event) => {
    event.preventDefault();
    
    const { error } = await supabase.auth.signOut();
  
    if (error) {
      console.error('Error logging out:', error.message);
    } else {
      sessionStorage.clear();

      navigate('/');
    }
  };


  //on clicking the home button

  const handleclick = () => {
    navigate('/');
  };

  //on clicking the all event button it must scroll in a smooth way

  const scrollToSection = (e) => {
    e.preventDefault(); 

    const element = document.getElementById('alleventscard');
    
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',  
        block: 'start'
      });
    }
  };

  return (
    <div>
      <nav class="navbar navbar-expand-lg shadow">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0" style={{marginLeft:'10px'}}>
        
        <li class="nav-item">
          <a class="nav-link" href="#alleventscard" onClick={scrollToSection}>Events</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" onClick={handleRegister}>Register</a>
        </li>
      </ul>

        
        <div class="container-fluid" style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
          
          <a onClick={handleclick} class="navbar-brand fs-4 fw-bold" style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }} href="#">
            LET'S EDEN
          </a>

          
          <div class="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
            <form class="d-flex" role="search">
              <button class="btn btn-outline-success fa fa-search mr-1" type="submit"></button>
              <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
              <button onClick={handleLogoutClick} class="btn btn-outline-primary ms-auto px-3 rounded-pill">
                <i class="fa fa-sign-out" aria-hidden="true">Logout</i>
              </button>
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default RegNavbar;
