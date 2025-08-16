// components/NavBar.tsx

// Imports
import { motion } from "motion/react";

export const NavBar = () => {
  return (
    <motion.nav className="bg-slate-950 w-screen px-3 py-5">
      <motion.div className="max-w-10/12 mx-auto">
        <motion.div className="text-2xl">AlgoVis</motion.div>
      </motion.div>
    </motion.nav>
  );
};
