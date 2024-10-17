import React, { useState } from 'react';
import axios from 'axios';

function SearchBar({ setLocation }) {
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim() === '') return;

    // Use Nominatim API to get the latitude and longitude of the specific location
    const url = `https://nominatim.openstreetmap.org/search?q=${query}&format=json&limit=1`;

    axios
      .get(url)
      .then((response) => {
        if (response.data.length > 0) {
          const { lat, lon } = response.data[0];
          setLocation({ lat: parseFloat(lat), lon: parseFloat(lon) });
        } else {
          alert('Location not found. Please try a more specific query.');
        }
      })
      .catch((error) => {
        console.error('Error fetching the location:', error);
      });
  };

  return (
    <form onSubmit={handleSearch}>
      <input
        type="text"
        placeholder="Enter city or specific location"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
}

export default SearchBar;
