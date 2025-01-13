import { Destroyer } from "./destroyer";
import { Game, Orientation } from "./game";

export interface PieceProps {
  isDestroyer: boolean;
  game: Game;
  orientation: Orientation;
}

export const PieceDestroyer = ({ isDestroyer, game, orientation }: PieceProps) => {
  return isDestroyer ? <Destroyer game={game} orientation={orientation} /> : null;
};
