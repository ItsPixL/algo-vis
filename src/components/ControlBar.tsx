// components/ControlBar.tsx

// Imports
import { motion } from "motion/react";
import { Button } from "./Button";
import Slider from "./Slider";

// Types
type ControlBarProps = {
  selectedAlgorithm: string;
  setSelectedAlgorithm: (data: string) => void;
  algorithmsList: Array<string>;
  arraySize: number;
  setArraySize: (data: number) => void;
  speed: number;
  setSpeed: (data: number) => void;
  generateArray: () => void;
  startSorting: () => void;
};

// Control Bar
export const ControlBar = ({
  selectedAlgorithm,
  setSelectedAlgorithm,
  algorithmsList,
  arraySize,
  setArraySize,
  speed,
  setSpeed,
  generateArray,
  startSorting,
}: ControlBarProps) => {
  // Algorithm Selection
  const AlgorithmSelection = (
    <div>
      <div className="text-xl mb-3">Algorithm Selection</div>
      {algorithmsList.map((algorithm) => {
        const btnState = algorithm === selectedAlgorithm ? "active" : "default";
        return (
          <Button
            key={algorithm}
            btnState={btnState}
            onClickFunction={setSelectedAlgorithm}
          >
            {algorithm}
          </Button>
        );
      })}
    </div>
  );

  const ArraySlider = (
    <div>
      <div className="text-xl mb-3">Array Size</div>
      <div className="w-full max-w-md flex items-center justify-center">
        <Slider min={0} max={100} step={5} value={speed} onChange={setSpeed} />
      </div>
    </div>
  );

  const SpeedSlider = (
    <div>
      <div className="text-xl mb-3">Speed</div>
      <div className="w-full max-w-md flex items-center justify-center">
        <Slider
          min={0}
          max={100}
          step={5}
          value={arraySize}
          onChange={setArraySize}
        />
      </div>
    </div>
  );

  const MainControls = (
    <div>
      <Button onClickFunction={generateArray}>Generate New Array</Button>
      <Button onClickFunction={startSorting}>Start</Button>
    </div>
  );

  return (
    <motion.div>
      <motion.div className="bg-[#e2e8f0] rounded-2xl px-5 py-10 w-96 flex flex-col gap-8">
        {AlgorithmSelection}
        <hr className="border-t border-gray-400" />
        {ArraySlider}
        {SpeedSlider}
        <hr className="border-t border-gray-400" />
        {MainControls}
      </motion.div>
    </motion.div>
  );
};

export default ControlBar;
