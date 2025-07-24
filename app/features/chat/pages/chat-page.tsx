import { NavigationBarWithBack } from "~/common/components/navigation-bar-with-back";
import type { Route } from "./+types/chat-page";
import { ChatBubble } from "../components/chat-bubble";
import { ChatInput } from "../components/chat-input";
import { useEffect, useRef, useState } from "react";
import { makeSSRClient, supabaseClient } from "~/supabase-client";
import { getLoggedInUserId } from "~/features/users/queries";
import { useParams } from "react-router";
import type { Message } from "../types";
import { toast } from "sonner";

export const meta: Route.MetaFunction = () => {
  return [{ title: "Message | RanChat" }];
};

export const loader = async ({ request, params }: Route.LoaderArgs) => {
  const { client } = await makeSSRClient(request);
  const userId = await getLoggedInUserId(client);
  const messageRoomId = params.messageRoomId;

  if (!messageRoomId) {
    throw new Error("Message room ID is required");
  }

  const { data, error } = await client
    .from("messages")
    .select("*")
    .eq("message_room_id", messageRoomId as any)
    .order("created_at", { ascending: true });

  if (error || !data) {
    console.error("Error fetching messages:", error);
    return { messages: [], userId };
  }

  return { messages: data as unknown as Message[], userId };
};

