import axios from "axios";

const API_KEY = process.env.PUBLIC_API_WEATHER_KEY; // Thay YOUR_API_KEY bằng API key của bạn
const BASE_URL = process.env.PUBLIC_URL_WEATHER;

export const fetchWeather = async (latitude, longitude) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        lat: latitude,
        lon: longitude,
        units: "metric", // Hiển thị nhiệt độ theo độ C
        appid: API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return null;
  }
};
