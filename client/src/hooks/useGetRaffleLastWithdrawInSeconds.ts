import { useAccount, useReadContract } from "wagmi";
import { raffleAbi, raffleAddresses } from "../constants/raffle-contract";

export const useGetRaffleLastWithdrawInSeconds = (): number => {
  const { chain } = useAccount();

  const { data: lastWithdraw, isError: lastWithdrawError } = useReadContract({
    address: raffleAddresses[chain!.id],
    abi: raffleAbi,
    functionName: "getLastRaffleTimestamp",
  });

  return !lastWithdrawError && lastWithdraw ? Number(lastWithdraw) : 0;
};
