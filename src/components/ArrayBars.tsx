// components/ArrayBars.tsx

// Imports
// import { motion } from "motion/react";

// Types
type ArrayBarsProps = {
  array: number[];
};

// Array Bars
export const ArrayBars = ({ array }: ArrayBarsProps) => {
  return (
    <div className="flex items-end justify-center h-[400px] gap-1">
      {array.map((value, idx) => (
        <div
          key={idx}
          className="bg-blue-500 rounded-sm"
          style={{
            height: `${value}px`,
            width: `${Math.floor(600 / array.length)}px`,
          }}
        ></div>
      ))}
    </div>
  );
};
