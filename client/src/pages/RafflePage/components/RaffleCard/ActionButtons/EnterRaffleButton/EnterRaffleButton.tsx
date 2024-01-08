/** HOOKS */
import { Button } from "../../../../../../components/ui/Button/Button";
import { useEnterRaffleButton } from "./useEnterRaffleButton";

export const EnterRaffleButton = () => {
  const { buttonIsDisabled, thereIsPendingTx, onClick } =
    useEnterRaffleButton();
  return (
    <>
      <Button
        disabled={buttonIsDisabled}
        value="Enter Raffle"
        onClick={onClick}
      />
      {thereIsPendingTx && <p>Waiting for confirmation...</p>}
    </>
  );
};
