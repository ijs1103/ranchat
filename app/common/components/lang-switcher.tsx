import { useTranslation } from "react-i18next";
import { useFetcher } from "react-router";

import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export default function LangSwitcher() {
  // Get translation function and i18n instance
  const { t, i18n } = useTranslation();

  // Get fetcher for making API requests
  const fetcher = useFetcher();

  const handleLocaleChange = async (locale: string) => {
    // Change language in i18n context (client-side)
    i18n.changeLanguage(locale);

    // Persist language preference on the server
    await fetcher.submit(null, {
      method: "POST",
      action: "/api/settings/locale?locale=" + locale,
    });
  };

  return (
    <DropdownMenu>
      {/* Dropdown trigger button with current language flag */}
      <DropdownMenuTrigger
        asChild
        className="cursor-pointer border-2 rounded-lg"
        data-testid="lang-switcher" // For testing purposes
      >
        <Button variant="ghost" size="icon" className="text-lg">
          {/* Conditionally render the appropriate flag based on current language */}
          {i18n.language === "en"
            ? "🇬🇧" // UK flag for English
            : i18n.language === "ko"
            ? "🇰🇷" // South Korea flag for Korean
            : null}
        </Button>
      </DropdownMenuTrigger>

      {/* Dropdown menu with language options */}
      <DropdownMenuContent align="end">
        {/* Korean language option */}
        <DropdownMenuItem onClick={() => handleLocaleChange("ko")}>
          🇰🇷 {t("navigation.kr")} {/* Translated name of Korean */}
        </DropdownMenuItem>

        {/* English language option */}
        <DropdownMenuItem onClick={() => handleLocaleChange("en")}>
          🇬🇧 {t("navigation.en")} {/* Translated name of English */}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
