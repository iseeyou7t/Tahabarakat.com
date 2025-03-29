
import { useState, useEffect } from "react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Sunrise, Sunset } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface SunData {
  results: {
    sunrise: string;
    sunset: string;
  };
}

const SunTimes = () => {
  const [sunData, setSunData] = useState<SunData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSunTimes = async () => {
      try {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const { latitude, longitude } = position.coords;
          const today = new Date();
          const formattedDate = today.toISOString().split('T')[0];
          
          const response = await fetch(
            `https://api.sunrise-sunset.org/json?lat=${latitude}&lng=${longitude}&date=${formattedDate}&formatted=0`
          );
          
          if (!response.ok) {
            throw new Error("Sun times data not available");
          }
          
          const data = await response.json();
          setSunData(data);
        }, () => {
          setError("Location access denied. Using default location.");
          fetchDefaultSunTimes();
        });
      } catch (err) {
        setError("Failed to fetch sun times data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    const fetchDefaultSunTimes = async () => {
      try {
        // Default coordinates (New York)
        const latitude = 40.7128;
        const longitude = -74.0060;
        const today = new Date();
        const formattedDate = today.toISOString().split('T')[0];
        
        const response = await fetch(
          `https://api.sunrise-sunset.org/json?lat=${latitude}&lng=${longitude}&date=${formattedDate}&formatted=0`
        );
        
        if (!response.ok) {
          throw new Error("Sun times data not available");
        }
        
        const data = await response.json();
        setSunData(data);
      } catch (err) {
        setError("Failed to fetch sun times data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSunTimes();
  }, []);

  const formatTime = (timeString: string) => {
    const date = new Date(timeString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (loading) {
    return (
      <Card className="overflow-hidden border border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <CardContent className="p-4">
          <CardTitle className="text-lg mb-4">Sun Times</CardTitle>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Skeleton className="h-6 w-6 rounded-full" />
              <Skeleton className="h-4 w-20" />
            </div>
            <div className="flex items-center gap-3">
              <Skeleton className="h-6 w-6 rounded-full" />
              <Skeleton className="h-4 w-20" />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error || !sunData) {
    return (
      <Card className="overflow-hidden border border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <CardContent className="p-4">
          <CardTitle className="text-lg mb-4">Sun Times</CardTitle>
          <p className="text-sm text-muted-foreground">Sun times data unavailable</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden border border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <CardContent className="p-4">
        <CardTitle className="text-lg mb-4">Sun Times</CardTitle>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Sunrise className="h-6 w-6 text-yellow-500" />
            <div>
              <p className="text-sm font-medium">Sunrise</p>
              <p className="text-sm">{formatTime(sunData.results.sunrise)}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Sunset className="h-6 w-6 text-orange-500" />
            <div>
              <p className="text-sm font-medium">Sunset</p>
              <p className="text-sm">{formatTime(sunData.results.sunset)}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SunTimes;
