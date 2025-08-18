// components/ArrayBars.tsx

type ArrayBarsProps = {
  array: number[];
  highlighted: [number, number] | null;
  sorted: number[];
};

export const ArrayBars = ({ array, highlighted, sorted }: ArrayBarsProps) => {
  const max = Math.max(...array);

  return (
    <div className="flex items-end justify-center h-full w-full gap-1">
      {array.map((value, idx) => {
        let color = "bg-blue-500";
        if (highlighted && highlighted.includes(idx)) color = "bg-red-500";
        if (sorted.includes(idx)) color = "bg-green-500";
        const heightPercent = (value / max) * 100;
        return (
          <div
            key={idx}
            className={`${color} rounded-sm flex-1 min-w-[2px]`}
            style={{ height: `${heightPercent}%`, minHeight: "5px" }}
          ></div>
        );
      })}
    </div>
  );
};
