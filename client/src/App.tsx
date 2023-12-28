import React from "react";
import "./styles/App.scss";

import { WagmiConfig } from "wagmi";
import {
  config as wagmiConfig,
  chains,
  walletConnectProjectId,
} from "./config/wagmi";
import { createWeb3Modal } from "@web3modal/wagmi/react";
import { ConnectWallet } from "./components/ConnectWallet/ConnectWallet";

createWeb3Modal({
  wagmiConfig,
  chains,
  projectId: walletConnectProjectId,
  themeVariables: {
    "--w3m-font-family": "RobotoMono-Regular",
    "--w3m-accent": "#c8ff3c",
    "--w3m-color-mix": "#c8ff3c",
    "--w3m-color-mix-strength": 3,
  },
});

export function App() {
  return (
    <div className="app">
      <WagmiConfig config={wagmiConfig}>
        <ConnectWallet />
      </WagmiConfig>
    </div>
  );
}
