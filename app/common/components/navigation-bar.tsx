import {
  CogIcon,
  HomeIcon,
  LogOutIcon,
  MenuIcon,
  MessagesSquare,
  Search,
  Settings,
  UserRound,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";

import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Separator } from "./ui/separator";
import {
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTrigger,
} from "./ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import ThemeSwitcher from "./theme-switcher";
import LangSwitcher from "./lang-switcher";
import { useIsMobile } from "../hooks/useMobile";
import { cn } from "~/lib/utils";

function UserMenu({
  name,
  email,
  avatarUrl,
}: {
  name: string;
  email?: string;
  avatarUrl?: string | null;
}) {
  return (
    <DropdownMenu>
      {/* Avatar as the dropdown trigger */}
      <DropdownMenuTrigger asChild>
        <Avatar className="size-12 cursor-pointer rounded-lg">
          <AvatarImage src={avatarUrl ?? undefined} />
          <AvatarFallback>{name.slice(0, 2)}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      {/* Dropdown content with user info and actions */}
      <DropdownMenuContent className="w-56">
        {/* User information display */}
        <DropdownMenuLabel className="grid flex-1 text-left text-sm leading-tight">
          <span className="truncate font-semibold">{name}</span>
          <span className="truncate text-xs">{email}</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        {/* Dashboard link */}
        <DropdownMenuItem asChild>
          <SheetClose asChild>
            <Link to="/home" viewTransition>
              <HomeIcon className="size-4" />
              Dashboard
            </Link>
          </SheetClose>
        </DropdownMenuItem>

        {/* Logout link */}
        <DropdownMenuItem asChild>
          <SheetClose asChild>
            <Link to="/logout" viewTransition>
              <LogOutIcon className="size-4" />
              Log out
            </Link>
          </SheetClose>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

/**
 * AuthButtons Component
 *
 * Displays authentication buttons (Sign in and Sign up) for unauthenticated users.
 * This component is shown in the navigation bar when no user is logged in and provides
 * quick access to authentication screens.
 *
 * Features:
 * - Sign in button with ghost styling (less prominent)
 * - Sign up button with default styling (more prominent)
 * - View transitions for smooth navigation to auth screens
 * - Compatible with mobile navigation drawer (SheetClose integration)
 *
 * @returns Fragment containing sign in and sign up buttons
 */
function AuthButtons() {
  return (
    <>
      {/* Sign in button (less prominent) */}
      <Button variant="ghost" asChild>
        <SheetClose asChild>
          <Link to="/login" viewTransition>
            Sign in
          </Link>
        </SheetClose>
      </Button>

      {/* Sign up button (more prominent) */}
      <Button variant="default" asChild>
        <SheetClose asChild>
          <Link to="/join" viewTransition>
            Sign up
          </Link>
        </SheetClose>
      </Button>
    </>
  );
}

/**
 * Actions Component
 *
 * Displays utility actions and settings in the navigation bar, including:
 * - Debug/settings dropdown menu with links to monitoring tools
 * - Theme switcher for toggling between light and dark mode
 * - Language switcher for changing the application language
 *
 * This component is shown in the navigation bar for all users regardless of
 * authentication state and provides access to application-wide settings and tools.
 *
 * @returns Fragment containing settings dropdown, theme switcher, and language switcher
 */
function Actions() {
  return (
    <>
      {/* Theme switcher component (light/dark mode) */}
      <ThemeSwitcher />

      {/* Language switcher component */}
      <LangSwitcher />
    </>
  );
}

/**
 * NavigationBar Component
 *
 * The main navigation header for the application that adapts to different screen sizes
 * and user authentication states. This component serves as the primary navigation
 * interface and combines several sub-components to create a complete navigation experience.
 *
 * Features:
 * - Responsive design with desktop navigation and mobile drawer
 * - Application branding with localized title
 * - Main navigation links (Blog, Contact, Payments)
 * - User authentication state handling (loading, authenticated, unauthenticated)
 * - User profile menu with avatar for authenticated users
 * - Sign in/sign up buttons for unauthenticated users
 * - Theme and language switching options
 *
 * @param name - The authenticated user's name (if available)
 * @param email - The authenticated user's email (if available)
 * @param avatarUrl - The authenticated user's avatar URL (if available)
 * @param loading - Boolean indicating if the auth state is still loading
 * @returns The complete navigation bar component
 */
export function NavigationBar({
  name,
  email,
  avatarUrl,
  loading,
}: {
  name?: string;
  email?: string;
  avatarUrl?: string | null;
  loading: boolean;
}) {
  // Get translation function for internationalization
  const { t } = useTranslation();
  const isMobile = useIsMobile();

  return (
    <nav
      className={
        "mx-auto flex h-16 w-full items-center justify-between border-b px-5 shadow-xs backdrop-blur-lg transition-opacity md:px-10 bg-background"
      }
    >
      <div className="mx-auto flex h-full w-full items-center justify-between py-3 relative">
        {/* Mobile menu trigger (hidden on desktop) */}
        {isMobile ? null : (
          <SheetTrigger className="size-6">
            <MenuIcon />
          </SheetTrigger>
        )}
        <SheetContent
          className={cn([
            isMobile ? "hidden" : "w-[480px]",
            "pt-12",
            "mx-auto",
          ])}
          side={isMobile ? undefined : "top"}
        >
          <SheetHeader>
            {name ? (
              <>
                <div className="flex justify-between items-end pb-4">
                  <div className="flex w-full">
                    <UserMenu name={name} email={email} avatarUrl={avatarUrl} />
                  </div>
                  <div className="flex gap-2">
                    <Actions />
                  </div>
                </div>
                <Separator />

                <div className="flex flex-col gap-8 pt-8">
                  <SheetClose asChild>
                    <Link className="flex items-center gap-6" to="/blog">
                      <UserRound />
                      친구목록
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link className="flex items-center gap-6" to="/contact">
                      <MessagesSquare />
                      대화기록
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link
                      className="flex items-center gap-6"
                      to="/payments/checkout"
                    >
                      <Settings />
                      설정
                    </Link>
                  </SheetClose>
                </div>
              </>
            ) : (
              <div className="flex flex-col gap-5">
                <div className="flex justify-between">
                  <Actions />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <AuthButtons />
                </div>
              </div>
            )}
          </SheetHeader>
        </SheetContent>

        {/* Application logo/title with link to home */}
        <Link
          to="/"
          className={isMobile ? "absolute left-1/2 -translate-x-1/2" : ""}
        >
          <h1 className="text-lg font-extrabold">{t("home.title")}</h1>
        </Link>
        <Link to="/search" className={isMobile ? "ml-auto" : ""}>
          <Search className="size-6" />
        </Link>
      </div>
    </nav>
  );
}
