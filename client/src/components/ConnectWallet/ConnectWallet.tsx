import React from "react";
import "./ConnectWallet.scss";

import { useAccount } from "wagmi";
import { formatAddress } from "../../utils/format-address";

export const ConnectWallet = () => {
  const { address } = useAccount();

  return (
    <button
      onClick={() => console.log("Should open modal to connect")}
      className="connect-wallet"
    >
      {address ? formatAddress(address) : "Connect Wallet"}
    </button>
  );
};
