// src/App.tsx

// Imports
import { motion } from "motion/react";
import { useEffect, useState, useCallback, useRef } from "react";
import NavBar from "./components/NavBar";
import ControlBar from "./components/ControlBar";
import { ArrayBars } from "./components/ArrayBars";
import bubbleSort from "./algorithms/bubbleSort";

// Types
type Step =
  | { type: "compare"; indices: [number, number] }
  | { type: "swap"; indices: [number, number] }
  | { type: "markSorted"; index: number };

// App
export const App = () => {
  const [selectedAlgorithm, setSelectedAlgorithm] =
    useState<string>("Bubble Sort");
  const [array, setArray] = useState<number[]>([]);
  const [arraySize, setArraySize] = useState<number>(20);
  const [speed, setSpeed] = useState<number>(200);
  const [highlighted, setHighlighted] = useState<[number, number] | null>(null);
  const [sortedIndices, setSortedIndices] = useState<number[]>([]);
  const [isSorting, setIsSorting] = useState(false);
  const timer = useRef<number | null>(null);

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
    setSortedIndices([]);
    setHighlighted(null);
  }, [arraySize]);

  useEffect(() => {
    generateArray();
  }, [arraySize, generateArray]);

  const startSorting = () => {
    setHighlighted(null);
    setSortedIndices([]);
    const steps = bubbleSort(array);
    playSteps({ steps, speed });
  };

  const applyStep = (step: Step) => {
    switch (step.type) {
      case "compare": {
        const [i, j] = step.indices;
        setHighlighted([i, j]);
        break;
      }
      case "swap": {
        const [i, j] = step.indices;
        setArray((prev) => {
          const newArr = [...prev];
          [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
          return newArr;
        });
        break;
      }
      case "markSorted": {
        setSortedIndices((prev) => [...prev, step.index]);
        break;
      }
    }
  };

  const playSteps = ({ steps, speed }: { steps: Step[]; speed: number }) => {
    if (timer.current !== null) {
      clearInterval(timer.current);
    }

    let i = 0;
    setIsSorting(true);

    timer.current = window.setInterval(() => {
      const step = steps[i];
      applyStep(step);
      i++;
      if (i >= steps.length) {
        clearInterval(timer.current!);
        timer.current = null;
        setHighlighted(null);
        setIsSorting(false);
      }
    }, speed);
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
          isSorting={isSorting}
        />
        <div className="w-full">
          <ArrayBars
            array={array}
            highlighted={highlighted}
            sorted={sortedIndices}
          />
        </div>
      </motion.main>
    </motion.div>
  );
};
