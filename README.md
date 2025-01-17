# Battleship DApp Documentation

## 1. Introduction

### 1.1 About the Game
The Battleship DApp is a blockchain-based implementation of the classic Battleship game, leveraging **Midnight technology** and **zero-knowledge proofs (ZKPs)** to ensure a secure, private, and fair gameplay experience. This decentralized application (DApp) enables two players to compete on a turn-based system, guessing grid coordinates to sink each other's boats.

### 1.2 Purpose of the DApp
Provide a **secure and private platform** for playing Battleship using **Midnight's Compact smart contracts**.
Showcase innovative integration of **ZKPs** in a game environment.
Highlight seamless authentication and transaction management using **Lace Wallet**.

## 2. Development Process
The development process was divided into four phases, each focusing on a key aspect of the DApp and its features:

### Phase 1: Contract Logic and Unit Testing

#### Focus:
- Develop the core logic of the **Compact smart contract**.
- Ensure foundational game mechanics and rules are enforced at the contract level.

#### Features Developed:
##### I. **Boat Placement Validation**:
- Ensures boats fit within the grid and do not overlap.
- Allows horizontal and vertical placement only.
##### II. **Game Initialization**:
- Automatically sets up a new game with the required conditions (e.g., grid size, number of boats).
##### III. **Turn-Based Logic**:
- Implements player turn switching.
- Ensures only valid grid coordinates can be guessed.
##### IV. **Winner Selection**:
- Tracks hits and misses.
- Declares a winner when all of an opponent's boats are sunk.
##### V. **Unit Tests for Contract Logic**:
- Validates edge cases like overlapping boats, invalid grid sizes, and incorrect turns.

### Phase 2: Integration with Providers and Local Network Testing
#### Focus:
- Set up **local blockchain** and integrate with Midnight’s Compact SDK.
- Test zero-knowledge circuits and smart contract functionality in a simulated blockchain environment.
#### Features Developed:
##### I. **Zero-Knowledge Proofs (ZKP):
- Securely validate boat placements without exposing their locations.
Prove hits and misses without revealing the game state.
##### II. **Local Blockchain Network Setup:
- Configured a local network to simulate testnet conditions.
- Validated contract deployment and execution on the local blockchain.
##### III. **Provider Integration:
- Connected the smart contracts to the frontend via Midnight SDK.
- Enabled seamless interaction with the blockchain for game actions like guesses and state updates.
##### IV. **Blockchain Transaction Handling:
- Implemented functionality for submitting transactions and verifying results in the blockchain.

### Phase 3: React Integration with Hooks
Focus:
Build reusable hooks to connect the frontend to the smart contracts.
Simplify blockchain interactions for the UI layer.
Features Developed:
Lace Wallet Integration:
Hooks for authenticating and managing player sessions.
Enabled seamless connection and signing of blockchain transactions via Lace Wallet.
Game State Management:
Real-time tracking of hits, misses, and remaining boats for both players.
Hooks for updating grid states dynamically during gameplay.
Smart Contract Interaction:
Created hooks for invoking contract methods (e.g., makeGuess, setupGame).
Automated error handling and transaction monitoring.
ZKP Integration for React:
Abstracted ZKP verification into easy-to-use hooks for gameplay logic.
Phase 4: UI Integration
Focus:
Design and implement a responsive, user-friendly interface.
Connect the frontend to the hooks developed in Phase 3 for a seamless user experience.
Features Developed:
Game Board UI:
Dynamic 10x10 grid representation with real-time updates for hits and misses.
Clear indicators for guesses, hits, and sunk boats.
Turn-Based Interaction:
Intuitive UI for submitting guesses and displaying results.
Ensures the correct turn order is visually communicated.
Responsive Design:
Optimized for desktop and mobile devices.
Player Dashboard:
Displays each player’s remaining boats, hit/miss statistics, and game status.
Visual Effects:
Animations for hits, misses, and winning/losing conditions.
Error and Status Handling:
User-friendly messages for errors like invalid moves or disconnected wallets.
Real-time updates for blockchain transaction statuses.
3. Prerequisites
3.1 Tools Required
For End Users:
Lace Wallet installed and configured.
A modern web browser (Chrome, Firefox, etc.).
For Developers:
Node.js (minimum version X.X.X).
Midnight SDK (link to installation guide).
Docker (if running a local network).
Git (minimum version X.X.X).
4. Installation and Setup
4.1 Clone the Repository
bash
Copiar
Editar
git clone https://github.com/your-repo/battleship-dapp.git
cd battleship-dapp
4.2 Install Dependencies
bash
Copiar
Editar
npm install
5. Running the Code
5.1 Running on Testnet (For End Users)
Connect Lace Wallet:

