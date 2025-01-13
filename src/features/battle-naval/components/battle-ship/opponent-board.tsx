import { Button } from "@/components/ui/button";
import { useState } from "react";

export const OpponentBoard = () => {
  const gridSize = 10; // 10x10 grid
  const cellSize = 35; // Each cell's total size (450px ÷ 10)

  // State to track circles in the grid
  const [circles, setCircles] = useState<boolean[][]>(
    Array(gridSize).fill(Array(gridSize).fill(false)),
  );

  const toggleCircle = (row: number, col: number) => {
    setCircles((prev) =>
      prev.map((r, rowIndex) =>
        r.map((cell, colIndex) =>
          rowIndex === row && colIndex === col ? !cell : cell,
        ),
      ),
    );
  };

//   const logFlatArray = () => {
//     // Flatten the 2D array into a 1D array of 0s and 1s
//     const flatArray = circles.flat().map((cell) => (cell ? 1 : 0));
//     console.log(flatArray);
//   };
const logFlatArrayPositions = () => {
    const positions = circles
      .flat()
      .map((cell, index) => (cell ? index : -1)) // Map `1`s to their indices, others to -1
      .filter((index) => index !== -1); // Remove all `-1`s
    console.log(positions);
  };

  return (
    <div>
      <div className="grid w-full grid-cols-11 text-center text-gray-500 text-xl">
        <span></span>
        <span>A</span>
        <span>B</span>
        <span>C</span>
        <span>D</span>
        <span>E</span>
        <span>F</span>
        <span>G</span>
        <span>H</span>
        <span>I</span>
        <span>J</span>
      </div>
      <div className="flex">
        <div className="grid grid-cols-[35px] items-center text-center text-gray-500 text-xl">
          <span>1</span>
          <span>2</span>
          <span>3</span>
          <span>4</span>
          <span>5</span>
          <span>6</span>
          <span>7</span>
          <span>8</span>
          <span>9</span>
          <span>10</span>
        </div>
        <div
          className="grid h-[350px] w-[350px] grid-cols-10 gap-0 bg-white"
          style={{ gridTemplateRows: "repeat(10, 1fr)" }}
        >
          {circles.map((row, rowIndex) =>
            row.map((hasCircle, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className="relative flex items-center justify-center rounded-[8px] border-[1.3px] border-white bg-gray-200 cursor-pointer"
                onClick={() => toggleCircle(rowIndex, colIndex)}
                style={{
                  width: `${cellSize}px`,
                  height: `${cellSize}px`,
                  boxSizing: "border-box", // Ensures the border is part of the cell size
                }}
              >
                {hasCircle && (
                  <div className="h-4 w-4 rounded-full bg-zinc-500"></div>
                )}
              </div>
            )),
          )}
        </div>
      </div>
      <Button
        className="ml-8 mt-4 rounded-[8px] border-[1.5px] border-pink-500 text-pink-500 bg-transparent hover:text-white hover:bg-pink-500"
        onClick={logFlatArrayPositions}
      >
        Make Move
      </Button>
    </div>
  );
};
