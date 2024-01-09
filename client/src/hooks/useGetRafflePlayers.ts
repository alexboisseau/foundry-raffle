import { useState } from "react";
import { useAccount, useReadContract, useWatchContractEvent } from "wagmi";
import { raffleAbi, raffleAddresses } from "../constants/raffle-contract";

export const useGetRafflePlayers = () => {
  const { chain } = useAccount();
  const [players, setPlayers] = useState<number | null>(null);

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

  useWatchContractEvent({
    ...contract,
    eventName: "Raffle__PickedWinner",
    onLogs(logs) {
      console.log("Picked winner", logs);
      setPlayers(0);
    },
  });

  return (
    players ?? (!intialPlayersError && intialPlayers ? intialPlayers.length : 0)
  );
};
