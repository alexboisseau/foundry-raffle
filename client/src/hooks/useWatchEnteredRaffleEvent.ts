import { useAccount, useWatchContractEvent } from "wagmi";
import { raffleAbi, raffleAddresses } from "../constants/raffle-contract";
import { Address } from "viem";

type EnteredRaffleEventArgsLog = {
  player: Address;
  players: number;
};

export const useWatchEnteredRaffleEvent = ({
  onLogs,
}: {
  onLogs: ({ player, players }: EnteredRaffleEventArgsLog) => any;
}) => {
  const { chain } = useAccount();

  useWatchContractEvent({
    address: raffleAddresses[chain!.id],
    abi: raffleAbi,
    eventName: "Raffle__EnteredRaffle",
    onLogs(logs) {
      const player = logs[0].args.player ?? "0x";
      const players = logs[0].args.players ? Number(logs[0].args.players) : 0;

      onLogs({ player, players });
    },
  });
};
