import { AccountButton } from "./AccountButton/AccountButton";
import { EnterRaffleButton } from "./EnterRaffleButton/EnterRaffleButton";
import "./ActionButtons.scss";

export const ActionButtons = () => (
  <div className="action-buttons">
    <EnterRaffleButton />
    <AccountButton />
  </div>
);
