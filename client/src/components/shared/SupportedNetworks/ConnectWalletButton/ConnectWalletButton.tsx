import { Box, Button, Dialog, Flex, Strong, Text } from "@radix-ui/themes";
import { useConnect } from "wagmi";

export const ConnectWalletModal = () => {
  const { connectors, connect } = useConnect();

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button size="2" variant="outline">
          Connect your wallet
        </Button>
      </Dialog.Trigger>

      <Dialog.Content style={{ maxWidth: 450 }}>
        <Flex justify={"between"} align="center" mb="5">
          <Text size="5">
            <Strong>Connect your wallet</Strong>
          </Text>
          <Dialog.Close>
            <Button variant="soft">X</Button>
          </Dialog.Close>
        </Flex>

        <Box>
          <Text as="p" mb="2">
            Choose between available connectors
          </Text>
          <Flex gap="3">
            {connectors.map((connector) => (
              <Button
                onClick={() => connect({ connector })}
                key={connector.id}
                size="3"
              >
                {connector.name}
              </Button>
            ))}
          </Flex>
        </Box>
      </Dialog.Content>
    </Dialog.Root>
  );
};
