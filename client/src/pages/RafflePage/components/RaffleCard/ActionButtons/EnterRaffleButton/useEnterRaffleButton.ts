import { useEnterRaffle } from "../../../../../../hooks/useEnterRaffle";

type EnterRaffleButtonProps = {
  onSuccess: () => void;
  onError: () => void;
};

export const useEnterRaffleButton = ({
  onSuccess,
  onError,
}: EnterRaffleButtonProps) => {
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
