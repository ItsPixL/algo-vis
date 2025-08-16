// src/App.tsx

// Imports
import { motion } from "motion/react";
import { useState } from "react";
import { ControlBar } from "./components/ControlBar";
import { NavBar } from "./components/NavBar";

// App
export const App = () => {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<string>("");

  const algorithmList = ["Bubble Sort"];

  return (
    <motion.div className="bg-[#f1f5f9] w-screen h-screen">
      <NavBar />
      <motion.main className="max-w-10/12 mx-auto grid grid-cols-2 gap-10">
        <ControlBar
          selectedAlgorithm={selectedAlgorithm}
          setSelectedAlgorithm={setSelectedAlgorithm}
          algorithmsList={algorithmList}
        />
        <div>VISUALISATION</div>
      </motion.main>
    </motion.div>
  );
};
