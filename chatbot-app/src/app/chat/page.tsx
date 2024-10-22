import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useChat } from "ai/react";
import { RefreshCcw } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { PropsWithChildren, useEffect } from "react";
import Chat from "./chat";

export default function Page({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  const initialQuery = searchParams.query ?? "";

  return <Chat initialQuery={initialQuery}></Chat>
}
