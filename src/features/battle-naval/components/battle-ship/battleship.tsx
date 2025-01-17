import { useRef, useState } from "react";
import { useDrag } from "react-dnd";
import { motion } from "motion/react"

import { cn } from "@/lib/utils";
import { Game, Orientation } from "./game";

export interface PieceProps {  
  game: Game;
  orientation: Orientation
}

export const Battleship = ({game, orientation}: PieceProps) => {
  const battleshipRef = useRef<HTMLDivElement>(null);
  const battleshipSize = Game.shipsInitialPosition.battleship.size;
  const [x, y, orientation_] = game.battleshipPosition;

  const [isHorizontal, setIsHorizontal] = useState(true); 

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: Game.shipsInitialPosition.battleship.name,
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
    [],
  );

  // Attach the drag functionality to the shipRef
  drag(battleshipRef);

  return (
    <>
      <motion.div
        ref={battleshipRef}
        animate={{ rotate: isHorizontal ? 0 : 90 }}
        transition={{ease: [0.65, 0, 0.35, 1]}}
        onClick={() => {setIsHorizontal(!isHorizontal); game.moveBattleship(x, y, isHorizontal ? "vertical" : "horizontal")}}
        className={cn(
          "relative h-full w-full cursor-move text-[40px] font-bold z-30",
          isDragging ? "opacity-50" : "opacity-100",
        )}
      >
        <div 
        className="absolute inset-0 z-30 rounded-l-lg rounded-r-3xl bg-gray-300 hover:bg-gray-200" 
        style={{width: battleshipSize * 34}} 
        />
      </motion.div>
    </>
  );
};
