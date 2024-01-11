import { useAccount, useWatchContractEvent } from "wagmi";
import { raffleAbi, raffleAddresses } from "../constants/raffle-contract";
import { Address } from "viem";

export type PickedWinnerEventArgsLog = {
  winner: Address;
  lastTimestamp: number;
};

export const useWatchPickedWinnerEvent = ({
  onLogs,
}: {
  onLogs: ({ winner, lastTimestamp }: PickedWinnerEventArgsLog) => any;
}) => {
  const { chain } = useAccount();

  useWatchContractEvent({
    address: raffleAddresses[chain!.id],
    abi: raffleAbi,
    eventName: "Raffle__PickedWinner",
    onLogs: (logs) => {
      const winner = logs[0].args.winner ?? "0x";
      const lastTimestamp = logs[0].args.lastTimestamp
        ? Number(logs[0].args.lastTimestamp)
        : 0;

      onLogs({
        winner,
        lastTimestamp,
      });
    },
  });
};
