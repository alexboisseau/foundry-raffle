import { useConnect } from "wagmi";
import "./WalletOptionsModal.scss";

export const WalletOptionsModal = ({
  onClose,
}: {
  onClose: (state: boolean) => void;
}) => {
  const { connectors, connect } = useConnect();

  console.log(connectors);

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Wallet options</h2>
          <button className="close-button" onClick={() => onClose(false)}>
            X
          </button>
        </div>

        <div className="modal-body">
          {connectors.map((connector) => (
            <button
              className="wallet-option-button"
              key={connector.uid}
              onClick={() => connect({ connector })}
            >
              {connector.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
