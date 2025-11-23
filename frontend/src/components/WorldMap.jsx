import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useTheme } from '../context/ThemeContext';

// Fix for default marker icon
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const WorldMap = ({ data }) => {
    const { theme } = useTheme();
    const position = [20, 0]; // Center of the world roughly

    // Approximate coordinates for demo purposes
    const countryCoordinates = {
        "UA": [48.3794, 31.1656], // Ukraine
        "SD": [12.8628, 30.2176], // Sudan
        "TR": [38.9637, 35.2433], // Turkey
        "US": [37.0902, -95.7129], // USA
        "CN": [35.8617, 104.1954], // China
        "FR": [46.2276, 2.2137]    // France
    };

    const tileLayerUrl = theme === 'dark'
        ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        : "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png";

    return (
        <div className="h-[600px] w-full rounded-xl overflow-hidden">
            <MapContainer center={position} zoom={2} scrollWheelZoom={true} style={{ height: '100%', width: '100%', background: 'transparent' }}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                    url={tileLayerUrl}
                />
                {data && data.map((item, index) => {
                    const coords = countryCoordinates[item.countryCode];
                    if (coords) {
                        return (
                            <Marker key={index} position={coords}>
                                <Popup>
                                    <div className="text-slate-900">
                                        <h3 className="font-bold">{item.countryName}</h3>
                                        <p className="font-semibold text-red-600">{item.statusType}</p>
                                        <p>{item.description}</p>
                                    </div>
                                </Popup>
                            </Marker>
                        );
                    }
                    return null;
                })}
            </MapContainer>
        </div>
    );
};

export default WorldMap;
