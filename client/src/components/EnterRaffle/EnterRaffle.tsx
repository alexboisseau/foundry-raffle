/** HOOKS */
import { useEnterRaffle } from "../../hooks/useEnterRaffle";
import { Button } from "../ui/Button/Button";

/** STYLES */
import "./EnterRaffle.scss";

export const EnterRaffle = () => {
  const { enterRaffle } = useEnterRaffle();

  return <Button value="Enter Raffle" onClick={enterRaffle} />;
};
