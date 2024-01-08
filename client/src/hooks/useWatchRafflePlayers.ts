import { useState } from "react";
import { useGetRafflePlayers } from "./useGetRafflePlayers";
import { useAccount, useWatchContractEvent } from "wagmi";
import { raffleAbi, raffleAddresses } from "../constants/raffle-contract";

export const useWatchRafflePlayers = () => {
  const { chain } = useAccount();
  const initialPlayers = useGetRafflePlayers();
  const [addedPlayers, setAddedPlayers] = useState<number>(0);
  const players = initialPlayers + addedPlayers;

  useWatchContractEvent({
    address: raffleAddresses[chain!.id],
    abi: raffleAbi,
    eventName: "Raffle__EnteredRaffle",
    onLogs() {
      setAddedPlayers((addedPlayers) => addedPlayers + 1);
    },
  });

  return players;
};
