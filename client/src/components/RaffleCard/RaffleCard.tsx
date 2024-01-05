import React from "react";

/** COMPONENTS */
import { RaffleInformation } from "../RaffleInformation/RaffleInformation";
import { ConnectWallet } from "../ConnectWallet/ConnectWallet";

/** STYLES */
import "./RaffleCard.scss";

export const RaffleCard = () => {
  return (
    <div className="raffle-card">
      <RaffleInformation />
      <ConnectWallet />
    </div>
  );
};
