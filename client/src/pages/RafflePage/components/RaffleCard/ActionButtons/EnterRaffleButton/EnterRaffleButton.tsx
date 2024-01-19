import { useEnterRaffleButton } from "./useEnterRaffleButton";
import { toast } from "react-hot-toast";
import { Button } from "@radix-ui/themes";

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
    <Button disabled={buttonIsDisabled} onClick={onClick} size="3">
      {thereIsPendingTx ? "Tx pending" : "Enter raffle"}
    </Button>
  );
};
