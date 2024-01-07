import { createConfig, http } from "wagmi";
import { foundry, sepolia } from "wagmi/chains";
import { SUPPORTED_CHAINS } from "../constants/supported-chains";

const walletConnectProjectId = import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID;
const foundryHttpTransport = import.meta.env.VITE_RPC_URL_FOUNDRY;
const sepoliaHttpTransport = import.meta.env.VITE_RPC_URL_SEPOLIA;

const config = createConfig({
  chains: SUPPORTED_CHAINS,
  transports: {
    [foundry.id]: http(foundryHttpTransport),
    [sepolia.id]: http(sepoliaHttpTransport),
  },
});

export { config, walletConnectProjectId };
