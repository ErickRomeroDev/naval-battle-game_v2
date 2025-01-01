import type * as __compactRuntime from '@midnight-ntwrk/compact-runtime';

export enum CellState { unset = 0, hit = 1, miss = 2 }

export enum CellAssignment { blank = 0, ship = 1 }

export type Witnesses<T> = {
  local_sk(context: __compactRuntime.WitnessContext<Ledger, T>): [T, Uint8Array];
  local_gameplay(context: __compactRuntime.WitnessContext<Ledger, T>): [T, CellAssignment[]];
  set_local_gameplay(context: __compactRuntime.WitnessContext<Ledger, T>,
                     playerSetup: CellAssignment[]): [T, Uint8Array];
}

export type ImpureCircuits<T> = {
  joinGame(context: __compactRuntime.CircuitContext<T>, player: Uint8Array): __compactRuntime.CircuitResults<T, void>;
  commitGrid(context: __compactRuntime.CircuitContext<T>,
             player: Uint8Array,
             playerSetup: CellAssignment[]): __compactRuntime.CircuitResults<T, void>;
  startGame(context: __compactRuntime.CircuitContext<T>): __compactRuntime.CircuitResults<T, void>;
  makeMove(context: __compactRuntime.CircuitContext<T>,
           player: Uint8Array,
           move: bigint): __compactRuntime.CircuitResults<T, void>;
}

export type PureCircuits = {
  public_key(sk: Uint8Array): Uint8Array;
  vectorHash(sk: CellAssignment[]): Uint8Array;
}

export type Circuits<T> = {
  joinGame(context: __compactRuntime.CircuitContext<T>, player: Uint8Array): __compactRuntime.CircuitResults<T, void>;
  commitGrid(context: __compactRuntime.CircuitContext<T>,
             player: Uint8Array,
             playerSetup: CellAssignment[]): __compactRuntime.CircuitResults<T, void>;
  startGame(context: __compactRuntime.CircuitContext<T>): __compactRuntime.CircuitResults<T, void>;
  makeMove(context: __compactRuntime.CircuitContext<T>,
           player: Uint8Array,
           move: bigint): __compactRuntime.CircuitResults<T, void>;
  public_key(context: __compactRuntime.CircuitContext<T>, sk: Uint8Array): __compactRuntime.CircuitResults<T, Uint8Array>;
  vectorHash(context: __compactRuntime.CircuitContext<T>, sk: CellAssignment[]): __compactRuntime.CircuitResults<T, Uint8Array>;
}

export type Ledger = {
  readonly gameStarted: boolean;
  readonly players: bigint;
  readonly internalCounter: bigint;
  readonly playerOnePk: Uint8Array;
  playerOneGrid: {
    isEmpty(): boolean;
    size(): bigint;
    member(key: bigint): boolean;
    lookup(key: bigint): CellState;
    [Symbol.iterator](): Iterator<[bigint, CellState]>
  };
  readonly playerOneCommit: Uint8Array;
  readonly playerOneHits: bigint;
  readonly playerOneHasCommitted: boolean;
  readonly playerOneHasJoinedTheGame: boolean;
  readonly playerOneTimeToPlay: boolean;
  readonly playerOneCurrentMove: bigint;
  readonly playerOneIsWinner: boolean;
  readonly playerTwoPk: Uint8Array;
  playerTwoGrid: {
    isEmpty(): boolean;
    size(): bigint;
    member(key: bigint): boolean;
    lookup(key: bigint): CellState;
    [Symbol.iterator](): Iterator<[bigint, CellState]>
  };
  readonly playerTwoCommit: Uint8Array;
  readonly playerTwoHits: bigint;
  readonly playerTwoHasCommitted: boolean;
  readonly playerTwoHasJoinedTheGame: boolean;
  readonly playerTwoTimeToPlay: boolean;
  readonly playerTwoCurrentMove: bigint;
  readonly playerTwoIsWinner: boolean;
}

export type ContractReferenceLocations = any;

export declare const contractReferenceLocations : ContractReferenceLocations;

export declare class Contract<T, W extends Witnesses<T> = Witnesses<T>> {
  witnesses: W;
  circuits: Circuits<T>;
  impureCircuits: ImpureCircuits<T>;
  constructor(witnesses: W);
  initialState(context: __compactRuntime.ConstructorContext<T>,
               plOne: Uint8Array): __compactRuntime.ConstructorResult<T>;
}

export declare function ledger(state: __compactRuntime.StateValue): Ledger;
export declare const pureCircuits: PureCircuits;
