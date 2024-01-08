import { useState } from "react";
import { Button } from "../../../ui/Button/Button";
import { NetworkOptionsModal } from "./NetworkOptionsModal/NetworkOptionsModal";

export const SwitchNetworkButton = () => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <Button value="Switch network" onClick={() => setOpenModal(true)} />
      {openModal && <NetworkOptionsModal onClose={() => setOpenModal(false)} />}
    </>
  );
};
