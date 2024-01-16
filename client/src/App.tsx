import { RafflePage } from "./pages/RafflePage/RafflePage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { config } from "./config/wagmi";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient();

export const App = () => (
  <div className="app">
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RafflePage />
      </QueryClientProvider>
    </WagmiProvider>
    <Toaster
      toastOptions={{
        className: "toast",
      }}
    />
  </div>
);
