/** HOOKS */
import { Button } from "../../../../../../components/ui/Button/Button";
import { useEnterRaffleButton } from "./useEnterRaffleButton";
import { toast } from "react-hot-toast";

export const EnterRaffleButton = () => {
  const { buttonIsDisabled, thereIsPendingTx, onClick } = useEnterRaffleButton({
    onError: () => {
      toast.error("Something went wrong, please try again", { duration: 5000 });
    },
    onSuccess: () => {
      toast.success("Yay! You entered the raffle", { duration: 5000 });
    },
  });

  return (
    <>
      <Button
        disabled={buttonIsDisabled}
        value="Enter Raffle"
        onClick={onClick}
      />
      {thereIsPendingTx && <span>Tx pending ...</span>}
    </>
  );
};
