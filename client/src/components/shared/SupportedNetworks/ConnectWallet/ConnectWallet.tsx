import React, { useState } from "react";

import { useAccount } from "wagmi";
import { formatAddress } from "../../../../utils/format-address";
import { WalletOptionsModal } from "./WalletOptionsModal/WalletOptionsModal";
import { Button } from "../../../ui/Button/Button";

const useConnectWalletButton = () => {
  const { address, isConnected } = useAccount();
  const [openModal, setOpenModal] = useState(false);

  const buttonValue = address ? formatAddress(address) : "Connect Wallet";

  return {
    buttonValue,
    isConnected,
    openModal,
    setOpenModal,
  };
};

export const ConnectWallet = () => {
  const { buttonValue, isConnected, openModal, setOpenModal } =
    useConnectWalletButton();

  return (
    <>
      <Button onClick={() => setOpenModal(true)} value={buttonValue} />
      {openModal && !isConnected && (
        <WalletOptionsModal onClose={() => setOpenModal(false)} />
      )}
    </>
  );
};
