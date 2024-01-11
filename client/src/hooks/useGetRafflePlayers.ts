import { useState } from "react";
import { useAccount, useReadContract, useWatchContractEvent } from "wagmi";
import { raffleAbi, raffleAddresses } from "../constants/raffle-contract";
import { useWatchPickedWinnerEvent } from "./useWatchPickedWinnerEvent";

export const useGetRafflePlayers = () => {
  const { chain } = useAccount();
  const [players, setPlayers] = useState<number | null>(null);

  useWatchPickedWinnerEvent({
    onLogs: () => {
      setPlayers(0);
    },
  });

  const contract = {
    address: raffleAddresses[chain!.id],
    abi: raffleAbi,
  };

  const { data: intialPlayers, isError: intialPlayersError } = useReadContract({
    ...contract,
    functionName: "getPlayers",
    query: {
      gcTime: 0,
    },
  });

  useWatchContractEvent({
    ...contract,
    eventName: "Raffle__EnteredRaffle",
    onLogs(logs) {
      const players = logs[0].args.players;
      setPlayers(players ? Number(players) : null);
    },
  });

  return (
    players ?? (!intialPlayersError && intialPlayers ? intialPlayers.length : 0)
  );
};
