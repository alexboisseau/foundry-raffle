import { Button } from "@radix-ui/themes";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  return theme === "dark" ? (
    <Button onClick={() => setTheme("light")} variant="soft">
      <MoonIcon width={17} height={17} />
    </Button>
  ) : (
    <Button onClick={() => setTheme("dark")} variant="soft">
      <SunIcon width={17} height={17} />
    </Button>
  );
}
