import * as React from "react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { MenuIcon } from "lucide-react";

interface CustomSheetProps {
  children: React.ReactNode;
  content: React.ReactNode;
}

/**
 * 컨테이너 내부에서만 작동하는 커스텀 Sheet 컴포넌트
 *
 * @param children - 트리거 버튼 내부에 표시될 콘텐츠
 * @param content - Sheet가 열렸을 때 표시될 콘텐츠
 */
export function CustomSheet({ children, content }: CustomSheetProps) {
  return (
    <div className="relative">
      <Sheet>
        <SheetTrigger className="size-6">
          {children || <MenuIcon />}
        </SheetTrigger>
        <div className="absolute top-0 left-0 max-w-full">
          <SheetContent
            className="w-[200px] max-w-[80%] !left-0 !ml-0 origin-top-left"
            side="left"
          >
            {content}
          </SheetContent>
        </div>
      </Sheet>
    </div>
  );
}
