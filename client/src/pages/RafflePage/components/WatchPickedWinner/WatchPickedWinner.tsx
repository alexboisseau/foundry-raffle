import toast from "react-hot-toast";
import {
  PickedWinnerEventArgsLog,
  useWatchPickedWinnerEvent,
} from "../../../../hooks/useWatchPickedWinnerEvent";
import { formatAddress } from "../../../../utils/format-address";

export const WatchPickedWinner = () => {
  useWatchPickedWinnerEvent({
    onLogs: (args: PickedWinnerEventArgsLog) => {
      toast.success(
        `A winner has been picked, congratulations ! ${formatAddress(
          args.winner,
        )}`,
      );
    },
  });
  return <></>;
};
