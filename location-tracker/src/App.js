import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import Map from './components/Map';
import './App.css';

function App() {
  const [startLocation, setStartLocation] = useState(null);
  const [endLocation, setEndLocation] = useState(null);
  const [travelTime, setTravelTime] = useState({ hours: 0, minutes: 0 });
  const [routeInstructions, setRouteInstructions] = useState(''); // State for route instructions

  return (
    <div className="App">
      <h1>Location Tracker</h1>
      <div className="map-container">
        <div className="map-section">
          <SearchBar setStartLocation={setStartLocation} setEndLocation={setEndLocation} />
          {travelTime.hours || travelTime.minutes ? (
            <p>
              Estimated travel time: {travelTime.hours} hours {travelTime.minutes} minutes
            </p>
          ) : null}
          <Map 
            startLocation={startLocation} 
            endLocation={endLocation} 
            setTravelTime={setTravelTime} 
            setRouteInstructions={setRouteInstructions} // Pass the new prop
          />
        </div>
        
        {/* Optional: Display the route instructions outside the map */}
        {routeInstructions && (
          <div className="route-instructions">
            <h2>Route Instructions:</h2>
            <div dangerouslySetInnerHTML={{ __html: routeInstructions }}></div> {/* Display instructions */}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
