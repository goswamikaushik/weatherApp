import React, { useState } from "react";
import "./WeatherApp.css";
import search from "../assets/search.png";
import windicon from "../assets/wind.png";
import humidityicon from "../assets/humidity.png";

const WeatherApp = () => {
    const [text, setText] = useState("");
    const [city, setCity] = useState("");
    const [temp, setTemp] = useState("");
    const [humidity, setHumidity] = useState("");
    const [wind, setWind] = useState("");
    const [iconId, setIconId] = useState('');
    const [forecast, setForecast] = useState([]);

    const find = () => {
        if (text === "") {
            return;
        } else {
            const API_KEY = "f19fdd018509b77c6116bee5c64f1677";
            const url1 = `https://api.openweathermap.org/data/2.5/weather?q=${text}&units=metric&appid=${API_KEY}`;

            fetch(url1)
                .then(response => response.json())
                .then(data => {
                    const { main, wind, weather, name } = data;
                    setTemp(main.temp);
                    setHumidity(main.humidity);
                    setWind(wind.speed);
                    setIconId(weather[0].icon);
                    setCity(name);
                })
                .catch(error => {
                    console.log("ERROR==>", error);
                });

            const API_KEY2 = "4bda7789da2d4b54a15162023242602";
            const url2 = `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY2}&q=${text}&days=7`;
            fetch(url2)
                .then(response => response.json())
                .then(({ forecast: { forecastday } }) => {
                    setForecast(forecastday);
                })
                .catch(error => {
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
                    onClick={find}
                >
                    <img src={search} alt="search-icon" />
                </div>
            </div>

            {/* weather image */}
            {iconId && (
                <div className="image-container">
                    <img
                    className="image"
                        src={`https://openweathermap.org/img/wn/${iconId}.png`}
                        alt="weather-icon"
                    />
                </div>
            )}

            {/* temp and city name  */}
            {temp && <div className="weather-temp">{temp}°C</div>}
            {city && <div className="weather-location">{city}</div>}

            {/* humidity and wind speed */}
            <div className="data-container">
                {humidity && (
                    <div className="element">
                        <img src={humidityicon} alt="" className="icon" />
                        <div className="data">
                            <div className="humidity-percent">{humidity}%</div>
                            <div className="text">Humidity</div>
                        </div>
                    </div>
                )}
                {humidity && (
                    <div className="element">
                        <img src={windicon} alt="" className="icon" />
                        <div className="data">
                            <div className="wind-speed">{wind} km/h</div>
                            <div className="text">Wind Speed</div>
                        </div>
                    </div>
                )}
            </div>

            {/* Forecast */}
            <div className="forecast-container">
                {forecast.map((item, index) => (
                    <div className="daily-forecast" key={index}>
                        <img src={item.day.condition.icon} alt="" />
                        <p>{item.day.condition.text}</p>
                        <p>{item.date}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WeatherApp;
