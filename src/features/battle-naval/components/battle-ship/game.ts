export type Position = [number, number, Orientation];

// takes a Position as an argument and performs an action (e.g., updating the UI)
export type PositionObserver = ((position: Position) => void) | null;

export type ShipsItemProps = {
  name: string;
  size: number; // Number of squares occupied    
}

export type Orientation = "horizontal" | "vertical"

export interface ShipsProps {
  carrier: ShipsItemProps,
  battleship: ShipsItemProps,
  cruiser: ShipsItemProps,
  submarine: ShipsItemProps,
  destroyer: ShipsItemProps,
}

export class Game {
  public battleshipPosition: Position = [1, 7, "horizontal"];  
  
  public carrierPosition: Position = [1, 4, "horizontal"];  
  
  public cruiserPosition: Position = [1, 3, "horizontal"]; 

  public submarinePosition: Position = [1, 2, "horizontal"];  

  public destroyerPosition: Position = [6, 2, "horizontal"]; 

  
  static shipsInitialPosition: ShipsProps = {
    carrier: { name: "Carrier", size: 5 },
    battleship: { name: "Battleship", size: 4 },
    cruiser: { name: "Cruiser", size: 3 },
    submarine: { name: "Submarine", size: 2 },
    destroyer: { name: "Destroyer", size: 2 },
  };

  private calculateOccupiedPositions(position: Position, size: number): number[][] {
    const [startX, startY, orientation] = position;
    const positions: number[][] = [];
  
    console.log(`Calculating occupied positions for: StartX=${startX}, StartY=${startY}, Orientation=${orientation}, Size=${size}`);
  
    for (let i = 0; i < size; i++) {
      if (orientation === "horizontal") {
        // Horizontal orientation: Increment along the X-axis
        const newPosition = [startX + i, startY];
        positions.push(newPosition);
        // console.log(`Added Horizontal Position: ${newPosition}`);
      } else if (orientation === "vertical") {
        // Vertical orientation: Increment along the Y-axis
        const newPosition = [startX, startY + i];
        positions.push(newPosition);
        // console.log(`Added Vertical Position: ${newPosition}`);
      } else {
        console.error("Invalid orientation detected:", orientation);
      }
    }
  
    return positions;
  }

  public getAllOccupiedPositions(): Record<string, number[][]> {
    return {
      carrier: this.calculateOccupiedPositions(
        this.carrierPosition,
        Game.shipsInitialPosition.carrier.size
      ),
      battleship: this.calculateOccupiedPositions(
        this.battleshipPosition,
        Game.shipsInitialPosition.battleship.size
      ),
      cruiser: this.calculateOccupiedPositions(
        this.cruiserPosition,
        Game.shipsInitialPosition.cruiser.size
      ),
      submarine: this.calculateOccupiedPositions(
        this.submarinePosition,
        Game.shipsInitialPosition.submarine.size
      ),
      destroyer: this.calculateOccupiedPositions(
        this.destroyerPosition,
        Game.shipsInitialPosition.destroyer.size
      ),
    };
  }

  public generateGridArray(): bigint[] {
    const allPositions = this.getAllOccupiedPositions();
    const occupiedSet = new Set<string>();
  
    Object.values(allPositions).forEach((positions) => {
      positions.forEach(([x, y]) => {
        occupiedSet.add(`${x},${y}`);
      });
    });
  
    const gridArray: number[] = [];
    const gridSize = 10; 
  
    for (let col = 0; col < gridSize; col++) {
      for (let row = 0; row < gridSize; row++) {
     
        const key = `${row},${col}`;
        // console.log(`Processing Column=${col}, Row=${row}, Key=${key}`);
        gridArray.push(occupiedSet.has(key) ? 1 : 0);
      }
    }
    console.log({gridArray})
  
    return gridArray.map((num) => BigInt(num));
  }

  public placedShips: ShipsItemProps[] = [];

  private battleshipObservers: PositionObserver[] = [];
  private carrierObservers: PositionObserver[] = [];
  private cruiserObservers: PositionObserver[] = [];
  private submarineObservers: PositionObserver[] = [];
  private destroyerObservers: PositionObserver[] = [];

