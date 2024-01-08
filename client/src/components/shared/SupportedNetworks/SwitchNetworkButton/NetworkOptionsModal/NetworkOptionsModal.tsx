import { useSwitchChain } from "wagmi";
import { Modal } from "../../../../ui/Modal/Modal";
import { Button } from "../../../../ui/Button/Button";
import "./NetworkOptionsModal.scss";

const NetworkOptionsModalBody = () => {
  const { chains, switchChain } = useSwitchChain();

  return chains.map((chain) => (
    <Button
      key={chain.id}
      onClick={() => switchChain({ chainId: chain.id })}
      value={chain.name}
    />
  ));
};

export const NetworkOptionsModal = ({ onClose }: { onClose: () => void }) => {
  return (
    <Modal
      className="network-options-modal"
      modalTitle="Switch Network"
      onClose={onClose}
      modalBody={<NetworkOptionsModalBody />}
    />
  );
};
