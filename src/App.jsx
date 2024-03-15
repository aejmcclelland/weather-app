import React, { useState, useEffect } from 'react';

function Weather() {
  const [weather, setWeather] = useState(null); // Initialize with null instead of ''
  useEffect(() => {
    getGeocodes();
  }, []);

  const getGeocodes = async () => {
    try {
      const response = await fetch('http://api.openweathermap.org/geo/1.0/direct?q=Belfast,GB&limit=1&appid=54c7b7c4cd747a21c78c1b8fcde4b2fc');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      const { lat, lon } = data[0]; // Extract latitude and longitude
      getWeather(lat, lon);
    } catch (error) {
      console.error('There was a problem fetching geocodes:', error);
    }
  };

  const getWeather = async (lat, lon) => {
    try {
      const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=54c7b7c4cd747a21c78c1b8fcde4b2fc&units=metric`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setWeather(data);
    } catch (error) {
      console.error('There was a problem fetching weather data:', error);
    }
  };

  if (!weather) {
    return <div>Loading...</div>; // Render a loading indicator while weather data is being fetched
  }

  return (
    <div className='container'>
      <h1>Weather Forecast for Belfast</h1>
      <p>Current Weather: {weather.weather[0].description}</p>
      <p>Temperature: {weather.main.temp}°C</p>
      <p>Humidity: {weather.main.humidity}%</p>
    </div>
  );
}

export default Weather;
