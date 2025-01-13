import { Carrier } from "./carrier"
import { Game, Orientation } from "./game";

export interface PieceProps {
  isCarrier: boolean;
  game: Game;
  orientation: Orientation
}

export const PieceCarrier = ({isCarrier, game, orientation}: PieceProps) => {
 return isCarrier ? <Carrier game={game} orientation={orientation}/> : null
}