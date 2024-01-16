/** COMPONENTS */
import { RaffleInformationCard } from "./RaffleInformationCard";

/** HOOKS */
import { useGetRaffleEnterFee } from "../../../../../hooks/useGetRaffleEnterFee";
import { useGetRaffleLastWinner } from "../../../../../hooks/useGetRaffleLastWinner";

/** STYLES */
import "./RaffleInformation.scss";

/** VIEM */
import { formatEther } from "viem";

/** UTILS */
import { formatAddress } from "../../../../../utils/format-address";
import { useGetRafflePlayers } from "../../../../../hooks/useGetRafflePlayers";
import { useBreakpoints } from "../../../../../hooks/useBreakpoints";

export const RaffleInformation = () => {
  const enterFee = useGetRaffleEnterFee();
  const lastWinner = useGetRaffleLastWinner();
  const { players, userTickets } = useGetRafflePlayers();
  const { isSm } = useBreakpoints();

  const formattedEnterFee = formatEther(enterFee);
  const formattedAddress = isSm ? lastWinner : formatAddress(lastWinner);

  return (
    <div className="raffle-information">
      <RaffleInformationCard
        gridAreaClassName="enter-fee"
        label="Enter Fee (ETH)"
        value={formattedEnterFee}
      />
      <RaffleInformationCard
        gridAreaClassName="players"
        label="Players"
        value={players.length}
      />
      <RaffleInformationCard
        gridAreaClassName="last-winner"
        label="Last Winner"
        value={formattedAddress}
      />
      <RaffleInformationCard
        gridAreaClassName="tickets"
        label="Your tickets"
        value={userTickets}
      />
    </div>
  );
};
