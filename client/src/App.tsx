import React from "react";
import "./styles/App.scss";

import { WagmiProvider } from "wagmi";
import { config as wagmiConfig, walletConnectProjectId } from "./config/wagmi";
import { ConnectWallet } from "./components/ConnectWallet/ConnectWallet";
import { RaffleInformation } from "./components/RaffleInformation/RaffleInformation";
import { SupportedNetworks } from "./components/SupportedNetworks/SupportedNetworks";
import { EnterRaffle } from "./components/EnterRaffle/EnterRaffle";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export function App() {
  return (
    <div className="app">
      <WagmiProvider config={wagmiConfig}>
        <QueryClientProvider client={queryClient}>
          <SupportedNetworks>
            <div className="app-children">
              <RaffleInformation />
              <ConnectWallet />
            </div>
          </SupportedNetworks>
        </QueryClientProvider>
      </WagmiProvider>
    </div>
  );
}
