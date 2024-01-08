/** COMPONENTS */
import { RaffleInformation } from "./RaffleInformation/RaffleInformation";
import { ActionButtons } from "./ActionButtons/ActionButtons";

/** STYLES */
import "./RaffleCard.scss";

export const RaffleCard = () => {
  return (
    <div className="raffle-card">
      <RaffleInformation />
      <ActionButtons />
    </div>
  );
};
