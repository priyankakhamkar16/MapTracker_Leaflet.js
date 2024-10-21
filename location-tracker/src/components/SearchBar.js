import React, { useState } from 'react';
import axios from 'axios';

function SearchBar({ setStartLocation, setEndLocation }) {
  const [startQuery, setStartQuery] = useState('');
  const [endQuery, setEndQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (startQuery.trim() === '' || endQuery.trim() === '') return;

    // Nominatim API to get the latitude and longitude for both locations
    const startUrl = `https://nominatim.openstreetmap.org/search?q=${startQuery}&format=json&limit=1`;
    const endUrl = `https://nominatim.openstreetmap.org/search?q=${endQuery}&format=json&limit=1`;

    axios.get(startUrl).then((startResponse) => {
      if (startResponse.data.length > 0) {
        const { lat: startLat, lon: startLon } = startResponse.data[0];
        setStartLocation({ lat: parseFloat(startLat), lon: parseFloat(startLon) });

        axios.get(endUrl).then((endResponse) => {
          if (endResponse.data.length > 0) {
            const { lat: endLat, lon: endLon } = endResponse.data[0];
            setEndLocation({ lat: parseFloat(endLat), lon: parseFloat(endLon) });
          } else {
            alert('End location not found. Please try a more specific query.');
          }
        });
      } else {
        alert('Start location not found. Please try a more specific query.');
      }
    }).catch((error) => {
      console.error('Error fetching the location:', error);
    });
  };

  return (
    <form onSubmit={handleSearch}>
      <input
        type="text"
        placeholder="Enter starting location"
        value={startQuery}
        onChange={(e) => setStartQuery(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter destination"
        value={endQuery}
        onChange={(e) => setEndQuery(e.target.value)}
      />
      <button type="submit">Calculate Distance</button>
    </form>
  );
}

export default SearchBar;
