import { Game, Orientation } from "./game";
import { Submarine } from "./submarine"

export interface PieceProps {
  isSubmarine: boolean
  game: Game;
    orientation: Orientation

}

export const PieceSubmarine = ({isSubmarine, game, orientation}: PieceProps) => {
 return isSubmarine ? <Submarine game={game} orientation={orientation} /> : null
}