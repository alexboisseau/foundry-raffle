import { useAccount, useReadContract } from "wagmi";
import { raffleAbi, raffleAddresses } from "../constants/raffle-contract";
import { Address } from "viem";
import { useState } from "react";
import { useWatchPickedWinnerEvent } from "./useWatchPickedWinnerEvent";

export const useGetRaffleLastWinner = (): Address => {
  const { chain } = useAccount();
  const [lastWinner, setLastWinner] = useState<Address | null>(null);
  useWatchPickedWinnerEvent({
    onLogs: ({ winner }) => {
      setLastWinner(winner);
    },
  });

  const { data: initialLastWinner, isError: initialLastWinnerError } =
    useReadContract({
      address: raffleAddresses[chain!.id],
      abi: raffleAbi,
      functionName: "getLastWinner",
    });

  return (
    lastWinner ??
    (!initialLastWinnerError && initialLastWinner ? initialLastWinner : "0x")
  );
};
