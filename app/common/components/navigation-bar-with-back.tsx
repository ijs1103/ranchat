import {
  ArrowBigLeft,
  Settings,
  UserPlus,
  ShieldX,
  Megaphone,
} from "lucide-react"; // lucide-react 아이콘 사용 예시
import { Link, useNavigate } from "react-router";
import { SheetClose, SheetContent, SheetTrigger } from "./ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export function NavigationBarWithBack() {
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 max-w-[480px] w-screen mx-auto flex h-16 w-full items-center justify-between border-b px-5 bg-background">
      <Link to="/home">
        <ArrowBigLeft className="size-8" />
      </Link>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Settings className="size-8" />
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-48" align="end">
          <DropdownMenuItem asChild>
            <SheetClose asChild>
              <span className="flex items-center text-xl">
                <UserPlus className="mr-2 size-5" /> 친구추가
              </span>
            </SheetClose>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <SheetClose asChild>
              <span className="flex items-center text-xl">
                <ShieldX className="mr-2 size-5" />
                차단 및 나가기
              </span>
            </SheetClose>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <SheetClose asChild>
              <span className="flex items-center text-xl">
                <Megaphone className="mr-2 size-5" />
                신고하기
              </span>
            </SheetClose>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );
}
