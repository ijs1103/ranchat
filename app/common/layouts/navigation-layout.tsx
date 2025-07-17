import { Outlet, redirect, useLocation } from "react-router";
import { NavigationBar } from "~/common/components/navigation-bar";
import { makeSSRClient } from "~/supabase-client";
import type { Route } from "./+types/navigation-layout";
import { Sheet } from "../components/ui/sheet";
import BottomTabs from "../components/bottom-tabs";

export async function loader({ request }: Route.LoaderArgs) {
  const { client } = makeSSRClient(request);
  const {
    data: { user },
  } = await client.auth.getUser();

  if (!user) {
    return redirect("/auth/login");
  }

  return {
    user: {
      name: user.user_metadata.name || "Anonymous",
      email: user.email,
      avatarUrl: user.user_metadata.avatar_url,
    },
  };
}

export default function NavigationLayout({ loaderData }: Route.ComponentProps) {
  const { user } = loaderData;
  const location = useLocation();

  // NavigationBar를 숨길 페이지 목록
  const pagesToHideNavBar = ["/search", "/message", "/chat"];
  const shouldHideNavBar = pagesToHideNavBar.some((path) =>
    location.pathname.startsWith(path)
  );
  // BottomTabs를 숨길 페이지 목록
  const pagesToHideBottomTabs = ["/message"];
  const shouldHideBottomTabs = pagesToHideBottomTabs.some((path) =>
    location.pathname.startsWith(path)
  );

  return (
    <div className="flex justify-center items-center bg-gray-400">
      <div className="flex min-h-screen flex-col bg-white dark:bg-black overflow-hidden max-w-[480px] w-screen relative">
        <Sheet>
          {!shouldHideNavBar && (
            <NavigationBar
              name={user.name}
              email={user.email}
              avatarUrl={user.avatarUrl}
              loading={false}
            />
          )}
          <div
            className={`mx-auto w-full flex flex-1 flex-col ${
              shouldHideNavBar ? "h-full" : "my-16 px-5"
            }`}
          >
            <Outlet />
          </div>
          {!shouldHideBottomTabs && <BottomTabs />}
        </Sheet>
      </div>
    </div>
  );
}
