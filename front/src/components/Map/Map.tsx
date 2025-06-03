import mapStyles from "./map.module.css";
import { LatLngExpression } from "leaflet"
import { MapContainer, Marker, TileLayer, Tooltip } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import "leaflet-defaulticon-compatibility"
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css"

interface MapProps {
	position: LatLngExpression,
	zoom: number,
}

export default function Map({ position, zoom }: MapProps) {
	return (
		<MapContainer className={mapStyles.map} center={position} zoom={zoom} scrollWheelZoom={true}>
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap </a>contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			<Marker position={position}>
				<Tooltip >this is a tooltip</Tooltip>
			</Marker>
		</MapContainer>
	)
}
