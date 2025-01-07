import { GeistSans } from "geist/font/sans";
import { type AppType } from "next/app";

import { api } from "@/utils/api";
import * as pino from "pino";

import "@/styles/globals.css";
import {
  setNetworkId,
  type NetworkId,
} from "@midnight-ntwrk/midnight-js-network-id";
import { AppProvider } from "@/features/battle-naval/contexts/battle-naval";

const networkId = "Undeployed" as NetworkId;
// const networkId = "TestNet" as NetworkId;
setNetworkId(networkId);

export const logger = pino.pino({
  level: "trace",
});

logger.trace("networkId = ", networkId);

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <div className={GeistSans.className}>
      <AppProvider logger={logger}>
        <Component {...pageProps} />
      </AppProvider>
    </div>
  );
};

export default api.withTRPC(MyApp);
