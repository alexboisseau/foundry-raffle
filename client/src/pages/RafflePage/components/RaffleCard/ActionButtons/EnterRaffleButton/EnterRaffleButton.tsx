/** HOOKS */
import { useEnterRaffle } from "../../../../../../hooks/useEnterRaffle";
import { Button } from "../../../../../../components/ui/Button/Button";

export const EnterRaffleButton = () => {
  const { enterRaffle } = useEnterRaffle();

  return <Button value="Enter Raffle" onClick={enterRaffle} />;
};
