import { NavalBattlePrivateState, Ledger, pureCircuits } from '../../contract';
import * as t from 'io-ts';
import { either } from 'fp-ts';
import { ValuesOf, block } from '../helpers';
import { Observable } from 'rxjs';
export const Actions = {
  joinGame: 'joinGame',
  commitGrid: 'commitGrid',
  startGame: 'startGame',
  makeMove: 'makeMove',
} as const;
export const ActionCodec = t.union([
  t.literal(Actions.joinGame),
  t.literal(Actions.commitGrid),
  t.literal(Actions.startGame),
  t.literal(Actions.makeMove),
]);
export type Action = t.TypeOf<typeof ActionCodec>;

export const AsyncActionStates = {
  inProgress: 'in_progress',
  error: 'error',
  success: 'success',
} as const;
export type AsyncActionState = ValuesOf<typeof AsyncActionStates>;

export const ActionIdCodec = t.string;
export type ActionId = t.TypeOf<typeof ActionIdCodec>;

export const DateCodec = t.string.pipe(
  block(() => {
    const validate: t.Validate<string, Date> = (str, context) => {
      const candidate = new Date(str);
      if (candidate.toString() === 'Invalid Date') {
        return either.left([
          {
            value: str,
            context,
            message: `Could not parse ${str} to a Date object`,
          },
        ]);
      } else {
        return either.right(candidate);
      }
    };

    return new t.Type<Date, string, string>(
      'date',
      (value): value is Date => value instanceof Date,
      validate,
      (date) => date.toISOString(),
    );
  }),
);

const AsyncActionCommons = t.type({
  id: ActionIdCodec,
  action: ActionCodec,
  startedAt: DateCodec,
});

export const TxStatuses = {
  failEntirely: 'FailEntirely',
  failFallible: 'FailFallible',
  succeedEntirely: 'SucceedEntirely',
} as const;

export const FinalizedTxDataCodec = t.type({
  txId: t.string,
  status: t.union([
    t.literal(TxStatuses.failEntirely),
    t.literal(TxStatuses.failFallible),
    t.literal(TxStatuses.succeedEntirely),
  ]),
  txHash: t.string,
  blockHeight: t.number,
  blockHash: t.string,
});
export type FinalizedTxData = t.TypeOf<typeof FinalizedTxDataCodec>;

export const AsyncActionCodec = t.intersection([
  AsyncActionCommons,
  t.union([
    t.type({
      status: t.literal(AsyncActionStates.inProgress),
    }),
    t.type({
      status: t.literal(AsyncActionStates.error),
      error: t.string,
      finalizedTxData: t.union([FinalizedTxDataCodec, t.null]),
    }),
    t.type({
      status: t.literal(AsyncActionStates.success),
      finalizedTxData: FinalizedTxDataCodec,
    }),
  ]),
]);
export type AsyncAction = t.TypeOf<typeof AsyncActionCodec>;

export const succeededAsyncAction =
  (finalizedTxData: FinalizedTxData) =>
  (action: AsyncAction): AsyncAction => ({
    ...action,
    status: 'success',
    finalizedTxData,
  });

export const failedAsyncAction =
  (error: string, finalizedTxData?: FinalizedTxData) =>
  (action: AsyncAction): AsyncAction => ({
    ...action,
    status: 'error',
    error,
    finalizedTxData: finalizedTxData ?? null,
  });

export const CommonStateCodec = t.type({
  actions: t.type({
    latest: t.union([ActionIdCodec, t.null]),
    all: t.record(ActionIdCodec, AsyncActionCodec),
  }),
});
export const ActionHistoryCodec = t.type({
  latest: t.union([ActionIdCodec, t.null]),
  all: t.record(ActionIdCodec, AsyncActionCodec),
});
export type ActionHistory = t.TypeOf<typeof ActionHistoryCodec>;

export const Roles = {
  player1: 'player1',
  player2: 'player2',
  watcher: 'watcher',
} as const;

export const playerGameStateCodec = t.intersection([
  t.type({ publicKey: t.string, secretKey: t.string }),  
  t.type({ role: t.union([t.literal(Roles.player1), t.literal(Roles.player2), t.literal(Roles.watcher)]) , isMyTurn: t.boolean, gameStarted: t.string, players: t.number}),
  t.type({ playerOnePk: t.string, playerOneCommit: t.string, playerOneCurrentMove: t.string, gridPlayer1: t.array(t.array(t.any)), playerOneTimeToPlay: t.boolean, playerOneHasCommitted: t.boolean, playerOneHasJoinedTheGame: t.boolean, playerOneHits: t.number, playerOneIsWinner: t.boolean }),
  t.type({ playerTwoPk: t.string, playerTwoCommit: t.string, playerTwoCurrentMove: t.string, gridPlayer2: t.array(t.array(t.any)), playerTwoTimeToPlay: t.boolean, playerTwoHasCommitted: t.boolean, playerTwoHasJoinedTheGame: t.boolean, playerTwoHits: t.number, playerTwoIsWinner: t.boolean }),  
  CommonStateCodec,
]);
export type PlayerGameState = t.TypeOf<typeof playerGameStateCodec>;

export interface PlayerGameAPI {
  state$: Observable<PlayerGameState>;  
  joinGame: () => Promise<ActionId>;
  commitGrid: (playerSetup: bigint[]) => Promise<ActionId>;
  startGame: () => Promise<ActionId>;
  makeMove: (move: bigint) => Promise<ActionId>;
}
