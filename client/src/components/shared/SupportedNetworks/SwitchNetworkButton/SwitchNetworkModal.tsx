import { Badge, Box, Button, Dialog, Flex, Text } from "@radix-ui/themes";
import { useAccount, useSwitchChain } from "wagmi";

export const SwitchNetworkModal = () => {
  const { chains, switchChain } = useSwitchChain();
  const { chain } = useAccount();

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button size="3" variant="solid">
          Switch network
        </Button>
      </Dialog.Trigger>

      <Dialog.Content style={{ maxWidth: 450 }}>
        <Flex justify={"between"} mb="5">
          <Badge>{chain?.name}</Badge>
          <Dialog.Close>
            <Button variant="soft">X</Button>
          </Dialog.Close>
        </Flex>

        <Box>
          <Text as="p" my="2">
            Choose between available networks
          </Text>
          <Flex gap="2">
            {chains.map((chain) => (
              <Button
                key={chain.id}
                onClick={() => switchChain({ chainId: chain.id })}
                variant="solid"
                size="3"
              >
                {chain.name}
              </Button>
            ))}
          </Flex>
        </Box>
      </Dialog.Content>
    </Dialog.Root>
  );
};
