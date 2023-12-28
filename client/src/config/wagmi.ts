import { configureChains } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { defaultWagmiConfig } from "@web3modal/wagmi/react";
import { SUPPORTED_CHAINS } from "../constants/supported-chains";

const walletConnectProjectId = import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID;

const { chains } = configureChains(SUPPORTED_CHAINS, [
  alchemyProvider({
    apiKey: import.meta.env.VITE_SEPOLIA_ALCHEMY_RPC_URL,
  }),
  publicProvider(),
]);

const config = defaultWagmiConfig({
  chains,
  projectId: walletConnectProjectId,
});

export { config, chains, walletConnectProjectId };
