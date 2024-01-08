import { useState } from "react";
import { useAccount } from "wagmi";
import { Button } from "../../../../../../components/ui/Button/Button";
import { formatAddress } from "../../../../../../utils/format-address";
import { AccountModal } from "./AccountModal/AccountModal";

export const AccountButton = () => {
  const [openModal, setOpenModal] = useState(false);
  const { address } = useAccount();
  const formattedAddress = formatAddress(address ?? "0x");

  return (
    <>
      <Button onClick={() => setOpenModal(true)} value={formattedAddress} />
      {openModal && <AccountModal onClose={() => setOpenModal(false)} />}
    </>
  );
};
