import { Ledger, pureCircuits } from './managed/naval-battle-game/contract/index.cjs';
import { WitnessContext } from '@midnight-ntwrk/compact-runtime';

export type LocalGameplay = Record<string, string[]>;

export type NavalBattlePrivateState = {
  readonly secretKey: Uint8Array;
  readonly localGameplay: LocalGameplay;
};

export const createNavalBattleGameInitialPrivateState = (secretKey: Uint8Array) : NavalBattlePrivateState => ({
  secretKey,
  localGameplay: {},
});

export const witnesses = {
  local_sk: ({ privateState }: WitnessContext<Ledger, NavalBattlePrivateState>): [NavalBattlePrivateState, Uint8Array] => [
    privateState,
    privateState.secretKey,
  ],

  set_local_gameplay: (
    { privateState, contractAddress }: WitnessContext<Ledger, NavalBattlePrivateState>,
    playerSetup: bigint[],
  ): [NavalBattlePrivateState, Uint8Array] => {
    const updatedGameplay = { ...privateState.localGameplay }; // Ensure it is an object

    // Update the gameplay map
    updatedGameplay[contractAddress] = playerSetup.map((value) => value.toString());

    return [
      {
        ...privateState,
        localGameplay: updatedGameplay,
      },
      pureCircuits.vectorHash(playerSetup),
    ];
  },

  local_gameplay: ({
    privateState,
    contractAddress,
  }: WitnessContext<Ledger, NavalBattlePrivateState>): [NavalBattlePrivateState, bigint[]] => [
    privateState,
    (privateState.localGameplay[contractAddress] ?? []).map((value) => BigInt(value)),   
  ],
};
