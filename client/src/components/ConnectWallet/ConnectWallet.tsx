import React, { useState } from "react";
import "./ConnectWallet.scss";

import { useAccount } from "wagmi";
import { formatAddress } from "../../utils/format-address";
import { WalletOptionsModal } from "./WalletOptionsModal/WalletOptionsModal";
import { AccountModal } from "./AccountModal/AccountModal";

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
      <button onClick={() => setOpenModal(true)} className="connect-wallet">
        {buttonValue}
      </button>
      {openModal && !isConnected && (
        <WalletOptionsModal onClose={setOpenModal} />
      )}
      {openModal && isConnected && <AccountModal />}
    </>
  );
};
