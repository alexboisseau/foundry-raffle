/** COMPONENTS */
import { RaffleInformationLine } from "./RaffleInformationLine";

/** HOOKS */
import { useGetRaffleEnterFee } from "../../../../../hooks/useGetRaffleEnterFee";
import { useGetRafflePlayers } from "../../../../../hooks/useGetRafflePlayers";
import { useGetRaffleLastWinner } from "../../../../../hooks/useGetRaffleLastWinner";

/** STYLES */
import "./RaffleInformation.scss";

/** VIEM */
import { formatEther } from "viem";

/** UTILS */
import { formatAddress } from "../../../../../utils/format-address";

export const RaffleInformation = () => {
  const enterFee = useGetRaffleEnterFee();
  const players = useGetRafflePlayers();
  const lastWinner = useGetRaffleLastWinner();

  const formattedEnterFee = formatEther(enterFee);
  const formattedAddress = formatAddress(lastWinner);

  return (
    <div className="raffle-information">
      <RaffleInformationLine
        label="Enter Fee (ETH)"
        value={formattedEnterFee}
      />
      <RaffleInformationLine label="Players" value={players} />
      <RaffleInformationLine label="Last Winner" value={formattedAddress} />
    </div>
  );
};
