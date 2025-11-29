import { useState, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LocationSelector } from "@/components/LocationSelector";
import { SoilInputForm } from "@/components/SoilInputForm";
import { WeatherDisplay } from "@/components/WeatherDisplay";
import { CropRecommendation } from "@/components/CropRecommendation";
import { useWeather } from "@/hooks/useWeather";
import { useCropRecommendation } from "@/hooks/useCropRecommendation";
import { Sparkles, ArrowRight } from "lucide-react";
import logo from "@/assets/logo.ico";

const Index = () => {
  const [location, setLocation] = useState({
    state: "",
    district: "",
    tehsil: "",
    village: "",
  });
  const [soilData, setSoilData] = useState({
    soilType: "",
    soilPH: 7,
    irrigationType: "",
  });

  const { weather, isLoading: weatherLoading, fetchWeather } = useWeather();
  const { recommendations, isLoading: recommendationLoading, getRecommendations } = useCropRecommendation();

  const handleLocationChange = useCallback(
    (newLocation: typeof location) => {
      setLocation(newLocation);
    },
    []
  );

  const handleSoilDataChange = useCallback(
    (newSoilData: typeof soilData) => {
      setSoilData(newSoilData);
    },
    []
  );

  // Fetch weather when location changes
  useEffect(() => {
    if (location.state && location.district) {
      fetchWeather(location.state, location.district);
    }
  }, [location.state, location.district, fetchWeather]);

  const isFormComplete =
    location.state &&
    location.district &&
    location.tehsil &&
    location.village &&
    soilData.soilType &&
    soilData.irrigationType &&
    weather;

  const handleGetRecommendations = () => {
    if (!isFormComplete || !weather) return;

    getRecommendations({
      soilType: soilData.soilType,
      soilPH: soilData.soilPH,
      irrigationType: soilData.irrigationType,
      location,
      weather,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <header className="relative overflow-hidden bg-gradient-hero py-16 px-4">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.05%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50"></div>
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="p-2 rounded-2xl bg-primary-foreground/20 backdrop-blur-sm">
              <img src={logo} alt="KrishiMitra Logo" className="h-12 w-12" />
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-primary-foreground">
              KrishiMitra
            </h1>
          </div>
          <p className="text-center text-xl text-primary-foreground/90 max-w-2xl mx-auto mb-2">
            AI-Powered Crop Recommendation System for Indian Farmers
          </p>
          <p className="text-center text-primary-foreground/70">
            Get personalized crop suggestions based on your soil, location, and climate
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto max-w-6xl px-4 py-12 -mt-8 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            {/* Location Card */}
            <Card className="shadow-card border-border animate-fade-up">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-xl font-display">
                  <span className="text-2xl">📍</span>
                  Farm Location
                </CardTitle>
              </CardHeader>
              <CardContent>
                <LocationSelector onLocationChange={handleLocationChange} />
              </CardContent>
            </Card>

            {/* Weather Display */}
            <div className="animate-fade-up" style={{ animationDelay: "100ms" }}>
              <WeatherDisplay
                weather={weather}
                isLoading={weatherLoading}
                location={location.district ? `${location.district}, ${location.state}` : ""}
              />
            </div>

            {/* Soil & Irrigation Card */}
            <Card className="shadow-card border-border animate-fade-up" style={{ animationDelay: "200ms" }}>
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-xl font-display">
                  <span className="text-2xl">🌱</span>
                  Soil & Irrigation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <SoilInputForm onSoilDataChange={handleSoilDataChange} />
              </CardContent>
            </Card>

            {/* Get Recommendations Button */}
            <Button
              variant="hero"
              size="xl"
              className="w-full animate-fade-up"
              style={{ animationDelay: "300ms" }}
              onClick={handleGetRecommendations}
              disabled={!isFormComplete || recommendationLoading}
            >
              {recommendationLoading ? (
                <>
                  <Sparkles className="h-5 w-5 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Sparkles className="h-5 w-5" />
                  Get AI Recommendations
                  <ArrowRight className="h-5 w-5" />
                </>
              )}
            </Button>

            {!isFormComplete && (
              <p className="text-center text-sm text-muted-foreground">
                Please fill in all details above to get crop recommendations
              </p>
            )}
          </div>

          {/* Results Section */}
          <div className="lg:sticky lg:top-8 lg:self-start">
            <Card className="shadow-card border-border animate-fade-up" style={{ animationDelay: "150ms" }}>
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-xl font-display">
                  <span className="text-2xl">🌾</span>
                  Crop Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CropRecommendation
                  recommendations={recommendations}
                  isLoading={recommendationLoading}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-muted/50 border-t border-border py-8 mt-12">
        <div className="container mx-auto max-w-6xl px-4 text-center">
          <p className="text-muted-foreground text-sm">
            KrishiMitra - Empowering Indian Farmers with AI Technology
          </p>
          <p className="text-muted-foreground/70 text-xs mt-2">
            MSP data sourced from Government of India (2024-25)
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