export default function ChatPage({ loaderData }: Route.ComponentProps) {
  const { messages: initialMessages, userId } = loaderData;

  const { messageRoomId } = useParams();
  const [messages, setMessages] = useState<Message[]>(
    initialMessages as Message[]
  );
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<null | HTMLLIElement>(null);
  const [isTyping, setIsTyping] = useState(false); // [추가] 상대방 입력 상태
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null); // [추가] 타이핑 타임아웃 ref

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  // Supabase Realtime 구독 설정
  useEffect(() => {
    if (!messageRoomId) return;

    const channel = supabaseClient
      .channel(`chat-room-${messageRoomId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `message_room_id=eq.${messageRoomId}`,
        },
        (payload) => {
          // 새 메시지를 받으면, 상대방의 '입력 중' 상태를 false로 변경합니다.
          setIsTyping(false);
          setMessages((currentMessages) => [
            ...currentMessages,
            payload.new as Message,
          ]);
        }
      )
      // 2. [추가] Broadcast 구독
      .on("broadcast", { event: "typing" }, (payload) => {
        // 나 자신이 보낸 이벤트는 무시합니다.
        if (payload.senderId === userId) return;
        setIsTyping(payload.isTyping);
      })
      .subscribe((status) => {
        if (status === "SUBSCRIBED") {
          console.log("Realtime 채널에 연결되었습니다.");
        }
      });

    return () => {
      supabaseClient.removeChannel(channel);
    };
  }, [messageRoomId, userId]);

  // [추가] 타이핑 이벤트 Broadcast 함수
  const handleTyping = (isTyping: boolean) => {
    if (!messageRoomId) return;
    const channel = supabaseClient.channel(`chat-room-${messageRoomId}`);
    channel.send({
      type: "broadcast",
      event: "typing",
      isTyping,
      senderId: userId, // 다른 클라이언트에서 내가 보낸 이벤트인지 식별하기 위함
    });
  };

  // [추가] 입력 값 변경 시 타이핑 이벤트 전송
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);

    // 이전에 설정된 타임아웃이 있다면 초기화
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    } else {
      // 타이핑 시작 이벤트 전송
      handleTyping(true);
    }

    // 1.5초 동안 추가 입력이 없으면 타이핑 중단 이벤트 전송
    typingTimeoutRef.current = setTimeout(() => {
      handleTyping(false);
      typingTimeoutRef.current = null;
    }, 1500);
  };

  // 메시지 전송 핸들러
  const handleSendMessage = async () => {
    if (newMessage.trim() === "" || !messageRoomId) return;

    // [추가] 메시지 전송 시, '입력 중' 상태 즉시 해제
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = null;
    }
    handleTyping(false);

    const { error } = await supabaseClient.from("messages").insert({
      content: newMessage,
      sender_id: userId,
      message_room_id: Number(messageRoomId),
    });

    if (error) {
      toast.error("메시지 전송에 실패했습니다.");
      console.error(error);
    } else {
      setNewMessage(""); // 입력 필드 초기화
    }
  };

  return (
    <>
      <NavigationBarWithBack />
      {/* <div className="pt-16 pb-18 bg-white shadow-lg">
        <ul className="p-3 pb-6 flex-1 overflow-y-auto">
          <ChatBubble
            type="message"
            isOwnMessage={true}
            timestamp="8:34 AM"
            message="Hey TARS, what's your honesty parameter?"
          />
          <ChatBubble
            type="message"
            isOwnMessage={false}
            timestamp="8:35 AM"
            message="90 percent."
          />
          <ChatBubble
            type="message"
            isOwnMessage={true}
            timestamp="8:40 AM"
            message="90 percent?"
          />
          <ChatBubble
            type="message"
            isOwnMessage={true}
            timestamp="8:40 AM"
            message="Hey TARS, what's your honesty parameter? Hey TARS, what's your honesty parameter? Hey TARS, what's your honesty parameter?"
          />
          <ChatBubble type="typing" />

          <ChatBubble
            type="message"
            isOwnMessage={true}
            timestamp="8:34 AM"
            message="Hey TARS, what's your honesty parameter?"
          />
          <ChatBubble
            type="message"
            isOwnMessage={false}
            timestamp="8:35 AM"
            message="90 percent."
          />
          <ChatBubble
            type="message"
            isOwnMessage={true}
            timestamp="8:40 AM"
            message="90 percent?"
          />
          <ChatBubble
            type="message"
            isOwnMessage={true}
            timestamp="8:40 AM"
            message="Hey TARS, what's your honesty parameter? Hey TARS, what's your honesty parameter? Hey TARS, what's your honesty parameter?"
          />
          <ChatBubble type="typing" />
          <ChatBubble
            type="message"
            isOwnMessage={true}
            timestamp="8:34 AM"
            message="Hey TARS, what's your honesty parameter?"
          />
          <ChatBubble
            type="message"
            isOwnMessage={false}
            timestamp="8:35 AM"
            message="90 percent."
          />
          <ChatBubble
            type="message"
            isOwnMessage={true}
            timestamp="8:40 AM"
            message="90 percent?"
          />
          <ChatBubble
            type="message"
            isOwnMessage={true}
            timestamp="8:40 AM"
            message="Hey TARS, what's your honesty parameter? Hey TARS, what's your honesty parameter? Hey TARS, what's your honesty parameter?"
          />
          <ChatBubble type="typing" />
          <ChatBubble
            type="message"
            isOwnMessage={true}
            timestamp="8:34 AM"
            message="Hey TARS, what's your honesty parameter?"
          />
          <ChatBubble
            type="message"
            isOwnMessage={false}
            timestamp="8:35 AM"
            message="90 percent."
          />
          <ChatBubble
            type="message"
            isOwnMessage={true}
            timestamp="8:40 AM"
            message="90 percent?"
          />
          <ChatBubble
            type="message"
            isOwnMessage={true}
            timestamp="8:40 AM"
            message="Hey TARS, what's your honesty parameter? Hey TARS, what's your honesty parameter? Hey TARS, what's your honesty parameter?"
          />
          <ChatBubble type="typing" />
        </ul>
      </div> */}
      <div className="flex flex-col h-full pt-16">
        <ul className="p-3 pb-20 flex-1 overflow-y-auto">
          {messages.map((msg) => (
            <ChatBubble
              key={msg.message_id}
              type="message"
              isOwnMessage={msg.sender_id === userId}
              timestamp={new Date(msg.created_at).toLocaleTimeString()}
              message={msg.content}
            />
          ))}
          {/* 상대방이 입력 중일 때 타이핑 버블을 보여줍니다. */}
          {isTyping && <ChatBubble type="typing" />}
          {/* 스크롤 위치를 위한 빈 li 요소 */}
          <li ref={messagesEndRef} />
        </ul>
      </div>
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 max-w-[480px] w-screen h-16 border-t border-gray-200 bg-white p-2">
        <ChatInput
          value={newMessage}
          onChange={onInputChange}
          onSend={handleSendMessage}
        />
      </div>
    </>
  );
}
