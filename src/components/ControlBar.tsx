// components/ControlBar.tsx

// Imports
import { motion } from "motion/react";
import { Button } from "./Button";

// Types
type ControlBarProps = {
  selectedAlgorithm: string;
  setSelectedAlgorithm: (data: string) => void;
  algorithmsList: Array<string>;
};

// Control Bar
export const ControlBar = ({
  selectedAlgorithm,
  setSelectedAlgorithm,
  algorithmsList,
}: ControlBarProps) => {
  return (
    <motion.div>
      <motion.div className="bg-[#e2e8f0] rounded-2xl px-5 py-10">
        <div className="text-xl mb-3">Algorithm Selection</div>
        {algorithmsList.map((algorithm) => {
          const btnState =
            algorithm === selectedAlgorithm ? "active" : "default";
          return (
            <Button
              key={algorithm}
              btnState={btnState}
              onClickFunction={setSelectedAlgorithm}
            >
              {algorithm}
            </Button>
          );
        })}
      </motion.div>
    </motion.div>
  );
};
