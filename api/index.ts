import type { VercelRequest, VercelResponse } from '@vercel/node';
import { z } from 'zod';
import { createLinter, loadTextlintrc } from "textlint";
import { TextlintResult } from "@textlint/kernel";

// ビルド後のnode_modulesには読み込みのないパッケージが存在しない。そのためtextlint-module-resolverで解決できないことを避けるために明示的に呼び出す。
// https://github.com/textlint/textlint/blob/578172ee8d875d157015127858312abf34aadc19/packages/%40textlint/config-loader/src/textlint-module-resolver.ts#L40
const loadExternallintRule = async() => {
  await Promise.all([
    import('textlint-rule-no-dropping-the-ra'),
    import('textlint-rule-preset-ja-technical-writing'),
    import('textlint-rule-preset-jtf-style'),
  ]);
}

const lintText = async (text: string): Promise<TextlintResult> => {
  await loadExternallintRule();
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
