import { useRef, type ReactNode } from "react";
import { useDrop } from "react-dnd";
import { Square } from "./square";
import { Overlay, OverlayType } from "./overlay";
import { Game, Orientation } from "./game";

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
      {isOver && !canDrop && <Overlay type={OverlayType.IllegalMoveHover} />}      
      {isOver && canDrop && <Overlay type={OverlayType.LegalMoveHover} />}
    </div>
  );
};
