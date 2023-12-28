import React from "react";
import "./ConnectWallet.scss";

import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useAccount } from "wagmi";
import { formatAddress } from "../../utils/format-address";

export const ConnectWallet = () => {
  const { open } = useWeb3Modal();
  const { address } = useAccount();

  return (
    <button onClick={() => open()} className="connect-wallet">
      {address ? formatAddress(address) : "Connect Wallet"}
    </button>
  );
};
