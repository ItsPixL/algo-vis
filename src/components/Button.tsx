// components/Button.tsx

// Imports
import { motion } from "motion/react";
import type { ReactNode } from "react";

// Types
type BtnProps = {
  children: ReactNode;
  color?: string;
  hoverColor?: string;
  onClickFunction: (data: number) => void; // FIX THIS
};

// Button
export const Button = ({
  children,
  color = "bg-gray-600",
  hoverColor = "#581c87",
  onClickFunction,
}: BtnProps) => {
  // Animations
  const btnVariants = {
    initial: { scale: 1, opacity: 1 },
    whileHover: {
      scale: 1.05,
      backgroundColor: hoverColor,
    },
    whileTap: { scale: 0.95 },
  };

  const handleClick = () => {
    onClickFunction(1);
  };

  return (
    <div>
      <motion.button
        className={`py-3 px-10 rounded-2xl cursor-pointer ${color}`}
        variants={btnVariants}
        initial="initial"
        whileHover="whileHover"
        whileTap="whileTap"
        onClick={handleClick}
      >
        {children}
      </motion.button>
    </div>
  );
};
