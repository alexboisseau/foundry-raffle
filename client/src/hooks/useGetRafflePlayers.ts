import { useState } from "react";
import { useAccount, useReadContract, useWatchContractEvent } from "wagmi";
import { raffleAbi, raffleAddresses } from "../constants/raffle-contract";

export const useGetRafflePlayers = () => {
  const { chain } = useAccount();
  const [players, setPlayers] = useState<number | null>(null);

  const { data: intialPlayers, isError: intialPlayersError } = useReadContract({
    address: raffleAddresses[chain!.id],
    abi: raffleAbi,
    functionName: "getPlayers",
    query: {
      gcTime: 0,
    },
  });

  useWatchContractEvent({
    address: raffleAddresses[chain!.id],
    abi: raffleAbi,
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
