import { z } from "zod";
import { redirect } from "react-router";
import { makeSSRClient } from "~/supabase-client";
import { getProfile } from "~/features/users/mutations";
import type { Route } from "./+types/social-login-complete-page";

const paramsSchema = z.object({
  provider: z.enum(["google", "apple", "kakao"]),
});

export const loader = async ({ params, request }: Route.LoaderArgs) => {
  const { success } = paramsSchema.safeParse(params);
  if (!success) {
    return redirect("/auth/login");
  }
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  if (!code) {
    return redirect("/auth/login");
  }
  const { client, headers } = makeSSRClient(request);
  const {
    data: { user },
    error,
  } = await client.auth.exchangeCodeForSession(code);
  if (error) {
    throw error;
  }
  if (!user) {
    return redirect("/auth/login");
  }

  try {
    // 프로필 존재 여부 확인
    await getProfile(client, { profile_id: user.id });
    // 프로필이 존재하면 메인 페이지로 리다이렉트
    return redirect("/dashboard", { headers });
  } catch (error: any) {
    return redirect("/auth/signup", { headers });
  }
};