  // Allows external entities (e.g., UI components) to "observe" changes in the knight's position.
  public battleshipObserve(o: PositionObserver): () => void {
    this.battleshipObservers.push(o);
    this.emitChange();

    //unsubscribe from observers list
    return (): void => {
      this.battleshipObservers = this.battleshipObservers.filter((t) => t !== o);
    };
  }

  public carrierObserve(o: PositionObserver): () => void {
    this.carrierObservers.push(o);
    this.carrierEmitChange();

    return (): void => {
      this.carrierObservers = this.carrierObservers.filter((t) => t !== o);
    };
  }

  public cruiserObserve(o: PositionObserver): () => void {
    this.cruiserObservers.push(o);
    this.cruiserEmitChange();

    return (): void => {
      this.cruiserObservers = this.cruiserObservers.filter((t) => t !== o);
    };
  }

  public submarineObserve(o: PositionObserver): () => void {
    this.submarineObservers.push(o);
    this.submarineEmitChange();

    return (): void => {
      this.submarineObservers = this.submarineObservers.filter((t) => t !== o);
    };
  }

  public destroyerObserve(o: PositionObserver): () => void {
    this.destroyerObservers.push(o);
    this.destroyerEmitChange();

    return (): void => {
      this.destroyerObservers = this.destroyerObservers.filter((t) => t !== o);
    };
  }

  // Updates the knight's position and notifies observers of the change.
  public moveBattleship(toX: number, toY: number, orientation: Orientation): void {
    this.battleshipPosition = [toX, toY, orientation];
    this.emitChange();
  }

  public moveCarrier(toX: number, toY: number, orientation: Orientation): void {
    this.carrierPosition = [toX, toY, orientation];
    this.carrierEmitChange();
  }

  public moveCruiser(toX: number, toY: number, orientation: Orientation): void {
    this.cruiserPosition = [toX, toY, orientation];
    this.cruiserEmitChange();
  }

  public moveSubmarine(toX: number, toY: number, orientation: Orientation): void {
    this.submarinePosition = [toX, toY, orientation];
    this.submarineEmitChange();
  }

  public moveDestroyer(toX: number, toY: number, orientation: Orientation): void {
    this.destroyerPosition = [toX, toY, orientation];
    this.destroyerEmitChange();
  }

  // Checks whether a knight can legally move from its current position to [toX, toY].
  public canMoveBattleship(toX: number, toY: number): boolean {
    const [carrierX, carrierY] = this.carrierPosition;
    const [battleshipX, battleshipY] = this.battleshipPosition;
    const [cruiserX, cruiserY] = this.cruiserPosition;
    const [submarineX, submarineY] = this.submarinePosition;
    const [destroyerX, destroyerY] = this.destroyerPosition;
    const carrierSize = Game.shipsInitialPosition.carrier.size;
    const battleshipSize = Game.shipsInitialPosition.battleship.size;
    const cruiserSize = Game.shipsInitialPosition.cruiser.size;
    const submarineSize = Game.shipsInitialPosition.submarine.size;
    const destroyerSize = Game.shipsInitialPosition.destroyer.size;
    return true;
  }

  public canMoveCarrier(): boolean {
    const [carrierX, carrierY] = this.carrierPosition;
    const [battleshipX, battleshipY] = this.battleshipPosition;
    const [cruiserX, cruiserY] = this.cruiserPosition;
    const [submarineX, submarineY] = this.submarinePosition;
    const [destroyerX, destroyerY] = this.destroyerPosition;
    const carrierSize = Game.shipsInitialPosition.carrier.size;
    const battleshipSize = Game.shipsInitialPosition.battleship.size;
    const cruiserSize = Game.shipsInitialPosition.cruiser.size;
    const submarineSize = Game.shipsInitialPosition.submarine.size;
    const destroyerSize = Game.shipsInitialPosition.destroyer.size;
    return true;
  }

