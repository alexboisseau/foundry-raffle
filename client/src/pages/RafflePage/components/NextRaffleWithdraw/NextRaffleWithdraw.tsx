import { useEffect, useState } from "react";
import { useNextRaffleWithdraw } from "./useNextRaffleWithdraw";
import { formatMilliseconds } from "../../../../utils/format-milliseconds";
import { Box, Text } from "@radix-ui/themes";
import "./NextRaffleWithdraw.scss";

export const NextRaffleWithdraw = () => {
  const { nextWithdraw } = useNextRaffleWithdraw();
  const [nextRaffleWithdraw, setNextRaffleWithdraw] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTimeStamp = Date.now();
      const timeUntilNextWithdraw = nextWithdraw - currentTimeStamp;

      try {
        const formattedTime = formatMilliseconds(timeUntilNextWithdraw);
        setNextRaffleWithdraw(`Next withdraw in ${formattedTime}`);
      } catch (error) {
        if (timeUntilNextWithdraw <= 0) {
          setNextRaffleWithdraw(
            "Calculation is in progress, a winner should be announced soon!",
          );

          return;
        } else {
          setNextRaffleWithdraw(`Next withdraw in 00:00:00`);
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [nextWithdraw]);

  return (
    <Box className="next-raffle-withdraw">
      <Text>{nextRaffleWithdraw}</Text>
    </Box>
  );
};
