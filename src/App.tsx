// src/App.tsx

// Imports
import { motion } from "motion/react";
import { useEffect, useState, useCallback } from "react";
import NavBar from "./components/NavBar";
import ControlBar from "./components/ControlBar";
import { ArrayBars } from "./components/ArrayBars";

// App
export const App = () => {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<string>("");
  const [array, setArray] = useState<number[]>([]);
  const [arraySize, setArraySize] = useState<number>(20);
  const [speed, setSpeed] = useState<number>(200);

  const algorithmList = [
    "Bubble Sort",
    "Insertion Sort",
    "Merge Sort",
    "Quick Sort",
  ];

  const generateArray = useCallback(() => {
    const newArray = Array.from(
      { length: arraySize },
      () => Math.floor(Math.random() * 300) + 20
    );
    setArray(newArray);
  }, [arraySize]);

  useEffect(() => {
    generateArray();
  }, [arraySize, generateArray]);

  const startSorting = () => {
    console.log(array); // TEMP
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
        <div>
          <ArrayBars array={array} />
        </div>
      </motion.main>
    </motion.div>
  );
};