  public canMoveCruiser(): boolean {
    const [carrierX, carrierY] = this.carrierPosition;
    const [battleshipX, battleshipY] = this.battleshipPosition;
    const [cruiserX, cruiserY] = this.cruiserPosition;
    const [submarineX, submarineY] = this.submarinePosition;
    const [destroyerX, destroyerY] = this.destroyerPosition;
    const carrierSize = Game.shipsInitialPosition.carrier.size;
    const battleshipSize = Game.shipsInitialPosition.battleship.size;
    const cruiserSize = Game.shipsInitialPosition.cruiser.size;
    const submarineSize = Game.shipsInitialPosition.submarine.size;
    const destroyerSize = Game.shipsInitialPosition.destroyer.size;
    return true;
  }

  public canMoveSubmarine(): boolean {
    const [carrierX, carrierY] = this.carrierPosition;
    const [battleshipX, battleshipY] = this.battleshipPosition;
    const [cruiserX, cruiserY] = this.cruiserPosition;
    const [submarineX, submarineY] = this.submarinePosition;
    const [destroyerX, destroyerY] = this.destroyerPosition;
    const carrierSize = Game.shipsInitialPosition.carrier.size;
    const battleshipSize = Game.shipsInitialPosition.battleship.size;
    const cruiserSize = Game.shipsInitialPosition.cruiser.size;
    const submarineSize = Game.shipsInitialPosition.submarine.size;
    const destroyerSize = Game.shipsInitialPosition.destroyer.size;
    return true;
  }

  public canMoveDestroyer(): boolean {
    const [carrierX, carrierY] = this.carrierPosition;
    const [battleshipX, battleshipY] = this.battleshipPosition;
    const [cruiserX, cruiserY] = this.cruiserPosition;
    const [submarineX, submarineY] = this.submarinePosition;
    const [destroyerX, destroyerY] = this.destroyerPosition;
    const carrierSize = Game.shipsInitialPosition.carrier.size;
    const battleshipSize = Game.shipsInitialPosition.battleship.size;
    const cruiserSize = Game.shipsInitialPosition.cruiser.size;
    const submarineSize = Game.shipsInitialPosition.submarine.size;
    const destroyerSize = Game.shipsInitialPosition.destroyer.size;
    return true;
  }

  // public isValidPlacement(ship: ShipsItemProps, x: number, y: number): boolean {
  //   // Check boundaries
  //   if (ship.orientation === "horizontal" && x + ship.size > 10) return false;
  //   if (ship.orientation === "vertical" && y + ship.size > 10) return false;

  //   // Check for overlaps
  //   return !this.placedShips.some((placedShip) => {
  //     if (!placedShip.position) return false;
  //     const { x: px, y: py } = placedShip.position;

  //     for (let i = 0; i < placedShip.size; i++) {
  //       const occupiedX =
  //         placedShip.orientation === "horizontal" ? px + i : px;
  //       const occupiedY =
  //         placedShip.orientation === "vertical" ? py + i : py;

  //       for (let j = 0; j < ship.size; j++) {
  //         const targetX = ship.orientation === "horizontal" ? x + j : x;
  //         const targetY = ship.orientation === "vertical" ? y + j : y;

  //         if (occupiedX === targetX && occupiedY === targetY) return true;
  //       }
  //     }

  //     return false;
  //   });
  // }

  // Notifies all registered observers about the knight's current position.
  private emitChange() {
    const pos = this.battleshipPosition;
    this.battleshipObservers.forEach((o) => o && o(pos));
  }

  private carrierEmitChange() {
    const pos = this.carrierPosition;
    this.carrierObservers.forEach((o) => o && o(pos));
  }

  private cruiserEmitChange() {
    const pos = this.cruiserPosition;
    this.cruiserObservers.forEach((o) => o && o(pos));
  }

  private submarineEmitChange() {
    const pos = this.submarinePosition;
    this.submarineObservers.forEach((o) => o && o(pos));
  }

  private destroyerEmitChange() {
    const pos = this.destroyerPosition;
    this.destroyerObservers.forEach((o) => o && o(pos));
  }
}
