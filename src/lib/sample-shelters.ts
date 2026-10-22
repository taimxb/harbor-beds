// Invented sample data for development and the demo. Real shelter details
// are entered through the admin screen and never committed to the repo.
// Phone numbers use 555-0100 to 555-0199, which are reserved for fiction.

export type SampleShelter = {
  name: string;
  address: string;
  phone: string;
  capacity: number;
  occupied: number;
  womenOnly: boolean;
  acceptsChildren: boolean;
  acceptsPets: boolean;
  requiresSobriety: boolean;
  minutesSinceLastUpdate: number;
};

const noRules = {
  womenOnly: false,
  acceptsChildren: false,
  acceptsPets: false,
  requiresSobriety: false,
};

export const sampleShelters: SampleShelter[] = [
  {
    // Full until the 7:50 PM check out in the demo story.
    name: "Northside",
    address: "418 Larch Avenue",
    phone: "(617) 555-0101",
    capacity: 30,
    occupied: 30,
    ...noRules,
    acceptsPets: true,
    minutesSinceLastUpdate: 25,
  },
  {
    name: "Harbor House",
    address: "92 Wharf Street",
    phone: "(617) 555-0102",
    capacity: 40,
    occupied: 37,
    ...noRules,
    womenOnly: true,
    minutesSinceLastUpdate: 10,
  },
  {
    name: "Rosewood",
    address: "1530 Rosewood Lane",
    phone: "(617) 555-0103",
    capacity: 25,
    occupied: 25,
    ...noRules,
    womenOnly: true,
    minutesSinceLastUpdate: 240,
  },
  {
    // The family shelter: capacity counts family rooms.
    name: "Maple Family Center",
    address: "7 Maple Court",
    phone: "(617) 555-0104",
    capacity: 20,
    occupied: 18,
    ...noRules,
    acceptsChildren: true,
    minutesSinceLastUpdate: 45,
  },
  {
    name: "Clearwater",
    address: "260 Spring Road",
    phone: "(617) 555-0105",
    capacity: 35,
    occupied: 33,
    ...noRules,
    requiresSobriety: true,
    minutesSinceLastUpdate: 90,
  },
  {
    name: "Downtown Emergency Shelter",
    address: "11 Center Street",
    phone: "(617) 555-0106",
    capacity: 60,
    occupied: 55,
    ...noRules,
    minutesSinceLastUpdate: 5,
  },
];
