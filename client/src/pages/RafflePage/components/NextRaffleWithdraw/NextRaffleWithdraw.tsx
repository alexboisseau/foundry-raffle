import { useEffect, useState } from "react";
import { useNextRaffleWithdraw } from "./useNextRaffleWithdraw";
import { formatMilliseconds } from "../../../../utils/format-milliseconds";
import { IoIosHourglass } from "react-icons/io";
import "./NextRaffleWithdraw.scss";
import { useBreakpoints } from "../../../../hooks/useBreakpoints";

export const NextRaffleWithdraw = () => {
  const { nextWithdraw } = useNextRaffleWithdraw();
  const [formattedTimeUntilNextWithdraw, setFormattedTimeUntilNextWithdraw] =
    useState("");
  const { isSm } = useBreakpoints();

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
            "Interval is completed, calculation can take a few minutes",
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
    <div className="next-raffle-withdraw">
      {isSm && <IoIosHourglass size={20} />}
      <h2 className="">Last withdraw in : {formattedTimeUntilNextWithdraw}</h2>
    </div>
  );
};
