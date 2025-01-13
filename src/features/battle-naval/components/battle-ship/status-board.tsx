import { useBattleNavalContext } from "../../hooks/useBattleNavalContext";

export const StatusBoard = () => {
  const { dispatch, contractAddress, isLoading, state, isClientInitialized } =
    useBattleNavalContext();
  return (
    <div className="mt-12 grid h-[350px] auto-rows-auto grid-cols-3 rounded-[8px] border-[1.5px] border-gray-200 text-[15px] text-gray-600">
      <div className="px-4 py-1 font-bold"></div>
      <div className="flex items-center justify-center px-4 py-1 text-center font-bold">
        You
      </div>
      <div className="flex items-center justify-center px-4 py-1 text-center font-bold">
        Opponent
      </div>

      <div className="px-4 py-1 font-bold">Turn</div>
      <div className="px-4 py-1 text-center">
        {state && state.isMyTurn.toString()}
      </div>
      <div className="px-4 py-1 text-center">
        {state && (!state.isMyTurn).toString()}
      </div>

      <div className="px-4 py-1 font-bold">Joinned?</div>
      <div className="px-4 py-1 text-center">
        {state &&
          (
            (state.publicKey === state.playerOnePk &&
              state.playerOneHasJoinedTheGame) ||
            (state.publicKey === state.playerTwoPk &&
              state.playerTwoHasJoinedTheGame)
          ).toString()}
      </div>
      <div className="px-4 py-1 text-center">
        {state &&
          state.playerTwoPk !==
            "0000000000000000000000000000000000000000000000000000000000000000" &&
          (
            (state.publicKey !== state.playerOnePk &&
              state.playerTwoHasJoinedTheGame) ||
            (state.publicKey !== state.playerTwoPk &&
              state.playerOneHasJoinedTheGame)
          ).toString()}
      </div>

      <div className="px-4 py-1 font-bold"># of players?</div>
      <div className="px-4 py-1 text-center">{state && state.players}</div>
      <div className="px-4 py-1 text-center"></div>

      <div className="px-4 py-1 font-bold">Start</div>
      <div className="px-4 py-1 text-center">
        {state?.gameStarted.toString()}
      </div>
      <div className="px-4 py-1 text-center"></div>

      <div className="px-4 py-1 font-bold">Commit</div>
      <div className="px-4 py-1 text-center">
        {state &&
          (
            (state.publicKey === state.playerOnePk &&
              state.playerOneHasCommitted) ||
            (state.publicKey === state.playerTwoPk &&
              state.playerTwoHasCommitted)
          ).toString()}
      </div>
      <div className="px-4 py-1 text-center">
        {state && state.playerTwoPk !==
            "0000000000000000000000000000000000000000000000000000000000000000" &&
          (
            (state.publicKey !== state.playerOnePk &&
              state.playerTwoHasCommitted) ||
            (state.publicKey !== state.playerTwoPk &&
              state.playerOneHasCommitted)
          ).toString()}
      </div>

      <div className="px-4 py-1 font-bold">Hits</div>
      <div className="px-4 py-1 text-center">4</div>
      <div className="px-4 py-1 text-center">0</div>

      <div className="px-4 py-1 font-bold">Misses</div>
      <div className="px-4 py-1 text-center">0</div>
      <div className="px-4 py-1 text-center">4</div>

      <div className="px-4 py-1 font-bold">Winner</div>
      <div className="px-4 py-1 text-center">X</div>
      <div className="px-4 py-1 text-center">O</div>
    </div>
  );
};
