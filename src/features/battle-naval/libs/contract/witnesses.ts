import { Ledger, pureCircuits } from './managed/naval-battle-game/contract/index.cjs';
import { WitnessContext } from '@midnight-ntwrk/compact-runtime';

export type LocalGameplay = Map<string, bigint[]> | null;

export type NavalBattlePrivateState = {
  readonly secretKey: Uint8Array;
  readonly localGameplay: LocalGameplay;
};

export const createNavalBattleGameInitialPrivateState = (secretKey: Uint8Array) : NavalBattlePrivateState => ({
  secretKey,
  localGameplay: null,
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
    const updatedGameplay = privateState.localGameplay ?? new Map<string, bigint[]>();

    // Update the gameplay map
    updatedGameplay.set(contractAddress, playerSetup);

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
    privateState.localGameplay?.get(contractAddress) ?? [],
  ],
};
