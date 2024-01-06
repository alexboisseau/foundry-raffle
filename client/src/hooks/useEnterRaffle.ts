import { useAccount, useWriteContract } from "wagmi";
import { raffleAbi, raffleAddresses } from "../constants/raffle-contract";
import { useGetRaffleEnterFee } from "./useGetRaffleEnterFee";

export const useEnterRaffle = (): {
  enterRaffle: () => void;
} => {
  const { chain } = useAccount();
  const { writeContract } = useWriteContract();
  const enterFee = useGetRaffleEnterFee();

  const enterRaffle = () => {
    writeContract({
      address: raffleAddresses[chain!.id],
      abi: raffleAbi,
      functionName: "enterRaffle",
      value: enterFee,
    });
  };

  return {
    enterRaffle,
  };
};
