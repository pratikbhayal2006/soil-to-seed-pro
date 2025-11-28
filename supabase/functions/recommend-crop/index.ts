import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface CropRecommendationRequest {
  soilType: string;
  soilPH: number;
  irrigationType: string;
  location: {
    state: string;
    district: string;
    tehsil: string;
    village: string;
  };
  weather: {
    temperature: number;
    humidity: number;
    rainfall: number;
    windSpeed: number;
    description: string;
  };
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const requestData: CropRecommendationRequest = await req.json();
    const { soilType, soilPH, irrigationType, location, weather } = requestData;

    console.log("Received crop recommendation request:", JSON.stringify(requestData, null, 2));

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const systemPrompt = `You are an expert agricultural advisor for Indian farmers. Your role is to recommend the best crops based on soil conditions, climate, and irrigation methods.

You must provide exactly 3 crop recommendations ranked from most suitable to least suitable. Consider:
1. Soil type and pH compatibility
2. Water requirements vs irrigation type available
3. Local climate conditions (temperature, humidity, rainfall)
4. Traditional crops grown in the region
5. MSP (Minimum Support Price) availability in India

For each crop, provide:
- Crop name (common Indian crop names)
- Confidence score (percentage)
- Reason for recommendation
- Growing season (Kharif/Rabi/Zaid)
- Water requirement level (Low/Medium/High)

Always respond with valid JSON in this exact format:
{
  "recommendations": [
    {
      "rank": 1,
      "name": "Crop Name",
      "confidence": 85,
      "reason": "Brief explanation why this crop is suitable",
      "growingSeason": "Kharif/Rabi/Zaid",
      "waterRequirement": "Low/Medium/High"
    }
  ]
}`;

    const userPrompt = `Please recommend the top 3 crops for a farmer with the following conditions:

SOIL CONDITIONS:
- Soil Type: ${soilType}
- Soil pH: ${soilPH}

IRRIGATION:
- Type: ${irrigationType}

LOCATION:
- State: ${location.state}
- District: ${location.district}
- Tehsil: ${location.tehsil}
- Village: ${location.village}

CURRENT WEATHER:
- Temperature: ${weather.temperature}°C
- Humidity: ${weather.humidity}%
- Rainfall: ${weather.rainfall}mm
- Wind Speed: ${weather.windSpeed} km/h
- Conditions: ${weather.description}

Provide 3 crop recommendations considering all these factors. Focus on crops commonly grown in ${location.state} and suitable for the current season and conditions.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI service quota exceeded. Please try again later." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;

    console.log("AI Response:", aiResponse);

    // Parse the JSON response
    let recommendations;
    try {
      // Extract JSON from the response (handle markdown code blocks)
      let jsonStr = aiResponse;
      if (aiResponse.includes("```json")) {
        jsonStr = aiResponse.split("```json")[1].split("```")[0];
      } else if (aiResponse.includes("```")) {
        jsonStr = aiResponse.split("```")[1].split("```")[0];
      }
      recommendations = JSON.parse(jsonStr.trim());
    } catch (parseError) {
      console.error("Failed to parse AI response:", parseError);
      // Fallback recommendations
      recommendations = {
        recommendations: [
          {
            rank: 1,
            name: "Wheat",
            confidence: 75,
            reason: "Suitable for the given soil and climate conditions",
            growingSeason: "Rabi",
            waterRequirement: "Medium",
          },
          {
            rank: 2,
            name: "Rice",
            confidence: 70,
            reason: "Good option with adequate irrigation",
            growingSeason: "Kharif",
            waterRequirement: "High",
          },
          {
            rank: 3,
            name: "Maize",
            confidence: 65,
            reason: "Versatile crop suitable for various conditions",
            growingSeason: "Kharif",
            waterRequirement: "Medium",
          },
        ],
      };
    }

    return new Response(JSON.stringify(recommendations), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in recommend-crop function:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