Install and configure the Lace Wallet browser extension.
Fund your wallet with testnet tokens (link to faucet).
Start the DApp:

bash
Copiar
Editar
npm run dev
Open your browser and navigate to http://localhost:3000.
Ensure your Lace Wallet is connected to the testnet.
Play the Game:

Follow the gameplay rules outlined in Section 6.
5.2 Running in Undeployed Mode (For Developers)
Set Up Local Network:

Use Docker or Midnight SDK to create a local blockchain environment.
Start the local network:
bash
Copiar
Editar
docker-compose up
Deploy the Smart Contract Locally:

Compile and deploy the Compact smart contract to the local network:
bash
Copiar
Editar
npm run deploy:local
Run the DApp in Development Mode:

bash
Copiar
Editar
npm run dev
Open the browser and navigate to http://localhost:3000.
Test Compact Functionalities:

Modify the smart contract code in the /contracts directory.
Use the provided scripts in /scripts for unit and integration testing.
Example:
bash
Copiar
Editar
npm run test:contracts
6. Gameplay
6.1 Game Rules
Grid Setup:

The game board is a 10x10 grid labeled A–J (Y-axis) and 1–10 (X-axis).
Players place five boats, with lengths ranging from 2 to 5 grid squares, either horizontally or vertically.
Boats must not overlap and cannot be moved once the game starts.
Turn-Based Play:

Players take turns guessing grid coordinates to locate their opponent’s boats.
Each guess is a transaction submitted to the smart contract.
Players privately track hits and misses on their grid.
Winning Condition:

The player who correctly guesses all the grid squares occupied by the opponent’s boats wins the game.
The DApp automatically declares the winner.
6.2 Rule Enforcement
Rules are enforced both at the smart contract level and the UI level, ensuring compliance and improving user experience.

Smart Contract Enforcement
The smart contract enforces the following rules:

Valid Boat Placement:
Boats must stay within the grid bounds.
Boats must not overlap with each other.
Boats must be placed either horizontally or vertically.
Code Snippet:

typescript
Copiar
Editar
// Ensure boats are placed within bounds and do not overlap
function validateBoatPlacement(grid: string[][], boats: Boat[]): boolean {
  for (let boat of boats) {
    if (!isWithinBounds(boat)) return false;
    if (isOverlapping(grid, boat)) return false;
  }
  return true;
}

// Check if a boat is within grid bounds
function isWithinBounds(boat: Boat): boolean {
  return (
    boat.start.x >= 0 &&
    boat.start.x < 10 &&
    boat.start.y >= 0 &&
    boat.start.y < 10
  );
}

// Check for overlapping boats
function isOverlapping(grid: string[][], boat: Boat): boolean {
  for (let i = 0; i < boat.length; i++) {
    const x = boat.start.x + (boat.orientation === 'horizontal' ? i : 0);
    const y = boat.start.y + (boat.orientation === 'vertical' ? i : 0);
    if (grid[x][y] !== null) return true;
  }
  return false;
}
Turn-Based Play:
The contract tracks whose turn it is and ensures players cannot skip turns or make duplicate moves.
Code Snippet:

