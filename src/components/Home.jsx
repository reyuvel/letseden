import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import ConnectImage from './Connect.jpg';
import supabase from '../config/supabaseClient';

const Home = () => {
  let navigate = useNavigate(); 
  const [slideInText, setSlideInText] = useState(false);
  const [slideInImage, setSlideInImage] = useState(false);

  useEffect(() => {
    setSlideInText(true);
    setTimeout(() => {
      setSlideInImage(true);
    }, 500); // Delay image slide-in to create a staggered effect
  }, []);

  const handleLoginClick = async () => {
    const {data:{user},error}=await supabase.auth.getUser();

    if(error)
    {
      console.error("error fetching the check for a user",error);
    }

    if(user)
    {
      console.log(user);
      navigate('/map');
    }

    else{
      navigate('/login')
    }
   
     
  };

  return (
    <div>
      <section id="home"  style={{ 
        backgroundImage: `url(${ConnectImage})`, 
        backgroundSize: 'cover', // Makes the image cover the whole container
        backgroundRepeat: 'no-repeat', // Prevents the image from repeating
        backgroundPosition: 'center', // Centers the image
        width: '100vw', // Full viewport width
        height: '100vh', // Full viewport height
        display: 'flex', // Use flexbox to center content
        alignItems: 'center',
        justifyContent: 'center',

        }}>
        <div className="container">
          <div className={`col-md-5 text-left ${slideInText ? 'slide-in-left' : ''}`} style={{ color: 'white' }}>
            <h1 className="display-4 text-left fw-bolder" style={{ fontSize: '70px' }}>
              CONNECT COMMUNE CONQUER
            </h1>
            <p className="lead" style={{ whiteSpace: 'nowrap' }}>
              "That they may be one, even as we are one" - John 17:23
            </p>
            <div className="d-flex justify-content-center">
              <button onClick={handleLoginClick} className="btn btn-outline-secondary rounded-pill text-white px-4" style={{marginRight:'130px',border:'solid',borderWidth:'0.5px',borderColor:'black'}}>
                Login
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
