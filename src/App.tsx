// src/App.tsx

// Imports
import { motion } from "motion/react";
import { ControlBar } from "./components/ControlBar";
import { NavBar } from "./components/NavBar";

// App
export const App = () => {
  return (
    <motion.div className="bg-slate-900 w-screen h-screen">
      <NavBar />
      <motion.main className="max-w-9/12 mx-auto grid grid-cols-2">
        <ControlBar />
        <div>VISUALISATION</div>
      </motion.main>
    </motion.div>
  );
};
