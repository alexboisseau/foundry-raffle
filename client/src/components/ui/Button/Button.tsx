import "./Button.scss";

export const Button = ({
  disabled = false,
  icon,
  value,
  onClick,
}: {
  disabled?: boolean;
  icon?: JSX.Element;
  value: string;
  onClick: () => void;
}) => (
  <button className="button" onClick={onClick} disabled={disabled}>
    <span>{value}</span>
    {icon}
  </button>
);
