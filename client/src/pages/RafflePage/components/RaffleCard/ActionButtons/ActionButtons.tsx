import { AccountModal } from "./AccountButton/AccountButton";
import { EnterRaffleButton } from "./EnterRaffleButton/EnterRaffleButton";
import { Box } from "@radix-ui/themes";
import "./ActionButtons.scss";

export const ActionButtons = () => (
  <Box className="action-buttons">
    <EnterRaffleButton />
    <AccountModal />
  </Box>
);
