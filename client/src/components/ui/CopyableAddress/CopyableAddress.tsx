import { IoCopy } from "react-icons/io5";
import "./CopyableAddress.scss";

export const CopyableAddress = ({ address }: { address: string }) => {
  const handleClick = () => {
    navigator.clipboard.writeText(address).then(() => {
      alert("Copied " + address + " to clipboard");
    });
  };

  return (
    <div className="copyable-address">
      <p className="address">{address}</p>
      <IoCopy size={16} onClick={handleClick} />
    </div>
  );
};
