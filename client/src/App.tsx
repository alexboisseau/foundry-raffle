import { WagmiConfig } from "wagmi";
import {
  config as wagmiConfig,
  chains,
  walletConnectProjectId,
} from "./config/wagmi";
import { createWeb3Modal } from "@web3modal/wagmi/react";

createWeb3Modal({
  wagmiConfig,
  chains,
  projectId: walletConnectProjectId,
});

export function App() {
  return <WagmiConfig config={wagmiConfig}></WagmiConfig>;
}
