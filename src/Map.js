import React from "react";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
//import { MapContainer } from 'https://cdn.esm.sh/react-leaflet/MapContainer'
//import { TileLayer } from 'https://cdn.esm.sh/react-leaflet/TileLayer'
//import { useMap } from 'https://cdn.esm.sh/react-leaflet/hooks'

export default ({ lng, lat }) => {
  return (
    <div>
      <MapContainer center={[lng, lat]} zoom={13} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[lng, lat]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};
