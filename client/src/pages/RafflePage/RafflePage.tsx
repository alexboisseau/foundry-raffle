import { RaffleCard } from "./components/RaffleCard/RaffleCard";
import "./RafflePage.scss";

export const RafflePage = () => {
  return (
    <main className="raffle-page">
      <h1>Decentralized Raffle $</h1>
      <RaffleCard />
    </main>
  );
};
