// eslint-disable-next-line no-unused-vars
import React, { useEffect, useRef, useState } from "react";
import "./Weather.css";
import search_icon from "../assets/magnifier (1).png";
// import cloudy_icon from "../assets/cloudy.png";
// import rainy_icon from "../assets/rainy-day.png";
// import snow_icon from "../assets/snow.png";
// import strom_icon from "../assets/storm.png";
// import sun_icon from "../assets/sun.png";
// import weather_icon from "../assets/weather.png";
import wind_icon from "../assets/wind.png";
import humidity_icon from "../assets/humidity.png";
const Weather = () => {
  const inputRef = useRef(null);
  const [weatherData, setWeatherData] = useState(false);
  // const allIcons = {
  //   "01d": sun_icon,
  //   "01n": sun_icon,
  //   "02d": cloudy_icon,
  //   "02n": cloudy_icon,
  //   "09d": rainy_icon,
  //   "09n": rainy_icon,
  //   "10d": weather_icon,
  //   "10n": weather_icon,
  //   "11d": strom_icon,
  //   "11n": strom_icon,
  //   "13d": snow_icon,
  //   "13n": snow_icon,
  // };

  // const defaultIcon = sun_icon;
  const search = async (city) => {
    if (city === "") {
      alert("Enter a City Name");
      return;
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
        import.meta.env.VITE_APP_ID
      }`;
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);

      const iconurl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
      setWeatherData({
        humidity: data.main.humidity,
        windspeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: iconurl,
      });
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      setWeatherData(false);
      console.error("Error in Fetching the Data");
    }
  };
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        // Search using the coordinates
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${
          import.meta.env.VITE_APP_ID
        }`;

        fetch(url)
          .then((response) => response.json())
          .then((data) => {
            const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
            setWeatherData({
              humidity: data.main.humidity,
              windspeed: data.wind.speed,
              temperature: Math.floor(data.main.temp),
              location: data.name,
              icon: iconUrl,
            });
          })
          .catch((error) => {
            console.error("Error fetching weather data by location:", error);
          });
      });
    }
  }, []);
  return (
    <div className="weather">
      <div className="search-bar">
        <input ref={inputRef} type="search" placeholder="SEARCH" />
        <img
          src={search_icon}
          alt=""
          onClick={() => search(inputRef.current.value)}
        />
      </div>
      {weatherData ? (
        <>
          <img src={weatherData.icon} alt="" className="weather-icon" />
          <p className="temp">{weatherData.temperature}&deg;C</p>
          <p className="location">{weatherData.location}</p>
          <div className="weather-data">
            <div className="col">
              <img src={humidity_icon} alt="" />
              <div>
                <p>{weatherData.humidity}%</p>
                <span>HUMIDITY</span>
              </div>
            </div>
            <div className="col">
              <img src={wind_icon} alt="" />
              <div>
                <p>{weatherData.windspeed} km/hr</p>
                <span>WIND SPEED</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Weather;
