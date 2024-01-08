import {
  useAccount,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { raffleAbi, raffleAddresses } from "../constants/raffle-contract";
import { useGetRaffleEnterFee } from "./useGetRaffleEnterFee";
import { Hash } from "viem";

export const useEnterRaffle = (): {
  enterRaffleStatus: "pending" | "success" | "idle" | "error";
  enterRaffleTxStatus: "pending" | "success" | "idle" | "error";
  txHash: Hash | undefined;
  enterRaffle: () => void;
} => {
  const { chain } = useAccount();
  const enterFee = useGetRaffleEnterFee();

  const {
    writeContract,
    status: enterRaffleStatus,
    data: txHash,
  } = useWriteContract();

  const { status: enterRaffleTxStatus } = useWaitForTransactionReceipt({
    hash: txHash,
    query: {
      enabled: txHash !== undefined,
    },
  });

  const enterRaffle = () => {
    writeContract({
      address: raffleAddresses[chain!.id],
      abi: raffleAbi,
      functionName: "enterRaffle",
      value: enterFee,
    });
  };

  return {
    enterRaffleStatus,
    enterRaffleTxStatus,
    txHash,
    enterRaffle,
  };
};
