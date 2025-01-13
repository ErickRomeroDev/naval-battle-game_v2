import { Cruiser } from "./cruiser"
import { Game, Orientation } from "./game";

export interface PieceProps {
  isCruiser: boolean;
  game: Game;
  orientation: Orientation
}

export const PieceCruiser = ({isCruiser, game, orientation }: PieceProps) => {
 return isCruiser ? <Cruiser game={game} orientation={orientation} /> : null
}