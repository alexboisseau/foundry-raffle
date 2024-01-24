import { useNextRaffleWithdraw } from "./useNextRaffleWithdraw";
import { Box, Text } from "@radix-ui/themes";
import "./NextRaffleWithdraw.scss";

export const NextRaffleWithdraw = () => {
  const { nextWithdrawText } = useNextRaffleWithdraw();

  return (
    <Box className="next-raffle-withdraw">
      <Text>{nextWithdrawText}</Text>
    </Box>
  );
};
