import React, { useState, useEffect } from "react";
import { fetchWeather } from "../API/weatherApi";
import L from "leaflet";
import styles from "./UserCard.module.css";
import "leaflet/dist/leaflet.css";

const UserCard = ({ user, isSaved }) => {
  const [weather, setWeather] = useState(null);
  const [hourlyWeather, setHourlyWeather] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const getWeather = async () => {
      const weatherData = await fetchWeather(user.latitude, user.longitude);
      setWeather(weatherData);
      setHourlyWeather(weatherData?.hourly || []);
    };

    getWeather();
    const intervalId = setInterval(getWeather, 300000);
    return () => clearInterval(intervalId);
  }, [user.latitude, user.longitude]);

  useEffect(() => {
    if (user.latitude && user.longitude) {
      const map = L.map(`map-${user.email}`).setView([user.latitude, user.longitude], 2);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      const marker = L.marker([user.latitude, user.longitude]).addTo(map);
      const icon = L.divIcon({
        className: "profile-icon",
        html: `<img src="${user.profileImage}" alt="Profile" class="profile-image-map" />`,
        iconSize: [20, 20],
        iconAnchor: [10, 10],
      });
      marker.setIcon(icon);
    }
  }, [user.latitude, user.longitude, user.email, user.profileImage]);

  const saveToLocalStorage = () => {
    const userDetails = {
      name: user.name,
      gender: user.gender,
      profileImage: user.profileImage,
      location: user.location,
      email: user.email,
      latitude: user.latitude,
      longitude: user.longitude,
      weather: weather,
    };

    const storedUsers = JSON.parse(localStorage.getItem("savedUsers")) || [];
    const existingUserIndex = storedUsers.findIndex(storedUser => storedUser.email === user.email);

    if (existingUserIndex !== -1) {
      storedUsers[existingUserIndex] = userDetails;
    } else {
      storedUsers.push(userDetails);
    }

    localStorage.setItem("savedUsers", JSON.stringify(storedUsers));
    alert("User details saved!");
  };

  const openWeatherModal = () => setIsModalOpen(true);
  const closeWeatherModal = () => setIsModalOpen(false);

  const roundedTemperature = weather ? weather.temperature.toFixed(0) : null;
  const roundedMinTemperature = weather ? weather.minTemperature.toFixed(0) : null;
  const roundedMaxTemperature = weather ? weather.maxTemperature.toFixed(0) : null;

  return (
    <li className={styles.card}>
      <div className={styles.profileInfo}>
        <img src={user.profileImage} alt={`${user.name}'s profile`} className={styles.profileImage} />
        <h3 className={styles.userName}>{user.name}</h3>
        <p className={styles.userInfo}>{user.gender}</p>
        <p className={styles.userInfo}>{user.location}</p>
        <p className={styles.userInfo}>{user.email}</p>
  
        {weather ? (
          <div className={styles.weatherContainer}>
            <div className={styles.temp_conteiner}>
              <p className={styles.temperature}>Temperature: {roundedTemperature}°C</p>
              <p className="flex items-center justify-center">
                <img src={weather.iconUrl} alt="weather icon" className={styles.weatherIcon} />
              </p>
            </div>
            <p className="text-sm text-gray-500">
              Low: {roundedMinTemperature}°C | High: {roundedMaxTemperature}°C
            </p>
          </div>
        ) : (
          <p className={styles.userInfo}>Loading weather...</p>
        )}
  
        <div className={styles.buttonContainer}>
          {!isSaved && (
            <button onClick={saveToLocalStorage} className={`${styles.button} ${styles.saveButton}`}>
              Save
            </button>
          )}
          <button onClick={openWeatherModal} className={`${styles.button} ${styles.weatherButton}`}>
            Weather
          </button>
        </div>
      </div>
  
      <div className={styles.mapContainer}>
        <div id={`map-${user.email}`} style={{ height: "100%", width: "100%" }}></div>
      </div>
  
      {isModalOpen && (
  <div className={`${styles.modalOverlay} ${isModalOpen ? styles.open : ''}`}>
    <div className={styles.modalContent}>
      <h2>Weather Details for {user.name}</h2>
      {weather ? (
        <>
          <div className={styles.temp_conteiner}>
            <p className={styles.temperature}>Temperature: {roundedTemperature}°C</p>
            <img src={weather.iconUrl} alt="weather icon" className={styles.weatherIcon} />
          </div>
          <p className="text-sm text-gray-500">
            Low: {roundedMinTemperature}°C | High: {roundedMaxTemperature}°C
          </p>
          <h3>Hourly Forecast</h3>
          <div className={styles.hourlyForecastTableContainer}>
            <table className={styles.hourlyForecastTable}>
              <thead>
                <tr>
                  <th>Hour</th>
                  <th>Temperature (°C)</th>
                  <th>Weather</th>
                </tr>
              </thead>
              <tbody>
                {hourlyWeather.map((temp, index) => (
                  <tr key={index}>
                    <td>{index}:00</td>
                    <td>{temp.toFixed(1)}°C</td>
                    <td>
                      <img src={weather.iconUrl} alt="weather icon" className={styles.weatherIcon} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <p>Loading weather...</p>
      )}
      <button onClick={closeWeatherModal} className={`${styles.button} ${styles.closeButton}`}>
        Close
      </button>
    </div>
  </div>
)}

    </li>
  );
};

export default UserCard;
