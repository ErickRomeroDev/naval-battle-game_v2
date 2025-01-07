import {
  AppProviders,
  NavalBattleGameContract,
  NavalBattleGameProviders,
  DeployedNavalBattleGameContract,
  FinalizedNavalBattleGameCallTxData,
} from './common-types';
import { CallTxFailedError, deployContract, findDeployedContract } from '@midnight-ntwrk/midnight-js-contracts';
import {
  Contract,
  NavalBattlePrivateState,
  createNavalBattleGameInitialPrivateState,
  ledger,
  witnesses,
  Ledger,
  pureCircuits
} from '../../contract';
import { ContractAddress } from '@midnight-ntwrk/compact-runtime';
import { FinalizedTxData } from '@midnight-ntwrk/midnight-js-types';
import { Action, ActionHistory, ActionId, Actions, AsyncActionStates, PlayerGameAPI, PlayerGameState } from '../types';
import * as Rx from 'rxjs';
import { derivePlayerGameState } from './derive-organizer-welcome-state';
import { EphemeralState } from './ephemeral-state-bloc';
import { prettifyLedgerState, prettifyOrganizerState } from './prettify-utils';

export const navalBattleGameContractInstance: NavalBattleGameContract = new Contract(witnesses);

export const getNavalBattleGamePrivateState = async (
  providers: NavalBattleGameProviders,
  appProviders: AppProviders,
): Promise<NavalBattlePrivateState> => {
  let existingPrivateState = await providers.privateStateProvider.get('navalBattleGamePrivateState');
  if (existingPrivateState === null) {
    existingPrivateState = createNavalBattleGameInitialPrivateState(appProviders.crypto.randomSk());
  }
  console.log('private key return from getNavalBattleGamePrivateState function', existingPrivateState.secretKey);
  return existingPrivateState;
};

const getPlayerSecretKey = async (providers: NavalBattleGameProviders, appProviders: AppProviders): Promise<Uint8Array> => {
  const privateState = await getNavalBattleGamePrivateState(providers, appProviders);
  return privateState.secretKey;
};

const buildAndSubmitCallTx = (
  appProviders: AppProviders,
  action: Action,
  submitTx: () => Promise<FinalizedNavalBattleGameCallTxData>,
): Promise<ActionId> => {
  const actionId = appProviders.crypto.randomUUID();
  void Rx.firstValueFrom(
    appProviders.ephemeralStateBloc
      .addAction({
        action,
        status: AsyncActionStates.inProgress,
        startedAt: new Date(),
        id: actionId,
      })
      .pipe(
        Rx.tap(() => appProviders.logger.info({ submittingTransaction: action })),
        Rx.concatMap(() => submitTx()),
        Rx.tap((finalizedTxData) =>
          appProviders.logger.info({
            transactionFinalized: {
              circuitId: action,
              status: finalizedTxData.public.status,
              txId: finalizedTxData.public.txId,
              txHash: finalizedTxData.public.txHash,
              blockHeight: finalizedTxData.public.blockHeight,
            },
          }),
        ),
        Rx.concatMap((finalizedTxData) => appProviders.ephemeralStateBloc.succeedAction(actionId, finalizedTxData.public)),
        Rx.catchError((error: Error) =>
          appProviders.ephemeralStateBloc.failAction(
            actionId,
            error.message,
            error instanceof CallTxFailedError ? error.finalizedTxData : undefined,
          ),
        ),
      ),
  );
  return Promise.resolve(actionId);
};

const actionHistoriesEqual = (a: ActionHistory, b: ActionHistory): boolean =>
  a.latest === b.latest &&
  Object.keys(a.all).length === Object.keys(b.all).length &&
  Object.keys(a.all).every((key) => key in b.all && a.all[key].status === b.all[key].status);

const playerStatesEqual = (a: PlayerGameState, b: PlayerGameState): boolean =>
  a.secretKey === b.secretKey && a.publicKey === b.publicKey && a.role === b.role && actionHistoriesEqual(a.actions, b.actions);

const createStateObservable = <W extends PlayerGameState>(
  providers: NavalBattleGameProviders,
  appProviders: AppProviders,
  contractAddress: ContractAddress,
  derivation: (ledgerState: Ledger, privateState: NavalBattlePrivateState, ephemeralState: EphemeralState) => W,
  equals: (a: W, b: W) => boolean,
  prettify: (w: W) => object,
): Rx.Observable<W> => {
  return Rx.combineLatest(
    [
      providers.publicDataProvider.contractStateObservable(contractAddress, { type: 'latest' }).pipe(
        Rx.map((contractState) => ledger(contractState.data)),
        Rx.tap((ledgerState) => {
          appProviders.logger.info({ ledgerState: prettifyLedgerState(ledgerState) });
        }),
      ),
      Rx.from(getNavalBattleGamePrivateState(providers, appProviders)).pipe(
        Rx.concatMap((existingPrivateState) =>
          providers.privateStateProvider.state$('navalBattleGamePrivateState').pipe(
            Rx.startWith(existingPrivateState),
            Rx.filter((privateState): privateState is NavalBattlePrivateState => privateState !== null),
          ),
        ),
      ),
      appProviders.ephemeralStateBloc.state$,
    ],
    derivation,
  ).pipe(
    Rx.distinctUntilChanged(equals),
    Rx.tap((w) => appProviders.logger.info({ localState: prettify(w) })),
    Rx.shareReplay({ bufferSize: 1, refCount: true }),
  );
};

