import React, { useState, useEffect } from 'react';
import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';
import RegNavbar from '../components/RegNavbar';
import supabase from '../config/supabaseClient';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import '../css/Map.css';
import { Typography } from '@mui/material';
import { Hostcard } from '../components/Hostcard';
import '../css/Hostcard.css';

function valuetext(value) {
  return `${value}°C`;
}

function Map({ isLoaded }) {
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [center, setCenter] = useState({ lat: 45.421523, lng: -75.697189 });
  const [userLocation, setUserLocation] = useState(null);
  const [markers, setMarkers] = useState([]);
  const containerStyle = { width: "1000px", height: "475px", marginLeft: "10px", marginTop: '10px' };
  const [fetcherror, setFetcherror] = useState(null);
  const [eventcards, setEventcards] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = { lat: position.coords.latitude, lng: position.coords.longitude };
          setCenter(location);
          setUserLocation(location);
        },
        (error) => {
          console.error('Error getting user location', error);
        }
      );
    } else {
      console.error('Geolocation is not supported');
    }
  }, []);

  useEffect(() => {
    const fetchMarkers = async () => {
      const { data: markersData, error } = await supabase
        .from('eventdetails')
        .select('id, latitude, longitude, eventname, date, time, address, phone, Church');
      if (error) {
        console.error('Error fetching markers:', error);
      } else {
        console.log('Fetched markers:', markersData); // Add console log
        setMarkers(markersData);
      }
    };
    fetchMarkers();
  }, []);

  useEffect(() => {
    const fetchEvent = async () => {
      const { data, error } = await supabase
          .from('eventdetails')
          .select();

      if (error) {
          setFetcherror('Fetching data failed');
          setEventcards(null);
          console.log(error);
      } else {
          setEventcards(data);
          setFetcherror(null);
      }
    };

    fetchEvent();
  }, []);
  
  return isLoaded && (
    <>
      <RegNavbar/>

      <div className='containermap'>
        <div className='control filtering-box'>
          <div>
            <p style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '0px', color: '#333' }}>Filter</p>
            <hr style={{ width: '100%', marginBottom: '20px', border: '1px solid #333' }} />
          </div>

          <div>
            <Typography style={{ fontSize: '16px' }}>Distance in Km</Typography>
            <Box sx={{ width: 200 }}>
              <Slider
                aria-label="Temperature"
                defaultValue={30}
                getAriaValueText={valuetext}
                valueLabelDisplay="auto"
                step={10}
                marks
                min={10}
                max={200}
              />
            </Box>
          </div>

          <div className="category">
            <h2 className="sidebar-title" style={{ fontSize: '18px', marginTop: '15px', color: '#333' }}>Category</h2>
            <div className='sidebar-label-container'>
              <label>
                <input type="radio" value="" name="category" style={{ display: 'flex', marginRight: '8px', alignContent: 'flex-start' }} />
                <span>All</span>
              </label>

              <label>
                <input type="radio" value="Prayer Meetings" name="category" style={{ marginRight: '8px' }} />
                <span>Prayer Meetings</span>
              </label>

              <label>
                <input type="radio" value="Convention" name="category" style={{ marginRight: '8px' }} />
                <span>Convention</span>
              </label>

              <label>
                <input type="radio" value="Youth Gathering" name="category" style={{ marginRight: '8px' }} />
                <span>Youth Gathering</span>
              </label>

              <label>
                <input type="radio" value="Conferences" name="category" style={{ marginRight: '8px' }} />
                <span>Conferences</span>
              </label>
            </div>
          </div>
        </div>

        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={15}
        >
          {userLocation && (
            <Marker position={userLocation} label="ME" />
          )}
          {markers.map((marker) => {
            if (marker.latitude !== null &&
              marker.longitude !== null &&
              !isNaN(marker.latitude) &&
              !isNaN(marker.longitude)) {
              return (
                <Marker
                  key={marker.id}
                  position={{ lat: parseFloat(marker.latitude), lng: parseFloat(marker.longitude) }}
                  onClick={() => {
                    console.log('Selected marker:', marker); // Add console log
                    setSelectedMarker(marker);
                  }} 
                />
              );
            } else {
              return null; // Do not render invalid markers
            }
          })}
          {selectedMarker && (
            <InfoWindow
              position={{ lat: parseFloat(selectedMarker.latitude), lng: parseFloat(selectedMarker.longitude) }}
              onCloseClick={() => setSelectedMarker(null)}
            >
              <div className="infoWindowContainer">
                <h3>{selectedMarker.eventname}</h3>
                <p><strong>Date:</strong> {new Date(selectedMarker.date).toLocaleDateString()}</p>
                <p><strong>Time:</strong> {selectedMarker.time}</p>
                <p><strong>Address:</strong> {selectedMarker.address}</p>
                <p><strong>Phone:</strong> {selectedMarker.number}</p>
                <p><strong>Church:</strong> {selectedMarker.Church}</p>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${selectedMarker.latitude},${selectedMarker.longitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mapLink"
                >
                  View on Google Maps
                </a>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </div>
      <section id="alleventscard">
      <div className="scroll Eventcardsmap">
        <div style={{ flex: 5 }}>
          {fetcherror && <p>{fetcherror}</p>}
          {eventcards && (
            <div className="eventcards">
              <div className="eventcard-grid">
                {eventcards.map(eventcard => (
                  <Hostcard key={eventcard.id} eventcard={eventcard} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>


      </section>
      
    </>
  );
};

export default Map;
