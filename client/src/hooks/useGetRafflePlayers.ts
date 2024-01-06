import { useAccount, useReadContract } from "wagmi";
import { raffleAbi, raffleAddresses } from "../constants/raffle-contract";

export const useGetRafflePlayers = (): number => {
  const { chain } = useAccount();

  const { data: players, isError: isGetPlayers } = useReadContract({
    address: raffleAddresses[chain!.id],
    abi: raffleAbi,
    functionName: "getPlayers",
  });

  return !isGetPlayers && players ? players.length : 0;
};
