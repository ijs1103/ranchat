
import { Outlet, redirect } from "react-router";
import { makeSSRClient } from "~/supabase-client";
import type { Route } from "./+types/private.layout";

export async function loader({ request }: Route.LoaderArgs) {
  const {client} = makeSSRClient(request);
  const {
    data: { user },
  } = await client.auth.getUser();
  if (!user) {
    throw redirect("/auth/login");
  }

  // Return an empty object to avoid the "Cannot read properties of undefined" error
  return {};
}

export default function PrivateLayout() {
  return <Outlet />;
}
