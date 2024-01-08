import React from "react";
import { useAccount } from "wagmi";
import { SUPPORTED_CHAINS_IDS } from "../../../constants/supported-chains";
import { ConnectWallet } from "./ConnectWallet/ConnectWallet";

export const SupportedNetworks = ({ children }: { children: JSX.Element }) => {
  const { chain } = useAccount();

  console.log(chain);

  if (!chain || !SUPPORTED_CHAINS_IDS.includes(chain.id)) {
    return (
      <div>
        <p>Network not supported</p>
        <ConnectWallet />
      </div>
    );
  }

  return children;
};
