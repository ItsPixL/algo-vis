// algorithms/stepType.ts

export type Step =
  | { type: "compare"; indices: [number, number] }
  | { type: "swap"; indices: [number, number] }
  | { type: "overwrite"; index: number; value: number }
  | { type: "markSorted"; index: number };
