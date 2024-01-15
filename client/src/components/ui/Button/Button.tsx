import { useState } from "react";
import "./Button.scss";

export const Button = ({
  backgroundColor,
  hoverBackgroundColor,
  color,
  hoverColor,
  className,
  disabled = false,
  icon,
  value,
  onClick,
}: {
  backgroundColor?: string;
  hoverBackgroundColor?: string;
  color?: string;
  hoverColor?: string;
  className?: string;
  disabled?: boolean;
  icon?: JSX.Element;
  value: string;
  onClick: () => void;
}) => {
  const [hover, setHover] = useState<boolean>(false);

  const handleMouseEnter = () => {
    setHover(true);
  };

  const handleMouseLeave = () => {
    setHover(false);
  };

  return (
    <button
      className={className ? `button ${className}` : "button"}
      onClick={onClick}
      disabled={disabled}
      style={{
        backgroundColor: hover
          ? hoverBackgroundColor ?? backgroundColor
          : backgroundColor,
        color: hover ? hoverColor ?? color : color,
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <span>{value}</span>
      {icon}
    </button>
  );
};
