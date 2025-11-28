export interface Location {
  state: string;
  districts: {
    name: string;
    tehsils: {
      name: string;
      villages: string[];
    }[];
  }[];
}

export const indianLocations: Location[] = [
  {
    state: "Maharashtra",
    districts: [
      {
        name: "Pune",
        tehsils: [
          { name: "Haveli", villages: ["Wagholi", "Lohegaon", "Kharadi", "Hadapsar"] },
          { name: "Mulshi", villages: ["Pirangut", "Paud", "Lavasa", "Bhugaon"] },
          { name: "Maval", villages: ["Talegaon", "Vadgaon", "Kamshet", "Lonavala"] },
        ],
      },
      {
        name: "Nashik",
        tehsils: [
          { name: "Nashik", villages: ["Gangapur", "Satpur", "Makhmalabad", "Pimpalgaon"] },
          { name: "Igatpuri", villages: ["Ghoti", "Kasara", "Talegaon", "Ghoti Budruk"] },
          { name: "Trimbakeshwar", villages: ["Trimbak", "Anjaneri", "Harsul", "Velunje"] },
        ],
      },
      {
        name: "Nagpur",
        tehsils: [
          { name: "Nagpur Rural", villages: ["Hingna", "Kamptee", "Kalmeshwar", "Narkhed"] },
          { name: "Saoner", villages: ["Saoner", "Parseoni", "Mauda", "Katol"] },
        ],
      },
    ],
  },
  {
    state: "Punjab",
    districts: [
      {
        name: "Ludhiana",
        tehsils: [
          { name: "Ludhiana East", villages: ["Jagraon", "Raikot", "Sahnewal", "Khanna"] },
          { name: "Ludhiana West", villages: ["Doraha", "Payal", "Samrala", "Mullanpur"] },
        ],
      },
      {
        name: "Amritsar",
        tehsils: [
          { name: "Amritsar-I", villages: ["Majitha", "Rayya", "Verka", "Chheharta"] },
          { name: "Amritsar-II", villages: ["Tarn Taran", "Patti", "Khem Karan", "Bhikhiwind"] },
        ],
      },
    ],
  },
  {
    state: "Uttar Pradesh",
    districts: [
      {
        name: "Lucknow",
        tehsils: [
          { name: "Lucknow", villages: ["Kakori", "Malihabad", "Mohanlalganj", "Bakshi Ka Talab"] },
          { name: "Sarojini Nagar", villages: ["Chinhat", "Gosainganj", "Itaunja", "Nagram"] },
        ],
      },
      {
        name: "Varanasi",
        tehsils: [
          { name: "Varanasi", villages: ["Sarnath", "Ramnagar", "Pindra", "Cholapur"] },
          { name: "Chandauli", villages: ["Chakia", "Sakaldiha", "Naugarh", "Mughalsarai"] },
        ],
      },
    ],
  },
  {
    state: "Gujarat",
    districts: [
      {
        name: "Ahmedabad",
        tehsils: [
          { name: "City East", villages: ["Naroda", "Odhav", "Nikol", "Vastral"] },
          { name: "Daskroi", villages: ["Sanand", "Bavla", "Dholka", "Viramgam"] },
        ],
      },
      {
        name: "Rajkot",
        tehsils: [
          { name: "Rajkot", villages: ["Kothariya", "Lodhika", "Paddhari", "Jasdan"] },
          { name: "Morbi", villages: ["Tankara", "Halvad", "Maliya", "Wankaner"] },
        ],
      },
    ],
  },
  {
    state: "Madhya Pradesh",
    districts: [
      {
        name: "Indore",
        tehsils: [
          { name: "Indore", villages: ["Mhow", "Sanwer", "Depalpur", "Hatod"] },
          { name: "Rau", villages: ["Rau", "Betma", "Gautampura", "Sawer"] },
        ],
      },
      {
        name: "Bhopal",
        tehsils: [
          { name: "Huzur", villages: ["Berasia", "Sehore", "Raisen", "Vidisha"] },
          { name: "Govindpura", villages: ["Govindpura", "Misrod", "Karond", "Ayodhya Nagar"] },
        ],
      },
    ],
  },
  {
    state: "Rajasthan",
    districts: [
      {
        name: "Jaipur",
        tehsils: [
          { name: "Jaipur", villages: ["Sanganer", "Amber", "Jamwa Ramgarh", "Chomu"] },
          { name: "Bassi", villages: ["Bassi", "Chaksu", "Dudu", "Phagi"] },
        ],
      },
      {
        name: "Jodhpur",
        tehsils: [
          { name: "Jodhpur", villages: ["Mandore", "Osian", "Phalodi", "Shergarh"] },
          { name: "Bilara", villages: ["Bilara", "Bhopalgarh", "Luni", "Pipar City"] },
        ],
      },
    ],
  },
  {
    state: "Karnataka",
    districts: [
      {
        name: "Bangalore Rural",
        tehsils: [
          { name: "Devanahalli", villages: ["Devanahalli", "Doddaballapur", "Hosakote", "Nelamangala"] },
          { name: "Anekal", villages: ["Anekal", "Sarjapur", "Attibele", "Chandapura"] },
        ],
      },
      {
        name: "Mysore",
        tehsils: [
          { name: "Mysore", villages: ["Nanjangud", "T.Narasipura", "Hunsur", "Periyapatna"] },
          { name: "H.D. Kote", villages: ["H.D. Kote", "Saragur", "Antharasanthe", "Hampapura"] },
        ],
      },
    ],
  },
  {
    state: "Tamil Nadu",
    districts: [
      {
        name: "Coimbatore",
        tehsils: [
          { name: "Coimbatore North", villages: ["Annur", "Karamadai", "Mettupalayam", "Sulur"] },
          { name: "Coimbatore South", villages: ["Pollachi", "Valparai", "Kinathukadavu", "Madukkarai"] },
        ],
      },
      {
        name: "Thanjavur",
        tehsils: [
          { name: "Thanjavur", villages: ["Kumbakonam", "Papanasam", "Thiruvaiyaru", "Orathanadu"] },
          { name: "Pattukottai", villages: ["Pattukottai", "Peravurani", "Ayyampettai", "Aranthangi"] },
        ],
      },
    ],
  },
];

export const getStates = (): string[] => {
  return indianLocations.map((loc) => loc.state);
};

export const getDistricts = (state: string): string[] => {
  const stateData = indianLocations.find((loc) => loc.state === state);
  return stateData ? stateData.districts.map((d) => d.name) : [];
};

export const getTehsils = (state: string, district: string): string[] => {
  const stateData = indianLocations.find((loc) => loc.state === state);
  if (!stateData) return [];
  const districtData = stateData.districts.find((d) => d.name === district);
  return districtData ? districtData.tehsils.map((t) => t.name) : [];
};

export const getVillages = (state: string, district: string, tehsil: string): string[] => {
  const stateData = indianLocations.find((loc) => loc.state === state);
  if (!stateData) return [];
  const districtData = stateData.districts.find((d) => d.name === district);
  if (!districtData) return [];
  const tehsilData = districtData.tehsils.find((t) => t.name === tehsil);
  return tehsilData ? tehsilData.villages : [];
};
