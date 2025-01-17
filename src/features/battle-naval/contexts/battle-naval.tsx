import {
  createContext,
  type ReactElement,
  type ReactNode,
  useEffect,
  useState,
} from "react";
import {
  Actions,
  type PlayerGameState,
  AsyncActionStates,
  type ActionId,
} from "@/features/battle-naval/libs/midnight-js-api";
import { type ContractAddress } from "@midnight-ntwrk/compact-runtime";
import {
  NavalBattleGameMidnightJSAPI,
  EphemeralStateBloc,
  SubscribablePrivateStateProviderDecorator,
  unsafeCryptography,
} from "@/features/battle-naval/libs/midnight-js-api";
import type {
  DAppConnectorAPI,
  DAppConnectorWalletAPI,
  ServiceUriConfig,
} from "@midnight-ntwrk/dapp-connector-api";
import { type Logger } from "pino";
import {
  type AppProviders,
  type NavalBattleGameProviders,
} from "@/features/battle-naval/libs/midnight-js-api";
import { pipe, Resource } from "@/features/battle-naval/libs/midnight-js-api";
import { levelPrivateStateProvider } from "@midnight-ntwrk/midnight-js-level-private-state-provider";
import { FetchZkConfigProvider } from "@midnight-ntwrk/midnight-js-fetch-zk-config-provider";
import { httpClientProofProvider } from "@midnight-ntwrk/midnight-js-http-client-proof-provider";
import { indexerPublicDataProvider } from "@midnight-ntwrk/midnight-js-indexer-public-data-provider";
import {
  type BalancedTransaction,
  createBalancedTx,
  type UnbalancedTransaction,
} from "@midnight-ntwrk/midnight-js-types";
import {
  type CoinInfo,
  Transaction,
  type TransactionId,
} from "@midnight-ntwrk/ledger";
import {
  concatMap,
  filter,
  firstValueFrom,
  interval,
  map,
  of,
  take,
  tap,
  throwError,
  timeout,
} from "rxjs";
import {
  getLedgerNetworkId,
  getZswapNetworkId,
} from "@midnight-ntwrk/midnight-js-network-id";
import semver from "semver";
import { inMemoryPrivateStateProvider } from "../libs/midnight-js-api/api/in-memory-private-state-provider";

type DispatchActionType =
  | { type: typeof Actions.joinGame }
  | {
      type: typeof Actions.commitGrid;      
      playerSetup: bigint[];
    }
  | { type: typeof Actions.startGame }
  | { type: typeof Actions.makeMove; move: bigint }
  | { type: "deploy" }
  | { type: "join"; contractAddress: ContractAddress };

export interface AppContextTypes {
  isLoading: boolean;
  isClientInitialized: boolean;
  contractAddress: ContractAddress | null;
  state: PlayerGameState | undefined;
  dispatch: (action: DispatchActionType) => Promise<ActionId | undefined>;
}

export const AppContext = createContext<AppContextTypes | undefined>(undefined);

const initializeAPIEntrypoint = (
  logger: Logger,
  wallet: DAppConnectorWalletAPI,
  uris: ServiceUriConfig,
): Promise<APIEntrypoint> =>
  pipe(
    EphemeralStateBloc.init(logger.child({ entity: "ephemeral-state-stream" })),
    Resource.mapAsync(async (ephemeralStateBloc): Promise<APIEntrypoint> => {
      const walletState = await wallet.state();
      return new APIEntrypoint(
        {
          privateStateProvider: new SubscribablePrivateStateProviderDecorator(
            logger.child({
              entity: "private-state-provider",
            }),
            // levelPrivateStateProvider({
            //   privateStateStoreName: "naval-battle-gameprivateState",
            // }),
            inMemoryPrivateStateProvider()
          ),
          zkConfigProvider: new FetchZkConfigProvider(
            `${window.location.origin}/navalBattle`,
            fetch.bind(window),
          ),
          proofProvider: httpClientProofProvider(uris.proverServerUri),
          publicDataProvider: indexerPublicDataProvider(
            uris.indexerUri,
            uris.indexerWsUri,
          ),
          walletProvider: {
            coinPublicKey: walletState.coinPublicKey,
            balanceTx(
              tx: UnbalancedTransaction,
              newCoins: CoinInfo[],
            ): Promise<BalancedTransaction> {
              return wallet
                .balanceAndProveTransaction(tx, newCoins)
                .then((tx) =>
                  createBalancedTx(
                    Transaction.deserialize(
                      tx.serialize(getZswapNetworkId()),
                      getLedgerNetworkId(),
                    ),
                  ),
                );
            },
          },
          midnightProvider: {
            submitTx(tx: BalancedTransaction): Promise<TransactionId> {
              return wallet.submitTransaction(tx);
            },
          },
        },
        {
          logger,
          crypto: unsafeCryptography(),
          ephemeralStateBloc,
        },
      );
    }),
  )
    .allocate()
    .then((a) => a.value);

