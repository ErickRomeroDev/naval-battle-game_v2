# Battleship DApp Documentation
![Game UI](/gameimage.jpeg)

## 1. Introduction

### 1.1 About the Game
The Battleship DApp is a **blockchain-based implementation** of the classic Battleship game, leveraging **Midnight technology** and **zero-knowledge proofs (ZKPs)** to ensure a secure, private, and fair gameplay experience. This decentralized application (DApp) enables two players to compete in a turn-based system, guessing grid coordinates to sink each other's boats. The game is implemented using a 10x10 grid, with rows labeled A–J along the Y-axis and columns numbered 1–10 along the X-axis.

Each player must place five boats on the grid, with each boat having a different length, ranging from 5 to 2 positions. The UI provides an intuitive and interactive interface where users can easily position their boats on the grid. Players can also adjust the orientation of each boat between vertical and horizontal to suit their strategy. Designed as a completely trustless and privacy-maintained game, it ensures that no external party, including the opposing player, can access private information, such as ship placements, thanks to advanced zero knowledge cryptographic techniques.

This repository includes all the necessary UI components to deliver a polished and user-friendly experience. It offers a complete end-to-end DApp implementation, enabling users to interact seamlessly with the game through a responsive and engaging UI, fully integrated with the underlying Midnight blockchain APIs and infrastructure for a smooth and secure gameplay experience.

### 1.2 Purpose of the DApp
- Demonstrate Midnight's capabilities of performing restrictive logic on a decentralized ledger based on private information.
- Showcase the necessity and effective use of zero-knowledge proofs (ZKPs) to prove information without revealing it, ensuring privacy and trustlessness.
- Highlight Midnight's ability to enable the development of end-to-end decentralized applications that combine secure computation, privacy, and usability.
- Provide a real-world example of how private and complex logic can be executed seamlessly while maintaining user confidentiality, leveraging Midnight's Compact smart contracts, APIs, providers and Lace Wallet.

