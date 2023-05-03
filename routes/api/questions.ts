import { HandlerContext } from "$fresh/server.ts";

// Jokes courtesy of https://punsandoneliners.com/randomness/programmer-jokes/
const QUESTIONS = [
  "泣ける？",
  "熱い戦いがあった？",
  "悲劇？",
  "喜劇？",
  "どんでん返し？",
  "結末は予想できた？",
  "笑える？",
  "キャラクターを好きになる？",
  "奇跡が起きた？",
];

export const handler = (_req: Request, _ctx: HandlerContext): Response => {
  const randomIndex = Math.floor(Math.random() * QUESTIONS.length);
  const body = QUESTIONS[randomIndex];
  return new Response(body);
};
