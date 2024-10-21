import React, { useEffect, useRef } from "react"; // Added useRef
import "./styles.css";
import "leaflet/dist/leaflet.css"; // Import Leaflet CSS
import L from "leaflet"; // Import Leaflet

function BusIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 6v6" />
      <path d="M15 6v6" />
      <path d="M2 12h19.6" />
      <path d="M18 18h3s.5-1.7.8-2.8c.1-.4.2-.8.2-1.2 0-.4-.1-.8-.2-1.2l-1.4-5C20.1 6.8 19.1 6 18 6H4a2 2 0 0 0-2 2v10h3" />
      <circle cx="7" cy="18" r="2" />
      <path d="M9 18h5" />
      <circle cx="16" cy="18" r="2" />
    </svg>
  );
}

function SearchIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

export function Mypage() {
  const mapRef = useRef(null); // Use useRef to store map instance

  useEffect(() => {
    if (mapRef.current === null) { // Only initialize the map once
      const map = L.map("map").setView([51.505, -0.09], 13); // Initialize map

      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: "© OpenStreetMap",
      }).addTo(map); // Add OpenStreetMap tiles

      let marker, circle;

      // Watch for user's current location
      navigator.geolocation.watchPosition(success, error);

      function success(pos) {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        const accuracy = pos.coords.accuracy;

        // Remove existing marker and circle
        if (marker) {
          map.removeLayer(marker);
          map.removeLayer(circle);
        }

        marker = L.marker([lat, lng]).addTo(map); // Add a marker at user's location
        circle = L.circle([lat, lng], { radius: accuracy }).addTo(map); // Add accuracy circle

        map.setView([lat, lng]); // Center the map on the user's location
      }

      function error(err) {
        if (err.code === 1) {
          alert("Please allow geolocation access.");
        } else {
          alert("Cannot get your location.");
        }
      }

      mapRef.current = map; // Save map instance to mapRef
    }
  }, []);

  return (
    <div className="fit-screen">
      <div className="sidebar">
        <div className="logo">
          <a href="/" className="logo-link">
            <BusIcon className="icon" />
            <span className="logo-text">E TRANSIT</span>
          </a>
        </div>

        <div className="input-group">
          <div className="input-wrapper">
            <SearchIcon className="icon" />
            <input type="text" placeholder="From" className="input" />
          </div>
        </div>
        <div className="input-group">
          <div className="input-wrapper">
            <SearchIcon className="icon" />
            <input type="text" placeholder="Destination" className="input" />
          </div>
        </div>

        <button className="button search-button">Search</button>
        <button className="button saved-button">Saved Locations</button>
        <button className="button nearby-bus-button">Nearby Bus</button>
        <button className="button nearby-stop-button">Nearby Bus Stop</button>
        <button className="button show-list-button bottom">Show List</button>
      </div>

      <main className="main">
        {/* Add a map div with id="map" */}
        <div id="map" style={{ height: "100%", width: "100%" }}></div>
      </main>
    </div>
  );
}
