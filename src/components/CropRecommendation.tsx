import { Award, TrendingUp, Leaf, IndianRupee, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getCropMSP, formatMSP } from "@/data/cropMSP";

export interface CropRecommendationData {
  rank: number;
  name: string;
  confidence: number;
  reason: string;
  growingSeason: string;
  waterRequirement: string;
}

interface CropRecommendationProps {
  recommendations: CropRecommendationData[];
  isLoading: boolean;
}

export const CropRecommendation = ({ recommendations, isLoading }: CropRecommendationProps) => {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-card rounded-2xl p-6 border border-border animate-pulse"
          >
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-muted rounded-xl" />
              <div className="flex-1 space-y-3">
                <div className="h-6 bg-muted rounded w-1/3" />
                <div className="h-4 bg-muted rounded w-2/3" />
                <div className="h-4 bg-muted rounded w-1/2" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (recommendations.length === 0) {
    return (
      <div className="bg-muted/50 rounded-2xl p-8 border border-dashed border-border text-center">
        <Leaf className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
        <p className="text-muted-foreground font-medium">
          Fill in all details and click "Get Recommendations" to see AI-powered crop suggestions
        </p>
      </div>
    );
  }

  const getRankStyles = (rank: number) => {
    switch (rank) {
      case 1:
        return {
          bg: "bg-gradient-to-br from-accent/20 to-accent/5",
          border: "border-accent",
          badge: "bg-accent text-accent-foreground",
          icon: "text-accent",
        };
      case 2:
        return {
          bg: "bg-gradient-to-br from-muted to-muted/50",
          border: "border-muted-foreground/30",
          badge: "bg-muted-foreground/20 text-muted-foreground",
          icon: "text-muted-foreground",
        };
      case 3:
        return {
          bg: "bg-gradient-to-br from-secondary/20 to-secondary/5",
          border: "border-secondary/50",
          badge: "bg-secondary/20 text-secondary",
          icon: "text-secondary",
        };
      default:
        return {
          bg: "bg-card",
          border: "border-border",
          badge: "bg-muted",
          icon: "text-muted-foreground",
        };
    }
  };

  const getRankLabel = (rank: number) => {
    switch (rank) {
      case 1:
        return "Most Recommended";
      case 2:
        return "Highly Suitable";
      case 3:
        return "Good Alternative";
      default:
        return `Option ${rank}`;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-6">
        <div className="p-2 rounded-lg bg-primary/10">
          <TrendingUp className="h-5 w-5 text-primary" />
        </div>
        <h3 className="text-xl font-display font-bold text-foreground">
          AI Crop Recommendations
        </h3>
      </div>

      {recommendations.map((crop, index) => {
        const styles = getRankStyles(crop.rank);
        const mspData = getCropMSP(crop.name);

        return (
          <div
            key={index}
            className={`${styles.bg} rounded-2xl p-6 border-2 ${styles.border} shadow-card animate-fade-up transition-all duration-300 hover:shadow-glow`}
            style={{ animationDelay: `${index * 150}ms` }}
          >
            <div className="flex items-start gap-4">
              {/* Rank Badge */}
              <div className="flex flex-col items-center gap-2">
                <div
                  className={`w-14 h-14 rounded-xl flex items-center justify-center ${styles.badge} font-bold text-lg`}
                >
                  #{crop.rank}
                </div>
                {crop.rank === 1 && (
                  <Award className={`h-6 w-6 ${styles.icon} animate-pulse-slow`} />
                )}
              </div>

              {/* Crop Details */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h4 className="text-xl font-bold text-foreground">{crop.name}</h4>
                  <Badge variant="outline" className="text-xs">
                    {getRankLabel(crop.rank)}
                  </Badge>
                </div>

                <p className="text-muted-foreground mb-4">{crop.reason}</p>

                <div className="flex flex-wrap gap-3 mb-4">
                  <div className="flex items-center gap-1.5 text-sm">
                    <Leaf className="h-4 w-4 text-primary" />
                    <span className="text-muted-foreground">Season:</span>
                    <span className="font-medium text-foreground">{crop.growingSeason}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-sm">
                    <Star className="h-4 w-4 text-accent" />
                    <span className="text-muted-foreground">Confidence:</span>
                    <span className="font-medium text-foreground">{crop.confidence}%</span>
                  </div>
                </div>

                {/* MSP Display */}
                {mspData && (
                  <div className="bg-card/80 rounded-xl p-4 border border-border">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <IndianRupee className="h-5 w-5 text-success" />
                        <span className="text-sm font-medium text-muted-foreground">
                          Minimum Support Price (MSP)
                        </span>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-success">
                          {formatMSP(mspData.msp)}
                        </p>
                        <p className="text-xs text-muted-foreground">per {mspData.unit}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
