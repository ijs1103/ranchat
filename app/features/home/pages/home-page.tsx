import { useTranslation } from "react-i18next";
import { RainbowButton } from "~/common/components/ui/rainbow-button";
import { redirect, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { makeSSRClient, supabaseClient } from "~/supabase-client";
import type { Route } from "./+types/home-page";
import { toast } from "sonner";

export async function loader({ request }: Route.LoaderArgs) {
  const { client } = makeSSRClient(request);
  const {
    data: { user },
  } = await client.auth.getUser();

  if (!user) {
    return redirect("/auth/login");
  }

  return {
    user,
  };
}

export default function HomePage({ loaderData }: Route.ComponentProps) {
  const { user } = loaderData;
  const navigate = useNavigate();
  const [isMatching, setIsMatching] = useState(false);

  const handleMatch = async () => {
    setIsMatching(true);
    try {
      // 'match-maker'라는 이름의 Edge Function 호출
      const { data, error } = await supabaseClient.functions.invoke(
        "match-maker",
        {
          body: { userId: user.id },
        }
      );

      if (error) throw error;

      // 3. 서버로부터 받은 결과에 따라 페이지 이동
      if (data && data.message_room_id) {
        toast.success("채팅 상대를 찾았어요!");
        navigate(`/chat/${data.message_room_id}`);
      } else {
        toast("매칭 대기열에 등록되었어요. 잠시만 기다려주세요.");
        //TODO: 매칭대기 로직 (대기중인 상태에서 상대방이 매칭되면 채팅방에 들어가져야함)
      }
    } catch (error) {
      console.log("매칭 실패:", error);
      if (error instanceof Error) {
        toast.error(`매칭 중 오류가 발생했습니다: ${error.message}`);
      } else {
        toast.error("매칭 중 알 수 없는 오류가 발생했습니다.");
      }
    } finally {
      setIsMatching(false);
    }
  };

  return (
    <div className="flex flex-col flex-1 p-6 justify-between">
      <div className="flex flex-col gap-8">
        <h1 className="text-2xl font-bold">채팅</h1>
        <p>다양한 사람들과 대화를 나누어보세요.</p>
      </div>
      {!isMatching ? (
        <RainbowButton
          onClick={() => {
            handleMatch();
            //navigate("/chat");
          }}
          variant="outline"
          size={"lg"}
        >
          시작하기
        </RainbowButton>
      ) : (
        <p>매칭중입니다 ...</p>
      )}
    </div>
  );
}
