import { SupportedNetworks } from "../../components/shared/SupportedNetworks/SupportedNetworks";
import { NextRaffleWithdraw } from "./components/NextRaffleWithdraw/NextRaffleWithdraw";
import { RaffleCard } from "./components/RaffleCard/RaffleCard";
import { WatchPickedWinner } from "./components/WatchPickedWinner/WatchPickedWinner";
import { BackgroundPageGrid } from "./components/BackgroundPageGrid/BackgroundPageGrid";
import "./RafflePage.scss";

export const RafflePage = () => {
  return (
    <main className="raffle-page">
      <BackgroundPageGrid />
      <h1>Decentralized Raffle</h1>
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
