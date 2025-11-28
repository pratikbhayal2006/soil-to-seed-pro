import { Cloud, Thermometer, Droplets, Wind, Sun, CloudRain } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export interface WeatherData {
  temperature: number;
  humidity: number;
  rainfall: number;
  windSpeed: number;
  description: string;
  icon: string;
}

interface WeatherDisplayProps {
  weather: WeatherData | null;
  isLoading: boolean;
  location: string;
}

export const WeatherDisplay = ({ weather, isLoading, location }: WeatherDisplayProps) => {
  if (isLoading) {
    return (
      <div className="bg-gradient-card rounded-2xl p-6 border border-border shadow-card">
        <div className="flex items-center gap-2 mb-4">
          <Skeleton className="h-8 w-8 rounded-lg" />
          <Skeleton className="h-6 w-40" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-24 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  if (!weather) {
    return (
      <div className="bg-muted/50 rounded-2xl p-8 border border-dashed border-border text-center">
        <Cloud className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
        <p className="text-muted-foreground font-medium">
          Select a location to view weather data
        </p>
      </div>
    );
  }

  const getWeatherIcon = (description: string) => {
    const desc = description.toLowerCase();
    if (desc.includes("rain") || desc.includes("drizzle")) return <CloudRain className="h-8 w-8" />;
    if (desc.includes("cloud")) return <Cloud className="h-8 w-8" />;
    return <Sun className="h-8 w-8" />;
  };

  return (
    <div className="bg-gradient-card rounded-2xl p-6 border border-border shadow-card animate-fade-up">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-primary/10 text-primary">
            {getWeatherIcon(weather.description)}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Current Weather</h3>
            <p className="text-sm text-muted-foreground">{location}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-3xl font-bold text-primary">{weather.temperature}°C</p>
          <p className="text-sm text-muted-foreground capitalize">{weather.description}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-card rounded-xl p-4 border border-border">
          <div className="flex items-center gap-2 mb-2">
            <Thermometer className="h-5 w-5 text-secondary" />
            <span className="text-sm text-muted-foreground">Temperature</span>
          </div>
          <p className="text-xl font-bold text-foreground">{weather.temperature}°C</p>
        </div>

        <div className="bg-card rounded-xl p-4 border border-border">
          <div className="flex items-center gap-2 mb-2">
            <Droplets className="h-5 w-5 text-primary" />
            <span className="text-sm text-muted-foreground">Humidity</span>
          </div>
          <p className="text-xl font-bold text-foreground">{weather.humidity}%</p>
        </div>

        <div className="bg-card rounded-xl p-4 border border-border">
          <div className="flex items-center gap-2 mb-2">
            <CloudRain className="h-5 w-5 text-primary" />
            <span className="text-sm text-muted-foreground">Rainfall</span>
          </div>
          <p className="text-xl font-bold text-foreground">{weather.rainfall} mm</p>
        </div>

        <div className="bg-card rounded-xl p-4 border border-border">
          <div className="flex items-center gap-2 mb-2">
            <Wind className="h-5 w-5 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Wind Speed</span>
          </div>
          <p className="text-xl font-bold text-foreground">{weather.windSpeed} km/h</p>
        </div>
      </div>
    </div>
  );
};
