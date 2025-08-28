import { RefreshCw, MapPin, Sun, Wind, Droplets } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useWeather } from "@/hooks/use-weather";
import { Skeleton } from "@/components/ui/skeleton";

export function WeatherWidget() {
  const { data: weather, isLoading, error } = useWeather();

  if (isLoading) {
    return (
      <div className="glass-effect rounded-xl p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>
        <Skeleton className="h-16 w-full mb-4" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="glass-effect rounded-xl p-6 mb-6">
        <div className="text-center py-8">
          <p className="text-destructive text-sm" data-testid="text-weather-error">
            Unable to load weather data
          </p>
          <Button variant="outline" size="sm" className="mt-2" data-testid="button-retry-weather">
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-effect rounded-xl p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-green-400 flex items-center">
          <MapPin className="h-4 w-4 mr-2" />
          Tokyo Weather
        </h3>
        <Button 
          variant="ghost" 
          size="sm"
          className="text-muted-foreground hover:text-foreground p-2"
          data-testid="button-refresh-weather"
        >
          <RefreshCw className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Sun className="text-yellow-400 h-8 w-8 mr-3" />
          <div>
            <div className="text-2xl font-bold" data-testid="text-temperature">
              {weather?.temperature.celsius}° C / {weather?.temperature.fahrenheit}° F
            </div>
            <div className="text-sm text-muted-foreground" data-testid="text-condition">
              {weather?.condition}
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground flex items-center">
            <Droplets className="h-3 w-3 mr-1" />
            Humidity
          </span>
          <span data-testid="text-humidity">{weather?.humidity}%</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground flex items-center">
            <Wind className="h-3 w-3 mr-1" />
            Wind
          </span>
          <span data-testid="text-wind">
            {weather?.windSpeed} km/h {weather?.windDirection}
          </span>
        </div>
      </div>
      
      <div className="text-xs text-muted-foreground mt-4" data-testid="text-last-updated">
        Updated: {weather?.lastUpdated}
      </div>
    </div>
  );
}
