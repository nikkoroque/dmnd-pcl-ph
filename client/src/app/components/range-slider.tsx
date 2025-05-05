import { useState, useEffect } from 'react';

type RangeSliderProps = {
  min: number;
  max: number;
  step: number;
  value: { min: number; max: number };
  onChange: (value: { min: number; max: number }) => void;
  formatValue?: (value: number) => string;
  inputStep?: number;
};

export default function RangeSlider({
  min,
  max,
  step,
  value,
  onChange,
  formatValue = (val) => val.toString(),
  inputStep = step,
}: RangeSliderProps) {
  const [localValue, setLocalValue] = useState<{ min: string; max: string }>({ min: value.min.toString(), max: value.max.toString() });

  useEffect(() => {
    setLocalValue({ min: value.min.toString(), max: value.max.toString() });
  }, [value]);

  const getPercentage = (value: number) => {
    return ((value - min) / (max - min)) * 100;
  };

  const handleSliderChange = (newValue: number, handle: 'min' | 'max') => {
    const clampedValue = Math.min(Math.max(newValue, min), max);
    let newMin = handle === 'min' ? clampedValue : Number(localValue.min);
    let newMax = handle === 'max' ? clampedValue : Number(localValue.max);

    // Prevent handles from crossing
    if (handle === 'min' && newMin > newMax) {
      newMin = newMax;
    } else if (handle === 'max' && newMax < newMin) {
      newMax = newMin;
    }

    setLocalValue({ min: newMin.toString(), max: newMax.toString() });
    onChange({ min: newMin, max: newMax });
  };

  const handleInputChange = (value: string, handle: 'min' | 'max') => {
    setLocalValue((prev) => ({ ...prev, [handle]: value }));
    const numValue = Number(value);
    if (value === '' || isNaN(numValue)) return;
    let newMin = handle === 'min' ? numValue : Number(localValue.min);
    let newMax = handle === 'max' ? numValue : Number(localValue.max);
    if (handle === 'min' && newMin > newMax) {
      newMin = newMax;
    } else if (handle === 'max' && newMax < newMin) {
      newMax = newMin;
    }
    onChange({ min: newMin, max: newMax });
  };

  return (
    <div className="w-full">
      <div className="flex justify-between mb-4">
        <div className="w-28">
          <input
            type="text"
            value={localValue.min}
            onChange={(e) => handleInputChange(e.target.value, 'min')}
            step={inputStep}
            min={min}
            max={max}
            className="w-full p-2 text-xs border rounded-md"
          />
        </div>
        <div className="w-28">
          <input
            type="text"
            value={localValue.max}
            onChange={(e) => handleInputChange(e.target.value, 'max')}
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
          onChange={(e) => handleSliderChange(Number(e.target.value), 'min')}
          className="absolute w-full pointer-events-none appearance-none bg-transparent [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[#1a1b4b] [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:w-3 [&::-moz-range-thumb]:h-3 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-[#1a1b4b] [&::-moz-range-thumb]:cursor-pointer"
          style={{ height: '24px', marginTop: '-12px' }}
        />

        {/* Max slider */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={Number(localValue.max)}
          onChange={(e) => handleSliderChange(Number(e.target.value), 'max')}
          className="absolute w-full pointer-events-none appearance-none bg-transparent [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[#1a1b4b] [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:w-3 [&::-moz-range-thumb]:h-3 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-[#1a1b4b] [&::-moz-range-thumb]:cursor-pointer"
          style={{ height: '24px', marginTop: '-12px' }}
        />
      </div>

      <div className="flex justify-between mt-1">
        <span className="text-xs text-gray-500">{formatValue(min)}</span>
        <span className="text-xs text-gray-500">{formatValue(max)}</span>
      </div>
    </div>
  );
} 