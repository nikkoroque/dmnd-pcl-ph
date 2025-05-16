import { useState, useEffect } from "react";

type RangeSliderProps = {
  min: number;
  max: number;
  step: number;
  value: { min: number; max: number };
  onChange: (value: { min: number; max: number }) => void;
  formatValue?: (value: number) => string;
  inputStep?: number;
  isStringValue?: boolean;
};

export default function RangeSlider({
  min,
  max,
  step,
  value,
  onChange,
  formatValue = (val) => val.toString(),
  inputStep = step,
  isStringValue = false,
}: RangeSliderProps) {
  const [localValue, setLocalValue] = useState<{ min: string; max: string }>({
    min: isStringValue
      ? value.min.toString()
      : value.min.toFixed(step < 1 ? 2 : 0),
    max: isStringValue
      ? value.max.toString()
      : value.max.toFixed(step < 1 ? 2 : 0),
  });

  useEffect(() => {
    setLocalValue({
      min: isStringValue
        ? value.min.toString()
        : value.min.toFixed(step < 1 ? 2 : 0),
      max: isStringValue
        ? value.max.toString()
        : value.max.toFixed(step < 1 ? 2 : 0),
    });
  }, [value, step, isStringValue]);

  const getPercentage = (value: number) => {
    return ((value - min) / (max - min)) * 100;
  };

  const handleSliderChange = (newValue: number, handle: "min" | "max") => {
    const clampedValue = Math.min(Math.max(newValue, min), max);
    let newMin = handle === "min" ? clampedValue : Number(localValue.min);
    let newMax = handle === "max" ? clampedValue : Number(localValue.max);

    // Prevent handles from crossing
    if (handle === "min" && newMin > newMax) {
      newMin = newMax;
    } else if (handle === "max" && newMax < newMin) {
      newMax = newMin;
    }

    setLocalValue({
      min: isStringValue ? newMin.toString() : newMin.toFixed(step < 1 ? 2 : 0),
      max: isStringValue ? newMax.toString() : newMax.toFixed(step < 1 ? 2 : 0),
    });
    onChange({ min: newMin, max: newMax });
  };

  const handleInputChange = (value: string, handle: "min" | "max") => {
    // Allow empty input for better UX
    if (value === "") {
      setLocalValue((prev) => ({ ...prev, [handle]: "" }));
      return;
    }

    // Allow decimal point for decimal steps
    if (value === ".") {
      setLocalValue((prev) => ({ ...prev, [handle]: "0." }));
      return;
    }

    // Parse the input value
    const numValue = Number(value);
    if (isNaN(numValue)) return;

    // Clamp the value between min and max
    const clampedValue = Math.min(Math.max(numValue, min), max);

    let newMin = handle === "min" ? clampedValue : Number(localValue.min);
    let newMax = handle === "max" ? clampedValue : Number(localValue.max);

    // Prevent handles from crossing
    if (handle === "min" && newMin > newMax) {
      newMin = newMax;
    } else if (handle === "max" && newMax < newMin) {
      newMax = newMin;
    }

    // Update the local value with proper decimal formatting
    setLocalValue((prev) => ({
      ...prev,
      [handle]: isStringValue
        ? clampedValue.toString()
        : clampedValue.toFixed(step < 1 ? 2 : 0),
    }));

    // Only trigger onChange if the value is valid
    if (clampedValue >= min && clampedValue <= max) {
      onChange({ min: newMin, max: newMax });
    }
  };

  return (
    <div className="w-full">
      <div className="flex justify-between mb-4">
        <div className="w-28">
          <input
            type="number"
            value={localValue.min}
            onChange={(e) => handleInputChange(e.target.value, "min")}
            step={inputStep}
            min={min}
            max={max}
            className="w-full p-2 text-xs border rounded-md"
          />
        </div>
        <div className="w-28">
          <input
            type="number"
            value={localValue.max}
            onChange={(e) => handleInputChange(e.target.value, "max")}
            step={inputStep}
            min={min}
            max={max}
            className="w-full p-2 text-xs border rounded-md"
          />
        </div>
      </div>

      <div className="relative w-full h-1">
        {/* Background track */}
        <div className="absolute w-full h-full bg-gray-200 rounded-full" />

        {/* Selected range track */}
        <div
          className="absolute h-full bg-[#361111] rounded-full"
          style={{
            left: `${getPercentage(Number(localValue.min))}%`,
            right: `${100 - getPercentage(Number(localValue.max))}%`,
          }}
        />

        {/* Min slider */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={Number(localValue.min)}
          onChange={(e) => handleSliderChange(Number(e.target.value), "min")}
          className="absolute w-full pointer-events-none appearance-none bg-transparent [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[#1a1b4b] [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:w-3 [&::-moz-range-thumb]:h-3 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-[#1a1b4b] [&::-moz-range-thumb]:cursor-pointer"
          style={{ height: "24px", marginTop: "-12px" }}
        />

        {/* Max slider */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={Number(localValue.max)}
          onChange={(e) => handleSliderChange(Number(e.target.value), "max")}
          className="absolute w-full pointer-events-none appearance-none bg-transparent [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[#1a1b4b] [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:w-3 [&::-moz-range-thumb]:h-3 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-[#1a1b4b] [&::-moz-range-thumb]:cursor-pointer"
          style={{ height: "24px", marginTop: "-12px" }}
        />
      </div>

      <div className="flex justify-between mt-1">
        <span className="text-xs text-gray-500">{formatValue(min)}</span>
        <span className="text-xs text-gray-500">{formatValue(max)}</span>
      </div>
    </div>
  );
}
