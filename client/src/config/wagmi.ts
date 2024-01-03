import { configureChains, createConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { SUPPORTED_CHAINS } from "../constants/supported-chains";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { EIP6963Connector } from "@web3modal/wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";

const walletConnectProjectId = import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID;

const { chains, publicClient } = configureChains(SUPPORTED_CHAINS, [
  alchemyProvider({
    apiKey: import.meta.env.VITE_SEPOLIA_ALCHEMY_API_KEY,
  }),
  publicProvider(),
]);

const config = createConfig({
  connectors: [
    new WalletConnectConnector({
      chains,
      options: { projectId: walletConnectProjectId, showQrModal: false },
    }),
    new EIP6963Connector({ chains }),
    new InjectedConnector({ chains, options: { shimDisconnect: true } }),
  ],
  publicClient,
});

export { config, chains, walletConnectProjectId };
