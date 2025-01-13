import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import * as Location from "expo-location";
import { WeatherContext } from "../context/WeatherContext";
import { fetchWeather } from "../utils/api";
import Icon from "react-native-vector-icons/Ionicons";

export default function HomeScreen() {
  const { weatherData, updateWeatherData } = useContext(WeatherContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getLocationAndWeather = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          alert("Quyền truy cập vị trí bị từ chối");
          return;
        }

        const location = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords;

        const weather = await fetchWeather(latitude, longitude);
        updateWeatherData(weather);
      } catch (error) {
        console.error("Error getting location or weather:", error);
      } finally {
        setLoading(false);
      }
    };

    getLocationAndWeather();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Đang tải...</Text>
      </View>
    );
  }

  if (!weatherData) {
    return (
      <View style={styles.container}>
        <Text>Không thể tải dữ liệu thời tiết</Text>
      </View>
    );
  }

  const { main, weather, name } = weatherData;

  return (
    <View style={styles.container}>
      <Text style={styles.cityName}>{name}</Text>
      <Text style={styles.temperature}>{Math.round(main.temp)}°C</Text>
      <Icon name="cloud-outline" size={50} color="#000" />
      <Text style={styles.description}>{weather[0].description}</Text>
      <Text style={styles.details}>Độ ẩm: {main.humidity}%</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    padding: 20,
  },
  cityName: {
    fontSize: 32,
    fontWeight: "bold",
  },
  temperature: {
    fontSize: 48,
    fontWeight: "bold",
    marginVertical: 10,
  },
  description: {
    fontSize: 18,
    fontStyle: "italic",
    textTransform: "capitalize",
  },
  details: {
    fontSize: 16,
    marginTop: 10,
  },
});
