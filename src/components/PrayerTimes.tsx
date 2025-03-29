
import { useState, useEffect } from "react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface Prayer {
  name: string;
  time: string;
}

interface PrayerData {
  timings: {
    Fajr: string;
    Sunrise: string;
    Dhuhr: string;
    Asr: string;
    Maghrib: string;
    Isha: string;
    [key: string]: string;
  };
  date: {
    readable: string;
  };
}

const PrayerTimes = () => {
  const [prayerTimes, setPrayerTimes] = useState<PrayerData | null>(null);
  const [nextPrayer, setNextPrayer] = useState<Prayer | null>(null);
  const [countdown, setCountdown] = useState<string>("--:--:--");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrayerTimes = async () => {
      try {
        // Using browser geolocation to get coordinates
        navigator.geolocation.getCurrentPosition(async (position) => {
          const { latitude, longitude } = position.coords;
          const today = new Date();
          const month = today.getMonth() + 1;
          const year = today.getFullYear();
          
          const response = await fetch(
            `https://api.aladhan.com/v1/calendar/${year}/${month}?latitude=${latitude}&longitude=${longitude}&method=2`
          );
          
          if (!response.ok) {
            throw new Error("Prayer times data not available");
          }
          
          const data = await response.json();
          const day = today.getDate();
          const todayData = data.data[day - 1];
          setPrayerTimes(todayData);
        }, () => {
          // Fallback to default location
          fetchDefaultPrayerTimes();
        });
      } catch (err) {
        console.error("Failed to fetch prayer times", err);
        fetchDefaultPrayerTimes();
      } finally {
        setLoading(false);
      }
    };

    const fetchDefaultPrayerTimes = async () => {
      try {
        // Default coordinates for Mecca as fallback
        const latitude = 21.3891;
        const longitude = 39.8579;
        const today = new Date();
        const month = today.getMonth() + 1;
        const year = today.getFullYear();
        
        const response = await fetch(
          `https://api.aladhan.com/v1/calendar/${year}/${month}?latitude=${latitude}&longitude=${longitude}&method=2`
        );
        
        if (!response.ok) {
          throw new Error("Prayer times data not available");
        }
        
        const data = await response.json();
        const day = today.getDate();
        const todayData = data.data[day - 1];
        setPrayerTimes(todayData);
      } catch (err) {
        console.error("Failed to fetch default prayer times", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPrayerTimes();
  }, []);

  useEffect(() => {
    if (!prayerTimes) return;

    const updateNextPrayer = () => {
      const now = new Date();
      const prayers: Prayer[] = [
        { name: "Fajr", time: prayerTimes.timings.Fajr },
        { name: "Sunrise", time: prayerTimes.timings.Sunrise },
        { name: "Dhuhr", time: prayerTimes.timings.Dhuhr },
        { name: "Asr", time: prayerTimes.timings.Asr },
        { name: "Maghrib", time: prayerTimes.timings.Maghrib },
        { name: "Isha", time: prayerTimes.timings.Isha },
      ];

      // Convert prayer times to Date objects for comparison
      const prayerDates = prayers.map((prayer) => {
        const [hours, minutes] = prayer.time.split(":").map(Number);
        const date = new Date(now);
        date.setHours(hours, minutes, 0, 0);
        return { ...prayer, date };
      });

      // Find the next prayer
      const next = prayerDates.find((prayer) => prayer.date > now);
      
      // If no next prayer today, use the first prayer of tomorrow
      const nextPrayerInfo = next || { 
        ...prayerDates[0],
        date: new Date(prayerDates[0].date.getTime() + 24 * 60 * 60 * 1000) 
      };
      
      setNextPrayer({
        name: nextPrayerInfo.name,
        time: nextPrayerInfo.time,
      });

      // Calculate countdown
      const diff = nextPrayerInfo.date.getTime() - now.getTime();
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setCountdown(
        `${hours.toString().padStart(2, "0")}:${minutes
          .toString()
          .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
      );
    };

    updateNextPrayer();
    const interval = setInterval(updateNextPrayer, 1000);

    return () => clearInterval(interval);
  }, [prayerTimes]);

  if (loading) {
    return (
      <Card className="overflow-hidden border border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <CardContent className="p-4">
          <CardTitle className="text-lg mb-4">Prayer Times</CardTitle>
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-6 w-1/2 mt-2" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!prayerTimes || !nextPrayer) {
    return (
      <Card className="overflow-hidden border border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <CardContent className="p-4">
          <CardTitle className="text-lg mb-4">Prayer Times</CardTitle>
          <p className="text-sm text-muted-foreground">Prayer time data unavailable</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden border border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <CardContent className="p-4">
        <CardTitle className="text-lg mb-4">Prayer Times</CardTitle>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <p className="text-sm font-medium">Next Prayer</p>
            <p className="text-sm font-semibold">{nextPrayer.name}</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-sm font-medium">Time</p>
            <p className="text-sm">{nextPrayer.time.substring(0, 5)}</p>
          </div>
          <div className="mt-2">
            <p className="text-xs text-muted-foreground">Countdown</p>
            <p className="text-lg font-mono font-semibold">{countdown}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PrayerTimes;
