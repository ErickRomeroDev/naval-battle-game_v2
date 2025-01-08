import { NavalBattlePrivateState, Ledger, pureCircuits } from '../../contract';
import { PlayerGameState, Roles } from '../types';
import { EphemeralState } from './ephemeral-state-bloc';
import { toHex } from '@midnight-ntwrk/midnight-js-utils';

export const derivePlayerGameState = (
  {playerOnePk, playerOneCommit, playerTwoPk, playerTwoCommit, gameStarted, playerOneCurrentMove}: Ledger,
  privateState: NavalBattlePrivateState,
  { actions }: EphemeralState,
): PlayerGameState => {
  if (privateState.secretKey === null) {
    throw new Error('unexpected null secret key');
  }
  const publicKey = pureCircuits.public_key(privateState.secretKey);
  return {
    actions,
    role: Roles.player,
    publicKey: toHex(publicKey),
    secretKey: toHex(privateState.secretKey),
    playerOnePk: toHex(playerOnePk),
    playerOneCommit: toHex(playerOneCommit),
    playerTwoPk: toHex(playerTwoPk),
    playerTwoCommit: toHex(playerTwoCommit),
    gameStarted: gameStarted.toString(),
    playerOneCurrentMove: playerOneCurrentMove.toString(),
  };
};
