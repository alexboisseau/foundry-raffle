import { useEffect, useState } from "react";
import { useNextRaffleWithdraw } from "./useNextRaffleWithdraw";
import { formatMilliseconds } from "../../../../utils/format-milliseconds";
import "./NextRaffleWithdraw.scss";

export const NextRaffleWithdraw = () => {
  const { nextWithdraw } = useNextRaffleWithdraw();
  const [formattedTimeUntilNextWithdraw, setFormattedTimeUntilNextWithdraw] =
    useState("");

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

          return;
        } else {
          setFormattedTimeUntilNextWithdraw("00:00:00");
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [nextWithdraw]);

  return (
    <h2 className="next-raffle-withdraw">
      Last withdraw in : {formattedTimeUntilNextWithdraw}
    </h2>
  );
};
