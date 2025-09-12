// algorithms/mergeSort.ts

import type { Step } from "./stepType";

// Merge
const merge = (
  arr: number[],
  left: number,
  mid: number,
  right: number,
  steps: Step[]
) => {
  // 1. Create two temporary arrays (left half, right half).
  const leftHalf = arr.slice(left, mid + 1);
  const rightHalf = arr.slice(mid + 1, right + 1);

  // 2. Compare elements from each half (push "compare" steps).
  let i = 0;
  let j = 0;

  for (let k = left; k <= right; k++) {
    while (i < leftHalf.length && j < rightHalf.length) {
      steps.push({ type: "compare", indices: [i, j] });

      if (leftHalf[i] <= rightHalf[j]) {
        arr[k] = leftHalf[i];
        steps.push({ type: "overwrite", index: k, value: leftHalf[i] });
        i++;
      } else {
        arr[k] = rightHalf[j];
        steps.push({ type: "overwrite", index: k, value: rightHalf[j] });
        j++;
      }
    }
  }

  // 3. Place the smaller one into the main array (push "swap"/placement steps).

  // 4. Copy remaining elements if any.
};

// Recursive Helper Func
const mergeSortHelper = (
  arr: number[],
  left: number,
  right: number,
  steps: Step[]
) => {
  if (left >= right) return;

  const mid = Math.floor((left + right) / 2);

  mergeSortHelper(arr, left, mid, steps);
  mergeSortHelper(arr, mid + 1, right, steps);
  merge(arr, left, mid, right, steps);
};

// Merge Sort
const mergeSort = (arr: number[]): Step[] => {
  const steps: Step[] = [];
  const array = [...arr];

  mergeSortHelper(array, 0, array.length - 1, steps);

  for (let i = 0; i < array.length; i++) {
    steps.push({ type: "markSorted", index: i });
  }

  return steps;
};

export default mergeSort;
