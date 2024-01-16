import { RaffleInformationCard } from "./RaffleInformationCard";
import { useGetRaffleEnterFee } from "../../../../../hooks/useGetRaffleEnterFee";
import { useGetRaffleLastWinner } from "../../../../../hooks/useGetRaffleLastWinner";
import { formatEther } from "viem";
import { formatAddress } from "../../../../../utils/format-address";
import { useGetRafflePlayers } from "../../../../../hooks/useGetRafflePlayers";
import { useBreakpoints } from "../../../../../hooks/useBreakpoints";
import { CopyableAddress } from "../../../../../components/ui/CopyableAddress/CopyableAddress";
import "./RaffleInformation.scss";

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
        value={<CopyableAddress address={formattedAddress} />}
      />
      <RaffleInformationCard
        gridAreaClassName="tickets"
        label="Your tickets"
        value={userTickets}
      />
    </div>
  );
};
