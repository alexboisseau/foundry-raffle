import { useAccount, useReadContract } from "wagmi";
import { raffleAbi, raffleAddresses } from "../constants/raffle-contract";

export const useGetRaffleIntervalInSeconds = (): number => {
  const { chain } = useAccount();

  const { data: intervalInSeconds, isError: intervalInSecondsError } =
    useReadContract({
      address: raffleAddresses[chain!.id],
      abi: raffleAbi,
      functionName: "getRaffleIntervalInSeconds",
    });

  return !intervalInSecondsError && intervalInSeconds
    ? Number(intervalInSeconds)
    : 0;
};
