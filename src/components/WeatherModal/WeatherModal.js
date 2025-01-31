import React from 'react';

const WeatherModal = ({ temperature, weatherIcon, onClose }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <img src={weatherIcon} alt="Weather Icon" className="weather-icon" />
        <h3>Current Temperature: {temperature}°C</h3>
        <button onClick={onClose} className="btn-close">Close</button>
      </div>
    </div>
  );
};

export default WeatherModal;
