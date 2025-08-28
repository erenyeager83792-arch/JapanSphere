import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import type { SearchRequest, SearchResponse } from "@shared/schema";

export function useSearch() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (request: SearchRequest): Promise<SearchResponse> => {
      const response = await apiRequest("POST", "/api/search", request);
      return response.json();
    },
    onSuccess: () => {
      // Invalidate any cached search results if needed
      queryClient.invalidateQueries({ queryKey: ["/api/search"] });
    },
  });
}
