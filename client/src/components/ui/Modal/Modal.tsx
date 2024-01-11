import { Button } from "../Button/Button";
import "./Modal.scss";

export const Modal = ({
  className,
  modalBody,
  modalTitle,
  onClose,
}: {
  className?: string;
  modalBody: JSX.Element;
  modalTitle: string | undefined;
  onClose: () => void;
}) => {
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
