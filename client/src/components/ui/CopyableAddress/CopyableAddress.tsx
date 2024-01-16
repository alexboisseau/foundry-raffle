import { IoCopy } from "react-icons/io5";
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
      <IoCopy size={16} onClick={handleClick} />
    </div>
  );
};
