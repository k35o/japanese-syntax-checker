import { createLinter, loadTextlintrc } from "npm:textlint@13.3.3";
import { TextlintResult } from "npm:@textlint/kernel@13.3.3";
import _1 from "npm:textlint-rule-preset-ja-technical-writing@7.0.0";
import _2 from "npm:textlint-rule-preset-jtf-style@2.3.13";
import _3 from "npm:textlint-rule-no-dropping-the-ra@3.0.0";

export const lintText = async (text: string): Promise<TextlintResult> => {
  const descriptor = await loadTextlintrc();
  const linter = createLinter({
      descriptor
  });
  const result = await linter.lintText(text, "DUMMY.md");
  return result;
};
