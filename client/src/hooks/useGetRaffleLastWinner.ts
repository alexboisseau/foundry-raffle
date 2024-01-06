import { useAccount, useReadContract } from "wagmi";
import { raffleAbi, raffleAddresses } from "../constants/raffle-contract";
import { Address } from "viem";

export const useGetRaffleLastWinner = (): Address => {
  const { chain } = useAccount();

  const { data: lastWinner, isError: isGetLastWinnerError } = useReadContract({
    address: raffleAddresses[chain!.id],
    abi: raffleAbi,
    functionName: "getLastWinner",
  });

  return !isGetLastWinnerError && lastWinner ? lastWinner : "0x";
};
