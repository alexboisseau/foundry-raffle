import { useEffect, useState } from "react";
import { useNextRaffleWithdraw } from "./useNextRaffleWithdraw";
import { formatMilliseconds } from "../../../../utils/format-milliseconds";

export const NextRaffleWithdraw = () => {
  const { nextWithdraw } = useNextRaffleWithdraw();
  const [formattedTimeUntilNextWithdraw, setFormattedTimeUntilNextWithdraw] =
    useState("00:00:00");

  useEffect(() => {
    console.log("test");
    const interval = setInterval(() => {
      const currentTimeStamp = Date.now();
      const timeUntilNextWithdraw = nextWithdraw - currentTimeStamp;

      try {
        const formattedTime = formatMilliseconds(timeUntilNextWithdraw);
        setFormattedTimeUntilNextWithdraw(formattedTime);
      } catch (error) {
        setFormattedTimeUntilNextWithdraw("00:00:00");
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [nextWithdraw]);

  return <h2>Last withdraw in : {formattedTimeUntilNextWithdraw}</h2>;
};
