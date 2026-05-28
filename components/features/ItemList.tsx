"use client";

import { useState } from "react";
import { CBM_CATALOG, CATEGORIES, getCbmValue, type ItemSize } from "@/lib/cbm-data";
import { clsx } from "clsx";

export interface MoveItem {
  id: string;
  name: string;
  category: string;
  size: ItemSize;
  cbmValue: number;
  quantity: number;
}

interface ItemListProps {
  items: MoveItem[];
  onChange: (items: MoveItem[]) => void;
}

const SIZE_LABELS: Record<ItemSize, string> = {
  S: "Small",
  M: "Medium",
  L: "Large",
  XL: "X-Large",
};

export default function ItemList({ items, onChange }: ItemListProps) {
  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[0]);
  const [search, setSearch] = useState("");

  const filtered = CBM_CATALOG.filter(
    (i) =>
      i.category === selectedCategory &&
      i.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalCbm = items.reduce((sum, i) => sum + i.cbmValue * i.quantity, 0);

  const addItem = (catalogItem: (typeof CBM_CATALOG)[0]) => {
    const existing = items.find((i) => i.name === catalogItem.name);
    if (existing) {
      onChange(
        items.map((i) =>
          i.name === catalogItem.name ? { ...i, quantity: i.quantity + 1 } : i
        )
      );
    } else {
      const newItem: MoveItem = {
        id: `${Date.now()}-${catalogItem.name}`,
        name: catalogItem.name,
        category: catalogItem.category,
        size: catalogItem.defaultSize,
        cbmValue: catalogItem.sizes[catalogItem.defaultSize],
        quantity: 1,
      };
      onChange([...items, newItem]);
    }
  };

  const removeItem = (id: string) => {
    onChange(items.filter((i) => i.id !== id));
  };

  const updateItem = (id: string, field: "size" | "quantity", value: string | number) => {
    onChange(
      items.map((item) => {
        if (item.id !== id) return item;
        if (field === "size") {
          const size = value as ItemSize;
          const catalogEntry = CBM_CATALOG.find((c) => c.name === item.name);
          const cbmValue = catalogEntry ? catalogEntry.sizes[size] : item.cbmValue;
          return { ...item, size, cbmValue };
        }
        return { ...item, quantity: Number(value) };
      })
    );
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Catalog Browser */}
        <div className="border border-gray-200 rounded-xl overflow-hidden">
          <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
            <p className="text-sm font-medium text-gray-700">Add Items</p>
          </div>
          <div className="p-3 space-y-3">
            <input
              type="text"
              placeholder="Search items..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <div className="flex flex-wrap gap-1.5">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={clsx(
                    "px-2.5 py-1 text-xs rounded-full border transition-colors",
                    selectedCategory === cat
                      ? "bg-primary text-white border-primary"
                      : "bg-white text-gray-600 border-gray-300 hover:border-primary"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="space-y-1 max-h-52 overflow-y-auto">
              {filtered.map((catalogItem) => (
                <button
                  key={catalogItem.name}
                  onClick={() => addItem(catalogItem)}
                  className="w-full flex items-center justify-between px-3 py-2 text-sm text-left rounded-lg hover:bg-primary-50 hover:text-primary transition-colors group"
                >
                  <span>{catalogItem.name}</span>
                  <span className="text-xs text-gray-400 group-hover:text-primary-600">
                    {catalogItem.sizes[catalogItem.defaultSize]} CBM
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Selected Items */}
        <div className="border border-gray-200 rounded-xl overflow-hidden">
          <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex items-center justify-between">
            <p className="text-sm font-medium text-gray-700">
              Your Items ({items.length})
            </p>
            <span className="text-sm font-semibold text-primary">
              {totalCbm.toFixed(2)} CBM
            </span>
          </div>
          <div className="divide-y divide-gray-100 max-h-64 overflow-y-auto">
            {items.length === 0 && (
              <div className="px-4 py-8 text-center text-sm text-gray-400">
                Add items from the catalog →
              </div>
            )}
            {items.map((item) => (
              <div key={item.id} className="px-3 py-2.5 flex items-center gap-2">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{item.name}</p>
                  <p className="text-xs text-gray-500">{(item.cbmValue * item.quantity).toFixed(2)} CBM</p>
                </div>
                <select
                  value={item.size}
                  onChange={(e) => updateItem(item.id, "size", e.target.value)}
                  className="text-xs border border-gray-200 rounded px-1.5 py-1 focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  {(["S", "M", "L", "XL"] as ItemSize[]).map((s) => (
                    <option key={s} value={s}>{SIZE_LABELS[s]}</option>
                  ))}
                </select>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => item.quantity > 1 ? updateItem(item.id, "quantity", item.quantity - 1) : removeItem(item.id)}
                    className="w-6 h-6 flex items-center justify-center rounded border border-gray-300 text-gray-600 hover:bg-gray-100 text-xs"
                  >−</button>
                  <span className="w-5 text-center text-sm">{item.quantity}</span>
                  <button
                    onClick={() => updateItem(item.id, "quantity", item.quantity + 1)}
                    className="w-6 h-6 flex items-center justify-center rounded border border-gray-300 text-gray-600 hover:bg-gray-100 text-xs"
                  >+</button>
                </div>
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-gray-400 hover:text-red-500 transition-colors text-xs px-1"
                >✕</button>
              </div>
            ))}
          </div>
          {items.length > 0 && (
            <div className="bg-primary-50 px-4 py-3 border-t border-primary-100">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Estimated Volume</span>
                <span className="font-bold text-primary">{totalCbm.toFixed(2)} CBM</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">±10% variance may apply after final packing</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
