import { configureChains } from "wagmi";
import { foundry, sepolia } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { defaultWagmiConfig } from "@web3modal/wagmi/react";

const walletConnectProjectId = import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID;

const { chains } = configureChains(
  [sepolia, ...(import.meta.env?.MODE === "development" ? [foundry] : [])],
  [
    alchemyProvider({
      apiKey: import.meta.env.VITE_SEPOLIA_ALCHEMY_RPC_URL,
    }),
    publicProvider(),
  ],
);

const config = defaultWagmiConfig({
  chains,
  projectId: walletConnectProjectId,
});

export { config, chains, walletConnectProjectId };
