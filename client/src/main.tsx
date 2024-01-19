import * as React from "react";
import * as ReactDOM from "react-dom/client";

import { WagmiProvider } from "wagmi";
import { config } from "./config/wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { App } from "./App";

import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";

import "./styles/main.scss";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Theme>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </WagmiProvider>
    </Theme>
  </React.StrictMode>,
);
