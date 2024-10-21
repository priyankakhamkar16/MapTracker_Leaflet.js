import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import 'leaflet-routing-machine'; // Import the routing machine

// Fix Leaflet's default icon issue
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

function Map({ startLocation, endLocation, setTravelTime }) {
  useEffect(() => {
    const defaultLocation = { lat: 51.505, lon: -0.09 }; // Default to London

    const map = L.map('map').setView([defaultLocation.lat, defaultLocation.lon], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Create routing control when both start and end locations are available
    if (startLocation && endLocation) {
      const routingControl = L.Routing.control({
        waypoints: [
          L.latLng(startLocation.lat, startLocation.lon),
          L.latLng(endLocation.lat, endLocation.lon),
        ],
        lineOptions: { styles: [{ color: '#6FA1EC', weight: 4 }] },
        routeWhileDragging: true,
        createMarker: () => null, // Disable marker creation for route instructions
        show: false, // Disable routing instructions display
      }).addTo(map);

      routingControl.on('routesfound', function(e) {
        const route = e.routes[0];
        const travelTime = route.summary.totalTime; // Travel time in seconds

        // Convert travel time to hours and minutes
        const hours = Math.floor(travelTime / 3600);
        const minutes = Math.floor((travelTime % 3600) / 60);
        setTravelTime({ hours, minutes });
      });

      // Add start and end markers to the map
      L.marker([startLocation.lat, startLocation.lon]).addTo(map)
        .bindPopup('Start Point')
        .openPopup();

      L.marker([endLocation.lat, endLocation.lon]).addTo(map)
        .bindPopup('End Point')
        .openPopup();

      return () => {
        routingControl.getPlan().setWaypoints([]); // Clear the waypoints if start and end locations change
        map.remove();
      };
    }

    return () => {
      map.remove(); // Remove map instance when the component unmounts
    };
  }, [startLocation, endLocation, setTravelTime]);

  return <div id="map" style={{ height: '500px', width: '100%' }}></div>;
}

export default Map;
