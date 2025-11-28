import { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Layers, Droplets } from "lucide-react";

interface SoilInputFormProps {
  onSoilDataChange: (data: {
    soilType: string;
    soilPH: number;
    irrigationType: string;
  }) => void;
}

const soilTypes = [
  { value: "black", label: "Black Soil (Regur)", description: "Rich in calcium, magnesium, potash" },
  { value: "red", label: "Red Soil", description: "Rich in iron, low in nitrogen" },
  { value: "alluvial", label: "Alluvial Soil", description: "Most fertile, found in river plains" },
  { value: "laterite", label: "Laterite Soil", description: "Rich in iron and aluminum" },
  { value: "sandy", label: "Sandy Soil", description: "Well-drained, low water retention" },
  { value: "clay", label: "Clay Soil", description: "Heavy, high water retention" },
  { value: "loamy", label: "Loamy Soil", description: "Balanced mixture, ideal for most crops" },
  { value: "saline", label: "Saline Soil", description: "High salt content, coastal areas" },
];

const irrigationTypes = [
  { value: "drip", label: "Drip Irrigation", icon: "💧" },
  { value: "sprinkler", label: "Sprinkler Irrigation", icon: "🌧️" },
  { value: "flood", label: "Flood/Surface Irrigation", icon: "🌊" },
  { value: "canal", label: "Canal Irrigation", icon: "🏞️" },
  { value: "well", label: "Well/Tube Well", icon: "⛲" },
  { value: "rainfed", label: "Rain-fed (No Irrigation)", icon: "☔" },
];

export const SoilInputForm = ({ onSoilDataChange }: SoilInputFormProps) => {
  const [soilType, setSoilType] = useState("");
  const [soilPH, setSoilPH] = useState(7);
  const [irrigationType, setIrrigationType] = useState("");

  useEffect(() => {
    onSoilDataChange({ soilType, soilPH, irrigationType });
  }, [soilType, soilPH, irrigationType, onSoilDataChange]);

  const getPHLabel = (ph: number) => {
    if (ph < 5.5) return "Strongly Acidic";
    if (ph < 6.5) return "Moderately Acidic";
    if (ph < 7.5) return "Neutral";
    if (ph < 8.5) return "Moderately Alkaline";
    return "Strongly Alkaline";
  };

  const getPHColor = (ph: number) => {
    if (ph < 5.5) return "text-destructive";
    if (ph < 6.5) return "text-warning";
    if (ph < 7.5) return "text-success";
    if (ph < 8.5) return "text-warning";
    return "text-destructive";
  };

  return (
    <div className="space-y-6">
      {/* Soil Type */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-secondary/20">
            <Layers className="h-5 w-5 text-secondary" />
          </div>
          <Label className="text-lg font-semibold text-foreground">Soil Type</Label>
        </div>
        <Select value={soilType} onValueChange={setSoilType}>
          <SelectTrigger className="h-12 bg-card border-border">
            <SelectValue placeholder="Select your soil type" />
          </SelectTrigger>
          <SelectContent>
            {soilTypes.map((soil) => (
              <SelectItem key={soil.value} value={soil.value}>
                <div className="flex flex-col">
                  <span className="font-medium">{soil.label}</span>
                  <span className="text-xs text-muted-foreground">{soil.description}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Soil pH */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-lg font-semibold text-foreground">Soil pH Level</Label>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-primary">{soilPH.toFixed(1)}</span>
            <span className={`text-sm font-medium ${getPHColor(soilPH)}`}>
              ({getPHLabel(soilPH)})
            </span>
          </div>
        </div>
        <div className="pt-2">
          <Slider
            value={[soilPH]}
            onValueChange={(value) => setSoilPH(value[0])}
            min={3}
            max={11}
            step={0.1}
            className="w-full"
          />
          <div className="flex justify-between mt-2 text-xs text-muted-foreground">
            <span>Acidic (3.0)</span>
            <span>Neutral (7.0)</span>
            <span>Alkaline (11.0)</span>
          </div>
        </div>
      </div>

      {/* Irrigation Type */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-primary/10">
            <Droplets className="h-5 w-5 text-primary" />
          </div>
          <Label className="text-lg font-semibold text-foreground">Irrigation Method</Label>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {irrigationTypes.map((irrigation) => (
            <button
              key={irrigation.value}
              type="button"
              onClick={() => setIrrigationType(irrigation.value)}
              className={`p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                irrigationType === irrigation.value
                  ? "border-primary bg-primary/10 shadow-soft"
                  : "border-border bg-card hover:border-primary/50 hover:bg-muted/50"
              }`}
            >
              <span className="text-2xl mb-2 block">{irrigation.icon}</span>
              <span className="text-sm font-medium text-foreground">{irrigation.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
