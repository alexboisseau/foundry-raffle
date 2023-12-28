import { foundry } from "viem/chains";
import { sepolia } from "wagmi";

export const SUPPORTED_CHAINS = [
  sepolia,
  ...(import.meta.env?.MODE === "development" ? [foundry] : []),
];

export const SUPPORTED_CHAINS_IDS = SUPPORTED_CHAINS.map(
  (chain) => chain.id,
) as number[];
