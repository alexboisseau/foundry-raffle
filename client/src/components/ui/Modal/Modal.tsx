import { Button } from "../Button/Button";
import "./Modal.scss";

type ModalProps = {
  className?: string;
  modalBody: JSX.Element;
  modalTitle: string | undefined;
  onClose: () => void;
};

export const Modal = ({
  className,
  modalBody,
  modalTitle,
  onClose,
}: ModalProps) => {
  return (
    <div className={`modal ${className}`}>
      <div className="modal-content">
        <div className="modal-header">
          <h3 className="modal-title">{modalTitle}</h3>
          <Button value="X" onClick={onClose} />
        </div>
        <div className={`modal-body`}>{modalBody}</div>
      </div>
    </div>
  );
};
