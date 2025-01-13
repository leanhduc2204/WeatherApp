import axios from "axios";

const API_KEY = "3c1e207ac0303f5e26855e053034e498"; // Thay YOUR_API_KEY bằng API key của bạn
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

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
