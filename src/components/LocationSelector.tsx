import { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { MapPin } from "lucide-react";
import { getStates, getDistricts, getTehsils, getVillages } from "@/data/indianLocations";

interface LocationSelectorProps {
  onLocationChange: (location: {
    state: string;
    district: string;
    tehsil: string;
    village: string;
  }) => void;
}

export const LocationSelector = ({ onLocationChange }: LocationSelectorProps) => {
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [tehsil, setTehsil] = useState("");
  const [village, setVillage] = useState("");

  const states = getStates();
  const districts = state ? getDistricts(state) : [];
  const tehsils = state && district ? getTehsils(state, district) : [];
  const villages = state && district && tehsil ? getVillages(state, district, tehsil) : [];

  useEffect(() => {
    onLocationChange({ state, district, tehsil, village });
  }, [state, district, tehsil, village, onLocationChange]);

  const handleStateChange = (value: string) => {
    setState(value);
    setDistrict("");
    setTehsil("");
    setVillage("");
  };

  const handleDistrictChange = (value: string) => {
    setDistrict(value);
    setTehsil("");
    setVillage("");
  };

  const handleTehsilChange = (value: string) => {
    setTehsil(value);
    setVillage("");
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <div className="p-2 rounded-lg bg-primary/10">
          <MapPin className="h-5 w-5 text-primary" />
        </div>
        <h3 className="text-lg font-semibold text-foreground">Location Details</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="state" className="text-sm font-medium text-muted-foreground">
            State
          </Label>
          <Select value={state} onValueChange={handleStateChange}>
            <SelectTrigger id="state" className="h-11 bg-card border-border">
              <SelectValue placeholder="Select State" />
            </SelectTrigger>
            <SelectContent>
              {states.map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="district" className="text-sm font-medium text-muted-foreground">
            District
          </Label>
          <Select value={district} onValueChange={handleDistrictChange} disabled={!state}>
            <SelectTrigger id="district" className="h-11 bg-card border-border">
              <SelectValue placeholder="Select District" />
            </SelectTrigger>
            <SelectContent>
              {districts.map((d) => (
                <SelectItem key={d} value={d}>
                  {d}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="tehsil" className="text-sm font-medium text-muted-foreground">
            Tehsil
          </Label>
          <Select value={tehsil} onValueChange={handleTehsilChange} disabled={!district}>
            <SelectTrigger id="tehsil" className="h-11 bg-card border-border">
              <SelectValue placeholder="Select Tehsil" />
            </SelectTrigger>
            <SelectContent>
              {tehsils.map((t) => (
                <SelectItem key={t} value={t}>
                  {t}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="village" className="text-sm font-medium text-muted-foreground">
            Village
          </Label>
          <Select value={village} onValueChange={setVillage} disabled={!tehsil}>
            <SelectTrigger id="village" className="h-11 bg-card border-border">
              <SelectValue placeholder="Select Village" />
            </SelectTrigger>
            <SelectContent>
              {villages.map((v) => (
                <SelectItem key={v} value={v}>
                  {v}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};
