import { useQuery } from "@tanstack/react-query";
import type { TrendingArticle } from "@shared/schema";

export function useTrending() {
  return useQuery({
    queryKey: ["/api/trending"],
    refetchInterval: 10 * 60 * 1000, // Refetch every 10 minutes
    staleTime: 5 * 60 * 1000, // Consider stale after 5 minutes
  }) as { data: TrendingArticle[] | undefined; isLoading: boolean; error: Error | null };
}
