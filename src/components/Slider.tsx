// components/Slider.tsx
import React, { useRef, useState, useEffect, useCallback } from "react";
import { motion } from "motion/react";

interface SliderProps {
  min?: number;
  max?: number;
  step?: number;
  value?: number;
  onChange?: (value: number) => void;
  unit?: string;
  sliderDisabled?: boolean;
}

const Slider: React.FC<SliderProps> = ({
  min = 0,
  max = 100,
  step = 1,
  value,
  onChange,
  unit,
  sliderDisabled = false,
}) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [internalValue, setInternalValue] = useState(value ?? min);
  const moveListenerRef = useRef<((e: MouseEvent) => void) | null>(null);
  const upListenerRef = useRef<(() => void) | null>(null);

  const currentValue = value ?? internalValue;
  const percentage = ((currentValue - min) / (max - min)) * 100;

  const updateValueFromPosition = useCallback(
    (clientX: number) => {
      if (sliderDisabled || !trackRef.current) return;

      const rect = trackRef.current.getBoundingClientRect();
      const x = Math.min(Math.max(clientX - rect.left, 0), rect.width);
      const rawValue = min + (x / rect.width) * (max - min);
      const steppedValue = Math.round(rawValue / step) * step;

      if (onChange) {
        onChange(steppedValue);
      } else {
        setInternalValue(steppedValue);
      }
    },
    [min, max, step, onChange, sliderDisabled]
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!sliderDisabled) updateValueFromPosition(e.clientX);
    },
    [sliderDisabled, updateValueFromPosition]
  );

  const handleMouseUp = useCallback(() => {
    if (moveListenerRef.current) {
      window.removeEventListener("mousemove", moveListenerRef.current);
    }
    if (upListenerRef.current) {
      window.removeEventListener("mouseup", upListenerRef.current);
    }
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (sliderDisabled) return;

    updateValueFromPosition(e.clientX);

    moveListenerRef.current = handleMouseMove;
    upListenerRef.current = handleMouseUp;

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  useEffect(() => {
    if (value !== undefined) setInternalValue(value);
  }, [value]);

  return (
    <div className="w-full">
      <div
        ref={trackRef}
        className={`relative h-2 rounded-full cursor-pointer ${
          sliderDisabled ? "bg-gray-300 cursor-not-allowed" : "bg-gray-300"
        }`}
        onMouseDown={handleMouseDown}
      >
        {/* Fill */}
        <motion.div
          className={`absolute top-0 left-0 h-2 rounded-full ${
            sliderDisabled ? "bg-gray-400 cursor-not-allowed" : "bg-amber-500"
          }`}
          style={{ width: `${percentage}%` }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />

        {/* Thumb */}
        <motion.div
          className={`absolute top-1/2 w-5 h-5 rounded-full shadow -translate-y-1/2 ${
            sliderDisabled ? "bg-gray-400 cursor-not-allowed" : "bg-amber-400"
          }`}
          style={{ left: `calc(${percentage}% - 10px)` }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          initial={false}
          whileHover={
            sliderDisabled
              ? { backgroundColor: "#171717", cursor: "not-allowed" }
              : { backgroundColor: "#d97706" }
          }
        />
      </div>

      <div className="text-sm text-gray-700 mt-2 text-center">
        {currentValue} {unit}
      </div>
    </div>
  );
};

export default Slider;
