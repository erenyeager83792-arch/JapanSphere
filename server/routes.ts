import type { Express } from "express";
import { createServer, type Server } from "http";
import { searchRequestSchema } from "@shared/schema";
import { z } from "zod";

const PERPLEXITY_API_KEY = process.env.PERPLEXITY_API_KEY || "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";
const PERPLEXITY_API_URL = "https://api.perplexity.ai/chat/completions";

export async function registerRoutes(app: Express): Promise<Server> {
  // Perplexity search endpoint
  app.post("/api/search", async (req, res) => {
    try {
      const { query, category } = searchRequestSchema.parse(req.body);
      
      // Create category-specific prompt
      const categoryPrompts = {
        general: "Provide comprehensive information about this Japan-related topic",
        anime: "Focus on anime, manga, and Japanese pop culture aspects",
        travel: "Focus on travel, tourism, and cultural experiences in Japan", 
        language: "Focus on Japanese language, linguistics, and communication"
      };
      
      const systemPrompt = `You are an expert guide on Japan covering culture, history, anime, travel, and language. ${categoryPrompts[category]}. Be precise, informative, and engaging. Always provide accurate information about Japan.`;
      
      const requestBody = {
        model: "llama-3.1-sonar-large-128k-online",
        messages: [
          {
            role: "system",
            content: systemPrompt
          },
          {
            role: "user", 
            content: query
          }
        ],
        max_tokens: 1000,
        temperature: 0.2,
        top_p: 0.9,
        return_images: false,
        return_related_questions: false,
        search_recency_filter: "month",
        stream: false
      };

      console.log("Making Perplexity API request:", {
        url: PERPLEXITY_API_URL,
        model: requestBody.model,
        query: query.substring(0, 100) + "..."
      });

      const response = await fetch(PERPLEXITY_API_URL, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${PERPLEXITY_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorBody = await response.text();
        console.error("Perplexity API error details:", {
          status: response.status,
          statusText: response.statusText,
          body: errorBody
        });
        throw new Error(`Perplexity API error: ${response.status} ${response.statusText} - ${errorBody}`);
      }

      const data = await response.json();
      
      const searchResult = {
        id: data.id,
        content: data.choices[0]?.message?.content || "No response available",
        citations: data.citations || [],
        category,
        timestamp: Date.now()
      };

      res.json(searchResult);
    } catch (error) {
      console.error("Search error:", error);
      res.status(500).json({ 
        error: error instanceof Error ? error.message : "Search failed. Please try again." 
      });
    }
  });

  // Tokyo weather endpoint (using OpenWeatherMap API)
  app.get("/api/weather/tokyo", async (req, res) => {
    try {
      // Using a weather API - for demo, we'll return structured data
      // In production, integrate with OpenWeatherMap or similar service
      const weatherData = {
        temperature: {
          celsius: 23,
          fahrenheit: 73
        },
        condition: "Mostly Clear",
        humidity: 60,
        windSpeed: 5,
        windDirection: "E",
        lastUpdated: new Date().toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true
        })
      };
      
      res.json(weatherData);
    } catch (error) {
      console.error("Weather error:", error);
      res.status(500).json({ 
        error: "Unable to fetch weather data" 
      });
    }
  });

  // Trending articles endpoint  
  app.get("/api/trending", async (req, res) => {
    try {
      // For production, integrate with news APIs like NewsAPI
      const trendingArticles = [
        {
          id: "1",
          title: "New Studio Ghibli Film Announced for 2024",
          excerpt: "Hayao Miyazaki returns with another magical adventure exploring environmental themes and traditional Japanese folklore.",
          category: "Anime",
          imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=80&h=60",
          timeAgo: "2h",
          url: "#"
        },
        {
          id: "2", 
          title: "Cherry Blossom Season Predictions for 2024",
          excerpt: "Weather experts predict an early sakura season across Japan, with peak blooming expected in late March.",
          category: "Culture",
          imageUrl: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=80&h=60",
          timeAgo: "4h",
          url: "#"
        },
        {
          id: "3",
          title: "Tokyo Olympics Legacy: Modern Japan Today",
          excerpt: "How the Olympics transformed Tokyo's infrastructure and international perception of Japanese innovation.",
          category: "Culture",
          imageUrl: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=80&h=60", 
          timeAgo: "6h",
          url: "#"
        }
      ];
      
      res.json(trendingArticles);
    } catch (error) {
      console.error("Trending error:", error);
      res.status(500).json({
        error: "Unable to fetch trending articles"
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
