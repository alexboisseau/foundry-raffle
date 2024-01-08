import { useAccount, useDisconnect } from "wagmi";
import { Modal } from "../../../../../../../components/ui/Modal/Modal";
import { formatAddress } from "../../../../../../../utils/format-address";
import { Button } from "../../../../../../../components/ui/Button/Button";
import { SwitchNetworkButton } from "../../../../../../../components/shared/SupportedNetworks/SwitchNetworkButton/SwitchNetworkButton";
import "./AccountModal.scss";

const AccountModalBody = () => {
  const { disconnect } = useDisconnect();

  return (
    <div className="action-buttons">
      <SwitchNetworkButton />
      <Button onClick={() => disconnect()} value="Disconnect" />
    </div>
  );
};

export const AccountModal = ({ onClose }: { onClose: () => void }) => {
  const { address } = useAccount();
  const formattedAddress = formatAddress(address ?? "0x");

  return (
    <Modal
      className="account-modal"
      modalBody={<AccountModalBody />}
      modalTitle={formattedAddress}
      onClose={onClose}
    />
  );
};
