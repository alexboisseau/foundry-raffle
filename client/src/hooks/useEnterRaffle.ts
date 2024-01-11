import {
  useAccount,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { raffleAbi, raffleAddresses } from "../constants/raffle-contract";
import { useGetRaffleEnterFee } from "./useGetRaffleEnterFee";
import { Hash } from "viem";
import { useWatchEnteredRaffleEvent } from "./useWatchEnteredRaffleEvent";

export const useEnterRaffle = ({
  onSuccess,
  onError,
}: {
  onSuccess: () => void;
  onError: () => void;
}): {
  enterRaffleStatus: "pending" | "success" | "idle" | "error";
  enterRaffleTxStatus: "pending" | "success" | "idle" | "error";
  txHash: Hash | undefined;
  enterRaffle: () => void;
} => {
  const { chain } = useAccount();
  const enterFee = useGetRaffleEnterFee();
  useWatchEnteredRaffleEvent({
    onLogs: () => {
      onSuccess();
    },
  });

  const {
    writeContract,
    status: enterRaffleStatus,
    data: txHash,
  } = useWriteContract({
    mutation: {
      onError: (error: any) => {
        console.log("Error : ", error);
        onError();
      },
    },
  });

  const { status: enterRaffleTxStatus } = useWaitForTransactionReceipt({
    hash: txHash,
    query: {
      enabled: txHash !== undefined,
    },
    onReplaced: () => {
      onError();
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
