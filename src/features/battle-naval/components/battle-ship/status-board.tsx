import Image from "next/image";
import { useBattleNavalContext } from "../../hooks/useBattleNavalContext";
import { cn } from "@/lib/utils";

export const StatusBoard = () => {
  const { state } = useBattleNavalContext();

  const countMissesPlayer1 =
    state && state.gridPlayer1.flat().filter((val) => val === 2).length;

  const countMissesPlayer2 =
    state && state.gridPlayer2.flat().filter((val) => val === 2).length;

  return (
    <div className="relative mt-[86px] grid h-[350px] auto-rows-auto grid-cols-3 rounded-[15px] border-[1.5px] border-gray-200 p-4 text-[15px] font-semibold text-gray-600">
      <div
        className={cn(
          "absolute left-[128px] top-[6px] h-[335px] w-24 rounded-[12px] bg-pink-500/15 transition-all duration-500 ease-in-out",
          state && state.playerOneTimeToPlay === true && "left-[128px]",
          state && state.playerTwoTimeToPlay && "left-[235px]",
        )}
      ></div>
      <div className="px-4 py-1"></div>
      <div className="flex flex-col px-4 py-1 text-center font-bold">
        <span>Player 1</span>
        <span>
          {state && state.publicKey === state.playerOnePk ? "(you)" : ""}
        </span>
      </div>
      <div className="flex flex-col px-4 py-1 text-center font-bold">
        <span>Player 2</span>
        <span>
          {state && state.publicKey === state.playerTwoPk ? "(you)" : ""}
        </span>
      </div>

      <div className="flex items-center px-4 py-1">Turn</div>
      <div className="flex justify-center">
        {state && state.playerOneTimeToPlay === true ? (
          <Image src="/check-mark.svg" alt="check" width={22} height={22} />
        ) : (
          <div />
        )}
      </div>
      <div className="flex justify-center">
        {state && state.playerTwoTimeToPlay === true ? (
          <Image src="/check-mark.svg" alt="check" width={22} height={22} />
        ) : (
          <div />
        )}
      </div>

      <div className="flex items-center px-4 py-1">Join game</div>
      <div className="flex justify-center">
        {state && state.playerOneHasJoinedTheGame === true ? (
          <Image src="/check-mark.svg" alt="check" width={22} height={22} />
        ) : (
          <Image
            className="animate-spin"
            src="/loader-circle-pink.svg"
            alt="check"
            width={22}
            height={22}
          />
        )}
      </div>
      <div className="flex justify-center">
        {state && state.playerTwoHasJoinedTheGame === true ? (
          <Image src="/check-mark.svg" alt="check" width={22} height={22} />
        ) : (
          <Image
            className="animate-spin opacity-40"
            src="/loader-circle-pink.svg"
            alt="check"
            width={18}
            height={18}
          />
        )}
      </div>

      {/* <div className="px-4 py-1 font-bold"># of players?</div>
      <div className="px-4 py-1 text-center">{state && state.players}</div>
      <div className="px-4 py-1 text-center"></div> */}

      {/* <div className="px-4 py-1 font-bold">Start</div>
      <div className="px-4 py-1 text-center">
        {state?.gameStarted.toString()}
      </div>
      <div className="px-4 py-1 text-center"></div> */}

      <div className="flex items-center px-4 py-1">Commit</div>
      <div className="flex justify-center">
        {state && state.playerOneHasCommitted === true ? (
          <Image src="/check-mark.svg" alt="check" width={22} height={22} />
        ) : (
          <Image
            className="animate-spin opacity-40"
            src="/loader-circle-pink.svg"
            alt="check"
            width={18}
            height={18}
          />
        )}
      </div>
      <div className="flex justify-center">
        {state && state.playerTwoHasCommitted === true ? (
          <Image src="/check-mark.svg" alt="check" width={22} height={22} />
        ) : (
          <Image
            className="animate-spin opacity-40"
            src="/loader-circle-pink.svg"
            alt="check"
            width={18}
            height={18}
          />
        )}
      </div>

      <div className="flex items-center px-4 py-1">Hit</div>
      <div className="flex items-center justify-center px-4 py-1 font-bold text-gray-500">
        {state && state.playerOneHits}
      </div>
      <div className="flex items-center justify-center px-4 py-1 font-bold text-gray-500">
        {state && state.playerTwoHits}
      </div>

      <div className="flex items-center px-4 py-1">Miss</div>
      <div className="flex items-center justify-center px-4 py-1 font-bold text-gray-500">
        {state && countMissesPlayer2}
      </div>
      <div className="flex items-center justify-center px-4 py-1 font-bold text-gray-500">
        {state && countMissesPlayer1}
      </div>

      <div className="flex items-center px-4 py-1">Win</div>
      <div className="flex items-center justify-center px-4 py-1">
        {state && state.playerOneIsWinner === true ? (
          <Image src="/check-mark.svg" alt="check" width={22} height={22} />
        ) : (
          <div />
        )}
      </div>
      <div className="flex items-center justify-center px-4 py-1">
        {state && state.playerTwoIsWinner === true ? (
          <Image src="/check-mark.svg" alt="check" width={22} height={22} />
        ) : (
          <div />
        )}
      </div>
    </div>
  );
};
