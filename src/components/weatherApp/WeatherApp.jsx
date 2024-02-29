import React, { useState } from "react";
import "./WeatherApp.css";
import search from "../assets/search.png";
import windicon from "../assets/wind.png";
import humidityicon from "../assets/humidity.png";


const WeatherApp = () => {
  const [text, setText] = useState('surat');
  const [city, setCity] = useState('');
  const [temp, setTemp] = useState('');
  const [humidity, setHumidity] = useState('');
  const [wind, setWind] = useState('');
  const [iconId, setIconId] = useState(null)  


  const find = () => {
    const element = document.getElementsByClassName("cityName")
    if(element[0].value === ''){
      return 0;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&units=Metric&appid=f19fdd018509b77c6116bee5c64f1677`;
    fetch(url)
    .then((response) => response.json())
    .then(({main, wind, weather}) => {
       setTemp(main?.temp);
       setHumidity(main?.humidity);
       setWind(wind?.speed);
       setIconId(weather[0].icon);
    })
  }
  return (
    <div className="container">
      <div className="top-bar">
        <input
        value={text}
          type="text"
          className="cityName"
          placeholder="Search by city name"
          onChange={(event) => setText(event.target.value)}
        />
        <div className="search-icon" onClick ={() => {
          find();
          setCity(text);
          }}>
          <img src={search} alt="search-icon" />
        </div>
      </div>
     { iconId && <div className="wether-image">
        <img src={`https://openweathermap.org/img/wn/${iconId}@2x.png`} alt="cloud-icon" />
      </div>}
      <div className="weather-temp">{temp}c</div>
      <div className="weather-location">{city}</div>
      <div className="data-container">
        <div className="element">
          <img src={humidityicon} alt="" className="icon"/>
          <div className="data">
            <div className="humidity-percent">{humidity}%</div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className="element">
          <img src={windicon} alt="" className="icon"/>
          <div className="data">
            <div className="wind-speed">{wind}km/h</div>
            <div className="text">wind speed</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;
