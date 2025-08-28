import { z } from "zod";

// Search schemas
export const searchRequestSchema = z.object({
  query: z.string().min(1, "Query is required"),
  category: z.enum(["general", "anime", "travel", "language"]).default("general"),
});

export const searchResponseSchema = z.object({
  id: z.string(),
  content: z.string(),
  citations: z.array(z.string()).optional(),
  category: z.string(),
  timestamp: z.number(),
});

// Weather schemas
export const weatherDataSchema = z.object({
  temperature: z.object({
    celsius: z.number(),
    fahrenheit: z.number(),
  }),
  condition: z.string(),
  humidity: z.number(),
  windSpeed: z.number(),
  windDirection: z.string(),
  lastUpdated: z.string(),
});

// Trending article schemas
export const trendingArticleSchema = z.object({
  id: z.string(),
  title: z.string(),
  excerpt: z.string(),
  category: z.string(),
  imageUrl: z.string().optional(),
  timeAgo: z.string(),
  url: z.string().optional(),
});

export type SearchRequest = z.infer<typeof searchRequestSchema>;
export type SearchResponse = z.infer<typeof searchResponseSchema>;
export type WeatherData = z.infer<typeof weatherDataSchema>;
export type TrendingArticle = z.infer<typeof trendingArticleSchema>;
