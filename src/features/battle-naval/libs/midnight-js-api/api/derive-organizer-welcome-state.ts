import { NavalBattlePrivateState, Ledger, pureCircuits } from '../../contract';
import { PlayerGameState, Roles } from '../types';
import { EphemeralState } from './ephemeral-state-bloc';
import { toHex } from '@midnight-ntwrk/midnight-js-utils';

export const derivePlayerGameState = (
  { gameStarted   }: Ledger,
  { secretKey }: NavalBattlePrivateState,
  { actions }: EphemeralState,
): PlayerGameState => {
  if (secretKey === null) {
    throw new Error('unexpected null secret key');
  }
  const publicKey = pureCircuits.public_key(secretKey);
  return {
    actions,
    role: Roles.player,
    publicKey: toHex(publicKey),
    secretKey: toHex(secretKey),
  };
};
