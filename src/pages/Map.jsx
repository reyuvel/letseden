import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
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

const containerStyle = { width: "1000px", height: "475px", marginLeft: "10px", marginTop: '10px' };

function Map({ isLoaded }) {
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [center, setCenter] = useState({ lat: 45.421523, lng: -75.697189 });
  const [userLocation, setUserLocation] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [allMarkers, setAllMarkers] = useState([]);
  const [fetcherror, setFetcherror] = useState(null);
  const [eventcards, setEventcards] = useState(null);
  const [value, setValue] = useState(30);

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
        console.log('Fetched markers:', markersData);
        setAllMarkers(markersData);
        setMarkers(markersData); // Initially set both states to the fetched markers
      }
    };
    fetchMarkers();
  }, []);

  useEffect(() => {
    const fetchEvent = async () => {
      const { data, error } = await supabase.from('eventdetails').select();

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

  useEffect(() => {
    const fetchUsers = async () => {
      const { data, error } = await supabase.from("eventdetails").select('latitude,longitude');

      if (error) {
        console.log(error);
      } else {
        console.log("this is the latitude and longitude list", data);
      }
    };

    fetchUsers();
  }, []);

  // Using Distance Matrix API to filter markers based on driving distance
  const handleDistance = async (event, newValue) => {
    setValue(newValue);

    if (!userLocation || allMarkers.length === 0) return;

    const origin = new window.google.maps.LatLng(userLocation.lat, userLocation.lng);
    const destinations = allMarkers.map(marker => new window.google.maps.LatLng(marker.latitude, marker.longitude));

    const service = new window.google.maps.DistanceMatrixService();

    service.getDistanceMatrix({
      origins: [origin],
      destinations: destinations,
      travelMode: window.google.maps.TravelMode.DRIVING,
    }, (response, status) => {
      if (status === 'OK') {
        const distances = response.rows[0].elements;
        const filteredMarkers = allMarkers.filter((marker, index) => {
          return distances[index].distance.value <= newValue * 1000; // Convert km to meters
        });

        console.log('Filtered Markers:', filteredMarkers);
        setMarkers(filteredMarkers);
      } else {
        console.error('DistanceMatrixService Error:', status);
      }
    });
  };

  return isLoaded && (
    <>
      <RegNavbar />

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
                aria-label="Distance"
                defaultValue={30}
                getAriaValueText={valuetext}
                valueLabelDisplay="auto"
                value={value}
                onChange={handleDistance}
                step={10}
                marks
                min={10}
                max={500}
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
          {markers.map((marker) => (
            <Marker
              key={marker.id}
              position={{ lat: parseFloat(marker.latitude), lng: parseFloat(marker.longitude) }}
              onClick={() => setSelectedMarker(marker)} 
            />
          ))}
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
                <p><strong>Phone:</strong> {selectedMarker.phone}</p>
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
}

export default Map;
