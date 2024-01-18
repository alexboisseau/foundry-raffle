import { useState } from "react";
import { AccountModal } from "./AccountModal/AccountModal";
import { IoMdWallet } from "react-icons/io";

import { Button } from "@radix-ui/themes";

export const AccountButton = () => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <Button variant="surface" onClick={() => setOpenModal(true)}>
        <IoMdWallet />
        Open account modal
      </Button>
      {openModal && <AccountModal onClose={() => setOpenModal(false)} />}
    </>
  );
};
