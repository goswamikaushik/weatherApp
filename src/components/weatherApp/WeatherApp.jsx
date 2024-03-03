import React, { useState } from "react";
import "./WeatherApp.css";
import search from "../assets/search.png";
import windicon from "../assets/wind.png";
import humidityicon from "../assets/humidity.png";

const WeatherApp = () => {
  const [text, setText] = useState("surat");
  const [city, setCity] = useState("");
  const [temp, setTemp] = useState("");
  const [humidity, setHumidity] = useState("");
  const [wind, setWind] = useState("");
  const [iconId, setIconId] = useState(null);
  const [forecast, setForecast] = useState([]);
  console.log(forecast);
  const find = () => {
    const element = document.getElementsByClassName("cityName");
    if (element[0].value === "") {
      return 0;
    } else {
      const API_KEY = "f19fdd018509b77c6116bee5c64f1677";
      const url1 = `https://api.openweathermap.org/data/2.5/weather?q=${text}&units=Metric&appid=${API_KEY}`;

      //current weather
      fetch(url1)
        .then((response) => response.json())
        .then((data) => {
          return data;
        })
        .then(({ main, wind, weather }) => {
          setTemp(main?.temp);
          setHumidity(main?.humidity);
          setWind(wind?.speed);
          setIconId(weather[0].icon);
        })
        .catch((error) => {
          console.log("ERROR==>", error);
        });

      const API_KEY2 = "4bda7789da2d4b54a15162023242602";
      const url2 = `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY2}&q=surat&days=7`;
      fetch(url2)
        .then((response) => response.json())
        .then(({ forecast: { forecastday } }) => {
          setForecast(forecastday);
        })
        .catch((error) => {
          console.log("error", error);
        });
    }
  };
  return (
    <div className="container">
      {/* search bar  */}
      <div className="top-bar">
        <input
          value={text}
          type="text"
          className="cityName"
          placeholder="Search by city name"
          onChange={(event) => setText(event.target.value)}
        />
        <div
          className="search-icon"
          onClick={() => {
            find();
            setCity(text);
            setText("");
          }}
        >
          <img src={search} alt="search-icon" />
        </div>
      </div>

      {/* weather image */}
      <div className="weather-image">
        <img
          src={`https://openweathermap.org/img/wn/${iconId}@2x.png`}
          alt="cloud-icon"
        />
      </div>

      {/* temp and city name  */}
      <div className="weather-temp">{temp}c</div>
      <div className="weather-location">{city}</div>

      {/* humidity  */}
      <div className="data-container">
        <div className="element">
          <img src={humidityicon} alt="" className="icon" />
          <div className="data">
            <div className="humidity-percent">{humidity}%</div>
            <div className="text">Humidity</div>
          </div>
        </div>

        {/* wind speed */}
        <div className="element">
          <img src={windicon} alt="" className="icon" />
          <div className="data">
            <div className="wind-speed">{wind}km/h</div>
            <div className="text">wind speed</div>
          </div>
        </div>
      </div>
      <div className="forecast_container">
        {forecast.map((item) => {
          return (
            <>
            <div className="daily_forecast">
              <p>kaushik</p>
            </div>
            <div>
             <p>data</p>
            </div>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default WeatherApp;
