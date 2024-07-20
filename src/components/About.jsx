import React from 'react';
import JoinImage from './join.png';
import { useInView } from 'react-intersection-observer';

 const About = () => {
  const { ref: imageRef, inView: imageInView } = useInView({
    triggerOnce: true, // Only trigger once
  });

  const { ref: descRef, inView: descInView } = useInView({
    triggerOnce: true, // Only trigger once
  });

  return (
    <div>
      <section id="about">
        <div className="container my-5 py-5">
          <div className="row">
            <div className="col-md-5">
              <img
                ref={imageRef}
                src={JoinImage}
                alt="About"
                className={`mt-5 hidden ${imageInView ? 'show' : ''}`}
                style={{ width: '100%' }}
              />
            </div>
            <div className="col-md-6">
              <h3 className="fs-5">About</h3>
              <h1 className="display-6">
                For <b>Whom?</b>
              </h1>
              <hr />
              <p
                ref={descRef}
                className={`hidden-desc ${descInView ? 'show' : ''}`}
              >
                Are you searching for a way to connect with your faith community?
                Look no further! Our app is the perfect solution for Christians
                seeking to find and participate in local meetings, prayer
                gatherings, and events hosted by pastors and church leaders. In
                a world filled with spiritual activities, our platform makes it
                easy for you to discover and join these gatherings. Church
                leaders can effortlessly share event details, and you can
                explore nearby gatherings on an interactive map.
              </p>
              <p
                ref={descRef}
                className={`hidden-desc ${descInView ? 'show' : ''}`}
              >
                Imagine having all the information about your community’s
                spiritual events right at your fingertips—no more missing out on
                important gatherings. Whether you're looking to deepen your
                faith, meet like-minded believers, or simply stay informed about
                what’s happening in your area, our app is here to help. Built
                with the latest technology, including Flutter and Firebase, our
                app ensures a seamless and enriching experience, helping you
                stay connected and spiritually fulfilled. Join us in bringing
                the Christian community closer together, one gathering at a
                time.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
