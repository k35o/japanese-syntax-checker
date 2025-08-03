import { createLinter, loadTextlintrc } from "textlint";
import { TextlintResult } from "@textlint/kernel";

const loadExternallintRule = async () => {
  await Promise.all([
    import("textlint-rule-ja-simple-user-dictionary"),
    import("textlint-rule-max-ten"),
    import("textlint-rule-max-kanji-continuous-len"),
    import("textlint-rule-no-mix-dearu-desumasu"),
    import("textlint-rule-no-double-negative-ja"),
    import("textlint-rule-no-hankaku-kana"),
    import("textlint-rule-ja-no-redundant-expression"),
    import("textlint-rule-ja-no-abusage"),
    import("textlint-rule-no-mixed-zenkaku-and-hankaku-alphabet"),
    import("textlint-rule-no-dropping-the-ra"),
    import("textlint-rule-no-doubled-conjunction"),
    import("textlint-rule-ja-no-mixed-period"),
    import("textlint-rule-ja-hiragana-keishikimeishi"),
    import("textlint-rule-ja-hiragana-fukushi"),
    import("textlint-rule-ja-hiragana-hojodoushi"),
    import("@textlint-ja/textlint-rule-preset-ai-writing"),
    import("@textlint-ja/textlint-rule-no-insert-dropping-sa"),
    import("@textlint-ja/textlint-rule-no-synonyms"),
    import("textlint-rule-ja-no-orthographic-variants"),
  ]);
};

export const lintText = async (text: string): Promise<TextlintResult> => {
  await loadExternallintRule();
  const descriptor = await loadTextlintrc();
  const linter = createLinter({
    descriptor,
  });
  try {
    const result = await linter.lintText(text, "DUMMY.md");
    return result;
  } catch (error) {
    console.error("Error occurred while linting:", error);
    throw error;
  }
};
