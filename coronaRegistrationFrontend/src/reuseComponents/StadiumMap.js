import React from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";

const a_stadiumLangLat = [49.424840, 8.367550];

export default function StadiumMap(props) {
    return (
        <MapContainer center={a_stadiumLangLat} zoom={15} scrollWheelZoom={false}>
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={a_stadiumLangLat} />
        </MapContainer>
    );
}