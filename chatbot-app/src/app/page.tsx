import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { redirect } from "next/navigation";

async function newChat() {
  "use server";
  return redirect(`/chat/${crypto.randomUUID()}`);
}

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <div className="max-w-2xl w-full flex justify-end h-80 flex-col items-center">
        <h1 className="font-bold text-2xl">AI チャットボット</h1>
        <form action={newChat} className="w-full mt-8 flex gap-1">
          <Input name="query" />
          <Button>質問する</Button>
        </form>
      </div>
    </div>
  );
}
