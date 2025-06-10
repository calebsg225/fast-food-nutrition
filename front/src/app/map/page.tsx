"use client"

import { useMemo, useRef, useState } from "react";
import styles from "./page.module.css";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import * as L from "leaflet";
import { MapContainer, Marker, TileLayer, Tooltip } from "react-leaflet";
import { useGoogle } from "@/hooks/useGoogle";

export default function FoodMap() {
  const mapRef = useRef<L.Map>(null);
  const [location, setLocation] = useState<L.LatLng>(new L.LatLng(33.9560, -84.05647));
  const [zoom, setZoom] = useState<number>(15);
  const [radius, setRadius] = useState<number>(200);
  const { data, isPending } = useGoogle(radius, location.lat, location.lng);

  const onUpdateLocation = () => {
    if (!mapRef.current) return;
    setLocation(mapRef.current.getCenter());
  }

  const Map = useMemo(() => {
    return () => (
      <MapContainer
        className={styles.map}
        center={location} zoom={zoom}
        scrollWheelZoom={true}
        ref={mapRef}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap </a>contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={location}>
          <Tooltip >current location</Tooltip>
        </Marker>
        {data.places && data.places.map(place =>
          <Marker
            position={[
              place.location.latitude,
              place.location.longitude
            ]}>
            <Tooltip>{place.displayName.text}</Tooltip>
          </Marker>
        )}
      </MapContainer>
    );
  }, [data]);

  return (
    <>
      <div className={styles.foodmap} >
        <Map />
      </div>
      <button onClick={onUpdateLocation}>update location manual</button>
    </>
  );
}
