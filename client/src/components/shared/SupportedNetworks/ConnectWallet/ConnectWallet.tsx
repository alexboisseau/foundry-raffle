import React, { useState } from "react";
import { WalletOptionsModal } from "./WalletOptionsModal/WalletOptionsModal";
import { Button } from "../../../ui/Button/Button";

export const ConnectWallet = () => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <Button onClick={() => setOpenModal(true)} value="Connect Wallet" />
      {openModal && <WalletOptionsModal onClose={() => setOpenModal(false)} />}
    </>
  );
};
