import { Button } from "../../../../../../components/ui/Button/Button";
import { useEnterRaffleButton } from "./useEnterRaffleButton";
import { toast } from "react-hot-toast";
import { IoTicketOutline } from "react-icons/io5";
import ClipLoader from "react-spinners/ClipLoader";

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
        icon={
          thereIsPendingTx ? (
            <ClipLoader size={16} />
          ) : (
            <IoTicketOutline size={20} />
          )
        }
        value={thereIsPendingTx ? "Tx pending" : "Enter raffle"}
        onClick={onClick}
        className="enter-raffle-button"
        backgroundColor="#f8fafc"
        hoverBackgroundColor="#e2e8f0"
        color="#020617"
      />
    </>
  );
};
