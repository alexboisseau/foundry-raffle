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

export const RaffleInformation = () => {
  const enterFee = useGetRaffleEnterFee();
  const lastWinner = useGetRaffleLastWinner();
  const { players, userTickets } = useGetRafflePlayers();

  const formattedEnterFee = formatEther(enterFee);
  const formattedAddress = formatAddress(lastWinner);

  return (
    <div className="raffle-information">
      <RaffleInformationCard
        label="Enter Fee (ETH)"
        value={formattedEnterFee}
      />
      <RaffleInformationCard label="Players" value={players.length} />
      <RaffleInformationCard label="Last Winner" value={formattedAddress} />
      <RaffleInformationCard label="Your tickets" value={userTickets} />
    </div>
  );
};
