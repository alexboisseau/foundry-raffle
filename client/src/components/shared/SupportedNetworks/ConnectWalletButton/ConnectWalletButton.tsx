import {
  Box,
  Button,
  Dialog,
  Flex,
  Link,
  Separator,
  Strong,
  Text,
} from "@radix-ui/themes";
import { useConnect } from "wagmi";
import { connectorsDownloadLinks } from "../../../../constants/connectors-download-links";

const ConnectorsDetected = () => {
  const { connectors, connect } = useConnect();

  return (
    <>
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
    </>
  );
};

const ConnectorsDownloadLinks = () => (
  <>
    <Text as="p" mb="2">
      Any wallet detected. Please install a wallet to continue.
    </Text>
    <Flex gap="3" align="center">
      {connectorsDownloadLinks.map((connector, index) => (
        <>
          <Link
            key={connector.id}
            size="3"
            href={connector.downloadLink}
            target="_blank"
          >
            {connector.name}
          </Link>
          {index + 1 < connectorsDownloadLinks.length && (
            <Separator orientation="vertical" />
          )}
        </>
      ))}
    </Flex>
  </>
);

export const ConnectWalletModal = () => {
  const { connectors } = useConnect();

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
          {connectors.length > 0 ? (
            <ConnectorsDetected />
          ) : (
            <ConnectorsDownloadLinks />
          )}
        </Box>
      </Dialog.Content>
    </Dialog.Root>
  );
};
