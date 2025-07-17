import { HomeIcon, UserRound, Settings, MessagesSquare } from "lucide-react";
import { useLocation } from "react-router";
import { Link } from "react-router";

const BOTTOM_TABS = [
  {
    label: "홈",
    icon: HomeIcon,
    href: "/home",
  },
  {
    label: "친구목록",
    icon: UserRound,
    href: "/friends",
  },
  {
    label: "대화기록",
    icon: MessagesSquare,
    href: "/chats",
  },
  {
    label: "설정",
    icon: Settings,
    href: "/settings",
  },
];

const BottomTabs = () => {
  const location = useLocation();

  return (
    <div className="md:hidden fixed bottom-0 h-[74px]">
      <div className="fixed flex h-[74px] w-full max-w-[480px] justify-between bg-gray-900 px-[27px]">
        {BOTTOM_TABS.map((ele) => (
          <Link
            key={ele.label}
            to={ele.href}
            className="w-20 justify-center pt-3 pb-6 text-center"
          >
            <div className="mb-2 flex self-center justify-center">
              <ele.icon
                className={
                  location.pathname === ele.href
                    ? "text-primary"
                    : "text-gray-400"
                }
                height={24}
              />
            </div>
            <p
              className={
                location.pathname === ele.href
                  ? "text-primary"
                  : "text-gray-400"
              }
            >
              {ele.label}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BottomTabs;
