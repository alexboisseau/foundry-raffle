import { RaffleInformation } from "./RaffleInformation/RaffleInformation";
import { ActionButtons } from "./ActionButtons/ActionButtons";
import { Flex } from "@radix-ui/themes";

export const RaffleCard = () => (
  <Flex className="raffle-card" direction="column" gap="3">
    <RaffleInformation />
    <ActionButtons />
  </Flex>
);
