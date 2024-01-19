import { Badge, Button, Dialog, Flex, Text } from "@radix-ui/themes";
import { useAccount, useDisconnect } from "wagmi";
import { formatAddress } from "../../../../../../utils/format-address";
import { SwitchNetworkModal } from "../../../../../../components/shared/SupportedNetworks/SwitchNetworkButton/SwitchNetworkModal";
import { CopyableAddress } from "../../../../../../components/ui/CopyableAddress/CopyableAddress";

export const AccountModal = () => {
  const { address } = useAccount();
  const formattedAddress = formatAddress(address ?? "0x");
  const { disconnect } = useDisconnect();

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button size="3" variant="outline">
          Open account modal
        </Button>
      </Dialog.Trigger>

      <Dialog.Content style={{ maxWidth: 450 }}>
        <Flex justify={"between"} mb="5">
          <Badge>
            <CopyableAddress address={formattedAddress} />
          </Badge>
          <Dialog.Close>
            <Button variant="soft">X</Button>
          </Dialog.Close>
        </Flex>

        <Flex gap="3">
          <SwitchNetworkModal />
          <Button size="3" onClick={() => disconnect()} variant="solid">
            Disconnect
          </Button>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};
