export type ItemSize = "S" | "M" | "L" | "XL";

export interface CbmItem {
  name: string;
  category: string;
  sizes: Record<ItemSize, number>;
  defaultSize: ItemSize;
}

export const CBM_CATALOG: CbmItem[] = [
  // Living Room
  { name: "Sofa (2-seat)", category: "Living Room", sizes: { S: 0.6, M: 0.9, L: 1.2, XL: 1.6 }, defaultSize: "M" },
  { name: "Sofa (3-seat)", category: "Living Room", sizes: { S: 0.9, M: 1.2, L: 1.6, XL: 2.0 }, defaultSize: "L" },
  { name: "Armchair", category: "Living Room", sizes: { S: 0.3, M: 0.5, L: 0.7, XL: 0.9 }, defaultSize: "M" },
  { name: "Coffee Table", category: "Living Room", sizes: { S: 0.1, M: 0.2, L: 0.3, XL: 0.4 }, defaultSize: "M" },
  { name: "TV Stand", category: "Living Room", sizes: { S: 0.2, M: 0.3, L: 0.5, XL: 0.7 }, defaultSize: "M" },
  { name: "Bookshelf", category: "Living Room", sizes: { S: 0.2, M: 0.4, L: 0.6, XL: 0.8 }, defaultSize: "M" },
  // Bedroom
  { name: "Bed Frame (Single)", category: "Bedroom", sizes: { S: 0.5, M: 0.7, L: 0.9, XL: 1.1 }, defaultSize: "M" },
  { name: "Bed Frame (Double)", category: "Bedroom", sizes: { S: 0.7, M: 1.0, L: 1.3, XL: 1.6 }, defaultSize: "M" },
  { name: "Bed Frame (King)", category: "Bedroom", sizes: { S: 0.9, M: 1.3, L: 1.7, XL: 2.0 }, defaultSize: "L" },
  { name: "Mattress (Single)", category: "Bedroom", sizes: { S: 0.3, M: 0.4, L: 0.5, XL: 0.6 }, defaultSize: "M" },
  { name: "Mattress (Double)", category: "Bedroom", sizes: { S: 0.4, M: 0.5, L: 0.7, XL: 0.8 }, defaultSize: "M" },
  { name: "Wardrobe", category: "Bedroom", sizes: { S: 0.5, M: 0.9, L: 1.4, XL: 2.0 }, defaultSize: "M" },
  { name: "Dresser / Chest of Drawers", category: "Bedroom", sizes: { S: 0.2, M: 0.4, L: 0.6, XL: 0.8 }, defaultSize: "M" },
  { name: "Nightstand", category: "Bedroom", sizes: { S: 0.05, M: 0.08, L: 0.12, XL: 0.15 }, defaultSize: "M" },
  // Kitchen & Dining
  { name: "Dining Table", category: "Dining", sizes: { S: 0.3, M: 0.5, L: 0.8, XL: 1.2 }, defaultSize: "M" },
  { name: "Dining Chair", category: "Dining", sizes: { S: 0.05, M: 0.08, L: 0.12, XL: 0.15 }, defaultSize: "M" },
  { name: "Refrigerator", category: "Kitchen", sizes: { S: 0.3, M: 0.5, L: 0.7, XL: 1.0 }, defaultSize: "M" },
  { name: "Washing Machine", category: "Kitchen", sizes: { S: 0.25, M: 0.3, L: 0.35, XL: 0.4 }, defaultSize: "M" },
  { name: "Dryer", category: "Kitchen", sizes: { S: 0.25, M: 0.3, L: 0.35, XL: 0.4 }, defaultSize: "M" },
  { name: "Dishwasher", category: "Kitchen", sizes: { S: 0.2, M: 0.25, L: 0.3, XL: 0.35 }, defaultSize: "M" },
  // Office
  { name: "Desk", category: "Office", sizes: { S: 0.2, M: 0.4, L: 0.6, XL: 0.8 }, defaultSize: "M" },
  { name: "Office Chair", category: "Office", sizes: { S: 0.1, M: 0.15, L: 0.2, XL: 0.25 }, defaultSize: "M" },
  { name: "Filing Cabinet", category: "Office", sizes: { S: 0.1, M: 0.15, L: 0.25, XL: 0.35 }, defaultSize: "M" },
  // Electronics
  { name: "TV (up to 55\")", category: "Electronics", sizes: { S: 0.1, M: 0.15, L: 0.2, XL: 0.25 }, defaultSize: "M" },
  { name: "TV (56\"+ )", category: "Electronics", sizes: { S: 0.2, M: 0.3, L: 0.4, XL: 0.5 }, defaultSize: "M" },
  // Boxes & Misc
  { name: "Cardboard Box (Small)", category: "Boxes", sizes: { S: 0.04, M: 0.04, L: 0.04, XL: 0.04 }, defaultSize: "S" },
  { name: "Cardboard Box (Medium)", category: "Boxes", sizes: { S: 0.06, M: 0.06, L: 0.06, XL: 0.06 }, defaultSize: "M" },
  { name: "Cardboard Box (Large)", category: "Boxes", sizes: { S: 0.1, M: 0.1, L: 0.1, XL: 0.1 }, defaultSize: "L" },
  { name: "Bicycle", category: "Misc", sizes: { S: 0.3, M: 0.4, L: 0.5, XL: 0.6 }, defaultSize: "M" },
  { name: "Motorcycle", category: "Misc", sizes: { S: 0.8, M: 1.0, L: 1.3, XL: 1.6 }, defaultSize: "M" },
  { name: "Piano (Upright)", category: "Misc", sizes: { S: 0.8, M: 1.0, L: 1.3, XL: 1.6 }, defaultSize: "L" },
];

export const CATEGORIES = [...new Set(CBM_CATALOG.map((i) => i.category))];

export function getCbmValue(itemName: string, size: ItemSize): number {
  const item = CBM_CATALOG.find((i) => i.name === itemName);
  return item ? item.sizes[size] : 0.1;
}

export const POPULAR_DESTINATIONS = [
  "United States", "Canada", "Australia", "United Kingdom", "Germany",
  "France", "Japan", "Singapore", "UAE", "Netherlands", "New Zealand",
  "Hong Kong", "China", "Vietnam", "Thailand",
];
