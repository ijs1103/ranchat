import { NavigationBarWithBack } from "~/common/components/navigation-bar-with-back";
import type { Route } from "./+types/chat-page";
import { ChatBubble } from "../components/chat-bubble";
import { SendHorizontal } from "lucide-react";
import { ChatInput } from "../components/chat-input";
import { useState } from "react";
export const meta: Route.MetaFunction = () => {
  return [{ title: "Message | RanChat" }];
};

export const loader = async ({ request, params }: Route.LoaderArgs) => {
  //   const { client } = await makeSSRClient(request);
  //   const userId = await getLoggedInUserId(client);
  //   const messages = await getMessagesByMessagesRoomId(client, {
  //     messageRoomId: params.messageRoomId,
  //     userId,
  //   });
  //   const participant = await getRoomsParticipant(client, {
  //     messageRoomId: params.messageRoomId,
  //     userId,
  //   });
  //   return {
  //     messages,
  //     participant,
  //   };
};
export const action = async ({ request, params }: Route.ActionArgs) => {
  //   const { client } = await makeSSRClient(request);
  //   const userId = await getLoggedInUserId(client);
  //   const formData = await request.formData();
  //   const message = formData.get("message");
  //   await sendMessageToRoom(client, {
  //     messageRoomId: params.messageRoomId,
  //     message: message as string,
  //     userId,
  //   });
  //   return {
  //     ok: true,
  //   };
};

export default function ChatPage({
  loaderData,
  actionData,
}: Route.ComponentProps) {
  const [message, setMessage] = useState("");

  return (
    <>
      <NavigationBarWithBack />
      <div className="pt-16 pb-18 bg-white shadow-lg">
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
      </div>
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 max-w-[480px] w-screen h-16 border-t border-gray-200 bg-white p-2">
        <ChatInput
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onSend={() => {
            // 메시지 전송 로직
          }}
        />
      </div>
    </>
  );
}
