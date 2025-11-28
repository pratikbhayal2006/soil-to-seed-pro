import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { CropRecommendationData } from "@/components/CropRecommendation";
import type { WeatherData } from "@/components/WeatherDisplay";
import { toast } from "@/hooks/use-toast";

interface RecommendationInput {
  soilType: string;
  soilPH: number;
  irrigationType: string;
  location: {
    state: string;
    district: string;
    tehsil: string;
    village: string;
  };
  weather: WeatherData;
}

export const useCropRecommendation = () => {
  const [recommendations, setRecommendations] = useState<CropRecommendationData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getRecommendations = async (input: RecommendationInput) => {
    setIsLoading(true);
    setError(null);

    try {
      const { data, error: functionError } = await supabase.functions.invoke(
        "recommend-crop",
        {
          body: input,
        }
      );

      if (functionError) {
        throw new Error(functionError.message);
      }

      if (data.error) {
        throw new Error(data.error);
      }

      const cropRecommendations: CropRecommendationData[] = data.recommendations.map(
        (rec: any) => ({
          rank: rec.rank,
          name: rec.name,
          confidence: rec.confidence,
          reason: rec.reason,
          growingSeason: rec.growingSeason,
          waterRequirement: rec.waterRequirement,
        })
      );

      setRecommendations(cropRecommendations);
      toast({
        title: "Recommendations Ready!",
        description: `Found ${cropRecommendations.length} suitable crops for your farm.`,
      });
    } catch (err) {
      console.error("Error getting recommendations:", err);
      const errorMessage = err instanceof Error ? err.message : "Failed to get recommendations";
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return { recommendations, isLoading, error, getRecommendations };
};
