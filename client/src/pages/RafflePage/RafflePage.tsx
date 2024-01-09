import { SupportedNetworks } from "../../components/shared/SupportedNetworks/SupportedNetworks";
import { NextRaffleWithdraw } from "./components/NextRaffleWithdraw/NextRaffleWithdraw";
import { RaffleCard } from "./components/RaffleCard/RaffleCard";
import "./RafflePage.scss";

export const RafflePage = () => {
  return (
    <main className="raffle-page">
      <h1>$_Decentralized_Raffle_$</h1>
      <SupportedNetworks>
        <>
          <NextRaffleWithdraw />
          <RaffleCard />
        </>
      </SupportedNetworks>
    </main>
  );
};
