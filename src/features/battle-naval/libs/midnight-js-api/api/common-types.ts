import { MidnightProviders } from '@midnight-ntwrk/midnight-js-types';
import { Cryptography } from './cryptography';
import { Logger } from 'pino';
import { Witnesses, NavalBattlePrivateState , Contract } from '../../contract';
import { SubscribablePrivateStateProvider } from './private-state-decorator';
import { FoundContract, FinalizedCallTxData } from '@midnight-ntwrk/midnight-js-contracts';
import { EphemeralStateBloc } from './ephemeral-state-bloc';

export type PrivateStates = {
  navalBattleGamePrivateState: NavalBattlePrivateState;
};

export type NavalBattleGameContract = Contract<NavalBattlePrivateState, Witnesses<NavalBattlePrivateState>>;

export type NavalBattleGameCircuitKeys = Exclude<keyof NavalBattleGameContract['impureCircuits'], number | symbol>;

export type NavalBattleGameProviders = MidnightProviders<NavalBattleGameCircuitKeys, PrivateStates> & {
  privateStateProvider: SubscribablePrivateStateProvider<PrivateStates>;
};

export type AppProviders = {
  crypto: Cryptography;
  logger: Logger;
  ephemeralStateBloc: EphemeralStateBloc;
};

export type DeployedNavalBattleGameContract = FoundContract<NavalBattlePrivateState, NavalBattleGameContract>;

export type FinalizedNavalBattleGameCallTxData = FinalizedCallTxData<NavalBattlePrivateState, NavalBattleGameContract, NavalBattleGameCircuitKeys>;
