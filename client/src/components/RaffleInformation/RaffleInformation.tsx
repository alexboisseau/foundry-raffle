import React from "react";
import "./RaffleInformation.scss";
import { raffleAbi, raffleAddresses } from "../../constants/raffle-contract";
import { Address, useContractRead, useContractReads, useNetwork } from "wagmi";
import { RaffleInformationLine } from "./RaffleInformationLine";
import { formatEther } from "viem";
import { formatAddress } from "../../utils/format-address";

// Raffle Amount
// Number of players
// Last winner
// State of raffle

const useRaffleInformation = (): {
  players: number;
  lastWinner: Address;
  enterFee: bigint;
} => {
  const { chain } = useNetwork();

  const contract = {
    address: raffleAddresses[chain!.id],
    abi: raffleAbi,
  };

  const { data: players, isError: isGetPlayers } = useContractRead({
    ...contract,
    functionName: "getPlayers",
  });

  const { data: lastWinner, isError: isGetLastWinnerError } = useContractRead({
    ...contract,
    functionName: "getLastWinner",
  });

  const { data: enterFee, isError: isGetEnterFeeError } = useContractRead({
    ...contract,
    functionName: "getEnterFee",
  });

  return {
    players: !isGetPlayers && players ? players.length : 0,
    lastWinner: !isGetLastWinnerError && lastWinner ? lastWinner : "0x",
    enterFee: !isGetEnterFeeError && enterFee ? enterFee : 0n,
  };
};

export const RaffleInformation = () => {
  const { players, lastWinner, enterFee } = useRaffleInformation();

  return (
    <div className="raffle-information">
      <RaffleInformationLine
        label="Enter Fee (ETH)"
        value={formatEther(enterFee)}
      />
      <RaffleInformationLine label="Players" value={players} />
      <RaffleInformationLine
        label="Last Winner"
        value={formatAddress(lastWinner)}
      />
    </div>
  );
};
