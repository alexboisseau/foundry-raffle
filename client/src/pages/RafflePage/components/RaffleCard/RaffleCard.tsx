import { RaffleInformation } from "./RaffleInformation/RaffleInformation";
import { ActionButtons } from "./ActionButtons/ActionButtons";
import "./RaffleCard.scss";

export const RaffleCard = () => (
  <div className="raffle-card">
    <RaffleInformation />
    <ActionButtons />
  </div>
);
