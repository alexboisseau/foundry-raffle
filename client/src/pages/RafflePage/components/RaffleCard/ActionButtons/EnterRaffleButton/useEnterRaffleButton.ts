import { useEnterRaffle } from "../../../../../../hooks/useEnterRaffle";

export const useEnterRaffleButton = ({
  onSuccess,
  onError,
}: {
  onSuccess: () => void;
  onError: () => void;
}) => {
  const { enterRaffleStatus, enterRaffleTxStatus, txHash, enterRaffle } =
    useEnterRaffle({
      onSuccess,
      onError,
    });

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
