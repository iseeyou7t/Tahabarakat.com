
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Sun, Cloud, CloudRain, CloudSnow, CloudLightning, CloudFog, Wind } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface WeatherData {
  main: {
    temp: number;
  };
  weather: {
    main: string;
    description: string;
  }[];
  name: string;
}

const Weather = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        // Using browser geolocation to get coordinates
        navigator.geolocation.getCurrentPosition(async (position) => {
          const { latitude, longitude } = position.coords;
          // Free public API key (rate limited)
          const API_KEY = "e015c5a95bcaf6ff47d8ec58957d2d0f";
          const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
          );
          
          if (!response.ok) {
            throw new Error("Weather data not available");
          }
          
          const data = await response.json();
          setWeather(data);
        }, () => {
          // Fallback to a default location if user denies location access
          setError("Location access denied. Using default location.");
          fetchDefaultWeather();
        });
      } catch (err) {
        setError("Failed to fetch weather data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    const fetchDefaultWeather = async () => {
      try {
        // Using a default location (New York) if geolocation fails
        const API_KEY = "e015c5a95bcaf6ff47d8ec58957d2d0f";
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=New York&appid=${API_KEY}&units=metric`
        );
        
        if (!response.ok) {
          throw new Error("Weather data not available");
        }
        
        const data = await response.json();
        setWeather(data);
      } catch (err) {
        setError("Failed to fetch weather data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  const getWeatherIcon = (weatherMain: string) => {
    switch (weatherMain.toLowerCase()) {
      case "clear":
        return <Sun className="h-6 w-6 text-yellow-500" />;
      case "clouds":
        return <Cloud className="h-6 w-6 text-gray-500" />;
      case "rain":
      case "drizzle":
        return <CloudRain className="h-6 w-6 text-blue-500" />;
      case "snow":
        return <CloudSnow className="h-6 w-6 text-blue-200" />;
      case "thunderstorm":
        return <CloudLightning className="h-6 w-6 text-purple-500" />;
      case "mist":
      case "fog":
      case "haze":
        return <CloudFog className="h-6 w-6 text-gray-400" />;
      default:
        return <Wind className="h-6 w-6 text-gray-500" />;
    }
  };

  if (loading) {
    return (
      <Card className="overflow-hidden border border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[100px]" />
              <Skeleton className="h-4 w-[70px]" />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error || !weather) {
    return (
      <Card className="overflow-hidden border border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <CardContent className="p-4">
          <p className="text-sm text-muted-foreground">Weather data unavailable</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden border border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {getWeatherIcon(weather.weather[0].main)}
            <div>
              <p className="text-sm font-medium">{weather.name}</p>
              <p className="text-xs text-muted-foreground capitalize">{weather.weather[0].description}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-lg font-semibold">{Math.round(weather.main.temp)}°C</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Weather;
