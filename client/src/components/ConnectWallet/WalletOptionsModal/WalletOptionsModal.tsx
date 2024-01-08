import { useConnect } from "wagmi";
import "./WalletOptionsModal.scss";

import { Modal } from "../../ui/Modal/Modal";
import { Button } from "../../ui/Button/Button";

const WalletOptionsModalBody = () => {
  const { connectors, connect } = useConnect();

  return connectors.map((connector) => (
    <Button
      onClick={() => connect({ connector })}
      value={connector.name}
      key={connector.id}
    />
  ));
};

export const WalletOptionsModal = ({ onClose }: { onClose: () => void }) => (
  <Modal
    modalBody={<WalletOptionsModalBody />}
    className="wallet-options-modal"
    modalTitle="Wallet options"
    onClose={onClose}
  />
);
