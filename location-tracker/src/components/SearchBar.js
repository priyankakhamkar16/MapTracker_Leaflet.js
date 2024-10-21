import React, { useState } from 'react';
import axios from 'axios';
import './SearchBar.css';

function SearchBar({ setStartLocation, setEndLocation, startLocation, endLocation }) {
  const [startQuery, setStartQuery] = useState('');
  const [endQuery, setEndQuery] = useState('');

  // Handle search queries for start and end locations
  const handleSearch = (e) => {
    e.preventDefault();
    if (startQuery.trim() === '' || endQuery.trim() === '') return;

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

  // Handle swapping between start and end locations
  const handleSwap = () => {
    // Swap the input queries
    const tempQuery = startQuery;
    setStartQuery(endQuery);
    setEndQuery(tempQuery);

    // Swap the locations
    setStartLocation(endLocation); // Set the start location as the previous end location
    setEndLocation(startLocation); // Set the end location as the previous start location
  };

  return (
    <form onSubmit={handleSearch} className="search-bar">
      <div className="input-group">
        <input
          type="text"
          placeholder="Enter starting location"
          value={startQuery}
          onChange={(e) => setStartQuery(e.target.value)}
        />
        <button
          type="button"
          className="swap-button"
          onClick={handleSwap}
          title="Swap start and end locations"
        >
          ⇅
        </button>
        <input
          type="text"
          placeholder="Enter destination"
          value={endQuery}
          onChange={(e) => setEndQuery(e.target.value)}
        />
      </div>
      <button type="submit">Calculate Distance</button>
    </form>
  );
}

export default SearchBar;
