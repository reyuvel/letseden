import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import ConnectImage from './Connect.jpg';

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

  const handleStartClick = () => {
    navigate('/map'); 
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
              <button onClick={handleStartClick} className="btn btn-outline-success rounded-pill text-black px-4" style={{backgroundColor:'grey',marginRight:'100px',border:'none'}}>
                Start
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
