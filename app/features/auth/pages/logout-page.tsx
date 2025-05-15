import { redirect } from "react-router";
import { makeSSRClient } from "~/supabase-client";
import type { Route } from "./+types/logout-page";

export async function loader({ request }: Route.ActionArgs) {
  const { client, headers } = makeSSRClient(request);
  await client.auth.signOut();
  return redirect("/", { headers });
}
