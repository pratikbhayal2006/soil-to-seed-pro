import { useState, useCallback } from "react";
import type { WeatherData } from "@/components/WeatherDisplay";

// Simulated weather data based on Indian states and seasons
const getSimulatedWeather = (state: string, district: string): WeatherData => {
  // Current month to determine season
  const month = new Date().getMonth() + 1;
  const isWinter = month >= 11 || month <= 2;
  const isSummer = month >= 3 && month <= 5;
  const isMonsoon = month >= 6 && month <= 10;

  // Base temperatures by region
  const regionTemps: Record<string, { base: number; variance: number }> = {
    Maharashtra: { base: 28, variance: 8 },
    Punjab: { base: 25, variance: 15 },
    "Uttar Pradesh": { base: 26, variance: 12 },
    Gujarat: { base: 30, variance: 8 },
    "Madhya Pradesh": { base: 27, variance: 10 },
    Rajasthan: { base: 32, variance: 12 },
    Karnataka: { base: 26, variance: 6 },
    "Tamil Nadu": { base: 29, variance: 5 },
  };

  const regionData = regionTemps[state] || { base: 27, variance: 8 };
  
  let temperature = regionData.base;
  let humidity = 50;
  let rainfall = 0;
  let description = "Clear sky";

  if (isWinter) {
    temperature = regionData.base - regionData.variance * 0.6;
    humidity = 40;
    description = "Clear and cool";
  } else if (isSummer) {
    temperature = regionData.base + regionData.variance * 0.4;
    humidity = 30;
    description = "Hot and dry";
  } else if (isMonsoon) {
    temperature = regionData.base - regionData.variance * 0.2;
    humidity = 80;
    rainfall = Math.floor(Math.random() * 50 + 20);
    description = "Partly cloudy with rain";
  }

  // Add some randomness
  temperature = Math.round(temperature + (Math.random() - 0.5) * 4);
  humidity = Math.min(95, Math.max(20, humidity + Math.floor((Math.random() - 0.5) * 20)));
  
  const windSpeed = Math.floor(Math.random() * 15 + 5);

  return {
    temperature,
    humidity,
    rainfall,
    windSpeed,
    description,
    icon: isMonsoon ? "rain" : isSummer ? "sun" : "cloud",
  };
};

export const useWeather = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = useCallback(async (state: string, district: string) => {
    if (!state || !district) {
      setWeather(null);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 800));
      
      const weatherData = getSimulatedWeather(state, district);
      setWeather(weatherData);
    } catch (err) {
      console.error("Error fetching weather:", err);
      setError("Failed to fetch weather data");
      setWeather(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { weather, isLoading, error, fetchWeather };
};
