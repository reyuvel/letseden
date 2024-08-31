import React, { useState, useEffect } from 'react';
import { GoogleMap, Marker, InfoWindow , TileLayer} from '@react-google-maps/api';
import MapNavbar from '../components/MapNavbar';
import supabase from '../config/supabaseClient';


function Map(props) {
  const [selectedMarker, setSelectedMarker] = useState(null);
  const { isLoaded } = props;
  const [center, setCenter] = useState({ lat: 45.421523, lng: -75.697189 });
  const [userLocation, setUserLocation] = useState(null);
  const [markers, setMarkers] = useState([]);
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

  return isLoaded && (
    <>
      <MapNavbar />

      <div className='container'>
        <div className='control' style={{ marginRight: '20px' }}>
          <h1>Filter</h1>

          
      <h2 className="sidebar-title">Category</h2>

<div>
  <label className="sidebar-label-container">
    <input  type="radio" value="" name="test" />
    <span className="checkmark"></span>All
  </label>

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
            // Check if latitude and longitude are valid numbers
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
                  } } />
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
    </>
  );
};

export default Map;
