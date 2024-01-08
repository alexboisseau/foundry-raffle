import "./Button.scss";

export const Button = ({
  value,
  onClick,
}: {
  value: string;
  onClick: () => void;
}) => (
  <button className="button" onClick={onClick}>
    {value}
  </button>
);
