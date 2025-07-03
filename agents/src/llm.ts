import OpenAI from "openai";
import LLMPrompt from "./llm/llm-prompt.json";
import LLMSchema from "./llm/llm-schema.json";
import { LLMResponse } from "./types";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const askLLMForResponse = async (context: string): Promise<LLMResponse> => {
  // @ts-ignore
  const response = await openai.responses.create({
    model: "gpt-4.1-mini",
    input: [
      LLMPrompt,
      {
        role: "user",
        content: [
          {
            type: "input_text",
            text: context,
          },
        ],
      },
    ],
    text: {
      format: LLMSchema,
    },
    reasoning: {},
    tools: [],
    temperature: 1,
    max_output_tokens: 2048,
    top_p: 1,
    store: true,
  });

  return JSON.parse(response.output_text);
};
