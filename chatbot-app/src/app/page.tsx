import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { redirect } from "next/navigation";

async function newChat() {
  "use server";
  return redirect(`/chat/${crypto.randomUUID()}`);
}

export default function Home() {
  return (
    <div className="">
      チャットボット
      <form action={newChat}>
        <Input name="query" />
        <Button>質問する</Button>
      </form>
    </div>
  );
}
