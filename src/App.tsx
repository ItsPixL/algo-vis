// src/App.tsx

// Imports
import { motion } from "motion/react";
import { useEffect, useState, useCallback, useRef } from "react";
import NavBar from "./components/NavBar";
import ControlBar from "./components/ControlBar";
import { ArrayBars } from "./components/ArrayBars";
import bubbleSort from "./algorithms/bubbleSort";
import type { Step } from "./algorithms/stepType";
import insertionSort from "./algorithms/insertionSort";
import selectionSort from "./algorithms/selectionSort";

// App
export const App = () => {
  // States and Refs
  const [selectedAlgorithm, setSelectedAlgorithm] =
    useState<string>("Bubble Sort");
  const [array, setArray] = useState<number[]>([]);
  const [arraySize, setArraySize] = useState<number>(20);
  const [speed, setSpeed] = useState<number>(200);
  const [highlighted, setHighlighted] = useState<[number, number] | null>(null);
  const [sortedIndices, setSortedIndices] = useState<number[]>([]);
  const [isSorting, setIsSorting] = useState(false);
  const [paused, setPaused] = useState(false);
  const timer = useRef<number | null>(null);
  const stepsRef = useRef<Step[]>([]);
  const stepIndex = useRef(0);

  // List of Algorithms
  const algorithmList = [
    "Bubble Sort",
    "Insertion Sort",
    "Selection Sort",
    "Merge Sort",
    "Quick Sort",
  ];

  // Generate Array
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

  // Start Sorting
  const startSorting = () => {
    setHighlighted(null);
    setSortedIndices([]);
    switch (selectedAlgorithm) {
      case algorithmList[0]:
        startBubble();
        break;
      case algorithmList[1]:
        startInsertion();
        break;
      case algorithmList[2]:
        startSelection();
        break;
    }
  };

  // Start Bubble Sort
  const startBubble = () => {
    stepsRef.current = bubbleSort(array);
    stepIndex.current = 0;
    playSteps(speed);
  };

  // Start Insertion Sort
  const startInsertion = () => {
    stepsRef.current = insertionSort(array);
    stepIndex.current = 0;
    playSteps(speed);
  };

  // Start Selection Sort
  const startSelection = () => {
    stepsRef.current = selectionSort(array);
    stepIndex.current = 0;
    playSteps(speed);
  };

  // Apply Step from Array
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

  // Play Step from Array
  const playSteps = (speed: number) => {
    if (timer.current !== null) {
      clearInterval(timer.current);
    }

    setIsSorting(true);

    timer.current = window.setInterval(() => {
      const step = stepsRef.current[stepIndex.current];
      applyStep(step);
      stepIndex.current++;

      if (stepIndex.current >= stepsRef.current.length) {
        clearInterval(timer.current!);
        timer.current = null;
        setHighlighted(null);
        setIsSorting(false);
      }
    }, speed);
  };

  // Pause Function
  const pauseSorting = () => {
    if (timer.current !== null) {
      clearInterval(timer.current);
      timer.current = null;
      setPaused(true);
      setIsSorting(false);
    }
  };

  // Resume Function
  const resumeSorting = () => {
    if (timer.current === null && stepIndex.current < stepsRef.current.length) {
      playSteps(speed);
      setPaused(false);
    }
  };

  // Stop Function
  const stopSorting = () => {
    if (timer.current !== null) {
      clearInterval(timer.current);
      timer.current = null;
    }
    stepIndex.current = 0;
    stepsRef.current = [];
    setIsSorting(false);
    setPaused(false);
    setHighlighted(null);
    setSortedIndices([]);
  };

  // App
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
          pauseSorting={pauseSorting}
          resumeSorting={resumeSorting}
          stopSorting={stopSorting}
          isSorting={isSorting}
          paused={paused}
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
