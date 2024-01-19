import { SupportedNetworks } from "../../components/shared/SupportedNetworks/SupportedNetworks";
import { NextRaffleWithdraw } from "./components/NextRaffleWithdraw/NextRaffleWithdraw";
import { RaffleCard } from "./components/RaffleCard/RaffleCard";
import { WatchPickedWinner } from "./components/WatchPickedWinner/WatchPickedWinner";
import { BackgroundPageGrid } from "./components/BackgroundPageGrid/BackgroundPageGrid";
import { Flex, Heading } from "@radix-ui/themes";
import "./RafflePage.scss";

export const RafflePage = () => (
  <Flex
    className="raffle-page"
    direction="column"
    align="center"
    justify="center"
    p="4"
  >
    <BackgroundPageGrid />
    <Heading>Decentralized Raffle</Heading>
    <SupportedNetworks>
      <>
        <WatchPickedWinner />
        <NextRaffleWithdraw />
        <RaffleCard />
      </>
    </SupportedNetworks>
  </Flex>
);
