import { useEffect, useState } from "react";
import { useNextRaffleWithdraw } from "./useNextRaffleWithdraw";
import { formatMilliseconds } from "../../../../utils/format-milliseconds";

export const NextRaffleWithdraw = () => {
  const { nextWithdraw } = useNextRaffleWithdraw();
  const [formattedTimeUntilNextWithdraw, setFormattedTimeUntilNextWithdraw] =
    useState("00:00:00");

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTimeStamp = Date.now();
      const timeUntilNextWithdraw = nextWithdraw - currentTimeStamp;

      try {
        const formattedTime = formatMilliseconds(timeUntilNextWithdraw);
        setFormattedTimeUntilNextWithdraw(formattedTime);
      } catch (error) {
        if (timeUntilNextWithdraw <= 0) {
          setFormattedTimeUntilNextWithdraw(
            "Interval is completed, calculation should start soon",
          );
        } else {
          setFormattedTimeUntilNextWithdraw("00:00:00");
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [nextWithdraw]);

  return <h2>Last withdraw in : {formattedTimeUntilNextWithdraw}</h2>;
};
