import OpenAI from "openai";
import path from "path";
import fs from "fs";
import { LLMResponse } from "./types.js";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const LLMPrompt = JSON.parse(
  fs.readFileSync(path.join(__dirname, "llm/llm-prompt.json"), "utf-8")
);
const LLMSchema = JSON.parse(
  fs.readFileSync(path.join(__dirname, "llm/llm-schema.json"), "utf-8")
);

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const askLLMForResponse = async (system_context: string, context: string): Promise<LLMResponse> => {
  // @ts-ignore
  const response = await openai.responses.create({
    model: "gpt-4.1-mini",
    input: [
      {
        "role": "system",
        "content": [
          {
            "type": "input_text",
            "text": system_context
          }
        ]
      },
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
