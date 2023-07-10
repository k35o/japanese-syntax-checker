## Japanese Syntax Checker
[textlint](https://textlint.github.io/)を用いてpostされた日本語の構文チェックを行い、その結果を返します。

### Request型
```ts
type Request = {
  text: string;
};
```

### Response型
```ts
type Request = {
  text: string;
  mags: {
    type: "lint";
    ruleId: string;
    message: string;
    index: number;
    line: number;
    column: number;
    range: number[];
    loc: {
      start: {
        line: number;
        column: number;
      };
      end: {
        line: number;
        column: number;
      };
    };
    severity: number;
  };
};
```
