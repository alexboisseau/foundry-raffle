import { useAccount } from "wagmi";
import { SUPPORTED_CHAINS_IDS } from "../../../constants/supported-chains";
import { Flex, Text } from "@radix-ui/themes";
import { ConnectWalletModal } from "./ConnectWalletButton/ConnectWalletButton";
import { SwitchNetworkModal } from "./SwitchNetworkButton/SwitchNetworkModal";

export const SupportedNetworks = ({ children }: { children: JSX.Element }) => {
  const { chain, isConnected } = useAccount();

  const currentNetworkIsSupported =
    chain && SUPPORTED_CHAINS_IDS.includes(chain.id);

  return (
    <>
      {!isConnected && <ConnectWalletModal />}
      {isConnected && !currentNetworkIsSupported && (
        <Flex className="unsupported-network" direction="column" gap="3">
          <Text>Unsupported Network</Text>
          <SwitchNetworkModal />
        </Flex>
      )}
      {isConnected &&
        chain &&
        SUPPORTED_CHAINS_IDS.includes(chain.id) &&
        children}
    </>
  );
};
