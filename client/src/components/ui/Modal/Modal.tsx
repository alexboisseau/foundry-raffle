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
          <h2 className="modal-title">{modalTitle}</h2>
          <button className="close-button" onClick={onClose}>
            X
          </button>
        </div>
        <div className={`modal-body`}>{modalBody}</div>
      </div>
    </div>
  );
};
