import React from "react";

/** COMPONENTS */
import { SupportedNetworks } from "./components/SupportedNetworks/SupportedNetworks";
import { RaffleCard } from "./components/RaffleCard/RaffleCard";

/** TANSTACK */
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

/** WAGMI */
import { WagmiProvider } from "wagmi";
import { config } from "./config/wagmi";

/** STYLES */
import "./styles/App.scss";

const queryClient = new QueryClient();

export function App() {
  return (
    <div className="app">
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <SupportedNetworks>
            <RaffleCard />
          </SupportedNetworks>
        </QueryClientProvider>
      </WagmiProvider>
    </div>
  );
}
