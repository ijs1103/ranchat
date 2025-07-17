import { cn } from "~/lib/utils";

type ChatBubbleProps = {
  type: "message" | "typing"; // 버블의 종류 (메시지 또는 입력 중 표시)
  message?: string; // 메시지 내용
  timestamp?: string; // 전송 시간
  isOwnMessage?: boolean; // 내가 보낸 메시지인지 여부
};

export function ChatBubble({
  type,
  message,
  timestamp,
  isOwnMessage = false, // 기본값은 false (상대방 메시지)
}: ChatBubbleProps) {
  // "입력 중" 상태일 경우, 점 3개 애니메이션을 보여줍니다.
  if (type === "typing") {
    return (
      <li className="flex flex-col items-start">
        <div className="flex w-fit items-center gap-1 rounded-lg bg-gray-100 px-2 py-2.5 text-sm">
          <div className="size-2 animate-pulse rounded-full bg-gray-300 [animation-delay:-0.3s]" />
          <div className="size-2 animate-pulse rounded-full bg-gray-400 [animation-delay:-0.15s]" />
          <div className="size-2 animate-pulse rounded-full bg-gray-300" />
        </div>
      </li>
    );
  }

  return (
    <li
      className={cn([
        isOwnMessage ? "items-end" : "items-start",
        "flex",
        "flex-col",
        "gap-1",
      ])}
    >
      <div
        className={cn([
          isOwnMessage ? "bg-blue-600/70 text-white" : "bg-gray-100 text-black",
          "mt-2",
          "max-w-xs",
          "rounded-lg",
          "p-2",
          "text-sm",
          "md:max-w-md",
        ])}
      >
        {message}
      </div>
      <div
        className={cn([
          isOwnMessage ? "text-right" : "text-left",
          "text-xs",
          "text-gray-500",
        ])}
      >
        {timestamp}
      </div>
    </li>
  );
}
