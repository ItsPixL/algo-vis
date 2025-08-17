// components/ControlBar.tsx

// Imports
import { motion } from "motion/react";
import { Button } from "./Button";
import Slider from "./Slider";

// Types
type ControlBarProps = {
  selectedAlgorithm: string;
  setSelectedAlgorithm: (data: string) => void;
  algorithmsList: string[];
  arraySize: number;
  setArraySize: (data: number) => void;
  speed: number;
  setSpeed: (data: number) => void;
  generateArray: () => void;
  startSorting: () => void;
  pauseSorting: () => void;
  resumeSorting: () => void;
  stopSorting: () => void;
  isSorting: boolean;
  paused: boolean;
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
  pauseSorting,
  resumeSorting,
  stopSorting,
  isSorting,
  paused,
}: ControlBarProps) => {
  // Algorithm Selection
  const AlgorithmSelection = (
    <div>
      <div className="text-xl mb-3">Algorithm Selection</div>
      {algorithmsList.map((algorithm) => {
        const btnState =
          algorithm === selectedAlgorithm
            ? "active"
            : isSorting || paused
            ? "disabled"
            : "default";
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
        <Slider
          min={5}
          max={100}
          step={5}
          value={arraySize}
          onChange={setArraySize}
          unit={"bars"}
          sliderDisabled={isSorting || paused}
        />
      </div>
    </div>
  );

  const SpeedSlider = (
    <div>
      <div className="text-xl mb-3">Speed</div>
      <div className="w-full max-w-md flex items-center justify-center">
        <Slider
          min={5}
          max={1000}
          step={5}
          value={speed}
          onChange={setSpeed}
          unit={"ms"}
          sliderDisabled={isSorting || paused}
        />
      </div>
    </div>
  );

  const mainButtonConfigs = [
    {
      label: "Generate New Array",
      onClick: generateArray,
      disableWhenSorting: true,
    },
    { label: "Start", onClick: startSorting, disableWhenSorting: true },
  ];

  const controlButtonConfigs = [
    { label: "Resume", onClick: resumeSorting },
    { label: "Pause", onClick: pauseSorting },
    { label: "Stop", onClick: stopSorting },
  ];

  const MainBtns = (
    <div>
      {mainButtonConfigs.map(({ label, onClick, disableWhenSorting }) => (
        <Button
          key={label}
          onClickFunction={onClick}
          btnState={disableWhenSorting && isSorting ? "disabled" : "default"}
        >
          {label}
        </Button>
      ))}
    </div>
  );

  const ControlBtns = (
    <div>
      <div className="w-full flex justify-between">
        {controlButtonConfigs.map(({ label, onClick }) => (
          <Button key={label} onClickFunction={onClick} btnState="default">
            {label}
          </Button>
        ))}
      </div>
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
        {isSorting ? ControlBtns : paused ? ControlBtns : MainBtns}
      </motion.div>
    </motion.div>
  );
};

export default ControlBar;
