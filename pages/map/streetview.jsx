import React, { useEffect, useState } from "react";
import dynamic from 'next/dynamic';

const GoogleStreetView = dynamic(() => import('react-google-streetview'), {
  ssr: false // Set ssr to false to only load this module on the client-side
});

const Streetview = ({latitude, longitude, closeKeyword}) => {

    const googleMapsApiKey = process.env.REACT_APP_MapAPI

    const streetViewPanoramaOptions = {
      position: { lat: parseFloat(latitude), lng: parseFloat(longitude) },
      pov: { heading: 100, pitch: 0 },
      zoom: 1,
      addressControl: false,
      showRoadLabels: false,
      zoomControl: true
    };

    return (
      <div className="container-fluid h-100">
  
      <button className="back-map mt-1 ms-2 p-2" onClick={closeKeyword}>Back</button>

   
        {latitude != undefined && 
        <GoogleStreetView
        apiKey={googleMapsApiKey}
        streetViewPanoramaOptions={streetViewPanoramaOptions}
      />
        }
      </div>
    );
  };

export default Streetview