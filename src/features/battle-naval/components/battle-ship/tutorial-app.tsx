import { useEffect, useMemo, useState } from "react";

import { Board } from "./board";
import { Game } from "./game";
import { Button } from "@/components/ui/button";
import { JoinGame } from "./join-game";
import { OpponentBoard } from "./opponent-board";
import { StatusBoard } from "./status-board";
import Image from "next/image";
import { useBattleNavalContext } from "../../hooks/useBattleNavalContext";
import { useToast } from "@/hooks/use-toast";

export interface ChessboardTutorialAppState {
  knightPosition: [number, number];
}

/**
 * The Chessboard Tutorial Application
 */

export const TutorialApp = () => {
  const game = useMemo(() => new Game(), []);
  const { toast } = useToast();
  const { dispatch, contractAddress, isLoading, state, isClientInitialized } =
    useBattleNavalContext();

  useEffect(() => {
    toast({
      title: "Deploy",
      description: "Deploying new game",
    });
  }, [isLoading]);

  const handleDeploy = async (): Promise<void> => {
    await dispatch({ type: "deploy" });
    console.log("finalizei deploy of contract");
  };

  const joinGame = async (): Promise<void> => {
    await dispatch({ type: "joinGame" });
    console.log("join game success");
  };

  const startGame = async (): Promise<void> => {
    await dispatch({ type: "startGame" });
    console.log("game started");
  };

  const disableButton =
    state?.players === 2 ||
    state?.role === "player1" ||
    state?.role === "player2" ||
    contractAddress === null;

  return (
    <div className="flex space-x-5">
      <div className="flex items-center justify-center space-y-6">
        <div className="mt-10 flex h-[350px] flex-col items-center justify-center space-y-6 rounded-[8px] border-[1.5px] border-gray-200 px-14">
          <Button className="w-fit rounded-[8px]" onClick={handleDeploy}>
            Create New Game
          </Button>
          <div className="flex items-center space-x-2">
            <div className="h-[1px] w-[54px] bg-gray-300" />
            <span className="text-gray-500">OR</span>
            <div className="h-[1px] w-[54px] bg-gray-300" />
          </div>

          <JoinGame />
        </div>
      </div>

      <div className="flex flex-col items-center space-y-5">
        <div className="flex w-full items-center justify-between space-x-12">
          <div className="text-[16px] text-gray-500">
            {contractAddress ? contractAddress : "# of Contract Address"}
          </div>
          <Button
            className="flex w-[150px] items-center space-x-1 rounded-[8px]"
            onClick={joinGame}
            disabled={disableButton}
          >
            <Image src="/join.svg" alt="join" width={13} height={13} />
            <span>Become a player</span>
          </Button>
          <div className="w-[140px]" />
        </div>
        <div className="grid w-full grid-cols-2 pt-5 text-center text-xl">
          <div className="mx-6 flex h-[35px] items-center justify-center rounded-[8px] bg-pink-400 text-base font-medium text-white">
            YOUR FLEET
          </div>
          <div className="ml-12 flex h-[35px] items-center justify-center rounded-[8px] bg-gray-400 text-base font-medium text-white">
            OPPONENT
          </div>
        </div>
        <div className="flex space-x-10">
          <div className="flex flex-col">
            <div className="grid w-full grid-cols-9 text-center text-xl text-gray-500">
              <span></span>
              <span>A</span>
              <span>B</span>
              <span>C</span>
              <span>D</span>
              <span>E</span>
              <span>F</span>
              <span>G</span>
              <span>H</span>
            </div>
            <div className="flex">
              <div className="grid grid-cols-[35px] items-center text-center text-xl text-gray-500">
                <span>1</span>
                <span>2</span>
                <span>3</span>
                <span>4</span>
                <span>5</span>
                <span>6</span>
                <span>7</span>
                <span>8</span>
              </div>
              <div className="relative h-[350px] w-[350px]">
                <Board game={game} />
                {state &&
                  state.publicKey === state.playerOnePk &&
                  state.playerOneHasCommitted && (
                    <div className="absolute top-0 z-40 h-[350px] w-[350px]"></div>
                  )}
                {state &&
                  state.publicKey === state.playerTwoPk &&
                  state.playerTwoHasCommitted && (
                    <div className="absolute top-0 z-40 h-[350px] w-[350px]"></div>
                  )}
              </div>
            </div>
          </div>
          <OpponentBoard />
        </div>
        <div>
          {state && (
            <Button
              className="w-[150px] space-x-1 rounded-[8px]"
              onClick={startGame}
              disabled={
                // Otherwise, disable only if both have committed
                (!state.playerOneHasCommitted &&
                  !state.playerTwoHasCommitted) ||
                state.gameStarted === "true"
              }
            >
              <Image
                src="/sailboat.svg"
                alt="sailboat"
                width={16}
                height={16}
              />
              <span>Start Game</span>
            </Button>
          )}
        </div>
      </div>
      <div className="flex items-center">
        <StatusBoard />
      </div>
    </div>
  );
};
