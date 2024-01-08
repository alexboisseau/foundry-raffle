/** COMPONENTS */
import { RaffleInformation } from "./RaffleInformation/RaffleInformation";
import { ConnectWallet } from "../../../../components/shared/SupportedNetworks/ConnectWallet/ConnectWallet";

/** STYLES */
import "./RaffleCard.scss";
import { EnterRaffle } from "./EnterRaffle/EnterRaffle";

export const RaffleCard = () => {
  return (
    <div className="raffle-card">
      <RaffleInformation />
      <ConnectWallet />
      <EnterRaffle />
    </div>
  );
};
