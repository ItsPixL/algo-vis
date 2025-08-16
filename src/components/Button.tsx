// components/Button.tsx

// Imports
import { motion } from "motion/react";
import type { ReactNode } from "react";

// Types
type BtnProps = { children: ReactNode };

// Animations
const btnVariants = {
  initial: { scale: 1, opacity: 1 },
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.95 },
};

// Button
export const Button = ({ children }: BtnProps) => {
  return (
    <div>
      <motion.button
        className="p-3 bg-gray-600 rounded-2xl cursor-pointer"
        variants={btnVariants}
        initial="initial"
        whileHover="whileHover"
        whileTap="whileTap"
      >
        {children}
      </motion.button>
    </div>
  );
};
