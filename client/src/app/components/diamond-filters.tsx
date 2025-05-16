import { useState } from "react";
import Image from "next/image";
import RangeSlider from "./range-slider";
import SearchInput from "./search-input";

// Diamond shape icons
import RoundIcon from "../../../public/icons/round.svg";
import PrincessIcon from "../../../public/icons/princess.svg";
import CushionIcon from "../../../public/icons/cushion.svg";
import EmeraldIcon from "../../../public/icons/emerald.svg";
import OvalIcon from "../../../public/icons/oval.svg";
import RadiantIcon from "../../../public/icons/radiant.svg";
import AsscherIcon from "../../../public/icons/asscher.svg";
import MarquiseIcon from "../../../public/icons/marquise.svg";
import HeartIcon from "../../../public/icons/heart.svg";
import PearIcon from "../../../public/icons/pear.svg";

type DiamondShape =
  | "Round"
  | "Princess"
  | "Cushion"
  | "Emerald"
  | "Oval"
  | "Radiant"
  | "Asscher"
  | "Marquise"
  | "Heart"
  | "Pear";

type DiamondColor = "D" | "E" | "F" | "G" | "H" | "I" | "J" | "K";

type DiamondClarity =
  | "FL"
  | "IF"
  | "VVS1"
  | "VVS2"
  | "VS1"
  | "VS2"
  | "SI1"
  | "SI2";

type FilterProps = {
  onFilterChange: (filters: {
    shapes: DiamondShape[];
    priceRange: { min: number; max: number };
    caratRange: { min: number; max: number };
    colors: DiamondColor[];
    clarity: DiamondClarity[];
  }) => void;
  search: string;
  onSearchChange: (value: string) => void;
  diamondType: "natural" | "lab-grown" | "all";
};

type CaratRange = {
  min: string;
  max: string;
};

type PriceRange = {
  min: string;
  max: string;
};

const shapes: { type: DiamondShape; icon: string }[] = [
  { type: "Round", icon: RoundIcon },
  { type: "Princess", icon: PrincessIcon },
  { type: "Cushion", icon: CushionIcon },
  { type: "Emerald", icon: EmeraldIcon },
  { type: "Oval", icon: OvalIcon },
  { type: "Radiant", icon: RadiantIcon },
  { type: "Asscher", icon: AsscherIcon },
  { type: "Marquise", icon: MarquiseIcon },
  { type: "Heart", icon: HeartIcon },
  { type: "Pear", icon: PearIcon },
];

const colors: DiamondColor[] = ["K", "J", "I", "H", "G", "F", "E", "D"];
const clarityGrades: DiamondClarity[] = [
  "SI2",
  "SI1",
  "VS2",
  "VS1",
  "VVS2",
  "VVS1",
  "IF",
  "FL",
];

