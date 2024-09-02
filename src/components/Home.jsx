import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import ConnectImage from './Connect.jpg';

const Home = () => {
  let navigate = useNavigate(); // Initialize useHistory
  const [slideInText, setSlideInText] = useState(false);
  const [slideInImage, setSlideInImage] = useState(false);

  useEffect(() => {
    setSlideInText(true);
    setTimeout(() => {
      setSlideInImage(true);
    }, 500); // Delay image slide-in to create a staggered effect
  }, []);

  const handleStartClick = () => {
    navigate('/map'); // Use history.push to navigate to the "/map" route
  };

  return (
    <div>
      <section id="home">
        <div className="container">
          <div className="row">
            <div className={`col-md-5 mt-5 ${slideInText ? 'slide-in-left' : ''}`}>
              <h1 className="display-4 text-left fw-bolder" style={{ marginTop: '2rem', fontSize: '70px' }}>
                CONNECT COMMUNE CONQUER
              </h1>
              <p className="lead" style={{ whiteSpace: 'nowrap' }}>
                "That they may be one, even as we are one" - John 17:23
              </p>
              <div className="d-flex justify-content-left" style={{marginLeft:'100px'}}>
                <button onClick={handleStartClick} className="btn btn-outline-success rounded-pill text-black px-4">Start</button>
              </div>
            </div>
            <div className="col-md-7 d-flex justify-content-end align-items-center">
              <img
                src={ConnectImage}
                alt="Beautiful Scenery"
                className={`img-fluid shadow-lg ${slideInImage ? 'slide-in-below' : 'hidden'}`}
                style={{ borderRadius: '50px', marginTop: '-2rem', width: '70%', height: 'auto' }}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;