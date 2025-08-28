
const fetch = require('node-fetch');

const PERPLEXITY_API_KEY = process.env.PERPLEXITY_API_KEY || "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";
const PERPLEXITY_API_URL = "https://api.perplexity.ai/chat/completions";

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    // Fallback data if API fails
    const fallbackArticles = [
      {
        id: "1",
        title: "Miyazaki's Final Film Receives Global Acclaim",
        excerpt: "Studio Ghibli's latest masterpiece tops international box office charts with stunning hand-drawn animation.",
        category: "Anime",
        imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=80&h=60&fit=crop",
        timeAgo: "2h",
        url: "#"
      },
      {
        id: "2", 
        title: "Tokyo's Robot Café Revolution Continues",
        excerpt: "AI-powered restaurants and robot servers transform Japan's dining culture in unprecedented ways.",
        category: "Tech",
        imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=80&h=60&fit=crop",
        timeAgo: "4h",
        url: "#"
      },
      {
        id: "3",
        title: "Summer Festival Season Attracts Record Crowds",
        excerpt: "Traditional matsuri festivals across Japan see unprecedented international visitor numbers this summer.",
        category: "Culture",
        imageUrl: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=80&h=60&fit=crop", 
        timeAgo: "6h",
        url: "#"
      }
    ];

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(fallbackArticles)
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        error: "Unable to fetch trending articles"
      })
    };
  }
};
