import { AccountButton } from "./AccountButton/AccountButton";
import { EnterRaffleButton } from "./EnterRaffleButton/EnterRaffleButton";
import "./ActionButtons.scss";

export const ActionButtons = () => {
  return (
    <div className="action-buttons">
      <AccountButton />
      <EnterRaffleButton />
    </div>
  );
};
