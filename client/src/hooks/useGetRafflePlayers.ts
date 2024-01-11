import { useState } from "react";
import { useAccount, useReadContract } from "wagmi";
import { raffleAbi, raffleAddresses } from "../constants/raffle-contract";
import { useWatchPickedWinnerEvent } from "./useWatchPickedWinnerEvent";
import { useWatchEnteredRaffleEvent } from "./useWatchEnteredRaffleEvent";

export const useGetRafflePlayers = () => {
  const { chain } = useAccount();
  const [players, setPlayers] = useState<number | null>(null);

  useWatchPickedWinnerEvent({
    onLogs: () => {
      setPlayers(0);
    },
  });

  useWatchEnteredRaffleEvent({
    onLogs(argsLog) {
      setPlayers(argsLog.players);
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

  return (
    players ?? (!intialPlayersError && intialPlayers ? intialPlayers.length : 0)
  );
};
