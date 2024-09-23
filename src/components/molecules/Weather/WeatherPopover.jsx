import "./popover.css";
import { useState, useEffect, useRef } from "react";
import { getLocation, getWeather } from "@services/weather.service";

const WeatherPopover = () => {
  // State variables for weather data, popover state, and popover reference
  const [weatherData, setWeatherData] = useState({
    temperature: null,
    city: "Ubicaión no disponible",
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
  const [hasLocation, setHasLocation] = useState(false);

  const [locationAllowed, setLocationAllowed] = useState(false);
  const [modalLocationAllowed, setModalLocationAllowed] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
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
  const fetchWeatherData = async () => {
    try {
      // Get user's location
      const coords = await getLocation();
      // Fetch weather data based on location
      const weather = await getWeather(coords.latitude, coords.longitude);
      // Update weather data state
      setHasLocation(true);
      setWeatherData(weather);
    } catch (error) {
      setHasLocation(false);
      console.error("Geolocation error fail:", error);
      // Handle geolocation error here
      if (error.code == 1) {
        if (locationAllowed) {
          setModalLocationAllowed(true);
          document.body.style.overflow = 'hidden';
        }
      } else if (error.code == 2) {
        if (locationAllowed) {
          setShowAlert(true);
          setTimeout(() => {
            setShowAlert(false);
          }, 1700);
        }
      }

      setLocationAllowed(false); // SE TIENE QUE REGRESAR A FALSE, O YA NO PERMITE EL CLICK EL "Mi ubicación"

      setWeatherData((prevData) => ({
        ...prevData,
        error: "Error al obtener los datos del clima",
      }));
    }
  };
  useEffect(() => {
    fetchWeatherData();
  }, []);

  // en caso de que el usuario de click en el pin de la ubicación...
  useEffect(() => {
    if (locationAllowed === true) {
      fetchWeatherData();
    }
  }, [locationAllowed]);

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
    //hourCycle: "h24",
  });

  return (
    <>
      {hasLocation ? (
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
                  <i
                    className="fa-solid fa-location-dot"
                    style={{ color: "#ba0000" }}
                  ></i>
                  <span>Prob. Precip: {weatherData.precipProbability}</span>
                </div>
                <div className="flex items-center gap-2">
                  <i
                    className="fa-solid fa-temperature-three-quarters"
                    style={{ color: "#ba0000" }}
                  ></i>
                  <span>Humedad: {weatherData.humidity}</span>
                </div>
                <div className="flex items-center gap-2">
                  <i
                    className="fa-solid fa-droplet"
                    style={{ color: "#ba0000" }}
                  ></i>
                  <span>Viento: {weatherData.windspeed}</span>
                </div>
                <div className="flex items-center gap-2">
                  <i
                    className="fa-solid fa-umbrella"
                    style={{ color: "#ba0000" }}
                  ></i>
                  <span>Temp-Max: {weatherData.temperatureMax}</span>
                </div>
                <div className="flex items-center gap-2">
                  <i
                    className="fa-solid fa-temperature-arrow-down"
                    style={{ color: "#ba0000" }}
                  ></i>
                  <span>Temp-Min: {weatherData.temperatureMin}</span>
                </div>
              </div>
            )}
          </button>
          // {/* Date and time display */}
          <div className="flex items-center gap-2 text-xs">
            <time className="flex items-center">
              {formattedDate}
            </time>{" "}
            - <time className="cursor-pointer" translate="no">{formattedTime}</time>
          </div>
        </>
      ) : (
        <div
          className="flex hover:cursor-pointer "
          onClick={() => {
            setLocationAllowed(true);
          }}
        >
          <svg
            version="1.0"
            xmlns="http://www.w3.org/2000/svg"
            width="15px"
            height="15px"
            viewBox="0 0 512.000000 512.000000"
            preserveAspectRatio="xMidYMid meet"
          >
            <g
              transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
              fill="#ffffff"
              stroke="none"
            >
              <path
                d="M2400 5110 c-709 -64 -1316 -544 -1544 -1220 -150 -446 -115 -956 94
-1365 77 -151 1484 -2454 1520 -2487 53 -49 150 -47 197 4 17 18 600 972 1387
2271 165 273 239 462 287 737 18 99 18 420 0 530 -62 395 -234 733 -511 1010
-271 271 -605 444 -980 506 -110 18 -329 25 -450 14z m304 -905 c205 -36 358
-117 502 -267 217 -224 299 -528 224 -836 -129 -535 -725 -828 -1230 -607
-247 108 -424 312 -507 582 -24 79 -27 103 -27 243 0 140 3 164 27 243 48 157
122 281 233 391 209 210 491 301 778 251z"
              />
            </g>
          </svg>
          <p className="font-bold text-red-500 text-xs ml-1">Mi ubicación</p>
        </div>
      )}

      {/*  El Modal */}
      <div id="myModalWeather" className="modal-weather" style={{display: modalLocationAllowed ? 'block' : 'none'}}>
        {/* Contenido del Modal  */}
        <div className="modal-content-weather">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-xl mb-2 text-orange-600">Algo a ocurrido!</h2>
             <p className="text-3xl text-red-500 hover:cursor-pointer mb-0"
              onClick={() => {
                setModalLocationAllowed(false);
                document.body.style.overflow = 'auto';
              }}
             >&times;</p>
          </div>
          <p>No es posible acceder a tu ubicación.</p>
          <p>Al parecer esta bloquedo el permiso, es necesario habilitarlo y recargar la página para poder acceder.</p>
        </div>
      </div>

      {/* ALERT */}
      <div className={`alert-weather ${showAlert ? 'alert-show' : 'alert-hide'}`} >
        <p>Información de ubicación no está disponible.</p>
      </div>

    </>
  );
};

export default WeatherPopover;
