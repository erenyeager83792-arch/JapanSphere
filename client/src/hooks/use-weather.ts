import { useQuery } from "@tanstack/react-query";
import type { WeatherData } from "@shared/schema";

export function useWeather() {
  return useQuery({
    queryKey: ["/api/weather/tokyo"],
    refetchInterval: 5 * 60 * 1000, // Refetch every 5 minutes
    staleTime: 2 * 60 * 1000, // Consider stale after 2 minutes
  }) as { data: WeatherData | undefined; isLoading: boolean; error: Error | null };
}
