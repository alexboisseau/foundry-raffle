import { useAccount, useReadContract, useWatchContractEvent } from "wagmi";
import { raffleAbi, raffleAddresses } from "../constants/raffle-contract";
import { Address } from "viem";
import { useState } from "react";

export const useGetRaffleLastWinner = (): Address => {
  const { chain } = useAccount();
  const [lastWinner, setLastWinner] = useState<Address>("0x");

  const contract = {
    address: raffleAddresses[chain!.id],
    abi: raffleAbi,
  };

  const { data: initialLastWinner, isError: initialLastWinnerError } =
    useReadContract({
      ...contract,
      functionName: "getLastWinner",
    });

  useWatchContractEvent({
    ...contract,
    eventName: "Raffle__PickedWinner",
    onLogs(logs) {
      const winner = logs[0].args.winner;
      setLastWinner(winner ? winner : "0x");
    },
  });

  return (
    lastWinner ??
    (!initialLastWinnerError && initialLastWinner ? initialLastWinner : "0x")
  );
};
