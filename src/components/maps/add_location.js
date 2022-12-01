import { Box } from '@mui/material';
import ReactMapGL, {
  GeolocateControl,
  Marker,
  NavigationControl,
} from 'react-map-gl';
// import { useValue } from '../../../context/ContextProvider';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Geocoder from './geocoder';

const AddLocation = () => {

    let [viewport, setViewPort] = useState({
        latitude: "",
        longitude: "",
        zoom: 8
    })
  
  const mapRef = useRef();

  useEffect(() => {
    if (!viewport.latitude && !viewport.longitude) {
      fetch('https://ipapi.co/json')
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          mapRef.current.flyTo({
            center: [data.longitude, data.latitude],
          });
          setViewPort({longitude:data.longitude, latitude:data.latitude})
        });
    }
  }, []);

  return (
    <Box
      sx={{
        height: 400,
        position: 'relative',
      }}
    >
      <ReactMapGL
        ref={mapRef}
        mapboxAccessToken={process.env.REACT_APP_MAP_TOKEN}
        {...viewport}
        onViewPortChange={(newView) => setViewPort(newView.viewport)}
        mapStyle="mapbox://styles/mapbox/streets-v11"
      >
        <Marker
          latitude={viewport.latitude}
          longitude={viewport.longitude}
          draggable
          onDragEnd={(e) => setViewPort({latitude:e.lngLat.lat, longitude:e.lngLat.lng})}
        />

        <NavigationControl position="bottom-right" />
        <GeolocateControl
          position="top-left"
          trackUserLocation
          onGeolocate={(e) => setViewPort({latitude:e.lngLat.lat, longitude:e.lngLat.lng})}
        />
        <Geocoder setViewPort={setViewPort} />
      </ReactMapGL>
    </Box>
  );
};

export default AddLocation;