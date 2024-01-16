import { IoCopy } from "react-icons/io5";
import "./CopyableAddress.scss";
import toast from "react-hot-toast";

export const CopyableAddress = ({ address }: { address: string }) => {
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
