import React from "react";
import { WeatherProvider } from "./context/WeatherContext";
import HomeScreen from "./screens/HomeScreen";

export default function App() {
  return (
    <WeatherProvider>
      <HomeScreen />
    </WeatherProvider>
  );
}
