import { useGetRaffleIntervalInSeconds } from "../../../../hooks/useGetRaffleIntervalInSeconds";
import { useGetRaffleLastWithdrawInSeconds } from "../../../../hooks/useGetRaffleLastWithdrawInSeconds";

export const useNextRaffleWithdraw = () => {
  const raffleIntervalInSeconds = useGetRaffleIntervalInSeconds();
  const lastWithdrawInSeconds = useGetRaffleLastWithdrawInSeconds();
  const nextWithdraw = (lastWithdrawInSeconds + raffleIntervalInSeconds) * 1000;

  return {
    nextWithdraw,
  };
};
