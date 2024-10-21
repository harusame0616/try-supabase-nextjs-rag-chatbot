import { createOpenAI } from "@ai-sdk/openai";
import { convertToCoreMessages, streamText } from "ai";
import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";
import { OpenAIEmbeddings } from "@langchain/openai";
import { createClient } from "@supabase/supabase-js";

export const maxDuration = 30;
const openAIApiKey = process.env.OPENAI_API_KEY;

export async function POST(req: Request) {
  const { messages } = await req.json();
  const openai = createOpenAI({
    apiKey: openAIApiKey,
  });

  const kyuujins = await searchKyuujin(messages.at(-1).content);

  const result = await streamText({
    model: openai("gpt-4o"),
    system: `# Order
あなたは店舗の求人情報回答アシスタントです。Rules に基づいてユーザーの質問に日本語で回答してください。

# Rules
- Kyuujins の情報を元にユーザーの質問に対して、店舗の求人情報に関する回答を生成してください。
- 生成 AI っぽい回答はしないでください。


# kyuujins
${JSON.stringify(kyuujins)}
`,
    messages: convertToCoreMessages(messages),
  });

  return result.toDataStreamResponse();
}

async function searchKyuujin(message: string) {
  const url = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_KEY;
  const client = createClient(url!, supabaseKey!);

  const vectorStore = await SupabaseVectorStore.fromExistingIndex(
    new OpenAIEmbeddings({
      openAIApiKey: openAIApiKey,
    }),
    {
      client,
      tableName: "documents",
      queryName: "match_documents",
    }
  );

  const results = await vectorStore.similaritySearch(message, 20);

  return results;
}
