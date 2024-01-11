import { useState } from "react";
import { useAccount, useReadContract } from "wagmi";
import { raffleAbi, raffleAddresses } from "../constants/raffle-contract";
import { useWatchPickedWinnerEvent } from "./useWatchPickedWinnerEvent";
import { useWatchEnteredRaffleEvent } from "./useWatchEnteredRaffleEvent";
import { Address } from "viem";

export const useGetRafflePlayers = (): {
  players: Address[];
  userTickets: number;
} => {
  const { chain, address } = useAccount();
  const [players, setPlayers] = useState<Address[] | null>(null);

  useWatchPickedWinnerEvent({
    onLogs: () => {
      setPlayers([]);
    },
  });

  useWatchEnteredRaffleEvent({
    onLogs(argsLog) {
      setPlayers([...argsLog.players]);
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

  const getUserTicketsCount = () => {
    const arrayToFilter =
      players ?? (!intialPlayersError && intialPlayers) ? intialPlayers : [];

    return arrayToFilter!.filter((player) => player === address).length;
  };

  const getUniquePlayers = () => {
    const from =
      players ?? (!intialPlayersError && intialPlayers) ? intialPlayers : [];

    return [...new Set(from)];
  };

  return {
    players: getUniquePlayers(),
    userTickets: getUserTicketsCount(),
  };
};
