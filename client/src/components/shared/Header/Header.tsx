import { Flex, Link, Button } from "@radix-ui/themes";
import { GitHubLogoIcon, MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import "./Header.scss";

const ICONS_SIZE = 17;

const ModeToggle = () => {
  const { theme, setTheme } = useTheme();

  return theme === "dark" ? (
    <Button onClick={() => setTheme("light")} variant="soft">
      <MoonIcon width={ICONS_SIZE} height={ICONS_SIZE} />
    </Button>
  ) : (
    <Button onClick={() => setTheme("dark")} variant="soft">
      <SunIcon width={ICONS_SIZE} height={ICONS_SIZE} />
    </Button>
  );
};

const GitHubLink = () => (
  <Link href="https://github.com/alexboisseau/foundry-raffle" target="_blank">
    <Button variant="soft">
      <Flex align="center" gap="1">
        <GitHubLogoIcon width={ICONS_SIZE} height={ICONS_SIZE} />
      </Flex>
    </Button>
  </Link>
);

export const Header = () => {
  return (
    <header>
      <Flex gap="1" align="center">
        <GitHubLink />
        <ModeToggle />
      </Flex>
    </header>
  );
};
