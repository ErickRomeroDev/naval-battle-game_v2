import { useContext } from 'react';
import { AppContext, type AppContextTypes } from '../contexts/battle-naval';

export const useBattleNavalContext = (): AppContextTypes => {
  const state = useContext(AppContext);
  if (state === undefined) {
    throw new Error('Context must be called within a provider.');
  }
  return state;
};
