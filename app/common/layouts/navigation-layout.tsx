import { Outlet, redirect } from "react-router";
import { NavigationBar } from "~/common/components/navigation-bar";
import { makeSSRClient } from "~/supabase-client";
import type { Route } from "./+types/root-layout";
import { Sheet } from "../components/ui/sheet";

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

  return (
    <div className="flex justify-center items-center bg-gray-400">
      <div className="flex min-h-screen flex-col bg-black overflow-hidden max-w-[480px] w-screen relative">
        <Sheet>
          <NavigationBar
            name={user.name}
            email={user.email}
            avatarUrl={user.avatarUrl}
            loading={false}
          />
          <div className="mx-auto my-16 w-full px-5">
            <Outlet />
          </div>
        </Sheet>
      </div>
    </div>
  );
}
