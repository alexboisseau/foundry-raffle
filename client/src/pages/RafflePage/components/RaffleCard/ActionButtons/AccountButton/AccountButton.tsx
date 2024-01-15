import { useState } from "react";
import { Button } from "../../../../../../components/ui/Button/Button";
import { AccountModal } from "./AccountModal/AccountModal";
import { IoMdWallet } from "react-icons/io";

export const AccountButton = () => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <Button
        icon={<IoMdWallet size={20} />}
        onClick={() => setOpenModal(true)}
        value="Open account modal"
        className="account-button"
        backgroundColor="#1e293b"
        hoverBackgroundColor="#18212f"
        color="#fff"
      />
      {openModal && <AccountModal onClose={() => setOpenModal(false)} />}
    </>
  );
};
