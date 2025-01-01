import { ActionHistory, PlayerGameState } from '../types';
import { Ledger } from '../../contract';
import { toHex } from '@midnight-ntwrk/midnight-js-utils';

export const prettifyActions = ({ latest, all }: ActionHistory): object => ({
  latest,
  all: Object.fromEntries(
    Object.entries(all).map(([key, { action, status, startedAt }]) => [key, { action, status, startedAt }]),
  ),
});

export const prettifyOrganizerState = (organizerState: PlayerGameState) => ({
  ...organizerState,
  actions: prettifyActions(organizerState.actions),
});

export const prettifyLedgerState = ({ playerOneGrid, playerTwoGrid }: Ledger) => ({  
  eligibleParticipants: [...playerOneGrid],
  checkedInParticipants: [...playerTwoGrid],
});
