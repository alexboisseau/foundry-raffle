import React from "react";

/** COMPONENTS */
import { RafflePage } from "./pages/RafflePage/RafflePage";
import { SupportedNetworks } from "./components/shared/SupportedNetworks/SupportedNetworks";

/** TANSTACK */
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

/** WAGMI */
import { WagmiProvider } from "wagmi";
import { config } from "./config/wagmi";

import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient();

export function App() {
  return (
    <div className="app">
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RafflePage />
        </QueryClientProvider>
      </WagmiProvider>
      <Toaster />
    </div>
  );
}
