import React, { useEffect, useState } from "react";
import "../components/style.css";
import WeatherDetails from "./WeatherDetails";

function Searchamin() {
  const [search, setSearch] = useState("");
  const [tempInfo, setTempInfo] = useState({});
  const getWeatherInfo = async (res, req) => {
    try {
      let url = `http://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=552bb55b7421bb2125e669b948ae3839`;
      let res = await fetch(url);
      let data = await res.json();
      const { temp, humidity, pressure } = data.main;
      const { main: weatherType } = data.weather[0];
      const { name } = data;
      const { speed } = data.wind;
      const { country, sunset } = data.sys;

      const myNewWeatherInfo = {
        temp,
        humidity,
        pressure,
        weatherType,
        name,
        speed,
        country,
        sunset,
      };
      setTempInfo(myNewWeatherInfo);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getWeatherInfo();
  }, []);

  return ( 
    <>
    
      <div className="wrap">
        <div className="search">
          <input
            type="search"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            placeholder="type city...."
            id="search"
          />
        <button className="searchButton" onClick={getWeatherInfo}>
          Search
        </button>
        </div>
      </div>
      <WeatherDetails {...tempInfo} />
    </>
  );
}

export default Searchamin;
