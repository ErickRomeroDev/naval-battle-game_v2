import { NavalBattlePrivateState, Ledger, pureCircuits } from "../../contract";
import { PlayerGameState, Roles } from "../types";
import { EphemeralState } from "./ephemeral-state-bloc";
import { toHex } from "@midnight-ntwrk/midnight-js-utils";

function areKeysEqual(key1: Uint8Array, key2: Uint8Array): boolean {
  if (key1.length !== key2.length) return false;
  for (let i = 0; i < key1.length; i++) {
    if (key1[i] !== key2[i]) return false;
  }
  return true;
}

export const derivePlayerGameState = (
  {
    playerOnePk,
    playerOneCommit,
    playerOneCurrentMove,
    playerOneGrid,
    playerOneTimeToPlay,
    playerOneHasCommitted,
    playerOneHasJoinedTheGame,
    playerOneHits,
    playerOneIsWinner,

    playerTwoPk,
    playerTwoCommit,
    playerTwoCurrentMove,
    playerTwoGrid,
    playerTwoTimeToPlay,
    playerTwoHasCommitted,
    playerTwoHasJoinedTheGame,
    playerTwoHits,
    playerTwoIsWinner,

    gameStarted,
    players
  }: Ledger,
  privateState: NavalBattlePrivateState,
  { actions }: EphemeralState,
): PlayerGameState => {
  if (privateState.secretKey === null) {
    throw new Error("unexpected null secret key");
  }
  const publicKey = pureCircuits.public_key(privateState.secretKey);
  console.log({ publicKey });
  console.log({ playerOnePk });
  console.log({playerOneTimeToPlay});
  console.log({playerTwoTimeToPlay});

  let role;
  let isMyTurn: boolean;
  if (areKeysEqual(publicKey, playerOnePk)) {
    role = Roles.player1;
    if (playerOneTimeToPlay) {
      isMyTurn = true;
    } else {
      isMyTurn = false;
    }
  } else if (areKeysEqual(publicKey, playerTwoPk)) {
    role = Roles.player2;
    if (playerTwoTimeToPlay) {
      isMyTurn = true;
    } else {
      isMyTurn = false;
    }
  } else {
    role = Roles.watcher;
    isMyTurn = false;
  }

  const rows = 8;
  const cols = 8;
  const gridPlayer2 = Array.from({ length: rows }, () =>
    Array(cols).fill(null),
  ); // Initialize empty grid

  for (let key = 1n; key <= 64n; key++) {
    const cellState = playerTwoGrid.lookup(key) ?? 0;
    // Ensure the cellState is defined
    const index = Number(key) - 1;
    const row = Math.floor(index / cols);
    const col = index % cols;

    gridPlayer2[row][col] = cellState;
  }

  const gridPlayer1 = Array.from({ length: rows }, () =>
    Array(cols).fill(null),
  ); // Initialize empty grid

  for (let key = 1n; key <= 64n; key++) {
    const cellState = playerOneGrid.lookup(key) ?? 0;
    // Ensure the cellState is defined
    const index = Number(key) - 1;
    const row = Math.floor(index / cols);
    const col = index % cols;

    gridPlayer1[row][col] = cellState;
  }

  return {
    actions,
    role,
    publicKey: toHex(publicKey),
    secretKey: toHex(privateState.secretKey),
    playerOnePk: toHex(playerOnePk),
    playerOneCommit: toHex(playerOneCommit),
    playerOneCurrentMove: playerOneCurrentMove.toString(),
    playerOneTimeToPlay,
    playerOneHasCommitted,
    playerOneHasJoinedTheGame,
    playerOneHits: Number(playerOneHits),  
    playerOneIsWinner,  

    playerTwoPk: toHex(playerTwoPk),
    playerTwoCommit: toHex(playerTwoCommit),
    playerTwoCurrentMove: playerTwoCurrentMove.toString(),
    playerTwoTimeToPlay,
    playerTwoHasCommitted,
    playerTwoHasJoinedTheGame,
    playerTwoHits: Number(playerTwoHits),
    playerTwoIsWinner,

    gameStarted: gameStarted.toString(),
    gridPlayer1,
    gridPlayer2,
    isMyTurn,
    players: Number(players)
  };
};
