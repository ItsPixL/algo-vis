// algorithms/selectionSort.ts

import type { Step } from "./stepType";

// Selection Sort
const selectionSort = (arr: number[]): Step[] => {
  const steps: Step[] = [];
  const n = arr.length;
  const array = [...arr];

  for (let i = 0; i < n; i++) {
    let minIndex = i;
    for (let j = i + 1; j < n; j++) {
      steps.push({ type: "compare", indices: [j, minIndex] });
      if (array[j] < array[minIndex]) {
        minIndex = j;
      }
    }
    [array[i], array[minIndex]] = [array[minIndex], array[i]];
    steps.push({ type: "swap", indices: [i, minIndex] });
  }

  for (let i = 0; i < n; i++) {
    steps.push({ type: "markSorted", index: i });
  }

  return steps;
};

export default selectionSort;
