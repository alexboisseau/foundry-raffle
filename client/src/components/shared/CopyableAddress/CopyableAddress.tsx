import { CopyIcon } from "@radix-ui/react-icons";
import toast from "react-hot-toast";
import "./CopyableAddress.scss";

type CopyableAddressProps = {
  address: string;
};

export const CopyableAddress = ({ address }: CopyableAddressProps) => {
  const handleClick = () => {
    navigator.clipboard.writeText(address).then(() => {
      toast(`Address copied to clipboard`);
    });
  };

  return (
    <div className="copyable-address">
      <p className="address">{address}</p>
      <CopyIcon onClick={handleClick} />
    </div>
  );
};