typescript
Copiar
Editar
// Validate player's turn
function validateTurn(gameState: GameState, player: string): boolean {
  return gameState.currentTurn === player;
}

// Update turn after a valid move
function updateTurn(gameState: GameState): void {
  gameState.currentTurn =
    gameState.currentTurn === gameState.player1
      ? gameState.player2
      : gameState.player1;
}
Winner Selection:
The contract automatically determines the winner when all boats of a player are sunk.
Code Snippet:

typescript
Copiar
Editar
// Check if all boats are sunk
function checkWinner(playerState: PlayerState): boolean {
  return playerState.boats.every((boat) => boat.isSunk);
}

// Declare winner
function declareWinner(gameState: GameState): string | null {
  if (checkWinner(gameState.player1State)) return gameState.player2;
  if (checkWinner(gameState.player2State)) return gameState.player1;
  return null;
}
UI Enforcement
The UI provides additional layers of rule enforcement to enhance the user experience:

Grid Setup:
Players can only place boats within the 10x10 grid using drag-and-drop or a coordinate selector.
Boats snap to the grid, ensuring proper alignment.
Implementation:

Feedback Mechanisms: Visual warnings for invalid placements (e.g., overlap or out-of-bounds).
Snapping Logic: Grid snapping implemented via CSS and JavaScript.
Code Snippet:

javascript
Copiar
Editar
// UI logic for boat snapping
const snapToGrid = (x, y) => {
  return {
    x: Math.floor(x / gridCellSize) * gridCellSize,
    y: Math.floor(y / gridCellSize) * gridCellSize,
  };
};
Turn-Based Play:
The UI disables input when it’s not the player’s turn, preventing invalid moves.
A turn indicator notifies the player when it’s their turn.
Implementation:

Disabled Actions: Buttons and grids are disabled for the inactive player.
Visual Cues: Highlights the active player’s grid.
Code Snippet:

javascript
Copiar
Editar
// Disable grid interactions for inactive players
const isPlayerTurn = (currentPlayer, user) => currentPlayer === user;
document.querySelector('#grid').disabled = !isPlayerTurn(gameState.currentTurn, user);
Real-Time Updates:
Tracks and displays hits, misses, and remaining boats on the player’s grid.
Animations for hits and misses improve feedback.
Implementation:

Hit/Miss Effects: Red for hits, blue for misses.
Remaining Boats: A counter displayed on the player dashboard.
Code Snippet:

javascript
Copiar
Editar
// Update grid with hit or miss
function updateGrid(coordinate, result) {
  const cell = document.querySelector(`#cell-${coordinate.x}-${coordinate.y}`);
  cell.classList.add(result === 'hit' ? 'hit' : 'miss');
}
Winner Announcement:
Displays a pop-up or banner when the game ends, declaring the winner.
Implementation:

Celebration Effects: Confetti animation or winning banner.
Reset Option: Button to reset the game and start over.
6.3 Enhancing User Experience
Error Handling: Clear error messages for invalid moves or disconnected wallets.
Guided Setup: Tooltips and instructions during the boat placement phase.
Responsive Design: Ensures the game works seamlessly on desktop and mobile devices.
7. Technical Architecture
7.1 Tech Stack
Frontend: React.
Backend: Compact smart contracts.
Blockchain: Midnight.
Wallet: Lace Wallet.
7.2 Key Contract Functions
setupGame
makeGuess
declareWinner
8. Evaluation Criteria
Technical Completion: Game rules, zero-knowledge proofs implemented.
Innovation: Novel use of Midnight technology.
Documentation: Clear, complete, and user-friendly.
Technology: Seamless integration with Midnight’s Compact language.
9. Additional Notes
Future Enhancements: Multiplayer tournaments, leaderboard integration.
Known Issues: Documented limitations or bugs.
Contact Information: Support channels.
10. License
Open-source license details for the DApp.