export const playerOnePk = async (privateState: NavalBattlePrivateState): Promise<Uint8Array> => {
  const publicKey = pureCircuits.public_key(privateState.secretKey);
  console.log('publicKey pass to Deploy as args', publicKey);
  return publicKey;
};

// TODO: extract deploy and join functions that work for organizer and participant APIs.
export class NavalBattleGameMidnightJSAPI implements PlayerGameAPI {
  static async deploy(providers: NavalBattleGameProviders, appProviders: AppProviders): Promise<NavalBattleGameMidnightJSAPI> {
    const privateState = await getNavalBattleGamePrivateState(providers, appProviders);
    const deployedContract = await deployContract(providers, {
      privateStateKey: 'navalBattleGamePrivateState',
      contract: navalBattleGameContractInstance,
      initialPrivateState: privateState,
      args: [await playerOnePk(privateState)],
    });
    appProviders.logger.info({
      contractDeployed: {
        address: deployedContract.deployTxData.public.contractAddress,
        block: deployedContract.deployTxData.public.blockHeight,
      },
    });
    return new NavalBattleGameMidnightJSAPI(deployedContract, providers, appProviders, privateState.secretKey);
  }

  static async join(
    providers: NavalBattleGameProviders,
    appProviders: AppProviders,
    contractAddress: ContractAddress,
  ): Promise<NavalBattleGameMidnightJSAPI> {
    const privateState = await getNavalBattleGamePrivateState(providers, appProviders);
    const deployedContract = await findDeployedContract(providers, {
      contractAddress,
      contract: navalBattleGameContractInstance,
      privateStateKey: 'navalBattleGamePrivateState',
      initialPrivateState: privateState,
    });
    appProviders.logger.info({
      contractJoined: {
        address: deployedContract.deployTxData.public.contractAddress,
      },
    });    
    return new NavalBattleGameMidnightJSAPI(deployedContract, providers, appProviders, privateState.secretKey);
  }

  readonly contractAddress: ContractAddress;
  readonly finalizedDeployTxData: FinalizedTxData;
  readonly initialLedgerState: Ledger;
  readonly publicKey: Uint8Array;
  readonly state$: Rx.Observable<PlayerGameState>;

  constructor(
    private readonly deployedContract: DeployedNavalBattleGameContract,
    private readonly providers: NavalBattleGameProviders,
    private readonly appProviders: AppProviders,
    readonly secretKey: Uint8Array,
  ) {
    this.contractAddress = deployedContract.deployTxData.public.contractAddress;
    this.finalizedDeployTxData = (({ tx, status, txHash, txId, blockHash, blockHeight }) => ({
      tx,
      status,
      txHash,
      txId,
      blockHash,
      blockHeight,
    }))(deployedContract.deployTxData.public);
    this.initialLedgerState = ledger(deployedContract.deployTxData.public.initialContractState.data);
    console.log('privateKey pass to Class', this.secretKey);
    this.publicKey = pureCircuits.public_key(this.secretKey);
    console.log('publicKey pass to Class', this.publicKey);
    this.state$ = createStateObservable(
      this.providers,
      this.appProviders,
      this.contractAddress,
      derivePlayerGameState,
      playerStatesEqual,
      prettifyOrganizerState,
    );
  }

  joinGame(): Promise<ActionId> {
    return buildAndSubmitCallTx(this.appProviders, Actions.joinGame, () => this.deployedContract.callTx.joinGame(this.publicKey));
  }

  commitGrid(playerSetup: bigint[]): Promise<ActionId> {
    return buildAndSubmitCallTx(this.appProviders, Actions.commitGrid, () =>
      this.deployedContract.callTx.commitGrid(this.publicKey, playerSetup),
    );
  }

  startGame(): Promise<ActionId> {
    return buildAndSubmitCallTx(this.appProviders, Actions.startGame, () => this.deployedContract.callTx.startGame());
  }

  makeMove(move: bigint): Promise<ActionId> {
    return buildAndSubmitCallTx(this.appProviders, Actions.makeMove, () =>
      this.deployedContract.callTx.makeMove(this.publicKey, move),
    );
  }
}
