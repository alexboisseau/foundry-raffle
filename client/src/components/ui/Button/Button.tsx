import "./Button.scss";

export const Button = ({
  disabled = false,
  value,
  onClick,
}: {
  disabled?: boolean;
  value: string;
  onClick: () => void;
}) => (
  <button className="button" onClick={onClick} disabled={disabled}>
    {value}
  </button>
);
