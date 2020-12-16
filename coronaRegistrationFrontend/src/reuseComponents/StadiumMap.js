import React from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
/**
 * Contains the coordinates of the stadium
 */
const a_stadiumLongLat = [49.424840, 8.367550];

/**
 * Returns a container containing the map of the area near the stadium
 * @param {Object} props 
 */
export default function StadiumMap(props) {
    return (
        <MapContainer center={a_stadiumLongLat} zoom={15} scrollWheelZoom={false}>
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={a_stadiumLongLat} />
        </MapContainer>
    );
}