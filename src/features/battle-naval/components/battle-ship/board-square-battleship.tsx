import { useRef, type ReactNode } from "react";
import { useDrop } from "react-dnd";
import { Square } from "./square";
import { Overlay, OverlayType } from "./overlay";
import { Game, Orientation } from "./game";
import { useBattleNavalContext } from "../../hooks/useBattleNavalContext";

export interface BoardSquareProps {
  x: number;
  y: number;
  orientation: Orientation;
  children?: ReactNode;
  game: Game;
}

export const BoardSquareBattleship = ({
  x,
  y,
  orientation,
  children,
  game,
}: BoardSquareProps) => {
  const { dispatch, contractAddress, isLoading, state, isClientInitialized } =
    useBattleNavalContext();
  const boardSquareRef = useRef<HTMLDivElement>(null);

  const [{ isOver, canDrop }, drop] = useDrop(
    () => ({
      accept: Game.shipsInitialPosition.battleship.name,
      canDrop: () => game.canMoveBattleship(x, y),
      drop: () => game.moveBattleship(x, y, orientation),
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
        canDrop: !!monitor.canDrop(),
      }),
    }),
    [game],
  );

  // Attach the drop functionality to the shipRef
  drop(boardSquareRef);

  return (
    <div
      ref={boardSquareRef}
      role="Space"
      data-testid={`(${x},${y})`}
      className="relative h-full w-full"
    >
      <Square>{children}</Square>
      {state &&
        state.publicKey === state.playerOnePk &&
        state.gridPlayer1?.[y]?.[x] === 1 && (
          <div className="absolute z-40 top-[12px] left-[12px] h-4 w-4 rounded-full bg-pink-300"></div>
        )}
      {state &&
        state.publicKey === state.playerOnePk &&
        state.gridPlayer1?.[y]?.[x] === 2 && (
          <div className="absolute z-40 top-[12px] left-[12px] h-4 w-4 rounded-full bg-blue-300"></div>
        )}
      {state &&
        state.publicKey === state.playerTwoPk &&
        state.gridPlayer2?.[y]?.[x] === 1 && (
          <div className="absolute z-40 top-[12px] left-[12px] h-4 w-4 rounded-full bg-pink-300"></div>
        )}
      {state &&
        state.publicKey === state.playerTwoPk &&
        state.gridPlayer2?.[y]?.[x] === 2 && (
          <div className="absolute z-40 top-[12px] left-[12px] h-4 w-4 rounded-full bg-blue-300"></div>
        )}
      {isOver && !canDrop && <Overlay type={OverlayType.IllegalMoveHover} />}
      {isOver && canDrop && <Overlay type={OverlayType.LegalMoveHover} />}
    </div>
  );
};
