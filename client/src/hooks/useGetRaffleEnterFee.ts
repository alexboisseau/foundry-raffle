import { raffleAbi, raffleAddresses } from "../constants/raffle-contract";
import { useAccount, useReadContract } from "wagmi";

export const useGetRaffleEnterFee = (): bigint => {
  const { chain } = useAccount();
  const contract = {
    address: raffleAddresses[chain!.id],
    abi: raffleAbi,
  };

  const { data: enterFee } = useReadContract({
    ...contract,
    functionName: "getEnterFee",
  });

  return enterFee ? BigInt(enterFee) : BigInt(0);
};
