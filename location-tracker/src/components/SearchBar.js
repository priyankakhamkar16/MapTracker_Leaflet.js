import React, { useState } from 'react';
import axios from 'axios';

function SearchBar({ setLocation }) {
  const [city, setCity] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (city.trim() === '') return;

    // Use Nominatim API to get the latitude and longitude of the city
    const url = `https://nominatim.openstreetmap.org/search?city=${city}&format=json`;

    axios
      .get(url)
      .then((response) => {
        if (response.data.length > 0) {
          const { lat, lon } = response.data[0];
          setLocation({ lat: parseFloat(lat), lon: parseFloat(lon) });
        } else {
          alert('Location not found');
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
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
}

export default SearchBar;
