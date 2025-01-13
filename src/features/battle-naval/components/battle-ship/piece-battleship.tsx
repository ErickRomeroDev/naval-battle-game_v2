import { Battleship } from "./battleship"
import { Game, Orientation } from "./game"

export interface PieceProps {
  isBattleship: boolean
  game: Game;
  orientation: Orientation
}

export const PieceBattleship = ({isBattleship, game, orientation}: PieceProps) => {
 return isBattleship ? <Battleship game={game} orientation={orientation} /> : null
}