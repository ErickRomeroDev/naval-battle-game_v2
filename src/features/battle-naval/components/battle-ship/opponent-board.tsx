import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useBattleNavalContext } from "../../hooks/useBattleNavalContext";
import Image from "next/image";

export const OpponentBoard = () => {
  const { dispatch, contractAddress, isLoading, state, isClientInitialized } =
    useBattleNavalContext();

  const gridSize = 10;
  const cellSize = 35;

  // State to track circles in the grid
  const [circles, setCircles] = useState<boolean[][]>(
    Array(gridSize).fill(Array(gridSize).fill(false)),
  );

  type ChoiceType = {
    available: boolean;
    row: number | undefined;
    col: number | undefined;
  };
  const [choiceAvailable, setChoiceAvailable] = useState<ChoiceType>({
    available: true,
    row: undefined,
    col: undefined,
  });

  const toggleCircle = (row: number, col: number) => {
    if (
      choiceAvailable.available ||
      (choiceAvailable.row === row && choiceAvailable.col === col)
    ) {
      setCircles((prev) =>
        prev.map((r, rowIndex) =>
          r.map((cell, colIndex) =>
            rowIndex === row && colIndex === col ? !cell : cell,
          ),
        ),
      );
      choiceAvailable.available
        ? setChoiceAvailable({ available: false, row, col })
        : setChoiceAvailable({ available: true, row, col });
    }
  };

  //   const logFlatArray = () => {
  //     // Flatten the 2D array into a 1D array of 0s and 1s
  //     const flatArray = circles.flat().map((cell) => (cell ? 1 : 0));
  //     console.log(flatArray);
  //   };
  const logFlatArrayPositions = async () => {
    const positions = circles
      .flat()
      .map((cell, index) => (cell ? index + 1 : -1)) // Map `1`s to their indices, others to -1
      .filter((index) => index !== -1); // Remove all `-1`s
    if (positions[0]) {
      const finalPosition = BigInt(positions[0]);
      console.log(finalPosition);
      await dispatch({ type: "makeMove", move: finalPosition });
    }
  };

  let latestAction;
  if (state) {
    const { latest } = state.actions;
    if (latest != null) {
      latestAction = state.actions.all[latest];
    }
  }

  return (
    <div>
      <div className="grid w-full grid-cols-11 text-center text-xl text-gray-500">
        <span></span>
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
      <div className="flex">
        <div className="grid grid-cols-[35px] items-center text-center text-xl text-gray-500">
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
        <div
          className="relative grid h-[350px] w-[350px] grid-cols-10 gap-0"
          style={{ gridTemplateRows: "repeat(10, 1fr)" }}
        >
          {circles.map((row, rowIndex) =>
            row.map((hasCircle, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className="relative flex cursor-pointer items-center justify-center rounded-[8px] border-[1.3px] border-[#FAFAFA] bg-gray-200"
                onClick={() => {
                  toggleCircle(rowIndex, colIndex);
                }}
                style={{
                  width: `${cellSize}px`,
                  height: `${cellSize}px`,
                  boxSizing: "border-box", // Ensures the border is part of the cell size
                }}
              >
                {state &&
                  (state.gridPlayer1?.[rowIndex]?.[colIndex] !== 1 ||
                    state.gridPlayer1?.[rowIndex]?.[colIndex] !== 2) &&
                  hasCircle && (
                    <div className="h-4 w-4 rounded-full bg-slate-500"></div>
                  )}
                {state &&
                  state.publicKey === state.playerTwoPk &&
                  state.gridPlayer1?.[rowIndex]?.[colIndex] === 1 && (
                    <div className="h-4 w-4 rounded-full bg-pink-500"></div>
                  )}
                {state &&
                  state.publicKey === state.playerTwoPk &&
                  state.gridPlayer1?.[rowIndex]?.[colIndex] === 2 && (
                    <div className="h-4 w-4 rounded-full bg-blue-500"></div>
                  )}

                {state &&
                  state.publicKey === state.playerOnePk &&
                  state.gridPlayer2?.[rowIndex]?.[colIndex] === 1 && (
                    <div className="h-4 w-4 rounded-full bg-pink-500"></div>
                  )}
                {state &&
                  state.publicKey === state.playerOnePk &&
                  state.gridPlayer2?.[rowIndex]?.[colIndex] === 2 && (
                    <div className="h-4 w-4 rounded-full bg-blue-500"></div>
                  )}
              </div>
            )),
          )}
        </div>
      </div>
      <Button
        className="ml-8 mt-4 rounded-[8px] border-[1.5px] border-pink-500 bg-transparent text-pink-500 hover:bg-pink-500 hover:text-white"
        onClick={logFlatArrayPositions}
        disabled={
          (state &&
            //se o jogo nao comecou ou o jogo comecou e nao e' a vez do jogador, ou esta loading
            (state.gameStarted !== "true" ||
              (state.gameStarted === "true" && !state.isMyTurn))) ||
          isLoading
        }
      >
        {state &&
          state.isMyTurn &&
          isLoading &&
          (latestAction?.action === "makeMove" ? (
            <div className="flex items-center space-x-2">
              <Image
                className="animate-spin"
                src="loader-circle-pink.svg"
                alt="loading"
                width={17}
                height={17}
              />
              <span>Loading</span>
            </div>
          ) : state && state.isMyTurn && !isLoading && (
            "Make Move"
          ))}
        {state && state.isMyTurn && !isLoading && state.gameStarted === "true" && "Make Move"}
        
        {state && !state.isMyTurn && state.gameStarted === "true" && (
          <div className="flex items-center space-x-2">
            <Image
              className="animate-spin"
              src="loader-circle-pink.svg"
              alt="loading"
              width={17}
              height={17}
            />
            <span>Opponent&apos;s Turn</span>
          </div>
        )}
        {state && state.gameStarted !== "true" && (!isLoading || latestAction?.action === "joinGame" || latestAction?.action === "commitGrid" || latestAction?.action === "startGame" ) &&
        "Make Move"
        }
      </Button>
    </div>
  );
};
