/** HOOKS */
import { useEnterRaffle } from "../../hooks/useEnterRaffle";

/** STYLES */
import "./EnterRaffle.scss";

export const EnterRaffle = () => {
  const { enterRaffle } = useEnterRaffle();

  return (
    <button className="enter-raffle" onClick={enterRaffle}>
      Enter Raffle
    </button>
  );
};
