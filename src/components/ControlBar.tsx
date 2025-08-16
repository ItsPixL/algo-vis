// components/ControlBar.tsx

// Imports
import { motion } from "motion/react";
import { Button } from "./Button";

// Control Bar
export const ControlBar = () => {
  return (
    <motion.div>
      <motion.div className="bg-slate-800 rounded-2xl px-5 py-10">
        Controller
        <Button>Bubble Sort</Button>
      </motion.div>
    </motion.div>
  );
};