### 1.3 Demo
A demo of the application showcasing two users playing the game is available. You can access the demo through this [link](https://youtube.com)

## 2. Prerequisites

### For End Users:
- Docker installed and working on your system. [Docker installation guide](https://docs.midnight.network/develop/tutorial/using/prereqs) 
- Lace Wallet installed and configured. [Lace installation guide](https://docs.midnight.network/develop/tutorial/using/chrome-ext)
- Token aquisition. [Get your tokens here](https://docs.midnight.network/develop/tutorial/using/faucet)
- Install and run your own proof server. [Proof server installation guide](https://docs.midnight.network/develop/tutorial/using/proof-server)
- Google Chrome web browser.
### For Developers:
- Same Prerequisite for End Users, plus:
- Node version manager (NVM). [Installation guide](https://github.com/nvm-sh/nvm#installing-and-updating)
- Midnight Compact compiler. [Compact Installation guide](https://docs.midnight.network/develop/tutorial/building/prereqs)


## 3. Development Process & Features
The development process was divided into four phases, each focusing on a key aspect of the DApp development and its features:
- Contract Logic and Unit Testing
- Integration with Providers and Local Network Testing
- React Integration with Hooks
- UI Integration

### 3.1 Phase-One: Contract Logic and Unit Testing
Develop the core logic of the **Compact smart contract**, ensuring that the foundational game mechanics and rules are enforced directly at the contract level. All functionality is thoroughly tested using the contract logic and the outputs of the circuits after compilation.

#### Features Developed:
- Game rules enforcement using Compact, see section [6.1](#61-game-rules) and [6.2](#62-rule-enforcement)
- Private Oracle development, see section [6.3](#63-private-information-management)
- Unit testing using Jest and circuit outputs, no need of providers or local network.
#### Innovative approach or execution
- We utilize the latest version of the Compact language, which introduces new syntax for vector-handling operators such as map and fold. These operators are employed to efficiently manage indexing logic for vectors.
- We explored various methods for handling vector indexing. One approach involved using counters on the ledger; however, this proved inefficient as it resulted in large circuit sizes that exceeded transaction limits. Ultimately, we opted for the initial approach, utilizing map and fold operators. This decision opened up new possibilities for optimizing contract code, making the process both efficient and fascinating.
- We leverage the new module importing sintaxis capabilities in our contract code, allowing us to import code from other files in a easy to understand approach. This helps keep the main logic clean, organized, and easy to understand.
- The private Oracle utilizes the contract address to monitor multiple games played by the user. This allows the user to join several games using the same private key.
- We ensure that a user cannot modify their gameplay by requiring them to commit their gameplay upfront. When the user takes another turn, they can prove their gameplay remains unchanged by demonstrating that the hash of their current gameplay matches the committed hash stored on the ledger.


### 3.2 Phase-Two: Integration with Providers and Local Network Testing
Set up a **local blockchain** and integrate it with **Midnight’s providers**. During this phase, we developed a TypeScript-based contract API for managing deployment and circuit operations as a class. Zero-knowledge circuits and smart contract functionalities were tested within a simulated blockchain environment using Jest to ensure proper implementation and functionality.

#### Features Developed:

- Configured a local network to simulate testnet operations (Undeployed)
- Validated contract deployment and execution on a local blockchain (Undeployed).
- Create a contract API (as a typescript class) using providers to manage deployments, user interactions, and contract-circuit operations.
- Enabled seamless interaction with the blockchain for game actions like join game, commit, start game and make move.
- Implemented functionality for submitting transactions and verifying results real-time.
- Unit testing using docker, local network, providers, Jest, and an instance of the Contract API Class.
- It was used a headless Lace wallet implementation.
- Automated error handling and transaction monitoring.
#### Innovative approach or execution
- The code structure for Phase 1 and Phase 2 is designed to be easily integrated into the UI, either manually or through an npm package.
- We adhered to best practices for code development, utilizing workspaces and Turbo for streamlined installation. The end user only needs to run npx turbo build to compile and build the source code for Phase 1 and Phase 2.
- Unit tests were conducted with two users, each represented by a separate private key and simulated using an in-memory private provider.
- Real-time responsiveness was achieved by leveraging the indexer's WebSockets. Observables and RX-JS tools were utilized in the contract API to ensure the application remains active, providing all users with live updates without requiring a page refresh.
- The entire contract logic was encapsulated within a single TypeScript class, enabling easier management, maintenance, and bug detection.

### 3.3 Phase-Three: React Integration with Hooks
Develop reusable hooks to seamlessly connect the frontend with smart contracts, simplifying blockchain interactions for the UI layer. These React hooks are designed for easy integration, allowing developers to effortlessly import specific contract functionalities and incorporate them into their applications.

#### Features Developed:
- Hooks for integrating and executing smart contract actions within the UI.
- Enabled seamless connection and signing of blockchain transactions via browser Lace Wallet.
- Real-time tracking of hits, misses, remaining boats for both players, and other relevant contract states. 
- Observables are subscribed to, ensuring that any state changes automatically update the UI.
#### Innovative approach or execution
- Plug-and-play hooks designed for seamless integration into any React UI. Developers don’t need in-depth knowledge of blockchain or Midnight's underlying technology; they only need to understand the contract or game logic to utilize the hooks effectively. We have created an intuitive and user-friendly hook structure that simplifies implementation and ensures ease of use. [See the context-hook implementation here](https://github.com/ErickRomeroDev/naval-battle-game_v2/blob/main/src/features/battle-naval/contexts/battle-naval.tsx)

### 3.4 Phase-Four: UI Integration
Design and implement a responsive, user-friendly interface that seamlessly integrates with the hooks developed in Phase 3, ensuring a smooth and intuitive user experience. While Phases 1, 2, and 3 focus on application security and functionality, Phase 4 is crucial for user engagement and experience, transforming the application into something truly usable and appealing. A great application is nothing without users, so we have dedicated significant effort to the UI, making it enjoyable, intuitive, and delivering a magnificent user experience. This is the highlight of the project, and we have put immense care and attention into perfecting it.

#### Features Developed:
- Real-time updates for blockchain actions.
- Dynamic 10x10 grid representation with real-time updates for hits(red points) and misses(blue points).
- Enables horizontal or vertical placement with a simple mouse click.
- Allows users to make a move by simply selecting a position on the grid.
- Each user is presented with two grids: one displaying their gameplay, including hits and misses received from the opponent, and another showing their moves along with indicators of whether they were hits or misses.
- Clear indicators for guesses, hits, and sunk boats. 
- Visually communicates the correct player turn and game execution order by disabling buttons when actions are not allowed.
- Optimized for desktop devices.
- Displays each player’s remaining boats, hit/miss statistics, and game status.
- Animations for hits, misses, and winning/losing conditions.
- User-friendly messages(toasters) for errors like invalid actions, valid actions, loading states and disconnected wallets.
- Highlights the active player’s grid and status. 
- Ensures only valid grid coordinates can be guessed.
- Declares a winner when all of an opponent's boats are sunk.
- Clean UI design and optimal user experience.
#### Innovative approach or execution
- Adhering to best practices in developing React components to ensure they are clear, maintainable, and easy for other developers to understand.
- Components are organized by features, allowing the application to be logically segmented and scalable, ensuring sustainability as new features are added and more developers join the project.- 


## 4. Installation and Setup
For developing a Midnight dApp, we have outlined four phases of development. To simply run the dApp, the contract compilation output, cryptographic keys and logic are already provided, with the process detailed in section 4.1. For those interested in modifying the contract or experimenting further, we’ve included the repository where Phase 1 and Phase 2 were developed, along with additional testing resources in section 4.2.

### 4.1 Dapp End user 
Clone the Repository
```bash
git clone https://github.com/ErickRomeroDev/naval-battle-game_v2
cd naval-battle-game_v2
```
Install Dependencies
```bash
npm install
```

### 4.2 For testing and contract compilation in Phase 1 and Phase 2
Clone the Repository
```bash
git clone https://github.com/ErickRomeroDev/midnight-examples-0.1.16_v2
cd midnight-examples-0.1.16_v2
```
Install Dependencies
```bash
nvm install
corepack enable
yarn
export COMPACT_HOME='<absolute path to compactc directory>'
cd examples/naval-battle-game
```
Notice that naval-battle-game contains two sub-directories, each of which is a separately buildable project.  

**contract** - contains the Compact source for the game contract, associated TypeScript to configure the private state, plus the unit testing of the contract logic  
**midnight-js** - contains the development of the contract interface using a headless Midnight wallet, a local network and providers. Unit Testing is performed using the local network.  

Compile the code
```bash
npx turbo build
```

## 5. Running the Code

### 5.1 Dapp End user (Testnet)

**Start the DApp:**  
At the root of the repo, run
```bash
npm run dev
```
Open your browser and navigate to http://localhost:3000 using Google Chrome. Ensure your Lace Wallet is connected to the testnet and your proof server is running.

**Play the Game:**  
Follow the gameplay rules outlined in Section 6.

### 5.2 For testing and contract compilation in Phase 1 and Phase 2

**Deploy the Smart Contract Locally and perform unit tests:**  
At the root of the repo, run
```bash
cd examples/naval-battle-game/contract
compactc ./src/naval-battle-game.compact ./src/managed/naval-battle-game
yarn build
yarn test 
```

**Build the contract class API using providers and local network. Perform unit test with JEST**  
Ensure your Docker desktop is running. At the root of the repo, run
```bash
cd examples/naval-battle-game/midnight-js
yarn build
yarn test 
```
The outputs from the contract and midnight-js folders are imported into the DApp repository and are located under:
[Folder where the outputs where imported in the Dapp repo](https://github.com/ErickRomeroDev/naval-battle-game_v2/tree/main/src/features/battle-naval/libs)

## 6. Gameplay

### 6.1 Game Rules

- The game board is a 10x10 grid labeled A–J (Y-axis) and 1–10 (X-axis). 
- Players position five boats on the grid, each with lengths ranging from 2 to 5 squares. The fleet consists of: one 5-square boat (Carrier), one 4-square boat (Battleship), one 3-square boat (Cruiser), one 2-square boat (Submarine), and another 2-square boat (Destroyer).
- All boats should be placed within the grid limits.
- The boats must be placed horizontally and/or vertically and they must not overlap.
- The boats cannot be moved once the game on the DApp begins. 
- Players take turns guessing grid coordinates to locate their opponent’s boats. 
- The player who correctly guesses all the grid squares occupied by the opponent’s boats wins the game.
- The DApp automatically declares the winner.
- **Private information considerations:** Securely validate boat placements without exposing their locations, and  prove hits and misses without revealing the game state.

### 6.2 Rule Enforcement
Rules are enforced both at the **smart contract level**, to ensure compliance, and at the **UI level**, to improve user experience.

**Smart Contract Enforcement**  
Compact can enforce rules through the use of declared types and assertions. We have implemented a comprehensive set of rules to ensure every detail of the game mechanics is strictly enforced. The contract file can be found [here](https://github.com/ErickRomeroDev/naval-battle-game_v2/tree/main/src/features/battle-naval/libs/contract) The smart contract enforces the following rules:

```typescript
witness local_gameplay(): Vector<100, Uint<1>>;  //Type protection. Ensures that the user's local gameplay grid consists of 100 positions, each representing either an empty space or a position occupied by a ship.
```
```typescript
witness set_local_gameplay(playerSetup: Vector<100, Uint<1>>): Bytes<32>;    //Type protection. Ensures that the user's local gameplay grid consists of 100 positions, each representing either an empty space or a position occupied by a ship. This is the saving function.
```

```typescript
export ledger playerOneCurrentMove: Cell<Uint<0..100>>;  //Type protection. Player1 can not make a move that is not within the grid
```
```typescript
export ledger playerTwoCurrentMove: Cell<Uint<0..100>>;  //Type protection. Player2 can not make a move that is not within the grid
```
```typescript
assert (gameStarted == false) "Game has already started" ;  
assert (players.less_than(2)) "Game is designed for two players";
assert (playerOnePk != player) "Player one cannot join the game twice"; 
assert (numberOfShips == 16) "Player has not placed 16 ships";  
assert (playerOneHasJoinedTheGame == true) "Player one has not joined the game";
assert (playerTwoHasJoinedTheGame == true) "Player two has not joined the game";
assert (playerOneHasCommitted == false) "Player one has already committed";
assert (playerTwoHasCommitted == false) "Player two has already committed";
assert (playerOnePk == public_key(local_sk())) "PlayerOne confirmation failed"; 
assert (playerTwoPk == public_key(local_sk())) "PlayerTwo confirmation failed";
assert (playerTwoIsWinner == false) "Game has a winner";
assert (playerOneIsWinner == false) "Game has a winner";
assert (playerTwoPk == public_key(local_sk())) "You are not player two";
assert (playerOnePk == public_key(local_sk())) "You are not player one";
assert (playerTwoGrid.lookup(move) == CellState.unset) "Cell Player2 has already been played";
assert (playerOneGrid.lookup(move) == CellState.unset) "Cell Player1 has already been played";
assert (playerOneTimeToPlay == true) "It is not player one's turn";
assert (playerTwoTimeToPlay == true) "It is not player two's turn";
assert (vectorHash(local_gameplay()) == playerOneCommit) "Player one has tampered with the grid";
assert (vectorHash(local_gameplay()) == playerTwoCommit) "Player two has tampered with the grid";
if (playerOneHits == 15) {
  playerOneIsWinner.write(true);
} //declaring Player 1 a winner
if (playerTwoHits == 15) {
  playerTwoIsWinner.write(true);
} //declaring Player 2 a winner
```

**UI Enforcement:**  
The UI provides additional layers of rule enforcement to enhance the user experience:

- Boats snap to the grid, ensuring proper alignment.
- Visual warnings for invalid placements (e.g., contract missing 16 positions message).
- A visual warning is displayed when a player attempts to play a position that has already been used
- The UI disables input when it’s not the player’s turn, preventing invalid moves.
- A turn indicator notifies the player when it’s their turn.
- Buttons and grids are disabled for the inactive player.
- A player's gameplay, including boat positions, cannot be altered once their commitment has been made

### 6.3 Private information management
The Oracle handling private information is designed to allow each user to connect to multiple games with different players. The private information includes a unique private key and details of multiple game sessions associated with different contract addresses. The oracle can be found [here](https://github.com/ErickRomeroDev/naval-battle-game_v2/blob/main/src/features/battle-naval/libs/contract/witnesses.ts)

```typescript
export const witnesses = {
  local_sk: ({ privateState }: WitnessContext<Ledger, NavalBattlePrivateState>): [NavalBattlePrivateState, Uint8Array] => [
    privateState,
    privateState.secretKey,
  ],

  set_local_gameplay: (
    { privateState, contractAddress }: WitnessContext<Ledger, NavalBattlePrivateState>,
    playerSetup: bigint[],
  ): [NavalBattlePrivateState, Uint8Array] => {
    const updatedGameplay = { ...privateState.localGameplay }; // Ensure it is an object

    // Update the gameplay map
    updatedGameplay[contractAddress] = playerSetup.map((value) => value.toString());

    return [
      {
        ...privateState,
        localGameplay: updatedGameplay,
      },
      pureCircuits.vectorHash(playerSetup),
    ];
  },

  local_gameplay: ({
    privateState,
    contractAddress,
  }: WitnessContext<Ledger, NavalBattlePrivateState>): [NavalBattlePrivateState, bigint[]] => [
    privateState,
    (privateState.localGameplay[contractAddress] ?? []).map((value) => BigInt(value)),   
  ],
};
```

### 6.4 Enhancing User Experience
#### Error Handling:
We leverage the capabilities of the Midnight indexer to manage all actions involving smart contract transactions, including successful transactions, failed transactions, and their failure reasons. The Midnight indexer operates via WebSockets, enabling us to use observables at the code level to handle all user interactions in real-time. This ensures that users can stay updated on the actions of other players as they occur. These interactions are managed within a React framework, with toasts displayed to inform users about the status of the contract and relevant updates.
#### Guided Setup:
The UI is designed to provide an intuitive and seamless gameplay experience. Boat placement is fully interactive, allowing users to position their ships on the grid and toggle orientation with a simple mouse click. Moves are also made directly on the UI by selecting a point within the grid where the user wants to play.
Each player is presented with two grids: one showing their local gameplay, including points where the opponent has hit them, and another displaying their moves, indicating whether they were hits or misses. Hits are represented by red circles, and misses by blue circles, making the gameplay clear and engaging.
The interface ensures ease of use with disabled buttons when actions are unavailable, guiding the user step-by-step through the game. This intuitive design guarantees an enjoyable and user-friendly experience for players.
#### Responsive Design:
This application is built on WebSockets, observables, and a reactive design powered by RX-JS. Real-time updates are a core feature, ensuring users receive the latest results instantly without the need to refresh the page.

## 7. Technical Architecture

**Tech Stack**  
- Frontend: React & Next 15.
- Backend: Midnight Infrastructure: Node, Indexer and Proof Server. 
- Wallet: Lace Wallet  v1.2.3.
- Tooling: Midnight APIs and Providers.
- Reactivity: RX-JS library plus indexer websocket features.
- Vscode: Midnight extension v0.2.13
- Contract Compiler: Compact v0.20.0 (we use the latest features for vector handling and declaration)

## 8. Additional Notes

### Future Enhancements:
- Users can view a list of all available games and join any game of their choice (database integration)
- Leaderboard integration (UX)
- An option to place bets, with the winner receiving the prize.(ZSwap integration with smart contracts)
- Winner can trigger actions on other smart contracts (recursive zero knowledge features)

### Known Issues: 
- When a transaction is canceled during the signing process, the LACE wallet UI emits an exception if the user presses "Deny." However, if the user clicks the "X" to close the signing message, no exception is emitted. As a result, the UI does not receive any confirmation of the cancellation, causing the loading state to persist indefinitely.

### Contact Information: 
- Developed by Edda Labs. www.eddalabs.io

## 9. License
This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation.  
This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY
