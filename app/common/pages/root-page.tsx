import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useLoaderData } from "react-router";
import { makeSSRClient } from "~/supabase-client";
import type { Route } from "./+types/root-page";

export async function loader({ request }: Route.LoaderArgs) {
  const { client } = makeSSRClient(request);
  const {
    data: { user },
  } = await client.auth.getUser();
  if (user) {
    return { redirectTo: "/home" };
  }
  return { redirectTo: "/auth/login" };
}

export default function RootPage() {
  const { redirectTo } = useLoaderData();
  const navigate = useNavigate();
  useEffect(() => {
    navigate(redirectTo, { replace: true });
  }, [redirectTo, navigate]);
  return null;
}
