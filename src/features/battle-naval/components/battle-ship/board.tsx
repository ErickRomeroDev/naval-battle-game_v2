import { useEffect, useState } from "react";

import { BoardSquareBattleship } from "./board-square-battleship";
import { PieceBattleship } from "./piece-battleship";
import { Game, Position } from "./game";
import { PieceCarrier } from "./piece-carrier";
import { BoardSquareCarrier } from "./board-square-carrier";
import { Button } from "@/components/ui/button";
import { PieceCruiser } from "./piece-cruiser";
import { BoardSquareCruiser } from "./board-square-cruiser";
import { BoardSquareSubmarine } from "./board-square-submarine";
import { PieceSubmarine } from "./piece-submarine";
import { BoardSquareDestroyer } from "./board-square-destroyer";
import { PieceDestroyer } from "./piece-destroyer";
import { useBattleNavalContext } from "../../hooks/useBattleNavalContext";
import Image from "next/image";

export interface BoardProps {
  game: Game;
}

/**
 * The chessboard component
 * @param props The react props
 */
export const Board = ({ game }: BoardProps) => {
  const { dispatch, contractAddress, isLoading, state, isClientInitialized } =
    useBattleNavalContext();

  const handleCommit = async (playerSetup: bigint[]): Promise<void> => {
    await dispatch({
      type: "commitGrid",
      playerSetup,
    });
    console.log("finalizei de commit no contract");
  };

  const [[battleshipX, battleshipY, battleshipOrientation], setKnightPos] =
    useState<Position>(game.battleshipPosition);
  const [[carrierX, carrierY, carrierOrientation], setCarrierPos] =
    useState<Position>(game.carrierPosition);
  const [[cruiserX, cruiserY, cruiserOrientation], setCruiserPos] =
    useState<Position>(game.cruiserPosition);
  const [[submarineX, submarineY, submarineOrientation], setSubmarinePos] =
    useState<Position>(game.submarinePosition);
  const [[destroyerX, destroyerY, destroyerOrientation], setDestroyerPos] =
    useState<Position>(game.destroyerPosition);

  useEffect(() => {
    game.battleshipObserve(setKnightPos);
    game.carrierObserve(setCarrierPos);
    game.cruiserObserve(setCruiserPos);
    game.submarineObserve(setSubmarinePos);
    game.destroyerObserve(setDestroyerPos);
  }, [game]);

  function renderSquare(i: number) {
    const x = i % 10;
    const y = Math.floor(i / 10);

    return (
      <div key={i} className="h-[10%] w-[10%]">
        <BoardSquareCarrier
          x={x}
          y={y}
          orientation={carrierOrientation}
          game={game}
        >
          <BoardSquareBattleship
            x={x}
            y={y}
            orientation={battleshipOrientation}
            game={game}
          >
            <BoardSquareCruiser
              x={x}
              y={y}
              orientation={cruiserOrientation}
              game={game}
            >
              <BoardSquareSubmarine
                x={x}
                y={y}
                orientation={submarineOrientation}
                game={game}
              >
                <BoardSquareDestroyer
                  x={x}
                  y={y}
                  orientation={destroyerOrientation}
                  game={game}
                >
                  <PieceBattleship
                    isBattleship={x === battleshipX && y === battleshipY}
                    orientation={battleshipOrientation}
                    game={game}
                  />
                  <PieceCarrier
                    isCarrier={x === carrierX && y === carrierY}
                    orientation={carrierOrientation}
                    game={game}
                  />
                  <PieceCruiser
                    isCruiser={x === cruiserX && y === cruiserY}
                    orientation={cruiserOrientation}
                    game={game}
                  />
                  <PieceSubmarine
                    isSubmarine={x === submarineX && y === submarineY}
                    orientation={cruiserOrientation}
                    game={game}
                  />
                  <PieceDestroyer
                    isDestroyer={x === destroyerX && y === destroyerY}
                    orientation={cruiserOrientation}
                    game={game}
                  />
                </BoardSquareDestroyer>
              </BoardSquareSubmarine>
            </BoardSquareCruiser>
          </BoardSquareBattleship>
        </BoardSquareCarrier>
      </div>
    );
  }

  const squares = [];
  for (let i = 0; i < 100; i += 1) {
    squares.push(renderSquare(i));
  }

  let latestAction;
  if (state) {
    const { latest } = state.actions;
    if (latest != null) {
      latestAction = state.actions.all[latest];
    }
  }

  return (
    <>
      <div className="flex h-full w-full flex-wrap">{squares}</div>
      <Button
        className="mt-4 rounded-[8px] border-[1.5px] border-pink-500 bg-transparent text-pink-500 hover:bg-pink-500 hover:text-white"
        onClick={() => {
          const allPositions = game.getAllOccupiedPositions();
          const gridArray = game.generateGridArray();
          handleCommit(gridArray);
          console.log({ allPositions, gridArray });
        }}
        disabled={
          (state &&
          ((state.publicKey === state.playerOnePk &&
            state.playerOneHasCommitted) ||
            (state.publicKey === state.playerTwoPk &&
              state.playerTwoHasCommitted) ||
            (state.publicKey !== state.playerTwoPk &&
              state.publicKey !== state.playerOnePk))) || isLoading
        }
      >
        {isLoading &&
          (latestAction?.action === "commitGrid" ? (
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
          ) : (
            "Commit Positions"
          ))}
        {!isLoading && "Commit Positions"}
      </Button>
    </>
  );
};
