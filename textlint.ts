import { createLinter, loadTextlintrc } from "textlint";
import { TextlintResult } from "@textlint/kernel";

const loadExternallintRule = async() => {
  await Promise.all([
    import('textlint-rule-no-dropping-the-ra'),
    import('textlint-rule-preset-ja-technical-writing'),
    import('textlint-rule-preset-jtf-style'),
  ]);
}

export const lintText = async (text: string): Promise<TextlintResult> => {
  await loadExternallintRule();
  const descriptor = await loadTextlintrc();
  const linter = createLinter({
      descriptor
  });
  const result = await linter.lintText(text, "DUMMY.md");
  return result;
};
