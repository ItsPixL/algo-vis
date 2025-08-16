// algorithms/bubbleSort.ts

// Types
type Step =
  | { type: "compare"; indices: [number, number] }
  | { type: "swap"; indices: [number, number] }
  | { type: "markSorted"; index: number };

// Bubble Sort
const bubbleSort = (arr: number[]): Step[] => {
  const steps: Step[] = [];
  const n = arr.length;
  const array = [...arr];

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      steps.push({ type: "compare", indices: [j, j + 1] });

      if (array[j] > array[j + 1]) {
        steps.push({ type: "swap", indices: [j, j + 1] });
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
      }
    }
    steps.push({ type: "markSorted", index: n - i - 1 });
  }

  return steps;
};

export default bubbleSort;
