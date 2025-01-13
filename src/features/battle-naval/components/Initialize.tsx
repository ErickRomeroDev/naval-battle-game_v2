import { type ReactElement, useEffect, useState } from "react";
import { useBattleNavalContext } from "../hooks/useBattleNavalContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Initialize = (): ReactElement => {
  const { dispatch, contractAddress, isLoading, state, isClientInitialized } =
    useBattleNavalContext();
  const [inputAddress, setInputAddress] = useState("");

  const handleDeploy = async (): Promise<void> => {
    await dispatch({ type: "deploy" });
    console.log("finalizei deploy of contract");
  };

  const joinContract = async (): Promise<void> => {
    await dispatch({ type: "join", contractAddress: inputAddress });
    console.log("junte no contrato");
  };

  const joinGame = async (): Promise<void> => {
    await dispatch({ type: "joinGame"});
    console.log("join game success");
  };

  const handleCommit = async (): Promise<void> => {
    await dispatch({
      type: "commitGrid",
      playerSetup: [
        1n,
        1n,
        1n,
        1n,
        1n,
        1n,
        1n,
        1n,
        1n,
        1n,
        1n,
        1n,
        1n,
        1n,
        1n,
        1n,
        0n,
        0n,
        0n,
        0n,
        0n,
        0n,
        0n,
        0n,
        0n,
        0n,
        0n,
        0n,
        0n,
        0n,
        0n,
        0n,
        0n,
        0n,
        0n,
        0n,
        0n,
        0n,
        0n,
        0n,
        0n,
        0n,
        0n,
        0n,
        0n,
        0n,
        0n,
        0n,
        0n,
        0n,
        0n,
        0n,
        0n,
        0n,
        0n,
        0n,
        0n,
        0n,
        0n,
        0n,
        0n,
        0n,
        0n,
        0n,
      ],
    });
    console.log("finalizei de commit no contract");
  };

  const startGame = async (): Promise<void> => {
    await dispatch({ type: "startGame"});
    console.log("game started");
  };

  const makeMove = async (): Promise<void> => {
    await dispatch({ type: "makeMove", move: 1n });
    console.log("move made");
  };

  const makeMoveFail = async (): Promise<void> => {
    await dispatch({ type: "makeMove", move: 20n });
    console.log("move made");
  };

  console.log("Player1GRID", state?.gridPlayer1);
  console.log("Player2GRID", state?.gridPlayer2);

  return (
    <div>
      <div className="space-x-2">
        <Button onClick={handleDeploy}>Deploy</Button>
        <Input value={inputAddress} onChange={(e) => setInputAddress(e.target.value)}></Input>
        <Button onClick={() => joinContract()}>Join Contract</Button>
        <Button onClick={joinGame}>Join Game</Button>
        <Button onClick={handleCommit}>Commit</Button>
        <Button onClick={startGame}>Start Game</Button>
        <Button onClick={makeMove}>Make Move</Button>
        <Button onClick={makeMoveFail}>Make Move Fail</Button>
      </div>

      <div className="flex">Contract Address: {contractAddress}</div>
      <div className="flex">PK: {state?.publicKey}</div>
      <div className="flex">PrivateK: {state?.secretKey}</div>
      <div className="flex">PlayerOnePK: {state?.playerOnePk}</div>
      <div className="flex">PlayerOneCommit: {state?.playerOneCommit}</div>
      <div className="flex">PlayerTwoPK: {state?.playerTwoPk}</div>
      <div className="flex">PlayerTwoCommit: {state?.playerTwoCommit}</div>
      <div className="flex">Game Started?: {state?.gameStarted}</div>
      <div className="flex">Player 1 current move: {state?.playerOneCurrentMove}</div>
      <div className="flex">Player 2 current move: {state?.playerTwoCurrentMove}</div>
      <div className="flex">Your role is: {state?.role}</div>
      <div className="flex">Is my turn: {state?.isMyTurn.toString()}</div>
      {isLoading && <div>Loading...</div>}
    </div>
  );
};
