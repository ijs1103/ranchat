import { SunIcon } from "lucide-react";
import { MoonIcon } from "lucide-react";
import { MonitorIcon } from "lucide-react";
import { Theme, useTheme } from "remix-themes";

import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export default function ThemeSwitcher() {
  const [theme, setTheme, metadata] = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        asChild
        className="cursor-pointer border-2 rounded-lg"
        data-testid="theme-switcher"
      >
        <Button variant="ghost" size="icon">
          {metadata.definedBy === "SYSTEM" ? (
            <MonitorIcon className="size-4" />
          ) : theme === Theme.LIGHT ? (
            <SunIcon className="size-4" />
          ) : theme === Theme.DARK ? (
            <MoonIcon className="size-4" />
          ) : null}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        {/* Light theme option */}
        <DropdownMenuItem onClick={() => setTheme(Theme.LIGHT)}>
          <SunIcon className="size-4" />
          Light
        </DropdownMenuItem>

        {/* Dark theme option */}
        <DropdownMenuItem onClick={() => setTheme(Theme.DARK)}>
          <MoonIcon className="size-4" /> Dark
        </DropdownMenuItem>

        {/* System theme option (follows OS preference) */}
        <DropdownMenuItem onClick={() => setTheme(null)}>
          <MonitorIcon className="size-4" /> System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
