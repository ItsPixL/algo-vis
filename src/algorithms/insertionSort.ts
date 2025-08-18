// algorithms/insertionSort.ts

import type { Step } from "./stepType";

// Insertion Sort
const insertionSort = (arr: number[]): Step[] => {
  const steps: Step[] = [];
  const n = arr.length;
  const array = [...arr];

  for (let i = 1; i < n; i++) {
    const current = array[i];
    let j = i - 1;

    while (j >= 0 && array[j] > current) {
      steps.push({ type: "compare", indices: [j, j + 1] });
      steps.push({ type: "swap", indices: [j, j + 1] });
      [array[j], array[j + 1]] = [array[j + 1], array[j]];
      j = j - 1;
    }

    array[j + 1] = current;
  }

  for (let i = 0; i < n; i++) {
    steps.push({ type: "markSorted", index: i });
  }

  return steps;
};

export default insertionSort;
