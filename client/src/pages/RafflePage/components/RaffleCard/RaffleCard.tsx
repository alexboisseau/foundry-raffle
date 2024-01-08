/** COMPONENTS */
import { RaffleInformation } from "./RaffleInformation/RaffleInformation";

/** STYLES */
import "./RaffleCard.scss";
import { EnterRaffle } from "./EnterRaffle/EnterRaffle";

export const RaffleCard = () => {
  return (
    <div className="raffle-card">
      <RaffleInformation />
      <EnterRaffle />
    </div>
  );
};
