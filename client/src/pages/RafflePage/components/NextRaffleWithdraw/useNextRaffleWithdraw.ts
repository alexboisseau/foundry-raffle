import { useEffect, useState } from "react";
import { useGetRaffleIntervalInSeconds } from "../../../../hooks/useGetRaffleIntervalInSeconds";
import { useGetRaffleLastWithdrawInSeconds } from "../../../../hooks/useGetRaffleLastWithdrawInSeconds";
import { formatMilliseconds } from "../../../../utils/format-milliseconds";

export const useNextRaffleWithdraw = () => {
  const raffleIntervalInSeconds = useGetRaffleIntervalInSeconds();
  const lastWithdrawInSeconds = useGetRaffleLastWithdrawInSeconds();
  const [nextWithdrawText, setNextWithdrawText] = useState("");
  const nextWithdrawInMs =
    (lastWithdrawInSeconds + raffleIntervalInSeconds) * 1000;

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTimeStamp = Date.now();
      const timeUntilNextWithdraw = nextWithdrawInMs - currentTimeStamp;

      try {
        const formattedTime = formatMilliseconds(timeUntilNextWithdraw);
        setNextWithdrawText(`Next withdraw in ${formattedTime}`);
      } catch (error) {
        if (timeUntilNextWithdraw <= 0) {
          setNextWithdrawText(
            "Calculation is in progress, a winner should be announced soon!",
          );

          return;
        } else {
          setNextWithdrawText(`Next withdraw in 00:00:00`);
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [nextWithdrawInMs]);

  return {
    nextWithdrawText,
  };
};
