/** COMPONENTS */
import { RaffleInformation } from "./RaffleInformation/RaffleInformation";
import { EnterRaffleButton } from "./ActionButtons/EnterRaffleButton/EnterRaffleButton";

/** STYLES */
import "./RaffleCard.scss";

export const RaffleCard = () => {
  return (
    <div className="raffle-card">
      <RaffleInformation />
      <EnterRaffleButton />
    </div>
  );
};
