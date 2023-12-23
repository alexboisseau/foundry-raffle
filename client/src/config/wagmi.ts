import { configureChains, createConfig } from "wagmi";
import { foundry, sepolia } from "wagmi/chains";
import { InjectedConnector } from "wagmi/connectors/injected";

import { publicProvider } from "wagmi/providers/public";
import { alchemyProvider } from "wagmi/providers/alchemy";

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [sepolia, ...(import.meta.env?.MODE === "development" ? [foundry] : [])],
  [
    alchemyProvider({
      apiKey: import.meta.env.VITE_SEPOLIA_ALCHEMY_RPC_URL,
    }),
    publicProvider(),
  ],
);

export const config = createConfig({
  connectors: [
    new InjectedConnector({
      chains,
      options: {
        name: "Injected",
        shimDisconnect: true,
      },
    }),
  ],
  publicClient,
  webSocketPublicClient,
});
