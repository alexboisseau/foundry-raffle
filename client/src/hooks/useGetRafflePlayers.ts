import { useState } from "react";
import { useAccount, useReadContract } from "wagmi";
import { raffleAbi, raffleAddresses } from "../constants/raffle-contract";
import { useWatchPickedWinnerEvent } from "./useWatchPickedWinnerEvent";
import { useWatchEnteredRaffleEvent } from "./useWatchEnteredRaffleEvent";
import { Address } from "viem";

export const useGetRafflePlayers = (): Set<Address> => {
  const { chain } = useAccount();
  const [players, setPlayers] = useState<Set<Address> | null>(null);

  useWatchPickedWinnerEvent({
    onLogs: () => {
      setPlayers(new Set([]));
    },
  });

  useWatchEnteredRaffleEvent({
    onLogs(argsLog) {
      setPlayers(new Set(argsLog.players));
    },
  });

  const { data: intialPlayers, isError: intialPlayersError } = useReadContract({
    address: raffleAddresses[chain!.id],
    abi: raffleAbi,
    functionName: "getPlayers",
    query: {
      gcTime: 0,
    },
  });

  return (
    players ??
    (!intialPlayersError && intialPlayers ? new Set(intialPlayers) : new Set())
  );
};