class APIEntrypoint {
  constructor(
    private readonly providers: NavalBattleGameProviders,
    private readonly appProviders: AppProviders,
  ) {}

  deploy(): Promise<NavalBattleGameMidnightJSAPI> {
    return NavalBattleGameMidnightJSAPI.deploy(
      this.providers,
      this.appProviders,
    );
  }

  join(address: ContractAddress): Promise<NavalBattleGameMidnightJSAPI> {
    return NavalBattleGameMidnightJSAPI.join(
      this.providers,
      this.appProviders,
      address,
    );
  }
}

export const AppProvider = ({
  children,
  logger,
}: {
  children: ReactNode;
  logger: Logger;
}): ReactElement => {
  const [state, setState] = useState<PlayerGameState | undefined>(undefined);
  const [api, setAPI] = useState<
    NavalBattleGameMidnightJSAPI | APIEntrypoint | null
  >(null);
  const [contractAddress, setContractAddress] =
    useState<ContractAddress | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isClientInitialized, setIsClientInitialized] = useState(false);

  const subscribeToOrganizerWelcomeState = (
    organizerWelcomeAPI: NavalBattleGameMidnightJSAPI,
  ): void => {
    setAPI(organizerWelcomeAPI);
    console.log({organizerWelcomeAPI})
    organizerWelcomeAPI.state$.subscribe({
      next: (state: PlayerGameState) => {
        setState(state);
        console.log("UI State inside subscription", state)
      },
    });
  };

  const JOINED_CONTRACT_ADDRESS_KEY = "joined-welcome-contract-address";

  const initializeAPI = async (
    logger: Logger,
    wallet: DAppConnectorWalletAPI,
    uris: ServiceUriConfig,
  ): Promise<void> => {
    const maybeExistingJoinAddress = localStorage.getItem(
      JOINED_CONTRACT_ADDRESS_KEY,
    );
    let api: NavalBattleGameMidnightJSAPI | APIEntrypoint =
      await initializeAPIEntrypoint(logger, wallet, uris);
    if (maybeExistingJoinAddress !== null) {
      api = await initializeWelcomeAPI("join", api, maybeExistingJoinAddress);
    }
    setAPI(api);
    setIsClientInitialized(true);
  };

  const initializeWelcomeAPI = async (
    type: "join" | "deploy",
    apiEntryPoint: APIEntrypoint,
    contractAddress?: ContractAddress,
  ): Promise<NavalBattleGameMidnightJSAPI> => {
    try {
      setIsLoading(true);
      let welcomeAPI;
      if (type === "join") {
        if (!contractAddress) {
          throw new Error(
            "Bug found: attempted to join without providing contract address",
          );
        }
        welcomeAPI = await apiEntryPoint.join(contractAddress);
      } else {        
        welcomeAPI = await apiEntryPoint.deploy();  
        console.log({welcomeAPI});           
      }
      subscribeToOrganizerWelcomeState(welcomeAPI);
      localStorage.setItem(
        JOINED_CONTRACT_ADDRESS_KEY,
        welcomeAPI.contractAddress,
      );
      setContractAddress(welcomeAPI.contractAddress);
      setIsClientInitialized(true);
      return welcomeAPI;
    } finally {
      setIsLoading(false);
    }
  };

  const connectToWallet = (): Promise<{
    wallet: DAppConnectorWalletAPI;
    uris: ServiceUriConfig;
  }> => {
    const compatibleConnectorAPIVersion = "1.x";
    return firstValueFrom(
      pipe(
        interval(100),
        map(() => window.midnight?.mnLace),
        tap((maybeLace) => {
          logger.info("Checking that wallet is present...", maybeLace);
        }),
        filter(
          (
            maybeAPI: DAppConnectorAPI | undefined,
          ): maybeAPI is DAppConnectorAPI => maybeAPI !== undefined,
        ),
        concatMap((api) =>
          semver.satisfies(api.apiVersion, compatibleConnectorAPIVersion)
            ? of(api)
            : throwError(
                () =>
                  new Error(
                    `expected ${compatibleConnectorAPIVersion}, got ${api.apiVersion}`,
                  ),
              ),
        ),
        tap((lace) => {
          logger.info("Wallet is present, connecting...", lace);
        }),
        take(1),
        timeout({
          first: 1_000,
          with: () => throwError(() => new Error("Could not find wallet")),
        }),
        concatMap(async (api) => {
          const isEnabled = await api.isEnabled();
          logger.info("Connection status:", isEnabled);
          return api;
        }),
        timeout({
          first: 5_000,
          with: () => throwError(() => new Error("Wallet does not respond")),
        }),
        concatMap(async (api: DAppConnectorAPI) => {
          const wallet = await api.enable();
          logger.info("Obtained wallet connection");
          const uris = await api.serviceUriConfig();
          return { wallet, uris };
        }),
      ),
    );
  };

  useEffect(() => {
    logger.info("Initializing Midnight connection");
    connectToWallet()
      .then(({ wallet, uris }) => initializeAPI(logger, wallet, uris))
      .catch((error) => {
        setIsClientInitialized(false);
        logger.error("Error connecting to lace", error);
      });
  }, []);

  useEffect(() => {
    if (state?.actions != null && isLoading) {
      const { latest } = state.actions;
      if (latest != null) {
        const latestAction = state.actions.all[latest];
        if (latestAction.status !== AsyncActionStates.inProgress) {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
    }
  }, [state]);

  const dispatch = async (
    action: DispatchActionType,
  ): Promise<ActionId | undefined> => {
    setIsLoading(true);
    try {
      switch (action.type) {
        case Actions.joinGame: {
          if (api instanceof NavalBattleGameMidnightJSAPI) {
            return await api.joinGame();
          } else {
            return undefined;
          }
        }
        case Actions.commitGrid: {
          if (api instanceof NavalBattleGameMidnightJSAPI) {
            return await api.commitGrid(action.playerSetup);
          } else {
            return undefined;
          }
        }
        case Actions.startGame: {
          if (api instanceof NavalBattleGameMidnightJSAPI) {
            return await api.startGame();
          } else {
            return undefined;
          }
        }
        case Actions.makeMove: {
          if (api instanceof NavalBattleGameMidnightJSAPI) {
            return await api.makeMove(action.move);
          } else {
            return undefined;
          }
        }
        case "deploy":
          if (api instanceof APIEntrypoint) {                   
            await initializeWelcomeAPI("deploy", api);                
            return;
          } else {
            return undefined;
          }
        case "join":
          if (api instanceof APIEntrypoint) {
            await initializeWelcomeAPI("join", api, action.contractAddress);            
            return;
          } else {
            return undefined;
          }
        default:
          return "Action type does not exist";
      }
    } catch (error) {
      if (error instanceof Error) {
        logger.error(error);
      }
    }
  };

  return (
    <AppContext.Provider
      value={{
        isLoading,
        isClientInitialized,
        state,
        contractAddress,
        dispatch,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
