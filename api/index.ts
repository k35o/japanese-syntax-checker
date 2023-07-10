import type { VercelRequest, VercelResponse } from '@vercel/node';
import { z } from 'zod';
import { createLinter, loadTextlintrc } from "textlint";
import { TextlintResult } from "@textlint/kernel";

export const lintText = async (text: string): Promise<TextlintResult> => {
  const descriptor = await loadTextlintrc();
  const linter = createLinter({
      descriptor
  });
  const result = await linter.lintText(text, "DUMMY.md");
  return result;
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { body, method } = req;
  if (method !== 'POST') {
    res.status(405);
    res.json({ msg: "Method not allowed" });
    return;
  }

  const parsedBody = (z.object({
    text: z.string(),
  })).safeParse(body);

  if (!parsedBody.success) {
    res.status(400);
    res.json({ msg: "Invalid body" });
    return;
  }

  const resultMessage = (await lintText(parsedBody.data.text)).messages;
  res.json({
    ...parsedBody.data,
    msgs: resultMessage,
  });
}
