import "./popover.css";
import { useState, useEffect, useRef } from "react";
import { getLocation, getWeather } from "@services/weather.service";


const WeatherPopover = () => {
  // State variables for weather data, popover state, and popover reference
  const [weatherData, setWeatherData] = useState({
    temperature: null,
    city: "CDMX",
    iconImage: "https://openweathermap.org/img/wn/02d@2x.png",
    humidity: null,
    precipProbability: null,
    windspeed: null,
    temperatureMax: null,
    temperatureMin: null,
    error: null,
  });
  const [popoverOpen, setPopoverOpen] = useState(false);
  const popoverRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Function to handle the weather button click
  const handleWeatherButtonClick = () => {
    setPopoverOpen(!popoverOpen);
  };

  // Effect to handle clicks outside the popover
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        setPopoverOpen(false);
      }
    };

    document.addEventListener("mouseenter", handleClickOutside);

    return () => {
      document.removeEventListener("mouseleave", handleClickOutside);
    };
  }, []);

  // Effect to fetch weather data when the component mounts
  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        // Get user's location
        const coords = await getLocation();
        // Fetch weather data based on location
        const weather = await getWeather(coords.latitude, coords.longitude);
        // Update weather data state
        setWeatherData(weather);
      } catch (error) {
        console.error("Geolocation error fail:", error);
        // Handle geolocation error here
        setWeatherData((prevData) => ({
          ...prevData,
          error: "Error al obtener los datos del clima",
        }));
      }
    };
    fetchWeatherData();
  }, []);

  // Effect to update current time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  // Format date and time for display
const options = { weekday: "long", day: "numeric", month: "long" };
const formattedDate = currentTime.toLocaleDateString("es-ES", options);
const formattedTime = currentTime.toLocaleTimeString("en-US", {
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
  hour12: true,
});

return (
  <>
    <button
      type="button"
      className="btn btn-primary flex flex-wrap items-center gap-4 *:text-[14px]  *:text-white  relative "
      onClick={handleWeatherButtonClick}
    >
      {/* Weather display */}
      <div className="flex items-center gap-1 flex-wrap">
        <img
          className="weather-icon text-[--neutral-variant-color]   w-[29px]"
          src={weatherData.iconImage}
          alt="Weather Icon"
        />
        <span className="font-normal cursor-pointer text-white hover:text-[--guardsman-red-500]">
          {weatherData.temperature}{" "}
          <sup className="text-[9.2px] text-[--guardsman-red-800] mr-3">
            c
          </sup>{" "}
          {weatherData.city}
        </span>
      </div>

      {/* Popover displaying weather details */}
      {popoverOpen && (
        <div
          ref={popoverRef}
          className="popover w-[11rem] bg-[--background-glass] backdrop-blur-[19px] shadow-lg p-3 *:text-[#cdcdcd] *:text-left rounded-lg absolute top-11 right-[-69px] z-[90] flex-1"
        >
          <span className="flex">
            <div className="w-full">
              <div className="flex justify-center">
                <img
                  className="w-16 h-16"
                  src={weatherData.iconImage}
                  alt="Weather Icon"
                />
              </div>
            </div>
          </span>
          <span className="flex w-full items-center text-2xl text-left font-bold">
            {weatherData.temperature}
            <sup className="m-0">c</sup>
          </span>
          <div className="flex my-2">
            <div className="w-full">
              <hr className="border-[--guardsman-red-800]" />
            </div>
          </div>
          {/* Weather details */}
          <div className="flex items-center gap-2">
            <i className="fa-solid fa-location-dot" style={{ color: "#ba0000" }}></i>
            <span>Prob. Precip: {weatherData.precipProbability}</span>
          </div>
          <div className="flex items-center gap-2">
            <i className="fa-solid fa-temperature-three-quarters" style={{ color: "#ba0000" }}></i>
            <span>Humedad: {weatherData.humidity}</span>
          </div>
          <div className="flex items-center gap-2">
            <i className="fa-solid fa-droplet" style={{ color: "#ba0000" }}></i>
            <span>Viento: {weatherData.windspeed}</span>
          </div>
          <div className="flex items-center gap-2">
            <i className="fa-solid fa-umbrella" style={{ color: "#ba0000" }}></i>
            <span>Temp-Max: {weatherData.temperatureMax}</span>
          </div>
          <div className="flex items-center gap-2">
            <i className="fa-solid fa-temperature-arrow-down" style={{ color: "#ba0000" }}></i>
            <span>Temp-Min: {weatherData.temperatureMin}</span>
          </div>
        </div>
      )}
    </button>
    {/* Date and time display */}
    <div className="flex items-center gap-2">
      <time className="flex items-center cursor-pointer ">
        {formattedDate}
      </time>{" "}
      - <time className="cursor-pointer">{formattedTime}</time>
    </div>
  </>
);

};

export default WeatherPopover;
