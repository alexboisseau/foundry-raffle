import { useEnterRaffle } from "../../../../../../hooks/useEnterRaffle";

export const useEnterRaffleButton = () => {
  const { enterRaffleStatus, enterRaffleTxStatus, txHash, enterRaffle } =
    useEnterRaffle();

  const txIsPending = enterRaffleTxStatus === "pending" && txHash !== undefined;
  const buttonIsDisabled = enterRaffleStatus === "pending" || txIsPending;

  const thereIsPendingTx =
    enterRaffleTxStatus === "pending" && txHash !== undefined;

  return {
    buttonIsDisabled,
    thereIsPendingTx,
    onClick: enterRaffle,
  };
};
