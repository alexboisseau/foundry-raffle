import { useAccount } from "wagmi";
import { Button } from "../../../../../../components/ui/Button/Button";
import { formatAddress } from "../../../../../../utils/format-address";

export const AccountButton = () => {
  const { address } = useAccount();
  const formattedAddress = formatAddress(address ?? "0x");

  return (
    <Button
      onClick={() => {
        console.log("lol");
      }}
      value={formattedAddress}
    />
  );
};
