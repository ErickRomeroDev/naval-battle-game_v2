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
    let latestAction;
    if (state) {
      const { latest } = state.actions;
      if (latest != null) {
        latestAction = state.actions.all[latest];
        if (
          latestAction?.action === "joinGame" &&
          latestAction?.status !== "error"
        ) {
          toast({
            title: "Submitting Action",
            description: "Joining Game...",
          });
        }
        if (
          latestAction?.action === "commitGrid" &&
          latestAction?.status !== "error"
        ) {
          toast({
            title: "Submitting Action",
            description: "Comitting your positions...",
          });
        }
        if (
          latestAction?.action === "startGame" &&
          latestAction?.status !== "error"
        ) {
          toast({
            title: "Submitting Action",
            description: "Starting a game...",
          });
        }
        if (
          latestAction?.action === "makeMove" &&
          latestAction?.status !== "error"
        ) {
          toast({
            title: "Submitting Action",
            description: "Making your move...",
          });
        }
      }
    }
  }, [isLoading]);

  useEffect(() => {
    let latestAction;
    if (state) {
      const { latest } = state.actions;
      if (latest != null) {
        latestAction = state.actions.all[latest];
        if (latestAction?.status === "error") {
          toast({
            variant: "destructive",
            title: "Error",
            description: "Something went wrong",
          });
        }
      }
    }
  }, [state]);

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

  let latestAction;
  if (state) {
    const { latest } = state.actions;
    if (latest != null) {
      latestAction = state.actions.all[latest];
    }
  }

  const handleCopyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "# Contract copied to clipboard",
      });
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to copy # Contract",
      });
    }
  };

  return (
    <div className="flex space-x-5">
      <div className="flex items-center justify-center space-y-6">
        <div className="relative mt-[86px] flex h-[350px] flex-col items-center space-y-6 rounded-[15px] border-[1.5px] border-gray-200 px-14 pt-[74px]">
          <div className="absolute top-10 flex gap-x-2">
            <Image src="/ship.svg" alt="ship" width={18} height={18} />
            <span className="font-bold">BATTLESHIP</span>
          </div>

          <Button
            className="w-fit rounded-[8px] bg-gray-500 hover:bg-gray-500/80 disabled:bg-gray-500"
            onClick={handleDeploy}
          >
            {isLoading && state === undefined ? (
              <div className="flex items-center space-x-2">
                <Image
                  className="animate-spin"
                  src="loader-circle.svg"
                  alt="loading"
                  width={17}
                  height={17}
                />
                <span>Loading</span>
              </div>
            ) : (
              "Create New Game"
            )}
          </Button>
          <div className="flex items-center space-x-2">
            <div className="h-[1px] w-[54px] bg-gray-300" />
            <span className="text-gray-500">OR</span>
            <div className="h-[1px] w-[54px] bg-gray-300" />
          </div>

          <JoinGame />
        </div>
      </div>

      {state && (
        <>
          <div className="flex flex-col items-center space-y-5">
            <div className="grid w-full grid-cols-2">
              <div className="pl-5 text-[16px] text-gray-500">
                {contractAddress ? (
                  <div className="flex items-center gap-x-2">
                    <div className="rounded-full border-[1.5px] border-gray-400 px-3 py-1.5">
                      # Contract
                    </div>
                    <span>{`${contractAddress.substring(0, 6)}...${contractAddress.slice(-6)}`}</span>
                    <Image
                      className="cursor-pointer"
                      src="copy.svg"
                      alt="copy contract"
                      width={17}
                      height={17}
                      onClick={() => handleCopyToClipboard(contractAddress)}
                    />
                  </div>
                ) : (
                  "# of Contract Address"
                )}
              </div>
              <div className="flex justify-end gap-x-12">
                <Button
                  className="flex w-[160px] items-center space-x-1 rounded-[8px] bg-gray-500 hover:bg-gray-500/80 disabled:bg-gray-500"
                  onClick={joinGame}
                  disabled={disableButton}
                >
                  {isLoading &&
                    (latestAction?.action === "joinGame" ? (
                      <div className="flex items-center space-x-2">
                        <Image
                          className="animate-spin"
                          src="loader-circle.svg"
                          alt="loading"
                          width={17}
                          height={17}
                        />
                        <span>Loading</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <Image
                          src="/join.svg"
                          alt="join"
                          width={12}
                          height={12}
                        />
                        <span>Become a player</span>
                      </div>
                    ))}
                  {!isLoading && (
                    <div className="flex items-center space-x-2">
                      <Image
                        src="/join.svg"
                        alt="join"
                        width={12}
                        height={12}
                      />
                      <span>Become a Player</span>
                    </div>
                  )}
                </Button>
                <Button
                  className="w-[150px] space-x-1 rounded-[8px] bg-gray-500 hover:bg-gray-500/80 disabled:bg-gray-500"
                  onClick={startGame}
                  disabled={
                    !state.playerOneHasCommitted ||
                    !state.playerTwoHasCommitted ||
                    state.gameStarted === "true" ||
                    (!state.playerOneHasCommitted &&
                      !state.playerTwoHasCommitted)
                  }
                >
                  <span>
                    {isLoading &&
                      (latestAction?.action === "startGame" ? (
                        <div className="flex items-center space-x-2">
                          <Image
                            className="animate-spin"
                            src="loader-circle.svg"
                            alt="loading"
                            width={17}
                            height={17}
                          />
                          <span>Loading</span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2">
                          <Image
                            src="/sailboat.svg"
                            alt="sailboat"
                            width={16}
                            height={16}
                          />
                          <span>Start Game</span>
                        </div>
                      ))}
                    {!isLoading && (
                      <div className="flex items-center space-x-2">
                        <Image
                          src="/sailboat.svg"
                          alt="sailboat"
                          width={16}
                          height={16}
                        />
                        <span>Start Game</span>
                      </div>
                    )}
                  </span>
                </Button>
              </div>
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
            <div />
          </div>

          <div className="flex items-center">
            <StatusBoard />
          </div>
        </>
      )}
    </div>
  );
};