export default function DiamondFilters({
  onFilterChange,
  search,
  onSearchChange,
  diamondType,
}: FilterProps) {
  const [selectedShapes, setSelectedShapes] = useState<DiamondShape[]>([]);
  const [selectedColors, setSelectedColors] = useState<DiamondColor[]>([]);
  const [selectedClarity, setSelectedClarity] = useState<DiamondClarity[]>([]);
  const [priceRange, setPriceRange] = useState<PriceRange>({
    min: "0",
    max: "100000000",
  });
  const [caratRange, setCaratRange] = useState<CaratRange>({
    min: "0.00",
    max: "50.00",
  });

  const resetFilters = () => {
    setSelectedShapes([]);
    setSelectedColors([]);
    setSelectedClarity([]);
    setPriceRange({ min: "0", max: "100000000" });
    setCaratRange({ min: "0.00", max: "50.00" });
    onFilterChange({
      shapes: [],
      priceRange: { min: 0, max: 100000000 },
      caratRange: { min: 0.0, max: 50.0 },
      colors: [],
      clarity: [],
    });
    onSearchChange("");
  };

  const handleShapeToggle = (shape: DiamondShape) => {
    setSelectedShapes((prev) => {
      const newShapes = prev.includes(shape)
        ? prev.filter((s) => s !== shape)
        : [...prev, shape];
      onFilterChange({
        shapes: newShapes,
        priceRange: {
          min: Number(priceRange.min),
          max: Number(priceRange.max),
        },
        caratRange: {
          min: parseFloat(caratRange.min),
          max: parseFloat(caratRange.max),
        },
        colors: selectedColors,
        clarity: selectedClarity,
      });
      return newShapes;
    });
  };

  const handleColorToggle = (color: DiamondColor) => {
    setSelectedColors((prev) => {
      const newColors = prev.includes(color)
        ? prev.filter((c) => c !== color)
        : [...prev, color];
      onFilterChange({
        shapes: selectedShapes,
        priceRange: {
          min: Number(priceRange.min),
          max: Number(priceRange.max),
        },
        caratRange: {
          min: parseFloat(caratRange.min),
          max: parseFloat(caratRange.max),
        },
        colors: newColors,
        clarity: selectedClarity,
      });
      return newColors;
    });
  };

  const handleClarityToggle = (clarity: DiamondClarity) => {
    setSelectedClarity((prev) => {
      const newClarity = prev.includes(clarity)
        ? prev.filter((c) => c !== clarity)
        : [...prev, clarity];
      onFilterChange({
        shapes: selectedShapes,
        priceRange: {
          min: Number(priceRange.min),
          max: Number(priceRange.max),
        },
        caratRange: {
          min: parseFloat(caratRange.min),
          max: parseFloat(caratRange.max),
        },
        colors: selectedColors,
        clarity: newClarity,
      });
      return newClarity;
    });
  };

  const formatPrice = (value: number) => `₱${value.toLocaleString()}`;
  const formatCarat = (value: string) => `${value} ct`;

  return (
    <div className="bg-white p-4">
      <div className="flex justify-between items-center mb-6">
        <div className="w-2/3">
          <SearchInput
            value={search}
            onChange={onSearchChange}
            onSearch={onSearchChange}
            placeholder={`Search ${
              diamondType === "all"
                ? ""
                : diamondType === "natural"
                ? "Natural "
                : "Lab-Grown "
            }Diamond Stock No. or Certificate No.`}
          />
        </div>
        <div className="w-1/3 flex justify-end">
          <button
            onClick={resetFilters}
            className="text-sm text-[#361111] hover:text-[#4a1717] font-medium flex items-center gap-1"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            Reset Filters
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Shape Selection */}
        <div>
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-4 flex items-center">
              Shape
            </h3>
            <div className="grid grid-cols-5 gap-4">
              {shapes.map(({ type, icon }) => (
                <button
                  key={type}
                  onClick={() => handleShapeToggle(type)}
                  className={`aspect-square p-3 rounded-lg flex flex-col items-center justify-center transition-all ${
                    selectedShapes.includes(type)
                      ? "bg-[#361111] text-white"
                      : "bg-gray-50 hover:bg-gray-100 text-gray-700"
                  }`}
                >
                  <div className="flex-1 flex items-center justify-center">
                    <Image
                      src={icon}
                      alt={type}
                      width={32}
                      height={32}
                      className={`${
                        selectedShapes.includes(type)
                          ? "brightness-0 invert"
                          : ""
                      }`}
                    />
                  </div>
                  <span className="text-xs mt-2">{type}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Price Range and Clarity */}
        <div>
          <div className="mb-8">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Price</h3>
            <RangeSlider
              min={0}
              max={100000000}
              step={1000}
              value={{
                min: Number(priceRange.min),
                max: Number(priceRange.max),
              }}
              onChange={(newRange) => {
                const newPriceRange = {
                  min: newRange.min.toString(),
                  max: newRange.max.toString(),
                };
                setPriceRange(newPriceRange);
                onFilterChange({
                  shapes: selectedShapes,
                  priceRange: {
                    min: parseFloat(newPriceRange.min),
                    max: parseFloat(newPriceRange.max),
                  },
                  caratRange: {
                    min: parseFloat(caratRange.min),
                    max: parseFloat(caratRange.max),
                  },
                  colors: selectedColors,
                  clarity: selectedClarity,
                });
              }}
              formatValue={formatPrice}
              isStringValue={true}
            />
          </div>

          {/* Clarity Selection */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-4 flex items-center">
              Clarity
            </h3>
            <div className="flex gap-2 flex-wrap justify-between">
              {clarityGrades.map((clarity) => (
                <button
                  key={clarity}
                  onClick={() => handleClarityToggle(clarity)}
                  className={`px-3 py-1.5 rounded-md flex items-center text-xs justify-center transition-all ${
                    selectedClarity.includes(clarity)
                      ? "bg-[#361111] text-white"
                      : "bg-gray-50 hover:bg-gray-100 text-gray-700"
                  }`}
                >
                  {clarity}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Carat Range and Color */}
        <div>
          <div className="mb-8">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Carat</h3>
            <RangeSlider
              min={0.0}
              max={50.0}
              step={0.01}
              value={{
                min: parseFloat(caratRange.min),
                max: parseFloat(caratRange.max),
              }}
              onChange={(newRange) => {
                const newCaratRange = {
                  min: newRange.min.toFixed(2),
                  max: newRange.max.toFixed(2),
                };
                setCaratRange(newCaratRange);
                onFilterChange({
                  shapes: selectedShapes,
                  priceRange: {
                    min: parseFloat(priceRange.min),
                    max: parseFloat(priceRange.max),
                  },
                  caratRange: {
                    min: parseFloat(newCaratRange.min),
                    max: parseFloat(newCaratRange.max),
                  },
                  colors: selectedColors,
                  clarity: selectedClarity,
                });
              }}
              formatValue={(value) => formatCarat(value.toFixed(2))}
              inputStep={0.01}
              isStringValue={true}
            />
          </div>

          {/* Color Selection */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-4 flex items-center">
              Color
            </h3>
            <div className="flex gap-2 justify-between">
              {colors.map((color) => (
                <button
                  key={color}
                  onClick={() => handleColorToggle(color)}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs transition-all ${
                    selectedColors.includes(color)
                      ? "bg-[#361111] text-white"
                      : "bg-gray-50 hover:bg-gray-100 text-gray-700"
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
