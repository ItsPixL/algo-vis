// components/ControlBar.tsx

// Imports
import { motion } from "motion/react";
import { Button } from "./Button";

// Types
type ControlBarProps = {
  selectedAlgorithm: number;
  setSelectedAlgorithm: (data: number) => void;
};

// Control Bar
export const ControlBar = ({
  selectedAlgorithm,
  setSelectedAlgorithm,
}: ControlBarProps) => {
  let color = "bg-gray-600";

  if (selectedAlgorithm === 1) {
    color = "bg-red-500";
  }

  return (
    <motion.div>
      <motion.div className="bg-slate-800 rounded-2xl px-5 py-10">
        Controller
        <Button color={color} onClickFunction={setSelectedAlgorithm}>
          Bubble Sort
        </Button>
      </motion.div>
    </motion.div>
  );
};
