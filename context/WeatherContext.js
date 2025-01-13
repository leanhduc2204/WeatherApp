import React, { createContext, useState } from "react";

export const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
  const [weatherData, setWeatherData] = useState(null);

  const updateWeatherData = (data) => {
    setWeatherData(data);
  };

  return (
    <WeatherContext.Provider value={{ weatherData, updateWeatherData }}>
      {children}
    </WeatherContext.Provider>
  );
};
