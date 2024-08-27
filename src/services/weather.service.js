// Function to get the user's location using geolocation
const getLocation = () => {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      // If the browser supports geolocation, get the current position
      navigator.geolocation.getCurrentPosition(
        (position) => resolve(position.coords), // Resolve with the coordinates of the position
        (error) => reject(error) // Reject with the error if there's any issue
      );
    } else {
      // If geolocation is not supported, reject with a message
      reject("Geolocation is not supported by this browser.");
    }
  });
};

// Map of weather codes from Open Meteo to OpenWeatherMap icon codes
const weatherCodeToIcon = {
  0: "01", // Clear sky
  1: "02", // Mainly clear
  2: "03", // Partly cloudy
  3: "04", // Overcast
  45: "50", // Fog
  48: "50", // Depositing rime fog
  51: "09", // Drizzle: Light
  53: "09", // Drizzle: Moderate
  55: "09", // Drizzle: Dense intensity
  56: "09", // Freezing Drizzle: Light
  57: "09", // Freezing Drizzle: Dense intensity
  61: "10", // Rain: Slight
  63: "10", // Rain: Moderate
  65: "10", // Rain: Heavy intensity
  66: "10", // Freezing Rain: Light
  67: "10", // Freezing Rain: Heavy intensity
  71: "13", // Snow fall: Slight
  73: "13", // Snow fall: Moderate
  75: "13", // Snow fall: Heavy intensity
  77: "13", // Snow grains
  80: "09", // Rain showers: Slight
  81: "09", // Rain showers: Moderate
  82: "09", // Rain showers: Violent
  85: "13", // Snow showers slight
  86: "13", // Snow showers heavy
  95: "11", // Thunderstorm: Slight or moderate
  96: "11", // Thunderstorm with slight hail
  99: "11", // Thunderstorm with heavy hail
};

// Function to build the weather icon URL based on code and time of day
const getWeatherIconURL = (code, isDaytime) => {
  const timeIndicator = isDaytime ? "d" : "n";
  const iconCode = weatherCodeToIcon[code] || "02"; // Default to "02" if code is not found
  return `https://openweathermap.org/img/wn/${iconCode}${timeIndicator}@2x.png`;
};

// Function to get weather data based on the provided latitude and longitude
const getWeather = async (lat, long) => {
  try {
    let city;
    // Fetch reverse geocode data to determine the city
    const geoData = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${long}&localityLanguage=en`
    );
    const { city: cityName } = await geoData.json(); // Extract the city name from the data
    city = cityName;

    // Fetch weather data from the Open Meteo API
    const weatherData = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current_weather=true&hourly=relativehumidity_2m,precipitation_probability,windspeed_180m&daily=temperature_2m_max,temperature_2m_min&timezone=auto`
    );
    const data = await weatherData.json(); // Convert data to JSON format
    const currentWeather = data.current_weather; // Get the current weather

    // Extract relevant data from the current weather or use default values if unavailable
    const temperature = currentWeather.temperature || "17";
    const weatherCode = currentWeather.weathercode || 2; // Default weather code if unavailable
    const isDaytime =
      currentWeather.is_day !== undefined ? currentWeather.is_day : true; // Default to daytime if unavailable
    const iconImage = getWeatherIconURL(weatherCode, isDaytime);
    const humidity = data.hourly.relativehumidity_2m[0] || "50";
    const precipProbability = data.hourly.precipitation_probability[0] || "20";
    const windspeed = data.hourly.windspeed_180m[0] || "5";
    const temperatureMax = data.daily.temperature_2m_max[0] || "18";
    const temperatureMin = data.daily.temperature_2m_min[0] || "16";

    // Return an object with the weather data
    return {
      temperature,
      city,
      iconImage,
      humidity: `${humidity}%`,
      precipProbability: `${precipProbability}%`,
      windspeed: `${windspeed}km/h`,
      temperatureMax: `${temperatureMax}°C`,
      temperatureMin: `${temperatureMin}°C`,
    };
  } catch (error) {
    // Handle any errors that may occur during weather data retrieval
    console.error("Error fetching weather data:", error);
    // Return an object with an error message in case of failure
    return { error: "Failed to retrieve weather data" };
  }
};

// Export
export { getLocation, getWeather };
