"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useChat } from "ai/react";
import { RefreshCcw } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { PropsWithChildren, useEffect } from "react";

export default function Page() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("query") ?? "";
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    stop,
    reload,
  } = useChat({
    keepLastMessageOnError: true,
    initialMessages: [{ id: "1", role: "user", content: initialQuery }],
  });

  useEffect(() => {
    if (isLoading) return;
    reload();
  }, []);

  return (
    <div className="h-full flex flex-col">
      <h1 className="p-4 font-bold text-2xl text-center">
        <Link href="/">求人AI アシスタント</Link>
      </h1>
      <div className="flex-grow flex flex-col overflow-hidden items-center">
        <div className="flex-grow overflow-y-scroll w-full p-4 max-w-2xl">
          <div>
            {messages.map((message) => (
              <div key={message.id}>
                <div
                  className={cn(
                    message.role === "user"
                      ? "flex justify-end ml-8"
                      : "flex justify-start mr-8"
                  )}
                >
                  <div>
                    <span className="text-sm text-gray-500">
                      {message.role === "user" ? "あなた" : "AI アシスタント"}
                    </span>
                    <Balloon>{message.content}</Balloon>
                  </div>
                </div>
              </div>
            ))}
            {isLoading && messages.at(-1)?.role === "user" && (
              <div>
                <span className="text-sm text-gray-500">AI アシスタント</span>
                <Balloon>
                  <RefreshCcw className="animate-spin" />
                </Balloon>
              </div>
            )}
          </div>
        </div>

        <div className="w-full max-w-2xl">
          <form onSubmit={handleSubmit} className="flex gap-1 p-4">
            <Input
              name="prompt"
              value={input}
              onChange={handleInputChange}
              disabled={isLoading}
            />
            <Button type="submit">送信</Button>
          </form>
        </div>
      </div>
    </div>
  );
}

function Balloon({ children }: PropsWithChildren) {
  return (
    <div className="p-4 border w-full max-w-96 rounded-md whitespace-pre-wrap">
      {children}
    </div>
  );
}
