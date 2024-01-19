import { Card, Flex, Text, Strong } from "@radix-ui/themes";

type RaffleInformationCardProps = {
  gridAreaClassName: string;
  label: string;
  value: JSX.Element | string | number;
};

export const RaffleInformationCard = ({
  gridAreaClassName,
  label,
  value,
}: RaffleInformationCardProps) => (
  <Card className={`raffle-information-card ${gridAreaClassName}`}>
    <Flex direction="column" align="center">
      <Text>{label}</Text>
      <Text className="value">
        <Strong>{value}</Strong>
      </Text>
    </Flex>
  </Card>
);
