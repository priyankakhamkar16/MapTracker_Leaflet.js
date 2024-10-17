import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import Map from './components/Map';
import './App.css';

function App() {
  const [location, setLocation] = useState({ lat: 51.505, lon: -0.09 }); // Default to London

  return (
    <div className="App">
      <h1>City Location Tracker</h1>
      <SearchBar setLocation={setLocation} />
      <Map location={location} />
    </div>
  );
}

export default App;
