import React, { useState, useEffect } from 'react';
import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';
import parksData from '../components/data-sakte.json';
import MapNavbar from '../components/MapNavbar';

const Map = (props) => {
  const [selectedPark, setSelectedPark] = useState(null);
  const { isLoaded } = props;
  const [center, setCenter] = useState({ lat: 45.421523, lng: -75.697189 });
  const [userLocation, setUserLocation] = useState(null);
  const containerStyle = { width: "1000px", height: "485px" };

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

  return isLoaded && (
    <>
      <MapNavbar />
      <div className='container'>
        <div className='control' style={{ marginRight: '20px' }}>
          <h1></h1>
        </div>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={15}
        >
          {userLocation && (
            <Marker
              position={userLocation}
              label="ME"
            />
          )}
          {parksData.features.map((park) => (
            <Marker
              key={park.properties.PARK_ID}
              position={{ lat: park.geometry.coordinates[1], lng: park.geometry.coordinates[0] }}
              onClick={() => setSelectedPark(park)}
            />
          ))}
          {selectedPark && (
            <InfoWindow
              position={{ lat: selectedPark.geometry.coordinates[1], lng: selectedPark.geometry.coordinates[0] }}
              onCloseClick={() => setSelectedPark(null)}
            >
              <div>
                <h2>{selectedPark.properties.NAME}</h2>
                <p>{selectedPark.properties.DESCRIPTIO}</p>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${selectedPark.geometry.coordinates[1]},${selectedPark.geometry.coordinates[0]}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View on Google Maps
                </a>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </div>
    </>
  );
};

export default Map;