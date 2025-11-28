// MSP (Minimum Support Price) data for crops in India (2024-25)
// Prices in INR per quintal

export interface CropMSP {
  name: string;
  msp: number;
  unit: string;
  season: string;
  category: string;
}

export const cropMSPData: CropMSP[] = [
  // Kharif Crops
  { name: "Paddy (Common)", msp: 2300, unit: "quintal", season: "Kharif", category: "Cereals" },
  { name: "Paddy (Grade A)", msp: 2320, unit: "quintal", season: "Kharif", category: "Cereals" },
  { name: "Jowar (Hybrid)", msp: 3180, unit: "quintal", season: "Kharif", category: "Cereals" },
  { name: "Jowar (Maldandi)", msp: 3225, unit: "quintal", season: "Kharif", category: "Cereals" },
  { name: "Bajra", msp: 2625, unit: "quintal", season: "Kharif", category: "Cereals" },
  { name: "Ragi", msp: 4290, unit: "quintal", season: "Kharif", category: "Cereals" },
  { name: "Maize", msp: 2225, unit: "quintal", season: "Kharif", category: "Cereals" },
  { name: "Tur (Arhar)", msp: 7550, unit: "quintal", season: "Kharif", category: "Pulses" },
  { name: "Moong", msp: 8682, unit: "quintal", season: "Kharif", category: "Pulses" },
  { name: "Urad", msp: 7400, unit: "quintal", season: "Kharif", category: "Pulses" },
  { name: "Groundnut", msp: 6783, unit: "quintal", season: "Kharif", category: "Oilseeds" },
  { name: "Sunflower Seed", msp: 7280, unit: "quintal", season: "Kharif", category: "Oilseeds" },
  { name: "Soyabean (Yellow)", msp: 4892, unit: "quintal", season: "Kharif", category: "Oilseeds" },
  { name: "Sesamum", msp: 9267, unit: "quintal", season: "Kharif", category: "Oilseeds" },
  { name: "Nigerseed", msp: 8717, unit: "quintal", season: "Kharif", category: "Oilseeds" },
  { name: "Cotton (Medium Staple)", msp: 7121, unit: "quintal", season: "Kharif", category: "Commercial" },
  { name: "Cotton (Long Staple)", msp: 7521, unit: "quintal", season: "Kharif", category: "Commercial" },
  
  // Rabi Crops
  { name: "Wheat", msp: 2275, unit: "quintal", season: "Rabi", category: "Cereals" },
  { name: "Barley", msp: 1850, unit: "quintal", season: "Rabi", category: "Cereals" },
  { name: "Gram (Chana)", msp: 5440, unit: "quintal", season: "Rabi", category: "Pulses" },
  { name: "Masur (Lentil)", msp: 6425, unit: "quintal", season: "Rabi", category: "Pulses" },
  { name: "Rapeseed & Mustard", msp: 5650, unit: "quintal", season: "Rabi", category: "Oilseeds" },
  { name: "Safflower", msp: 5800, unit: "quintal", season: "Rabi", category: "Oilseeds" },
  
  // Other Commercial Crops
  { name: "Sugarcane", msp: 340, unit: "quintal", season: "Annual", category: "Commercial" },
  { name: "Jute", msp: 5050, unit: "quintal", season: "Kharif", category: "Commercial" },
  { name: "Copra (Milling)", msp: 11582, unit: "quintal", season: "Annual", category: "Commercial" },
  { name: "Copra (Ball)", msp: 12100, unit: "quintal", season: "Annual", category: "Commercial" },
  
  // Vegetables (Indicative prices)
  { name: "Potato", msp: 1200, unit: "quintal", season: "Rabi", category: "Vegetables" },
  { name: "Onion", msp: 1500, unit: "quintal", season: "Rabi", category: "Vegetables" },
  { name: "Tomato", msp: 2000, unit: "quintal", season: "Kharif", category: "Vegetables" },
];

export const getCropMSP = (cropName: string): CropMSP | undefined => {
  return cropMSPData.find(
    (crop) => crop.name.toLowerCase().includes(cropName.toLowerCase()) ||
              cropName.toLowerCase().includes(crop.name.toLowerCase().split(' ')[0])
  );
};

export const formatMSP = (msp: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
  }).format(msp);
};
