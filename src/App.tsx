// src/App.tsx

// Imports
import { motion } from "motion/react";
import { useState } from "react";
import NavBar from "./components/NavBar";
import ControlBar from "./components/ControlBar";

// App
export const App = () => {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<string>("");
  const [arraySize, setArraySize] = useState<number>(50);
  const [speed, setSpeed] = useState<number>(50);

  const algorithmList = [
    "Bubble Sort",
    "Insertion Sort",
    "Merge Sort",
    "Quick Sort",
  ];

  const generateArray = () => {
    return null;
  };
  const startSorting = () => {
    return null;
  };

  return (
    <motion.div className="bg-[#f1f5f9] w-screen h-screen">
      <NavBar />
      <motion.main className="max-w-10/12 mx-auto flex flex-cols gap-10">
        <ControlBar
          selectedAlgorithm={selectedAlgorithm}
          setSelectedAlgorithm={setSelectedAlgorithm}
          algorithmsList={algorithmList}
          arraySize={arraySize}
          setArraySize={setArraySize}
          speed={speed}
          setSpeed={setSpeed}
          generateArray={generateArray}
          startSorting={startSorting}
        />
        <div>VISUALISATION</div>
      </motion.main>
    </motion.div>
  );
};
