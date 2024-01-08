import React from "react";

/** COMPONENTS */
import { SupportedNetworks } from "./components/shared/SupportedNetworks/SupportedNetworks";
import { RaffleCard } from "./pages/RafflePage/components/RaffleCard/RaffleCard";

/** TANSTACK */
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

/** WAGMI */
import { WagmiProvider } from "wagmi";
import { config } from "./config/wagmi";

/** STYLES */
import "./styles/App.scss";
import { RafflePage } from "./pages/RafflePage/RafflePage";

const queryClient = new QueryClient();

export function App() {
  return (
    <div className="app">
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <SupportedNetworks>
            <RafflePage />
          </SupportedNetworks>
        </QueryClientProvider>
      </WagmiProvider>
    </div>
  );
}
