import { useConnect } from "wagmi";
import "./WalletOptionsModal.scss";
import { Modal } from "../../ui/Modal/Modal";

const WalletOptionsModalBody = () => {
  const { connectors, connect } = useConnect();

  return connectors.map((connector) => (
    <button
      className="wallet-option-button"
      key={connector.uid}
      onClick={() => connect({ connector })}
    >
      {connector.name}
    </button>
  ));
};

export const WalletOptionsModal = ({ onClose }: { onClose: () => void }) => {
  return (
    <Modal
      modalBody={<WalletOptionsModalBody />}
      className="wallet-options-modal"
      modalTitle="Wallet options"
      onClose={onClose}
    />
  );
};
