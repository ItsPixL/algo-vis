// components/Button.tsx

// Imports
import { backIn, motion } from "motion/react";
import type { ReactNode } from "react";

// Types
type BtnProps = {
  children: ReactNode;
  btnState?: "default" | "active" | "disabled";
  onClickFunction: (data: string) => void;
};

// Button
export const Button = ({
  children,
  btnState = "default",
  onClickFunction,
}: BtnProps) => {
  // Motion
  const btnVariants = {
    initial: { scale: 1, backgroundColor: "#94a3b8" },
    hover: { scale: 1.05, backgroundColor: "#d97706" },
    click: { scale: 0.9, backgroundColor: "#fcd34d" },
    active: { scale: 1, backgroundColor: "#fcd34d" },
  };

  const currentVariant = btnState === "active" ? "active" : "initial";

  return (
    <div>
      <motion.button
        className="py-3 px-10 rounded-2xl cursor-pointer"
        variants={btnVariants}
        initial="initial"
        animate={currentVariant}
        whileHover={btnState !== "disabled" ? "hover" : undefined}
        whileTap={btnState !== "disabled" ? "click" : undefined}
        onClick={() => {
          if (btnState !== "disabled") {
            onClickFunction("clicked");
          }
        }}
        disabled={btnState === "disabled"}
      >
        {children}
      </motion.button>
    </div>
  );
};
