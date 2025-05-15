import { Form, redirect, useNavigate } from "react-router";
import { Button } from "~/common/components/ui/button";
import { Input } from "~/common/components/ui/input";
import { z } from "zod";
import { makeSSRClient } from "~/supabase-client";
import { createProfile } from "~/features/users/mutations";
import type { Route } from "./+types/signup-page";
import { getLoggedInUserId } from "~/features/users/queries";
import { MBTI_OPTIONS } from "~/features/users/types";
import type { MBTI } from "~/features/users/types";
import SelectPair from "~/common/components/select-pair";
import InputPair from "~/common/components/input-pair";

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request);
  const {
    data: { user },
  } = await client.auth.getUser();
  if (!user) {
    return redirect("/auth/login");
  }
  return null;
};

const formSchema = z.object({
  nickname: z.string().min(3).max(10),
  age: z
    .number()
    .min(1, { message: "나이는 최소 1세 이상이어야합니다." })
    .max(100, { message: "나이는 최대 100세입니다." }),
  mbti: z.string(),
});

export const action = async ({ request }: Route.ActionArgs) => {
  const { client, headers } = makeSSRClient(request);
  const userId = await getLoggedInUserId(client);
  const formData = await request.formData();

  // formData에서 값을 추출하고 age를 숫자로 변환
  const rawData = Object.fromEntries(formData);
  const parsedData = {
    ...rawData,
    age: rawData.age ? Number(rawData.age) : undefined,
  };

  const { success, data, error } = formSchema.safeParse(parsedData);
  if (!success) {
    return { fieldErrors: error.flatten().fieldErrors };
  }
  await createProfile(client, {
    profile_id: userId,
    nickname: data.nickname,
    age: data.age,
    mbti: data.mbti as MBTI,
  });
  return redirect("/", { headers });
};

export default function SignUpPage({ actionData }: Route.ComponentProps) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold">프로필 생성</h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            서비스 이용을 위한 프로필을 생성해주세요
          </p>
        </div>
        <Form className="mt-8 space-y-6" method="post">
          <div className="space-y-4">
            <InputPair label="닉네임" name="nickname" id="nickname" required />
            {actionData && "fieldErrors" in actionData && (
              <div className="text-red-500">
                {actionData.fieldErrors.nickname?.join(", ")}
              </div>
            )}
            <InputPair label="나이" name="age" id="age" required />
            {actionData && "fieldErrors" in actionData && (
              <div className="text-red-500">
                {actionData.fieldErrors.age?.join(", ")}
              </div>
            )}
            <SelectPair
              required
              name="mbti"
              label="MBTI 유형"
              description="당신의 MBTI 유형을 선택하세요."
              placeholder="ex) intp"
              options={MBTI_OPTIONS.map((mbti) => ({
                label: mbti,
                value: mbti,
              }))}
            />
          </div>
          <Button type="submit" className="w-full">
            가입하기
          </Button>
        </Form>
      </div>
    </div>
  );
}
