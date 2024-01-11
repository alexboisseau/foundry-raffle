import { useState } from "react";
import { Button } from "../../../ui/Button/Button";
import { NetworkOptionsModal } from "./NetworkOptionsModal/NetworkOptionsModal";
import { TbSwitch2 } from "react-icons/tb";

export const SwitchNetworkButton = () => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <Button
        icon={<TbSwitch2 size={20} />}
        value="Switch network"
        onClick={() => setOpenModal(true)}
      />
      {openModal && <NetworkOptionsModal onClose={() => setOpenModal(false)} />}
    </>
  );
};
