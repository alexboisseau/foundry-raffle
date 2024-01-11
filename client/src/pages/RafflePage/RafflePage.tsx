import { SupportedNetworks } from "../../components/shared/SupportedNetworks/SupportedNetworks";
import { NextRaffleWithdraw } from "./components/NextRaffleWithdraw/NextRaffleWithdraw";
import { RaffleCard } from "./components/RaffleCard/RaffleCard";
import "./RafflePage.scss";
import { WatchPickedWinner } from "./components/WatchPickedWinner/WatchPickedWinner";

export const RafflePage = () => {
  return (
    <main className="raffle-page">
      <h1>$_Decentralized_Raffle_$</h1>
      <SupportedNetworks>
        <>
          <WatchPickedWinner />
          <NextRaffleWithdraw />
          <RaffleCard />
        </>
      </SupportedNetworks>
    </main>
  );
};
