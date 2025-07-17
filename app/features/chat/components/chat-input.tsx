import { SendHorizontal } from "lucide-react";
import React from "react";

interface ChatInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSend: () => void;
  placeholder?: string;
  disabled?: boolean;
}

export function ChatInput({
  value,
  onChange,
  onSend,
  placeholder = "메시지 입력 (150자 제한)",
  disabled = false,
}: ChatInputProps) {
  return (
    <div className="relative w-full">
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        maxLength={150}
        className="text-black h-10 w-full bg-gray-100 pl-3 pr-10 text-sm focus:outline-blue-500"
        onKeyDown={(e) => {
          if (e.key === "Enter" && !disabled) {
            onSend();
          }
        }}
      />
      <SendHorizontal
        className="absolute top-1/2 right-3 -translate-y-1/2 size-fit cursor-pointer rounded-full p-2 text-blue-600 hover:bg-gray-200 focus:bg-gray-200"
        onClick={() => {
          if (!disabled) onSend();
        }}
        tabIndex={0}
        role="button"
        aria-label="메시지 전송"
      />
    </div>
  );
}
