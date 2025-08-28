
const fetch = require('node-fetch');

const PERPLEXITY_API_KEY = process.env.PERPLEXITY_API_KEY || "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";
const PERPLEXITY_API_URL = "https://api.perplexity.ai/chat/completions";

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { query, category } = JSON.parse(event.body);
    
    const categoryPrompts = {
      general: "Provide comprehensive information about this Japan-related topic",
      anime: "Focus on anime, manga, and Japanese pop culture aspects",
      travel: "Focus on travel, tourism, and cultural experiences in Japan", 
      language: "Focus on Japanese language, linguistics, and communication"
    };
    
    const systemPrompt = `You are an expert guide on Japan covering culture, history, anime, travel, and language. ${categoryPrompts[category]}. Be precise, informative, and engaging. Always provide accurate information about Japan.`;
    
    const requestBody = {
      model: "sonar-pro",
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

    const response = await fetch(PERPLEXITY_API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${PERPLEXITY_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      throw new Error(`Perplexity API error: ${response.status}`);
    }

    const data = await response.json();
    
    const searchResult = {
      id: data.id,
      content: data.choices[0]?.message?.content || "No response available",
      citations: data.citations || [],
      category,
      timestamp: Date.now()
    };

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST'
      },
      body: JSON.stringify(searchResult)
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ 
        error: error.message || "Search failed. Please try again." 
      })
    };
  }
};
