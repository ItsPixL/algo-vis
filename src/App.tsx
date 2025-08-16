// src/App.tsx

// Imports
import { motion } from "motion/react";
import { useState } from "react";
import { ControlBar } from "./components/ControlBar";
import { NavBar } from "./components/NavBar";

// App
export const App = () => {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<number>(0);

  return (
    <motion.div className="bg-slate-900 w-screen h-screen">
      <NavBar />
      <motion.main className="max-w-10/12 mx-auto grid grid-cols-2">
        <ControlBar
          selectedAlgorithm={selectedAlgorithm}
          setSelectedAlgorithm={setSelectedAlgorithm}
        />
        <div>VISUALISATION</div>
      </motion.main>
    </motion.div>
  );
};
