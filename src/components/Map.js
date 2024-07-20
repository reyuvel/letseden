import { GoogleMap } from '@react-google-maps/api';
import React from 'react';



const Map =(props) =>{
    const{isLoaded}=props;
    const containerStyle={
        width:"400px",
        height:"400px"

    };

    const center ={
        lat: 2.9849,
        lng: 7.0009,
    };
  
    return isLoaded && (
        <>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
          

        >
        </GoogleMap>
        </>
    )

}

export default Map;