import React from "react";
import { useAccount } from "wagmi";
import { SUPPORTED_CHAINS_IDS } from "../../../constants/supported-chains";
import { ConnectWalletButton } from "./ConnectWalletButton/ConnectWalletButton";
import { SwitchNetworkButton } from "./SwitchNetworkButton/SwitchNetworkButton";

export const SupportedNetworks = ({ children }: { children: JSX.Element }) => {
  const { chain, isConnected } = useAccount();

  const currentNetworkIsSupported =
    chain && SUPPORTED_CHAINS_IDS.includes(chain.id);

  return (
    <>
      {!isConnected && <ConnectWalletButton />}
      {isConnected && !currentNetworkIsSupported && (
        <div>
          <p>Unsupported Network</p>
          <SwitchNetworkButton />
        </div>
      )}
      {isConnected &&
        chain &&
        SUPPORTED_CHAINS_IDS.includes(chain.id) &&
        children}
    </>
  );
};
