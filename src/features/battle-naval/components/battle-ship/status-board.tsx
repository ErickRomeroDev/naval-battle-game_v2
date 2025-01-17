import { useBattleNavalContext } from "../../hooks/useBattleNavalContext";

export const StatusBoard = () => {
  const { dispatch, contractAddress, isLoading, state, isClientInitialized } =
    useBattleNavalContext();

  const countMissesPlayer1 =
    state && state.gridPlayer1.flat().filter((val) => val === 2).length;

  const countMissesPlayer2 =
    state && state.gridPlayer2.flat().filter((val) => val === 2).length;

  return (
    <div className="mt-12 grid h-[350px] auto-rows-auto grid-cols-3 rounded-[15px] border-[1.5px] border-gray-200 text-[15px] text-gray-600">
      <div className="px-4 py-1 font-bold"></div>
      <div className="flex items-center justify-center px-4 py-1 text-center font-bold">
        {`Player1 ${state && state.publicKey === state.playerOnePk ? ": YOU" : ""}`}
      </div>
      <div className="flex items-center justify-center px-4 py-1 text-center font-bold">
        {`Player2 ${state && state.publicKey === state.playerTwoPk ? ": YOU" : ""}`}
      </div>

      <div className="px-4 py-1 font-bold">Turn</div>
      <div className="px-4 py-1 text-center">
        {state && state.playerOneTimeToPlay.toString()}
      </div>
      <div className="px-4 py-1 text-center">
        {state && state.playerTwoTimeToPlay.toString()}
      </div>

      <div className="px-4 py-1 font-bold">Joinned?</div>
      <div className="px-4 py-1 text-center">
        {state && state.playerOneHasJoinedTheGame.toString()}
      </div>
      <div className="px-4 py-1 text-center">
        {state && state.playerTwoHasJoinedTheGame.toString()}
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
        {state && state.playerOneHasCommitted.toString()}
      </div>
      <div className="px-4 py-1 text-center">
        {state && state.playerTwoHasCommitted.toString()}
      </div>

      <div className="px-4 py-1 font-bold">Hits</div>
      <div className="px-4 py-1 text-center">
        {state && state.playerOneHits}
      </div>
      <div className="px-4 py-1 text-center">
        {state && state.playerTwoHits}
      </div>

      <div className="px-4 py-1 font-bold">Misses</div>
      <div className="px-4 py-1 text-center">{state && countMissesPlayer2}</div>
      <div className="px-4 py-1 text-center">{state && countMissesPlayer1}</div>

      <div className="px-4 py-1 font-bold">Winner</div>
      <div className="px-4 py-1 text-center">
        {state && state.playerOneIsWinner}
      </div>
      <div className="px-4 py-1 text-center">
        {state && state.playerTwoIsWinner}
      </div>
    </div>
  );
};
