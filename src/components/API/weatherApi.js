import axios from 'axios';

export const fetchWeather = async (latitude, longitude) => {
  try {
    const response = await axios.get('https://api.open-meteo.com/v1/forecast', {
      params: {
        latitude: latitude,
        longitude: longitude,
        current_weather: true,
        hourly: 'temperature_2m,weathercode',
        timezone: 'auto',
      },
    });

    const { current_weather, hourly } = response.data;
    const weatherCode = current_weather.weathercode;
    let weatherDescription = '';
    let weatherIconUrl = '';

    switch (weatherCode) {
      case 0:
        weatherDescription = 'Сонячно';
        weatherIconUrl = 'https://openweathermap.org/img/wn/01d@2x.png';
        break;
      case 1:
      case 2:
      case 3:
      case 4:
        weatherDescription = 'Хмарно';
        weatherIconUrl = 'https://openweathermap.org/img/wn/04d@2x.png';
        break;
      case 5:
        weatherDescription = 'Дощ';
        weatherIconUrl = 'https://openweathermap.org/img/wn/09d@2x.png';
        break;
      case 6:
        weatherDescription = 'Сніг';
        weatherIconUrl = 'https://openweathermap.org/img/wn/13d@2x.png';
        break;
      case 7:
        weatherDescription = 'Гроза';
        weatherIconUrl = 'https://openweathermap.org/img/wn/11d@2x.png';
        break;
      case 8:
        weatherDescription = 'Туман';
        weatherIconUrl = 'https://openweathermap.org/img/wn/50d@2x.png';
        break;
      default:
        weatherDescription = 'Невідомо';
        weatherIconUrl = 'https://openweathermap.org/img/wn/50d@2x.png';
    }

    const temperature = current_weather.temperature;
    if (temperature < 0) {
      weatherIconUrl = 'https://openweathermap.org/img/wn/13d@2x.png'; 
    } else if (temperature >= 0 && temperature < 10) {
      weatherIconUrl = 'https://openweathermap.org/img/wn/04d@2x.png';
    } else if (temperature >= 10 && temperature < 20) {
      weatherIconUrl = 'https://openweathermap.org/img/wn/01d@2x.png'; 
    } else if (temperature >= 20 && temperature < 30) {
      weatherIconUrl = 'https://openweathermap.org/img/wn/02d@2x.png'; 
    }

    return {
      temperature: current_weather.temperature,
      minTemperature: Math.min(...hourly.temperature_2m.slice(0, 24)),
      maxTemperature: Math.max(...hourly.temperature_2m.slice(0, 24)),
      weatherDescription,
      iconUrl: weatherIconUrl,
      hourly: hourly.temperature_2m.slice(0, 24),
      time: hourly.time.slice(0, 24),
    };

  } catch (error) {
    console.error('Error fetching weather data:', error);
    return null;
  }
};
